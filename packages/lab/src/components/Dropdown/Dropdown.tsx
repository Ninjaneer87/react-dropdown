'use client';

import React, { ReactNode, useState } from 'react';
import { DropdownContext } from '../../context/DropdownContext';
import DropdownMenu from './DropdownMenu';
import DropdownHeader from './DropdownHeader';
import DropdownFooter from './DropdownFooter';
import DropdownSection from './DropdownSection';
import DropdownItem from './DropdownItem';
import DropdownTrigger from './DropdownTrigger';
import DropdownDivider from './DropdownDivider';
import { DropdownComposition, DropdownProps } from '../../types';
import Popover from '../Popover/Popover';
import { defaultChildCaret, defaultRootCaret } from '../../utils/elements';
import { Slot } from '@/components/utility/Slot';
import { cn } from '@/utils/common';

const Dropdown = ({
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
  isNested = false,
  placement = isNested ? 'right-start' : 'bottom-center',
  showCaret = isNested,
  openOnHover = isNested,
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
}: DropdownProps & DropdownComposition) => {
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
    ? (caret ?? (isNested ? defaultChildCaret : defaultRootCaret))
    : null;

  const popoverContentClassName = 'text-[0.875rem]';
  const popoverClassNames = {
    ...classNames?.popover,
    content: cn(popoverContentClassName, classNames?.popover?.content),
  };

  const dropdownJSX = (
    <Popover
      openOnHover={openOnHover}
      isNested={isNested}
      delayHide={isNested || openOnHover ? 300 : 0}
      delayShow={isNested || openOnHover ? 100 : 0}
      shouldFlip={shouldFlip}
      shouldBlockScroll={shouldBlockScroll}
      shouldCloseOnScroll={shouldCloseOnScroll}
      shouldCloseOnClickOutside={shouldCloseOnClickOutside}
      shouldCloseOnEsc={shouldCloseOnEsc}
      backdrop={backdrop}
      focusTriggerOnClose
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
      onClickOutside={() => {
        if (onClickOutside) onClickOutside();
      }}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
        if (onOpenChange) onOpenChange(isOpen);
      }}
    >
      <Popover.Trigger data-dropdown-trigger aria-haspopup="menu">
        {isNested ? (
          <Slot
            shouldCloseOnSelection={false}
            isHighlighted={isOpen}
            endContent={triggerCaretContent}
            disabled={isDisabled}
          >
            {dropdownTrigger}
          </Slot>
        ) : (
          dropdownTrigger
        )}
      </Popover.Trigger>

      <Popover.Content data-dropdown-content>{dropdownMenu}</Popover.Content>
    </Popover>
  );

  return (
    <DropdownContext.Provider
      value={{ shouldCloseOnSelection, autoFocus, classNames }}
    >
      {dropdownJSX}
    </DropdownContext.Provider>
  );
};

Dropdown.Menu = DropdownMenu;
Dropdown.Header = DropdownHeader;
Dropdown.Footer = DropdownFooter;
Dropdown.Section = DropdownSection;
Dropdown.Item = DropdownItem;
Dropdown.Trigger = DropdownTrigger;
Dropdown.Divider = DropdownDivider;

export default Dropdown;
