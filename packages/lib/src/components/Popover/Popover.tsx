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
  isChild = false,
  placement = isChild ? 'right-start' : 'bottom-center',
  offset = 8,
  // showArrow = false,
  isDisabled,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onBlur,
  onOpenChange,
  openOnHover = isChild,
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
  focusableTrigger = true,
}: PopoverProps & PopoverComposition) => {
  const { autoFocus, trapFocus } = focusTrapProps;
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);
  const showDelayRef = useRef<NodeJS.Timeout | null>(null);
  const hideDelayRef = useRef<NodeJS.Timeout | null>(null);

  const popoverRootContext = usePopoverRootContext();
  const { isRootOpen, rootPopoverId } = popoverRootContext || {};
  const isRootPopover = !popoverRootContext;
  const popoverId = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  const [popoverContentCoords, setPopoverContentCoords] = useState<Coords>({});
  const open = controlledIsOpen ?? isOpen;
  const isExpanded = open || isHoverOpen;
  const contentOffset = isChild ? offset + 8 : offset;

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
    if (
      !isRootExpanded ||
      !popoverTriggerRef.current ||
      !popoverContentRef.current
    )
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
      contentOffset,
      triggerRect,
      popoverContentRef.current,
    );

    setPopoverContentCoords(coords);
  }, [
    contentOffset,
    placement,
    offset,
    shouldFlip,
    growContent,
    isRootExpanded,
  ]);

  // Handle onClose
  const handleClose = useCallback(
    (focusTrigger = focusTriggerOnClose) => {
      if (isDisabled) return;

      if (onClose) {
        onClose();
      }

      setIsOpen(false);
      setIsHoverOpen(false);
      onOpenChange?.(false);

      if (focusTrigger) {
        popoverTriggerRef.current?.focus();
      }
    },
    [isDisabled, onClose, focusTriggerOnClose, onOpenChange],
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

  // Handle onBlur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isDisabled) return;
      if (!isExpanded) return;

      const isPopoverTrigger = !!(event.target as Element).closest(
        `[data-popover-trigger="${popoverId}"]`,
      );
      const isPopoverContent = !!(event.target as Element).closest(
        `[data-popover-content="${popoverId}"]`,
      );
      if (isRootPopover && !isPopoverTrigger && !isPopoverContent) {
        if (onBlur) onBlur();
        if (shouldCloseOnBlur) handleClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [
    shouldCloseOnBlur,
    isExpanded,
    isDisabled,
    handleClose,
    onBlur,
    popoverId,
    isRootPopover,
  ]);

  // Handle position and scroll
  useEffect(() => {
    if (isRootExpanded) {
      setContentCoords();
    }
  }, [isRootExpanded, setContentCoords]);

  useEffect(() => {
    function handleScroll() {
      if (!isRootExpanded) return;

      if (shouldCloseOnScroll) handleClose();
      setContentCoords();
    }

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isRootExpanded, shouldCloseOnScroll, handleClose, setContentCoords]);

  // Handle onOpenChange
  function handleToggle() {
    if (isDisabled) return;

    if (onOpenChange) {
      onOpenChange(!open);
    }

    if (open) {
      handleClose();
      return;
    }

    onOpen?.();

    setIsOpen((prev) => !prev);
  }

  const handleOpen = useCallback(() => {
    if (isDisabled || open) return;

    if (onOpenChange) onOpenChange(true);
    if (onOpen) onOpen();
    setIsOpen(true);
  }, [isDisabled, onOpen, onOpenChange, open]);

  function handleBackdropClick() {
    if (shouldCloseOnBlur) {
      handleClose();
    }
  }

  function onTriggerKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (
      event.key === 'Enter'
      // || event.key === ' '
    ) {
      event.preventDefault();
      handleToggle();
    }

    if (event.key === 'Escape' && shouldCloseOnEsc) {
      handleClose();
    }
  }

  function onPopoverKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape' && shouldCloseOnEsc) {
      handleClose();
    }
  }

  function handleMouseEnter() {
    if (isDisabled) return;

    if (showDelayRef.current) clearTimeout(showDelayRef.current);
    if (hideDelayRef.current) clearTimeout(hideDelayRef.current);

    showDelayRef.current = setTimeout(() => {
      setIsHoverOpen(true);

      if (isRootPopover && openOnHover) onOpen?.();
    }, delayShow);
  }

  function handleMouseLeave() {
    if (isDisabled) return;

    if (showDelayRef.current) clearTimeout(showDelayRef.current);
    if (hideDelayRef.current) clearTimeout(hideDelayRef.current);

    hideDelayRef.current = setTimeout(() => {
      setIsHoverOpen(false);

      if (isRootPopover && openOnHover) onClose?.();

      if (focusTriggerOnClose) {
        popoverTriggerRef.current?.focus({ preventScroll: true });
      }
    }, delayHide);
  }

  const baseClassName = cn(
    'relative',
    fullWidth || isChild ? 'w-full' : 'w-fit',
  );
  const triggerClassName = cn(
    'flex items-center gap-2',
    !isDisabled ? 'cursor-pointer' : '',
    'grow w-full',
  );
  const contentClassName = cn(
    'fixed z-10',
    isRootExpanded ? 'scale-in' : 'scale-out',
    'transition-opacity p-2 bg-white text-gray-800 rounded-lg',
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
          onKeyDown={onPopoverKeyDown}
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
          <div
            onClick={handleToggle}
            data-popover-trigger={rootPopoverId ?? popoverId}
            data-trigger-open={isExpanded}
            tabIndex={!focusableTrigger || isChild || isDisabled ? -1 : 0}
            onKeyDown={onTriggerKeyDown}
            className={cn(triggerClassName, classNames?.trigger)}
            ref={popoverTriggerRef}
            {...(openOnHover &&
              !hoverableContent && {
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
              })}
          >
            {popoverTrigger}
          </div>

          <ClientPortal>
            {(isMounted || isExpanded) && (
              <div
                data-popover-content={rootPopoverId ?? popoverId}
                className={cn(contentClassName, classNames?.content)}
                style={popoverContentCoords}
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

  if (isChild) {
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
