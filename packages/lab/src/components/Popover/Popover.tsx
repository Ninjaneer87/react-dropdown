'use client';

/* eslint-disable react-hooks/refs */
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { PopoverContext } from '@/context/PopoverContext';
import PopoverTrigger from '@/components/Popover/PopoverTrigger';
import {
  PopoverComposition,
  PopoverPlacement,
  PopoverProps,
  PopoverSize,
} from '@/types';
import { useDelayUnmount } from '@/hooks/useDelayUnmount';
import PopoverContent from '@/components/Popover/PopoverContent';
import {
  createPositionFromPlacement,
  Coords,
  buildDynamicPlacement,
  growContentPosition,
  cn,
} from '@/utils/common';
import ClientPortal from '@/components/utility/ClientPortal';
import { useWindowResize } from '@/hooks/useWindowResize';
import {
  PopoverRootContext,
  usePopoverRootContext,
} from '@/context/PopoverRootContext';
import { Slot } from '@/components/utility/Slot';
import {
  useFocusTrap,
  usePreventBodyScroll,
  useResizeObserver,
  usePositionObserver,
} from '@/hooks';

const PopoverBase = forwardRef<
  HTMLSpanElement,
  PopoverProps & PopoverComposition
>(
  (
    {
      children,
      trigger,
      content,
      backdrop = 'none',
      placement = 'bottom-center',
      offset = 8,
      showArrow = false,
      isDisabled,
      isOpen: controlledIsOpen,
      onOpen,
      onClose,
      onClickOutside,
      onOpenChange,
      onTriggerFocus,
      onTriggerBlur,
      openOnHover,
      focusTriggerOnClose = true,
      delayShow = 0,
      delayHide = 0,
      hoverableContent = true,
      growContent = false,
      size,
      shouldFlip = true,
      shouldBlockScroll = true,
      shouldCloseOnScroll = !shouldBlockScroll,
      shouldCloseOnClickOutside = true,
      shouldCloseOnEsc = true,
      openOnFocus = false,
      shouldCloseOnTriggerBlur = false,
      classNames,
      focusTrapProps = {
        autoFocus: true,
        trapFocus: true,
      },
      triggerWrapper = false,
      fullWidthTriggerWrapper = false,
      ...rest
    },
    ref,
  ) => {
    const { autoFocus, trapFocus } = focusTrapProps;
    const popoverContentRef = useRef<HTMLDivElement>(null);
    const popoverTriggerRef = useRef<HTMLDivElement>(null);
    const showDelayRef = useRef<NodeJS.Timeout | null>(null);
    const hideDelayRef = useRef<NodeJS.Timeout | null>(null);
    const resolvedPlacementRef = useRef<PopoverPlacement | null>(null);

    const onOpenRef = useRef(onOpen);
    const onCloseRef = useRef(onClose);
    const onClickOutsideRef = useRef(onClickOutside);
    const onOpenChangeRef = useRef(onOpenChange);
    const onTriggerFocusRef = useRef(onTriggerFocus);
    const onTriggerBlurRef = useRef(onTriggerBlur);

    const popoverRootContext = usePopoverRootContext();
    const { isRootOpen, rootPopoverId } = popoverRootContext || {};
    const isRootPopover = !popoverRootContext;
    const popoverId = useId();

    const [isOpen, setIsOpen] = useState(false);
    const [isHoverOpen, setIsHoverOpen] = useState(false);
    const [popoverContentCoords, setPopoverContentCoords] = useState<Coords>(
      {},
    );
    const [portalContainer, setPortalContainer] = useState<Element | null>(
      null,
    );
    const open = controlledIsOpen ?? isOpen;
    const isExpanded = open || isHoverOpen;

    const isMounted = useDelayUnmount(isExpanded, 150);

    const isRootExpanded = isExpanded && (isRootPopover || !!isRootOpen);

    let popoverTrigger: ReactNode | null = trigger ?? null;
    let popoverContent: ReactNode | null = content ?? null;

    const { startTrapRef, trapContainerRef, endTrapRef } = useFocusTrap({
      isActive: open && !!trapFocus,
      shouldAutoFocus: !!autoFocus,
    });

    // Validate children
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      switch (child.type) {
        case PopoverTrigger: {
          if (popoverTrigger) {
            throw new Error(
              'Popover component can have only one PopoverTrigger or a "trigger" prop, not both',
            );
          }

          popoverTrigger = child;
          break;
        }

        case PopoverContent: {
          if (popoverContent) {
            throw new Error(
              'Popover component can have only one PopoverContent or a "content" prop, not both',
            );
          }

          popoverContent = child;
          break;
        }

        default: {
          throw new Error(
            `Popover component only accepts PopoverTrigger and PopoverContent components as children`,
          );
        }
      }
    });

    if (!popoverTrigger) {
      throw new Error(
        'Popover component requires a PopoverTrigger or a "trigger" prop',
      );
    }

    if (!popoverContent) {
      throw new Error('Popover component requires a PopoverContent');
    }

    const setContentCoords = useCallback(() => {
      if (
        !isExpanded ||
        !popoverTriggerRef.current ||
        !popoverContentRef.current
      )
        return;

      const triggerRect = popoverTriggerRef.current.getBoundingClientRect();

      if (size === 'trigger') {
        popoverContentRef.current.style.width = `${triggerRect.width}px`;
      }
      const popoverRect = popoverContentRef.current.getBoundingClientRect();

      if (growContent) {
        const coords = growContentPosition(
          placement,
          offset,
          triggerRect,
          portalContainer,
        );
        setPopoverContentCoords(coords);

        return;
      }

      const resolvedPlacement = shouldFlip
        ? buildDynamicPlacement(
            placement,
            offset,
            triggerRect,
            popoverRect,
            portalContainer,
          )
        : placement;
      const coords = createPositionFromPlacement(
        resolvedPlacement,
        offset,
        triggerRect,
        popoverContentRef.current,
        portalContainer,
      );

      resolvedPlacementRef.current = resolvedPlacement;

      setPopoverContentCoords(coords);
    }, [
      placement,
      offset,
      shouldFlip,
      growContent,
      isExpanded,
      size,
      portalContainer,
    ]);

    // Handle onClose
    const handleClose = useCallback(
      (focusTrigger = focusTriggerOnClose) => {
        if (isDisabled) return;

        if (onCloseRef.current) {
          onCloseRef.current();
        }

        setIsOpen(false);
        setIsHoverOpen(false);
        onOpenChangeRef.current?.(false);

        if (focusTrigger) {
          // Delay focus to prevent the current keydown event from firing on the trigger
          requestAnimationFrame(() => {
            popoverTriggerRef.current?.focus();
          });
        }
      },
      [isDisabled, focusTriggerOnClose],
    );

    const handleOpen = useCallback(() => {
      if (isDisabled || open) return;

      if (onOpenChangeRef.current) onOpenChangeRef.current(true);
      if (onOpenRef.current) onOpenRef.current();
      setIsOpen(true);
    }, [isDisabled, open]);

    // Handle onOpenChange
    const handleToggle = useCallback(() => {
      if (isDisabled || (openOnHover && isRootPopover)) return;

      if (open) {
        handleClose();
        return;
      }

      handleOpen();
    }, [isDisabled, open, handleClose, openOnHover, isRootPopover, handleOpen]);

    const onTriggerKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
          if (openOnHover) return;
          // Only toggle if the event originated from the trigger itself
          if (event.target !== event.currentTarget) return;

          event.preventDefault();
          event.stopPropagation();
          handleToggle();
        }
      },
      [handleToggle, openOnHover],
    );

    const onTriggerFocusHandler = useCallback(
      (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.target.matches(':focus-visible')) return;
        if (e.target !== e.currentTarget) return;
        if (isDisabled) return;

        if (openOnFocus) {
          handleOpen();
        }

        onTriggerFocusRef.current?.();
      },
      [isDisabled, openOnFocus, handleOpen, onTriggerFocusRef],
    );

    const onTriggerBlurHandler = useCallback(() => {
      if (isDisabled) return;

      if (shouldCloseOnTriggerBlur) {
        handleClose();
      }

      onTriggerBlurRef.current?.();
    }, [isDisabled, shouldCloseOnTriggerBlur, handleClose, onTriggerBlurRef]);

    const handleMouseEnter = useCallback(() => {
      if (isDisabled) return;

      if (showDelayRef.current) clearTimeout(showDelayRef.current);
      if (hideDelayRef.current) clearTimeout(hideDelayRef.current);

      showDelayRef.current = setTimeout(() => {
        setIsHoverOpen(true);

        if (isRootPopover && openOnHover) {
          onOpenChangeRef.current?.(true);
          onOpenRef.current?.();
        }
      }, delayShow);
    }, [isDisabled, isRootPopover, openOnHover, delayShow]);

    const handleMouseLeave = useCallback(() => {
      if (isDisabled) return;

      if (showDelayRef.current) clearTimeout(showDelayRef.current);
      if (hideDelayRef.current) clearTimeout(hideDelayRef.current);

      hideDelayRef.current = setTimeout(() => {
        setIsHoverOpen(false);

        if (isRootPopover && openOnHover) {
          onOpenChangeRef.current?.(false);
          onCloseRef.current?.();
        }
      }, delayHide);
    }, [isDisabled, isRootPopover, openOnHover, delayHide]);

    useWindowResize(setContentCoords);
    usePreventBodyScroll(isRootExpanded && isRootPopover && shouldBlockScroll);
    useResizeObserver({
      element: popoverTriggerRef.current,
      onResize: setContentCoords,
    });
    usePositionObserver({
      element: popoverTriggerRef.current,
      callback: setContentCoords,
      isActive: isRootExpanded,
    });

    useEffect(() => {
      onOpenRef.current = onOpen;
      onCloseRef.current = onClose;
      onClickOutsideRef.current = onClickOutside;
      onTriggerFocusRef.current = onTriggerFocus;
      onTriggerBlurRef.current = onTriggerBlur;
      onOpenChangeRef.current = onOpenChange;
    }, [
      onOpen,
      onClose,
      onClickOutside,
      onTriggerFocus,
      onTriggerBlur,
      onOpenChange,
    ]);

    // Handle onClickOutside
    useEffect(() => {
      if (isDisabled || !isExpanded) return;

      function handleClickOutside(event: MouseEvent) {
        const rootId = rootPopoverId || popoverId;
        const clickedTarget = event.target as Element;

        const isPopoverTrigger = clickedTarget.closest(
          `[data-popover-trigger-root-id="${rootId}"]`,
        );
        const isPopoverContent = clickedTarget.closest(
          `[data-popover-content-root-id="${rootId}"]`,
        );

        if (isPopoverTrigger || isPopoverContent) {
          return;
        }

        if (onClickOutsideRef.current) onClickOutsideRef.current(event);
        if (shouldCloseOnClickOutside) {
          const shouldFocusTrigger = focusTriggerOnClose && isRootPopover;
          handleClose(shouldFocusTrigger);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [
      shouldCloseOnClickOutside,
      isExpanded,
      isDisabled,
      handleClose,
      popoverId,
      rootPopoverId,
      isRootPopover,
      focusTriggerOnClose,
    ]);

    // Handle position and scroll
    useEffect(() => {
      if (isExpanded) {
        setContentCoords();
      }
    }, [isExpanded, setContentCoords]);

    useEffect(() => {
      if (!isExpanded) {
        return;
      }

      setPortalContainer(popoverTriggerRef.current?.closest('dialog') ?? null);
    }, [isExpanded]);

    useEffect(() => {
      if (!isRootOpen || !open) {
        setIsHoverOpen(false);
        return;
      }
    }, [open, isRootOpen]);

    useEffect(() => {
      if (!isExpanded) return;

      function updateCoords() {
        if (shouldCloseOnScroll) {
          handleClose();
        }
        setContentCoords();
      }

      document.addEventListener('scroll', updateCoords);

      const vv = window.visualViewport;
      if (vv) {
        vv.addEventListener('resize', updateCoords);
        vv.addEventListener('scroll', updateCoords);
      }

      return () => {
        document.removeEventListener('scroll', updateCoords);
        if (vv) {
          vv.removeEventListener('resize', updateCoords);
          vv.removeEventListener('scroll', updateCoords);
        }
      };
    }, [isExpanded, shouldCloseOnScroll, handleClose, setContentCoords]);

    useEffect(() => {
      if (!isExpanded) {
        return;
      }

      function onPopoverKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape' && shouldCloseOnEsc) {
          const openPopovers = [
            ...document.querySelectorAll(`[data-popover-content-current-id]`),
          ];
          const lastOpenedPopover = openPopovers[openPopovers.length - 1] as
            | HTMLDivElement
            | undefined;
          const currentPopoverId = lastOpenedPopover?.getAttribute(
            `data-popover-content-current-id`,
          );

          if (currentPopoverId && currentPopoverId !== popoverId) return;
          handleClose();
        }
      }
      document.addEventListener('keydown', onPopoverKeyDown);

      return () => {
        document.removeEventListener('keydown', onPopoverKeyDown);
      };
    }, [shouldCloseOnEsc, isExpanded, handleClose, popoverId]);

    // Unmount cleanup
    useEffect(
      () => () => {
        if (showDelayRef.current) clearTimeout(showDelayRef.current);
        if (hideDelayRef.current) clearTimeout(hideDelayRef.current);
      },
      [],
    );

    const sizeClassMap: Record<PopoverSize, string> = {
      free: 'popover-size-free',
      small: 'popover-size-small',
      medium: 'popover-size-medium',
      large: 'popover-size-large',
      trigger: '',
    };

    const baseClassName = cn('contents');
    const triggerClassName = cn(!isDisabled ? 'cursor-pointer' : '');
    const triggerWrapperClassName = cn(
      'inline-block',
      fullWidthTriggerWrapper ? 'w-full' : 'w-fit',
      classNames?.triggerWrapper,
    );
    const contentClassName = cn(
      'fixed z-1000 popover-content border border-gray-100',
      isExpanded ? 'scale-in' : 'scale-out',
      'transition-opacity p-2 bg-white text-gray-800 rounded-lg shadow-md',
      showArrow && 'popover-arrow',
      size && sizeClassMap[size],
    );
    const backdropClassName = cn(
      'fixed z-1000 inset-0',
      backdrop !== 'transparent' ? 'bg-black/30' : '',
      backdrop === 'blur' ? 'backdrop-blur-xs' : '',
      isExpanded ? 'fade-in' : 'fade-out',
    );

    const commonTriggerProps = {
      onClick: (e: React.MouseEvent) => {
        if (!openOnHover) {
          e?.stopPropagation();
        }
        handleToggle();
      },
      'aria-describedby': popoverId,
      'aria-expanded': isExpanded,
      'data-popover-trigger': true,
      'data-popover-trigger-root-id': rootPopoverId ?? popoverId,
      'data-popover-trigger-current-id': popoverId,
      onKeyDown: onTriggerKeyDown,
      onFocus: onTriggerFocusHandler,
      onBlur: onTriggerBlurHandler,
      tabIndex: isDisabled ? -1 : 0,
      ref: popoverTriggerRef,
      ...(openOnHover &&
        !hoverableContent && {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        }),
    };

    const popoverJSX = (
      <PopoverContext.Provider
        value={{ isOpen: isExpanded, handleClose, popoverId, handleOpen }}
      >
        <>
          {(isMounted || isExpanded) && !!backdrop && backdrop !== 'none' && (
            <ClientPortal container={portalContainer}>
              <div className={cn(backdropClassName, classNames?.backdrop)} />
            </ClientPortal>
          )}

          <span
            ref={ref}
            {...rest}
            className={cn(baseClassName, classNames?.base)}
            onScroll={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            {...(openOnHover &&
              hoverableContent && {
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
              })}
          >
            {triggerWrapper ? (
              <span
                {...commonTriggerProps}
                data-popover-trigger-wrapper
                className={cn(
                  triggerClassName,
                  triggerWrapperClassName,
                  classNames?.trigger,
                )}
              >
                {popoverTrigger}
              </span>
            ) : (
              <Slot
                {...commonTriggerProps}
                className={cn(triggerClassName, classNames?.trigger)}
              >
                {popoverTrigger}
              </Slot>
            )}

            {(isMounted || isExpanded) && (
              <ClientPortal container={portalContainer}>
                <div
                  id={popoverId}
                  data-popover-content
                  data-popover-content-root-id={rootPopoverId ?? popoverId}
                  data-popover-content-current-id={popoverId}
                  data-popover-placement={resolvedPlacementRef.current}
                  className={cn(contentClassName, classNames?.content)}
                  style={popoverContentCoords}
                  onClick={(e) => e.stopPropagation()}
                  ref={(node) => {
                    if (!node) return;

                    popoverContentRef.current = node;
                    trapContainerRef.current = node;
                  }}
                >
                  <div ref={startTrapRef} />
                  {popoverContent}
                  <div ref={endTrapRef} />
                </div>
              </ClientPortal>
            )}
          </span>
        </>
      </PopoverContext.Provider>
    );

    if (!isRootPopover) {
      return popoverJSX;
    }

    return (
      <PopoverRootContext.Provider
        value={{
          isRootOpen: isExpanded,
          handleCloseRoot: handleClose,
          rootPopoverId: popoverId,
        }}
      >
        {popoverJSX}
      </PopoverRootContext.Provider>
    );
  },
);

type PopoverType = typeof PopoverBase & {
  Content: typeof PopoverContent;
  Trigger: typeof PopoverTrigger;
};

(PopoverBase as PopoverType).Content = PopoverContent;
(PopoverBase as PopoverType).Trigger = PopoverTrigger;

const Popover = PopoverBase as PopoverType;

export default Popover;
