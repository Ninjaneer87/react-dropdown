import React, { ReactNode, useRef, useState } from 'react';
import {
  DropdownContext,
  useDropdownContext,
} from '../context/DropdownContext';
import DropdownMenu from './DropdownMenu';
import DropdownHeader from './DropdownHeader';
import DropdownFooter from './DropdownFooter';
import DropdownSection from './DropdownSection';
import DropdownItem from './DropdownItem';
import DropdownTrigger from './DropdownTrigger';
import DropdownDivider from './DropdownDivider';
import { DropdownComposition, DropdownProps } from '../types';
import Popover from './Popover';

const defaultRootCaret = <span className="shrink-0 text-2xl">&#9662;</span>;
const defaultChildCaret = <span className="shrink-0 text-2xl">&#9656;</span>;

const Dropdown = ({
  children,
  trigger,
  shouldBlockScroll = true,
  shouldCloseOnScroll = !shouldBlockScroll,
  shouldCloseOnBlur = true,
  shouldCloseOnEsc = true,
  shouldCloseOnSelection = true,
  backdrop = 'blur',
  placement = 'bottom',
  showCaret = false,
  caret,
  isDisabled,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onBlur,
  onToggle,
}: DropdownProps & DropdownComposition) => {
  const dropdownContext = useDropdownContext();
  const isRootDropdown = dropdownContext === null;

  const childDropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isHoverOpen, setIsHoverOpen] = useState(false);

  const open = controlledIsOpen ?? isOpen;
  const isExpanded = open || isHoverOpen;

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

  // Root dropdown
  if (isRootDropdown) {
    return (
      <DropdownContext.Provider value={{ shouldCloseOnSelection }}>
        <Popover
          shouldBlockScroll={shouldBlockScroll}
          shouldCloseOnScroll={shouldCloseOnScroll}
          shouldCloseOnBlur={shouldCloseOnBlur}
          shouldCloseOnEsc={shouldCloseOnEsc}
          backdrop={backdrop}
          placement={placement}
          isDisabled={isDisabled}
          isOpen={open}
          onOpen={() => {
            setIsOpen(true);
            if (onOpen) onOpen();
          }}
          onClose={() => {
            setIsOpen(false);
            if (onClose) onClose();
          }}
          onBlur={() => {
            if (onBlur) onBlur();
          }}
          onToggle={(isOpen) => {
            setIsOpen(isOpen);
            if (onToggle) onToggle(isOpen);
          }}
        >
          <Popover.Trigger>
            {dropdownTrigger} {showCaret && (caret ?? defaultRootCaret)}
          </Popover.Trigger>

          <Popover.Content>{dropdownMenu}</Popover.Content>
        </Popover>
      </DropdownContext.Provider>
    );
  }

  // Nested dropdown
  return (
    <div
      onMouseEnter={() => setIsHoverOpen(true)}
      onMouseLeave={() => setIsHoverOpen(false)}
      className="relative w-full"
      ref={childDropdownRef}
    >
      <Popover
        shouldBlockScroll={false}
        shouldCloseOnScroll={false}
        shouldCloseOnBlur={false}
        shouldCloseOnEsc={false}
        placement={placement}
        isDisabled={isDisabled}
        isOpen={isExpanded}
        onOpen={() => {
          setIsOpen(true);
          if (onOpen) onOpen();
        }}
        onClose={() => {
          setIsOpen(false);
          if (onClose) onClose();
        }}
        onBlur={() => {
          if (onBlur) onBlur();
        }}
        onToggle={(isOpen) => {
          setIsOpen(isOpen);
          if (onToggle) onToggle(isOpen);
        }}
      >
        <Popover.Trigger>
          <Dropdown.Item
            isHighlighted={isExpanded}
            shouldCloseOnSelection={false}
          >
            {dropdownTrigger} {showCaret && (caret ?? defaultChildCaret)}
          </Dropdown.Item>
        </Popover.Trigger>

        <Popover.Content>{dropdownMenu}</Popover.Content>
      </Popover>
    </div>
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
