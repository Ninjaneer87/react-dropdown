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
  classNames?: {
    base?: string;
    trigger?: string;
    backdrop?: string;
    content?: string;
  };
  focusTrapProps?: {
    trapFocus?: boolean;
    autoFocus?: boolean;
  };
  focusableTrigger?: boolean;
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
  classNames?: {
    label?: string;
    trigger?: string;
    mainWrapper?: string;
    innerWrapper?: string;
    selectorIcon?: string;
    value?: string;
    listboxWrapper?: string;
    listbox?: string;
  };
  autoFocus?: ListAutoFocus;
} & Omit<
  PopoverProps,
  'content' | 'delayShow' | 'delayHide' | 'hoverableContent' | 'classNames'
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

export type SelectTruncate = {
  /**
   * Show selected value(s) in one line only
   */
  value?: boolean;
  /**
   * Truncate item text content
   */
  itemText?: boolean;
  /**
   * Truncate item description
   */
  itemDescription?: boolean;
  /**
   * Truncate section title
   */
  sectionTitle?: boolean;
};

// !Select types

export type SelectItemClassNames = {
  /**
   * The main slot for the listbox item. It wraps all the other slots.
   */
  base?: string;
  /**
   * `startContent`, `endContent` and `children` wrapper
   */
  contentWrapper?: string;
  /**
   * Left side of the content
   */
  startContent?: string;
  /**
   * Main content of the select item
   */
  mainContent?: string;
  /**
   * Main content of the select item
   */
  textContent?: string;
  /**
   * Main content of the select item
   */
  descriptionContent?: string;
  /**
   * Right side of the content
   */
  endContent?: string;
  /**
   * The selected icon slot. This is only visible when the item is selected - `✔`
   */
  selectedIcon?: string;
};

export type SelectSectionClassNames = {
  base?: string;
  title?: string;
};

export type RenderOption<T extends OptionItem> = ({
  option,
  currentOptions,
}: {
  option: T & { isSelected?: boolean };
  currentOptions?: (T & { isSelected?: boolean })[];
}) => React.ReactNode;

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
  renderOption?: RenderOption<T>;
  renderValue?: (selectedItems: T[]) => React.ReactNode;
  children?:
    | React.ReactNode
    | ((item: T & { isSelected?: boolean }) => React.ReactNode);
  label?: React.ReactNode;
  isRequired?: boolean;
  onClose?: (selectedItems?: T[]) => void;
  openOnLabelClick?: boolean;
  shouldCloseOnSelection?: boolean;
  truncate?: SelectTruncate;
  autoFocus?: ListAutoFocus;
  search?: boolean | ((items: T[]) => T[]);
  onSearchChange?: (searchQuery: string) => void;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  noResultsMessage?: React.ReactNode;
  /**
   * Removes selected from the options list. Works only with `items` prop.
   */
  popOnSelection?: boolean;
  /**
   * Allows to set custom class names for the Select slots.
   */
  classNames?: {
    /**
     * The main wrapper of the select. This wraps the rest of the slots.
     */
    base?: string;
    /**
     * The label of the select.
     */
    label?: string;
    /**
     * The placeholder of the select.
     */
    placeholder?: string;
    /**
     * The asterisk `*` for `isRequired`.
     */
    requiredAsterisk?: string;
    /**
     * The trigger of the select. This wraps the placeholder, the value and the selector icon.
     */
    trigger?: string;
    /**
     * The wrapper of the select content. This wraps the start/end content and the select value.
     */
    innerWrapper?: string;
    /**
     * The selector icon of the select. This is the icon that rotates when the select is open (data-open).
     */
    selectorIcon?: string;
    /**
     * The select value. This is also the slot that wraps the renderValue function result.
     */
    value?: string;
    /**
     * The wrapper of `topContent`, the listbox and `endContent`.
     */
    contentWrapper?: string;
    /**
     * The wrapper of the listbox. This wraps the listbox component, this slot is used on top of the scroll shadow component.
     */
    listboxWrapper?: string;
    /**
     * The listbox component. This is the component that wraps the select items.
     */
    listbox?: string;
    /**
     * The popover content slot. Use this to modify the popover content styles.
     */
    popoverContent?: string;
    /**
     * The wrapper of the helper text. This wraps the helper text and the error message.
     */
    helperWrapper?: string;
    /**
     * The description of the select.
     */
    description?: string;
    /**
     * The error message of the select.
     */
    errorMessage?: string;
  };
  /**
   * Will apply classNames to all SelectItem-s
   */
  itemClassNames?: SelectItemClassNames;
  /**
   * Will apply classNames to all SelectSection-s
   */
  sectionClassNames?: SelectSectionClassNames;
} & Omit<
  PopoverProps,
  | 'content'
  | 'delayShow'
  | 'delayHide'
  | 'hoverableContent'
  | 'isChild'
  | 'openOnHover'
  | 'children'
  | 'classNames'
  | 'placement'
  | 'onClose'
>;

export type SelectItemProps<T extends OptionItem> = {
  children: React.ReactNode;
  shouldCloseOnSelection?: boolean;
  showDisabledStyles?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  classNames?: SelectItemClassNames;
} & T;

export type SelectTriggerProps = {
  children: React.ReactNode;
};

export type SelectSectionProps = {
  children: React.ReactNode;
  title?: React.ReactNode;
  isStickyTitle?: boolean;
  showDivider?: boolean;
  classNames?: SelectSectionClassNames;
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
  text: string;
  textContent?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};

export type OnSelectionChange<T extends OptionItem> = (value: {
  selectedOption?: T & { isSelected?: boolean };
  selectedOptions: (T & { isSelected?: boolean })[];
}) => void;

export type ListAutoFocus = 'first-item' | 'last-item' | 'menu' | 'none';
