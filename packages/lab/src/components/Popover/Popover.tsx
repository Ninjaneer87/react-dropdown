/* eslint-disable react-hooks/refs */
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { PopoverContext } from '../../context/PopoverContext';
import PopoverTrigger from './PopoverTrigger';
import { PopoverComposition, PopoverProps } from '../../types';
import { useDelayUnmount } from '../../hooks/useDelayUnmount';
import PopoverContent from './PopoverContent';
import {
  createPositionFromPlacement,
  Coords,
  buildPlacement,
  growContentPosition,
  cn,
} from '../../utils/common';
import ClientPortal from '../utility/ClientPortal';
import { useWindowResize } from '../../hooks/useWindowResize';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import PopoverFocusTrapper from './PopoverFocusTrapper';
import {
  PopoverRootContext,
  usePopoverRootContext,
} from '../../context/PopoverRootContext';
import { usePreventBodyScroll } from '../../hooks/usePreventBodyScroll';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { usePositionObserver } from '../../hooks/usePositionObserver';
import { Slot } from '@/components/utility/Slot';

const Popover = ({
  children,
  trigger,
  content,
  shouldFlip = true,
  shouldBlockScroll = true,
  shouldCloseOnScroll = !shouldBlockScroll,
  shouldCloseOnBlur = true,
  shouldCloseOnEsc = true,
  backdrop,
  isNested = false,
  placement = 'bottom-center',
  offset = 8,
  // showArrow = false,
  isDisabled,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onBlur,
  onOpenChange,
  openOnHover,
  fullWidth = false,
  focusTriggerOnClose = true,
  delayShow = 0,
  delayHide = 0,
  hoverableContent = true,
  growContent = false,
  classNames,
  focusTrapProps = {
    autoFocus: true,
    trapFocus: true,
  },
}: PopoverProps & PopoverComposition) => {
  const { autoFocus, trapFocus } = focusTrapProps;
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);
  const showDelayRef = useRef<NodeJS.Timeout | null>(null);
  const hideDelayRef = useRef<NodeJS.Timeout | null>(null);

  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);
  const onBlurRef = useRef(onBlur);
  const onOpenChangeRef = useRef(onOpenChange);

  const popoverRootContext = usePopoverRootContext();
  const { isRootOpen, rootPopoverId } = popoverRootContext || {};
  const isRootPopover = !popoverRootContext;
  const popoverId = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  const [popoverContentCoords, setPopoverContentCoords] = useState<Coords>({});
  const open = controlledIsOpen ?? isOpen;
  const isExpanded = open || isHoverOpen;

  const isMounted = useDelayUnmount(isExpanded, 150);

  const isRootExpanded = isExpanded && (isRootPopover || !!isRootOpen);

  let popoverTrigger: ReactNode | null = trigger ?? null;
  let popoverContent: ReactNode | null = content ?? null;

  const { firstFocusableItemRef, focusContainerRef, lastFocusableItemRef } =
    useFocusTrap(open && !!trapFocus, !!autoFocus);

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
    if (!isExpanded || !popoverTriggerRef.current || !popoverContentRef.current)
      return;

    const triggerRect = popoverTriggerRef.current.getBoundingClientRect();
    const popoverRect = popoverContentRef.current.getBoundingClientRect();

    if (growContent) {
      const coords = growContentPosition(placement, offset, triggerRect);
      setPopoverContentCoords(coords);

      return;
    }

    const fitPlacement = shouldFlip
      ? buildPlacement(placement, offset, triggerRect, popoverRect)
      : placement;
    const coords = createPositionFromPlacement(
      fitPlacement,
      offset,
      triggerRect,
      popoverContentRef.current,
    );

    setPopoverContentCoords(coords);
  }, [placement, offset, shouldFlip, growContent, isExpanded]);

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
    onBlurRef.current = onBlur;
    onOpenChangeRef.current = onOpenChange;
  }, [onOpen, onClose, onBlur, onOpenChange]);

  // Handle onBlur
  useEffect(() => {
    if (isDisabled) return;
    if (!isExpanded) return;

    function handleClickOutside(event: MouseEvent) {
      const popoverIdFromClosestTrigger = (event.target as Element)
        .closest(`[data-popover-trigger-current-id]`)
        ?.getAttribute('data-popover-trigger-current-id');
      const popoverIdFromClosestContent = (event.target as Element)
        .closest(`[data-popover-content-current-id]`)
        ?.getAttribute('data-popover-content-current-id');
      const id = popoverIdFromClosestTrigger || popoverIdFromClosestContent;

      if (id && id !== popoverId) return;

      const isPopoverTrigger = !!(event.target as Element).closest(
        `[data-popover-trigger-current-id="${popoverId}"]`,
      );
      const isPopoverContent = !!(event.target as Element).closest(
        `[data-popover-content-current-id="${popoverId}"]`,
      );

      if (isPopoverTrigger || isPopoverContent) {
        return;
      }

      if (onBlurRef.current) onBlurRef.current();
      if (shouldCloseOnBlur) handleClose();
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [shouldCloseOnBlur, isExpanded, isDisabled, handleClose, popoverId]);

  // Handle position and scroll
  useEffect(() => {
    if (isExpanded) {
      setContentCoords();
    }
  }, [isExpanded, setContentCoords]);

  useEffect(() => {
    if (!isExpanded) return;

    function handleScroll() {
      if (shouldCloseOnScroll) {
        handleClose();
      }
      setContentCoords();
    }

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isExpanded, shouldCloseOnScroll, handleClose, setContentCoords]);

  // Handle onOpenChange
  const handleToggle = useCallback(() => {
    if (isDisabled) return;

    if (onOpenChangeRef.current) {
      onOpenChangeRef.current(!open);
    }

    if (open) {
      handleClose();
      return;
    }

    onOpenRef.current?.();

    setIsOpen((prev) => !prev);
  }, [isDisabled, open, handleClose]);

  const handleOpen = useCallback(() => {
    if (isDisabled || open) return;

    if (onOpenChangeRef.current) onOpenChangeRef.current(true);
    if (onOpenRef.current) onOpenRef.current();
    setIsOpen(true);
  }, [isDisabled, open]);

  const handleBackdropClick = useCallback(() => {
    if (shouldCloseOnBlur) {
      handleClose();
    }
  }, [handleClose, shouldCloseOnBlur]);

  const onTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        // Only toggle if the event originated from the trigger itself
        if (event.target !== event.currentTarget) return;

        event.preventDefault();
        handleToggle();
      }
    },
    [handleToggle],
  );

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

  const handleMouseEnter = useCallback(() => {
    if (isDisabled) return;

    if (showDelayRef.current) clearTimeout(showDelayRef.current);
    if (hideDelayRef.current) clearTimeout(hideDelayRef.current);

    showDelayRef.current = setTimeout(() => {
      setIsHoverOpen(true);

      if (isRootPopover && openOnHover) onOpenRef.current?.();
    }, delayShow);
  }, [isDisabled, isRootPopover, openOnHover, delayShow]);

  const handleMouseLeave = useCallback(() => {
    if (isDisabled) return;

    if (showDelayRef.current) clearTimeout(showDelayRef.current);
    if (hideDelayRef.current) clearTimeout(hideDelayRef.current);

    hideDelayRef.current = setTimeout(() => {
      setIsHoverOpen(false);

      if (isRootPopover && openOnHover) onCloseRef.current?.();
    }, delayHide);
  }, [isDisabled, isRootPopover, openOnHover, delayHide]);

  const baseClassName = cn('relative', fullWidth ? 'w-full' : 'w-fit');
  const triggerClassName = cn(
    'flex items-center gap-2',
    !isDisabled ? 'cursor-pointer' : '',
    'grow w-full',
  );
  const contentClassName = cn(
    'fixed z-10',
    isRootExpanded || (isExpanded && !isNested) ? 'scale-in' : 'scale-out',
    'transition-opacity p-2 bg-white text-gray-800 rounded-lg shadow-md',
  );
  const backdropClassName = cn(
    'fixed z-0 inset-0',
    backdrop !== 'transparent' ? 'bg-black/30' : '',
    backdrop === 'blur' ? 'backdrop-blur-xs' : '',
    isRootExpanded ? 'fade-in' : 'fade-out',
  );

  const popoverJSX = (
    <PopoverContext.Provider
      value={{ isOpen: isExpanded, handleClose, popoverId, handleOpen }}
    >
      <>
        <ClientPortal>
          {isMounted && !!backdrop && (
            <div
              className={cn(backdropClassName, classNames?.backdrop)}
              onClick={(e) => {
                e.stopPropagation();
                handleBackdropClick();
              }}
            />
          )}
        </ClientPortal>

        <div
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
          <Slot
            onClick={(e: React.MouseEvent) => {
              e?.stopPropagation();
              handleToggle();
            }}
            data-popover-trigger-root-id={rootPopoverId ?? popoverId}
            data-trigger-open={isExpanded}
            onKeyDown={onTriggerKeyDown}
            tabIndex={0}
            className={cn(triggerClassName, classNames?.trigger)}
            ref={popoverTriggerRef}
            {...(openOnHover &&
              !hoverableContent && {
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
              })}
          >
            {popoverTrigger}
          </Slot>

          <ClientPortal>
            {(isMounted || isExpanded) && (
              <div
                data-popover-content-root-id={rootPopoverId ?? popoverId}
                data-popover-content-current-id={popoverId}
                className={cn(contentClassName, classNames?.content)}
                style={popoverContentCoords}
                onClick={(e) => e.stopPropagation()}
                ref={(node) => {
                  if (!node) return;

                  popoverContentRef.current = node;
                  focusContainerRef.current = node;
                }}
              >
                <PopoverFocusTrapper ref={firstFocusableItemRef} />
                {popoverContent}
                <PopoverFocusTrapper ref={lastFocusableItemRef} />
              </div>
            )}
          </ClientPortal>
        </div>
      </>
    </PopoverContext.Provider>
  );

  if (isNested) {
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
};

Popover.Content = PopoverContent;
Popover.Trigger = PopoverTrigger;

export default Popover;
