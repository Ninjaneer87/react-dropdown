import React, { ReactNode, useState } from 'react';
import { DropdownContext } from '../context/DropdownContext';
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
// const defaultChildCaret = <span className="shrink-0 text-2xl">&#9656;</span>;

const Dropdown = ({
  caret,
  children,
  trigger,
  shouldBlockScroll = true,
  shouldCloseOnScroll = !shouldBlockScroll,
  shouldCloseOnBlur = true,
  shouldCloseOnEsc = true,
  shouldCloseOnSelection = true,
  backdrop = 'blur',
  placement = 'bottom-center',
  showCaret = false,
  isDisabled,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onBlur,
  onToggle,
  isChild = false,
  fullWidth = false,
  openOnHover,
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

  const dropdownJSX = (
    <Popover
      openOnHover={openOnHover}
      isChild={isChild}
      fullWidth={fullWidth}
      shouldBlockScroll={!isChild && shouldBlockScroll}
      shouldCloseOnScroll={!isChild && shouldCloseOnScroll}
      shouldCloseOnBlur={!isChild && shouldCloseOnBlur}
      shouldCloseOnEsc={!isChild && shouldCloseOnEsc}
      backdrop={isChild ? undefined : backdrop}
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
  );

  if (isChild) {
    return dropdownJSX;
  }

  return (
    <DropdownContext.Provider value={{ shouldCloseOnSelection }}>
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
