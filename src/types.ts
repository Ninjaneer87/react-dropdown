import { ComponentPropsWithRef, ElementType } from 'react';

// !Popover types
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

// !Dropdown types
export type DropdownProps = {
  shouldCloseOnSelection?: boolean;
  caret?: React.ReactNode;
  showCaret?: boolean;
} & Omit<
  PopoverProps,
  'content' | 'delayShow' | 'delayHide' | 'hoverableContent'
>;

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
  isStickyTitle?: boolean;
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

// !Select types
export type SelectProps<T extends OptionItem> = {
  onSelectionChange: OnSelectionChange<T>;
  multiple?: boolean;
  caret?: React.ReactNode;
  showCaret?: boolean;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  items?: T[];
  placeholder?: string;
  value?: T[];
  defaultValue?: T[];
  renderOption?: (option: T) => React.ReactNode;
  renderValue?: (items: T[]) => React.ReactNode;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
} & Omit<
  PopoverProps,
  | 'content'
  | 'delayShow'
  | 'delayHide'
  | 'hoverableContent'
  | 'isChild'
  | 'openOnHover'
  | 'children'
>;

export type SelectItemProps<T extends OptionItem> = {
  children: React.ReactNode;
  isHighlighted?: boolean;
  shouldCloseOnSelection?: boolean;
  showDisabledStyles?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
} & T;

export type SelectTriggerProps = {
  children: React.ReactNode;
};

export type SelectSectionProps = {
  children: React.ReactNode;
  title?: React.ReactNode;
  isStickyTitle?: boolean;
};

export type SelectCompositionProps<T extends OptionItem> = {
  /**
   * SelectSection groups SelectItem components.
   */
  Section?: React.FC<SelectSectionProps>;
  /**
   * SelectItem is a clickable element that triggers the selection.
   */
  Item?: React.FC<SelectItemProps<T>>;
  /**
   * SelectDivider is a visual separator between sections.
   */
  Divider?: React.FC;
};

export type OptionItem = {
  value: string | number;
  label: string | number;
  description?: string;
  disabled?: boolean;
};

export type OnSelectionChange<T extends OptionItem> = (value: {
  selectedOption: T;
  selectedOptions: T[];
}) => void;
