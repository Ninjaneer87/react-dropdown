'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { DropdownContext } from '@/context/DropdownContext';
import DropdownMenu from '@/components/Dropdown/DropdownMenu';
import DropdownHeader from '@/components/Dropdown/DropdownHeader';
import DropdownFooter from '@/components/Dropdown/DropdownFooter';
import DropdownSection from '@/components/Dropdown/DropdownSection';
import DropdownItem from '@/components/Dropdown/DropdownItem';
import DropdownTrigger from '@/components/Dropdown/DropdownTrigger';
import DropdownDivider from '@/components/Dropdown/DropdownDivider';
import { DropdownComposition, DropdownProps } from '@/types';
import Popover from '@/components/Popover/Popover';
import { defaultChildCaret, defaultRootCaret } from '@/utils/elements';
import { Slot } from '@/components/utility/Slot';
import { cn } from '@/utils/common';
import {
  DropdownRootContext,
  useDropdownRootContext,
} from '@/context/DropdownRootContext';

const Dropdown = (props: DropdownProps & DropdownComposition) => {
  const dropdownRootContext = useDropdownRootContext();
  const isRootDropdown = !dropdownRootContext;
  const triggerRef = useRef<HTMLDivElement>(null);

  const { isRootOpen } = dropdownRootContext || {};

  const {
    caret,
    children,
    trigger,
    shouldFlip = true,
    shouldBlockScroll = true,
    shouldCloseOnScroll = !shouldBlockScroll,
    shouldCloseOnClickOutside = true,
    shouldCloseOnEsc = true,
    shouldCloseOnSelection = true,
    backdrop,
    isDisabled,
    isOpen: controlledIsOpen,
    onOpen,
    onClose,
    onClickOutside,
    onTriggerFocus,
    onTriggerBlur,
    onOpenChange,
    placement = !isRootDropdown ? 'right-start' : 'bottom-center',
    showCaret = !isRootDropdown,
    openOnHover = !isRootDropdown,
    growContent,
    offset,
    showArrow = false,
    autoFocus = 'menu',
    focusTrapProps = {
      autoFocus: autoFocus === 'none',
      trapFocus: true,
    },
    classNames,
    triggerWrapper,
    fullWidthTriggerWrapper,
    focusTriggerOnClose = true,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const open = controlledIsOpen ?? isOpen;

  let dropdownTrigger: ReactNode | null = trigger ?? null;
  let dropdownMenu: ReactNode | null = null;

  // Validate children
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    switch (child.type) {
      case DropdownTrigger: {
        if (dropdownTrigger) {
          throw new Error(
            'Dropdown component can have only one DropdownTrigger or a "trigger" prop, not both',
          );
        }

        dropdownTrigger = child;
        break;
      }

      case DropdownMenu: {
        if (dropdownMenu) {
          throw new Error('Dropdown component can have only one DropdownMenu');
        }

        dropdownMenu = child;
        break;
      }

      default: {
        throw new Error(
          `Dropdown component only accepts DropdownTrigger and DropdownMenu components as children`,
        );
      }
    }
  });

  if (!dropdownTrigger) {
    throw new Error(
      'Dropdown component requires a DropdownTrigger or a "trigger" prop',
    );
  }

  if (!dropdownMenu) {
    throw new Error('Dropdown component requires a DropdownMenu');
  }

  const triggerCaretContent = showCaret
    ? (caret ?? (isRootDropdown ? defaultRootCaret : defaultChildCaret))
    : null;

  const popoverContentClassName = 'text-[0.875rem]';
  const popoverClassNames = {
    ...classNames?.popover,
    content: cn(popoverContentClassName, classNames?.popover?.content),
  };

  // Close all child dropdowns when root closes
  useEffect(() => {
    if (!isRootDropdown && !isRootOpen) {
      setIsOpen(false);
    }
  }, [isRootOpen, isRootDropdown]);

  const dropdownJSX = (
    <DropdownContext.Provider
      value={{
        shouldCloseOnSelection,
        autoFocus,
        classNames,
      }}
    >
      <Popover
        openOnHover={openOnHover}
        delayHide={openOnHover ? 300 : 0}
        delayShow={openOnHover ? 100 : 0}
        shouldFlip={shouldFlip}
        shouldBlockScroll={shouldBlockScroll}
        shouldCloseOnScroll={shouldCloseOnScroll}
        shouldCloseOnClickOutside={shouldCloseOnClickOutside}
        shouldCloseOnEsc={shouldCloseOnEsc}
        backdrop={backdrop}
        focusTriggerOnClose={focusTriggerOnClose}
        placement={placement}
        isDisabled={isDisabled}
        isOpen={open}
        growContent={growContent}
        offset={offset}
        showArrow={showArrow}
        classNames={popoverClassNames}
        focusTrapProps={focusTrapProps}
        triggerWrapper={triggerWrapper}
        fullWidthTriggerWrapper={fullWidthTriggerWrapper}
        onTriggerFocus={onTriggerFocus}
        onTriggerBlur={onTriggerBlur}
        onOpen={() => {
          setIsOpen(true);
          if (onOpen) onOpen();
        }}
        onClose={() => {
          setIsOpen(false);
          if (onClose) onClose();
        }}
        onClickOutside={(event) => {
          if (onClickOutside) onClickOutside(event);
        }}
        onOpenChange={(isOpen) => {
          setIsOpen(isOpen);
          if (onOpenChange) onOpenChange(isOpen);
        }}
      >
        <Popover.Trigger
          data-dropdown-trigger
          aria-haspopup="menu"
          ref={triggerRef}
        >
          {isRootDropdown ? (
            dropdownTrigger
          ) : (
            <Slot
              shouldCloseOnSelection={false}
              isHighlighted={isOpen}
              endContent={triggerCaretContent}
              disabled={isDisabled}
            >
              {dropdownTrigger}
            </Slot>
          )}
        </Popover.Trigger>

        <Popover.Content data-dropdown-menu>{dropdownMenu}</Popover.Content>
      </Popover>
    </DropdownContext.Provider>
  );

  if (isRootDropdown) {
    return (
      <DropdownRootContext.Provider
        value={{
          handleCloseRoot: () => {
            setIsOpen(false);
            if (onClose) onClose();
            if (onOpenChange) onOpenChange(false);

            requestAnimationFrame(() => {
              if (focusTriggerOnClose) {
                triggerRef.current?.focus();
              }
            });
          },
          isRootOpen: open,
        }}
      >
        {dropdownJSX}
      </DropdownRootContext.Provider>
    );
  }

  return dropdownJSX;
};

Dropdown.Menu = DropdownMenu;
Dropdown.Header = DropdownHeader;
Dropdown.Footer = DropdownFooter;
Dropdown.Section = DropdownSection;
Dropdown.Item = DropdownItem;
Dropdown.Trigger = DropdownTrigger;
Dropdown.Divider = DropdownDivider;

export default Dropdown;
