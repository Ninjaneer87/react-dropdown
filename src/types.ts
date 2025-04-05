import { ComponentPropsWithRef, ElementType } from 'react';

export type PopoverPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end';

export type Backdrop = 'transparent' | 'opaque' | 'blur';

export type PopoverProps = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  shouldBlockScroll?: boolean;
  shouldCloseOnBlur?: boolean;
  shouldCloseOnEsc?: boolean;
  shouldCloseOnScroll?: boolean;
  backdrop?: Backdrop;
  placement?: PopoverPlacement;
  isDisabled?: boolean;
  isOpen?: boolean;
  showArrow?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onBlur?: () => void;
  onToggle?: (isOpen: boolean) => void;
};

export type PopoverTriggerProps = {
  children: React.ReactNode;
};

export type PopoverContentProps = {
  children: React.ReactNode;
};

export type PopoverComposition = {
  /**
   *  The component that triggers the popover
   */
  Trigger?: React.FC<PopoverTriggerProps>;

  /**
   * The component that contains the popover content.
   */
  Content?: React.FC<PopoverContentProps>;
};

export type DropdownProps = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  shouldBlockScroll?: boolean;
  shouldCloseOnBlur?: boolean;
  shouldCloseOnEsc?: boolean;
  shouldCloseOnScroll?: boolean;
  shouldCloseOnSelection?: boolean;
  backdrop?: 'transparent' | 'opaque' | 'blur';
  placement?: PopoverPlacement;
  isDisabled?: boolean;
  caret?: React.ReactNode;
  isOpen?: boolean;
  showCaret?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onBlur?: () => void;
  onToggle?: (isOpen: boolean) => void;
};

export type DropdownMenuProps = {
  children: React.ReactNode;
  isOpen?: boolean;
};

export type DropdownHeaderProps = {
  children: React.ReactNode;
  isSticky?: boolean;
};

export type DropdownFooterProps = {
  children: React.ReactNode;
  isSticky?: boolean;
};

export type DropdownSectionProps = {
  children: React.ReactNode;
  scrolling?: boolean;
};

export type DropdownItemProps<T extends ElementType = 'div'> = {
  children: React.ReactNode;
  isHighlighted?: boolean;
  shouldCloseOnSelection?: boolean;
  as?: T;
} & Omit<ComponentPropsWithRef<T>, 'children'>;

export type DropdownTriggerProps = {
  children: React.ReactNode;
};

export type DropdownComposition = {
  /**
   * DropdownMenu is a container for DropdownSection and DropdownItem components.
   */
  Menu?: React.FC<DropdownMenuProps>;
  /**
   * DropdownHeader is a non-clickable element that provides context for the Dropdown.
   */
  Header?: React.FC<DropdownHeaderProps>;
  /**
   * DropdownFooter provides bottom space, usually used for actions.
   */
  Footer?: React.FC<DropdownFooterProps>;
  /**
   * DropdownSection groups DropdownItem components.
   */
  Section?: React.FC<DropdownSectionProps>;
  /**
   * DropdownItem is a clickable element that triggers an action.
   */
  Item?: React.FC<DropdownItemProps>;
  /**
   * DropdownTrigger is a clickable element that toggles the dropdown.
   */
  Trigger?: React.FC<DropdownTriggerProps>;

  /**
   * DropdownDivider is a visual separator between sections.
   */
  Divider?: React.FC;
};
