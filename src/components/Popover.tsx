import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PopoverContext } from '../context/PopoverContext';
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
  placement = 'bottom-center',
  // showArrow = false,
  isDisabled,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onBlur,
  onToggle,
  isChild = false,
  openOnHover = isChild,
  fullWidth = false,
}: PopoverProps & PopoverComposition) => {
  const popoverMenuRef = useRef<HTMLDivElement>(null);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  const [popoverContentCoords, setPopoverContentCoords] = useState<Coords>({});
  const open = controlledIsOpen ?? isOpen;
  const isExpanded = open || isHoverOpen;

  const isMounted = useDelayUnmount(isExpanded, 500);

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

  // Handle onClose
  const handleClose = useCallback(() => {
    if (isDisabled) return;

    if (onClose) {
      onClose();
    }

    setIsOpen(false);
    setIsHoverOpen(false);
  }, [isDisabled]);

  // Handle position and scroll
  useEffect(() => {
    if (isExpanded) {
      setMenuCoords();

      if (shouldBlockScroll) {
        document.body.style.overflow = 'hidden';
      }
    }

    function handleScroll() {
      if (shouldCloseOnScroll) handleClose();

      if (!isExpanded) return;
      setMenuCoords();
    }
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);

      if (isExpanded && shouldBlockScroll) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [isExpanded, shouldBlockScroll, shouldCloseOnScroll, handleClose]);

  function setMenuCoords() {
    if (!popoverTriggerRef.current || !popoverMenuRef.current) return;

    const triggerRect = popoverTriggerRef.current.getBoundingClientRect();
    const popoverRect = popoverMenuRef.current?.getBoundingClientRect();
    const fitPlacement = buildPlacement(placement, triggerRect, popoverRect);
    const rootCoords = createPositionFromPlacement(fitPlacement, triggerRect);
    const childCoords = createChildPositionFromPlacement(
      fitPlacement,
      triggerRect,
    );

    setPopoverContentCoords(isChild ? childCoords : rootCoords);
  }

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
      <ClientPortal>
        {isMounted && !!backdrop && !openOnHover && !isChild && (
          <div
            className={`fixed z-0 inset-0 ${
              backdrop !== 'transparent' ? 'bg-black/10' : ''
            } ${backdrop === 'blur' ? 'backdrop-blur-xs' : ''} ${
              isExpanded ? 'fade-in' : 'fade-out'
            }`}
            onClick={handleBackdropClick}
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
          tabIndex={0}
          onKeyDown={onTriggerKeyDown}
          className="flex items-center gap-2 cursor-pointer grow w-full"
          ref={popoverTriggerRef}
        >
          {popoverTrigger}
        </div>

        <ClientPortal>
          {(isMounted || isExpanded) && (
            <div
              className={`popover-menu fixed z-10 ${
                isExpanded ? 'scale-in' : 'scale-out'
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

  if (isChild) {
    return popoverJSX;
  }

  return (
    <PopoverContext.Provider value={{ isOpen: isExpanded, handleClose }}>
      {popoverJSX}
    </PopoverContext.Provider>
  );
};

Popover.Content = PopoverContent;
Popover.Trigger = PopoverTrigger;

export default Popover;
