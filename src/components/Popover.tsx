import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PopoverContext, usePopoverContext } from '../context/PopoverContext';
import PopoverTrigger from './PopoverTrigger';
import { PopoverComposition, PopoverProps } from '../types';
import { useDelayUnmount } from '../hooks/useDelayUnmount';
import PopoverContent from './PopoverContent';
import {
  createPositionFromPlacement,
  Coords,
  createChildPositionFromPlacement,
  buildPlacement,
} from '../utils/common';
import ClientPortal from './ClientPortal';

const Popover = ({
  children,
  trigger,
  shouldBlockScroll = true,
  shouldCloseOnScroll = !shouldBlockScroll,
  shouldCloseOnBlur = true,
  shouldCloseOnEsc = true,
  backdrop,
  placement = 'bottom',
  // showArrow = false,
  isDisabled,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onBlur,
  onToggle,
}: PopoverProps & PopoverComposition) => {
  const popoverContext = usePopoverContext();
  const isChildPopover = popoverContext !== null;
  const popoverMenuRef = useRef<HTMLDivElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [popoverContentCoords, setPopoverContentCoords] = useState<Coords>({});
  const open = controlledIsOpen ?? isOpen;

  const isMounted = useDelayUnmount(open, 500);

  let popoverTrigger: ReactNode | null = trigger ?? null;
  let popoverContent: ReactNode | null = null;

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

  // Handle onOpen
  useEffect(() => {
    if (!isOpen || !onOpen) return;

    onOpen();
  }, [isOpen]);

  // Handle onBlur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const hasPopoverParent = (event.target as Element)?.closest(
        '.popover-menu',
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

  const handleClose = useCallback(() => {
    if (isDisabled) return;

    if (onClose) {
      onClose();
    }

    setIsOpen(false);
  }, [isDisabled]);

  const setMenuCoords = () => {
    if (!popoverTriggerRef.current || !popoverMenuRef.current) return;

    const triggerRect = popoverTriggerRef.current.getBoundingClientRect();
    const popoverRect = popoverMenuRef.current?.getBoundingClientRect();
    const fitPlacement = buildPlacement(placement, triggerRect, popoverRect);
    const rootCoords = createPositionFromPlacement(fitPlacement, triggerRect);
    const childCoords = createChildPositionFromPlacement(
      fitPlacement,
      triggerRect,
    );

    setPopoverContentCoords(isChildPopover ? childCoords : rootCoords);
  };

  // Handle position and scroll
  useEffect(() => {
    if (open) {
      setMenuCoords();

      if (shouldBlockScroll) {
        document.body.style.overflow = 'hidden';
      }
    }

    function handleScroll() {
      if (shouldCloseOnScroll) handleClose();

      if (!open) return;
      setMenuCoords();
    }
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);

      if (open && shouldBlockScroll) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [open, shouldBlockScroll, shouldCloseOnScroll, handleClose]);

  function handleToggle() {
    if (isDisabled) return;

    if (onToggle) {
      onToggle(!open);
    }

    setIsOpen(!isOpen);
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
    <>
      {isMounted && !!backdrop && !isChildPopover && (
        <div
          className={`fixed inset-0 ${
            backdrop !== 'transparent' ? 'bg-black/10' : ''
          } ${backdrop === 'blur' ? 'backdrop-blur-sm' : ''} ${
            open ? 'fade-in' : 'fade-out'
          }`}
          onClick={handleBackdropClick}
        />
      )}

      <div
        className={`relative ${isChildPopover ? 'w-full' : 'w-fit'}`}
        onKeyDown={onPopoverKeyDown}
        onScroll={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div
          onClick={handleToggle}
          tabIndex={0}
          onKeyDown={onTriggerKeyDown}
          className="flex items-center gap-2 cursor-pointer grow w-full"
          ref={popoverTriggerRef}
        >
          {popoverTrigger}
        </div>

        <ClientPortal>
          {(isMounted || open) && (
            <div
              className={`popover-menu fixed ${
                open ? 'scale-in' : 'scale-out'
              } transition-opacity`}
              style={popoverContentCoords}
              ref={popoverMenuRef}
            >
              {popoverContent}
            </div>
          )}
        </ClientPortal>
      </div>
    </>
  );

  if (isChildPopover) {
    return popoverJSX;
  }

  return (
    <PopoverContext.Provider value={{ isOpen: open, handleClose }}>
      {popoverJSX}
    </PopoverContext.Provider>
  );
};

Popover.Content = PopoverContent;
Popover.Trigger = PopoverTrigger;

export default Popover;
