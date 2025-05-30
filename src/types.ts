import { ComponentPropsWithRef, ElementType } from 'react';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlign = 'start' | 'end' | 'center';
export type PopoverPlacement = `${PopoverPosition}-${PopoverAlign}`;

export type Backdrop = 'transparent' | 'opaque' | 'blur';

export type PopoverProps = {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  shouldFlip?: boolean;
  shouldBlockScroll?: boolean;
  shouldCloseOnBlur?: boolean;
  shouldCloseOnEsc?: boolean;
  shouldCloseOnScroll?: boolean;
  backdrop?: Backdrop;
  placement?: PopoverPlacement;
  offset?: number;
  isDisabled?: boolean;
  isOpen?: boolean;
  showArrow?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onBlur?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  isChild?: boolean;
  fullWidth?: boolean;
  openOnHover?: boolean;
  focusTriggerOnClose?: boolean;
  delayShow?: number;
  delayHide?: number;
  hoverableContent?: boolean;
  growContent?: boolean;
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
  shouldCloseOnSelection?: boolean;
  caret?: React.ReactNode;
  showCaret?: boolean;
} & Omit<PopoverProps, 'content' | 'delayShow' | 'delayHide'>;

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
  title?: React.ReactNode;
};

export type DropdownItemProps<T extends ElementType = 'div'> = {
  children: React.ReactNode;
  isHighlighted?: boolean;
  shouldCloseOnSelection?: boolean;
  disabled?: boolean;
  showDisabledStyles?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
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
