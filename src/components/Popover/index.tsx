import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { PopoverContext } from '../../context/PopoverContext';
import PopoverTrigger from './PopoverTrigger';
import { PopoverComposition, PopoverProps } from '../../types';
import { useDelayUnmount } from '../../hooks/useDelayUnmount';
import PopoverContent from './PopoverContent';
import {
  createPositionFromPlacement,
  Coords,
  buildPlacement,
} from '../../utils/common';
import ClientPortal from '../ClientPortal';
import { useWindowResize } from '../../hooks/useWindowResize';
import useFocusTrap from '../../hooks/useFocusTrap';
import FocusTrapper from '../FocusTrapper';
import {
  PopoverRootContext,
  usePopoverRootContext,
} from '../../context/PopoverRootContext';
import usePreventBodyScroll from '../../hooks/usePreventBodyScroll';

const Popover = ({
  children,
  trigger,
  shouldBlockScroll = true,
  shouldCloseOnScroll = !shouldBlockScroll,
  shouldCloseOnBlur = true,
  shouldCloseOnEsc = true,
  backdrop,
  isChild = false,
  placement = isChild ? 'right-start' : 'bottom-center',
  // showArrow = false,
  isDisabled,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onBlur,
  onToggle,
  openOnHover = isChild,
  fullWidth = false,
  focusTriggerOnClose = true,
}: PopoverProps & PopoverComposition) => {
  const popoverMenuRef = useRef<HTMLDivElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);
  const popoverRootContext = usePopoverRootContext();
  const { isRootOpen } = popoverRootContext || {};

  const [isOpen, setIsOpen] = useState(false);
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  const [popoverContentCoords, setPopoverContentCoords] = useState<Coords>({});
  const open = controlledIsOpen ?? isOpen;
  const isExpanded = open || isHoverOpen;

  const isMounted = useDelayUnmount(isExpanded, 150);

  const isRootExpanded = isExpanded && (!popoverRootContext || !!isRootOpen);

  let popoverTrigger: ReactNode | null = trigger ?? null;
  let popoverContent: ReactNode | null = null;

  const { firstFocusableItemRef, focusContainerRef, lastFocusableItemRef } =
    useFocusTrap(open);

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
          throw new Error('Popover component can have only one PopoverContent');
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

  useWindowResize(setMenuCoords);
  usePreventBodyScroll(isRootExpanded && shouldBlockScroll);

  // Handle onOpen
  useEffect(() => {
    if (!isOpen || !onOpen) return;

    onOpen();
  }, [isOpen]);

  // Handle onBlur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isDisabled) return;
      if (!isExpanded) return;

      const hasPopoverParent = (event.target as Element)?.closest(
        '[data-popover-menu]',
      );

      if (!hasPopoverParent) {
        if (onBlur) onBlur();
        if (shouldCloseOnBlur) handleClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onBlur, shouldCloseOnBlur]);

  // Handle position and scroll
  useEffect(() => {
    if (isRootExpanded) {
      setMenuCoords();
    }

    function handleScroll() {
      if (shouldCloseOnScroll) handleClose();

      if (!isRootExpanded) return;
      setMenuCoords();
    }

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isRootExpanded, shouldCloseOnScroll]);

  // Handle onClose
  function handleClose() {
    if (isDisabled) return;

    if (onClose) {
      onClose();
    }

    setIsOpen(false);
    setIsHoverOpen(false);

    if (focusTriggerOnClose) {
      popoverTriggerRef.current?.focus();
    }
  }

  // Handle onToggle
  function handleToggle() {
    if (isDisabled) return;

    if (onToggle) {
      onToggle(!open);
    }

    setIsOpen((prev) => !prev);
  }

  function setMenuCoords() {
    if (!popoverTriggerRef.current || !popoverMenuRef.current) return;

    const triggerRect = popoverTriggerRef.current.getBoundingClientRect();
    const popoverRect = popoverMenuRef.current?.getBoundingClientRect();
    const fitPlacement = buildPlacement(placement, triggerRect, popoverRect);
    const coords = createPositionFromPlacement(fitPlacement, triggerRect);

    setPopoverContentCoords(coords);
  }

  function handleBackdropClick() {
    if (shouldCloseOnBlur) {
      handleClose();
    }
  }

  function onTriggerKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
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
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  const popoverJSX = (
    <PopoverContext.Provider value={{ isOpen: isExpanded, handleClose }}>
      <>
        <ClientPortal>
          {isMounted && !!backdrop && (
            <div
              className={`fixed z-0 inset-0 ${
                backdrop !== 'transparent' ? 'bg-black/10' : ''
              } ${backdrop === 'blur' ? 'backdrop-blur-xs' : ''} ${
                isRootExpanded ? 'fade-in' : 'fade-out'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleBackdropClick();
              }}
            />
          )}
        </ClientPortal>

        <div
          className={`relative ${fullWidth || isChild ? 'w-full' : 'w-fit'}`}
          onKeyDown={onPopoverKeyDown}
          onScroll={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          {...(openOnHover && {
            onMouseEnter: () => setIsHoverOpen(true),
            onMouseLeave: () => setIsHoverOpen(false),
          })}
        >
          <div
            onClick={handleToggle}
            tabIndex={isChild ? -1 : 0}
            onKeyDown={onTriggerKeyDown}
            className="flex items-center gap-2 cursor-pointer grow w-full"
            ref={popoverTriggerRef}
          >
            {popoverTrigger}
          </div>

          <ClientPortal>
            {(isMounted || isExpanded) && (
              <div
                data-popover-menu
                className={`fixed z-10 ${
                  isRootExpanded ? 'scale-in' : 'scale-out'
                } transition-opacity`}
                style={popoverContentCoords}
                ref={(node) => {
                  if (!node) return;

                  popoverMenuRef.current = node;
                  focusContainerRef.current = node;
                }}
              >
                <FocusTrapper ref={firstFocusableItemRef} />
                {popoverContent}
                <FocusTrapper ref={lastFocusableItemRef} />
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
      value={{ isRootOpen: isExpanded, handleCloseRoot: handleClose }}
    >
      {popoverJSX}
    </PopoverRootContext.Provider>
  );
};

Popover.Content = PopoverContent;
Popover.Trigger = PopoverTrigger;

export default Popover;
