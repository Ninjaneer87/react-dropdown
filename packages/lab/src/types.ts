import { ComponentPropsWithRef, ElementType } from 'react';

// !Popover types
export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlign = 'start' | 'end' | 'center';
export type PopoverPlacement = `${PopoverPosition}-${PopoverAlign}`;

export type Backdrop = 'none' | 'transparent' | 'opaque' | 'blur';
export type PopoverSize = 'free' | 'small' | 'medium' | 'large' | 'trigger';

type PopoverClassNames = {
  base?: string;
  trigger?: string;
  /**
   * className for the trigger wrapper element (when triggerWrapper is `true`)
   */
  triggerWrapper?: string;
  backdrop?: string;
  content?: string;
};

export type PopoverProps = {
  /** The popover content when using the composition pattern */
  children?: React.ReactNode;
  /** Element that triggers the popover */
  trigger?: React.ReactNode;
  /** Content displayed inside the popover */
  content?: React.ReactNode;
  /** Controls the width of the popover content */
  size?: PopoverSize;
  /** Flips placement when there is not enough space */
  shouldFlip?: boolean;
  /** Blocks page scroll when the popover is open */
  shouldBlockScroll?: boolean;
  /** Closes the popover when clicking outside of it */
  shouldCloseOnClickOutside?: boolean;
  /** Closes the popover when the Escape key is pressed */
  shouldCloseOnEsc?: boolean;
  /** Closes the popover when the page is scrolled */
  shouldCloseOnScroll?: boolean;
  /** Opens the popover when the trigger receives focus */
  openOnFocus?: boolean;
  /** Closes the popover when the trigger loses focus */
  shouldCloseOnTriggerBlur?: boolean;
  /** The backdrop style displayed behind the popover */
  backdrop?: Backdrop;
  /** Preferred placement of the popover relative to the trigger */
  placement?: PopoverPlacement;
  /** Distance in pixels between the popover and the trigger */
  offset?: number;
  /** Disables the popover trigger */
  isDisabled?: boolean;
  /** Controls the popover open state (controlled mode) */
  isOpen?: boolean;
  /** Shows an arrow pointing toward the trigger */
  showArrow?: boolean;
  /** Callback fired when the popover opens */
  onOpen?: () => void;
  /** Callback fired when the popover closes */
  onClose?: () => void;
  /** Callback fired when clicking outside the popover. Receives the native `mousedown` event. */
  onClickOutside?: (event: MouseEvent | TouchEvent) => void;
  /** Callback fired when the trigger receives focus */
  onTriggerFocus?: () => void;
  /** Callback fired when the trigger loses focus */
  onTriggerBlur?: () => void;
  /** Callback fired when the open state changes */
  onOpenChange?: (isOpen: boolean) => void;
  /** Opens the popover on hover instead of click */
  openOnHover?: boolean;
  /** Returns focus to the trigger when the popover closes via `handleClose`. On outside click, only the root popover in a nested tree restores focus. */
  focusTriggerOnClose?: boolean;
  /** Delay in milliseconds before showing the popover */
  delayShow?: number;
  /** Delay in milliseconds before hiding the popover */
  delayHide?: number;
  /** Keeps the popover open while hovering over its content */
  hoverableContent?: boolean;
  /** Allows the popover content to grow beyond the trigger width */
  growContent?: boolean;
  /** Custom class names for the popover slots */
  classNames?: PopoverClassNames;
  /** Configuration for focus trap behavior inside the popover */
  focusTrapProps?: {
    trapFocus?: boolean;
    autoFocus?: boolean;
  };
  /**
   * When true, wraps the trigger in a span element instead of using Slot.
   * Useful when you don't have control over the trigger component to provide a ref.
   */
  triggerWrapper?: boolean;
  /**
   * When true, the trigger wrapper will take full width.
   */
  fullWidthTriggerWrapper?: boolean;
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

export type DropdownClassNames = {
  popover?: PopoverClassNames;
  divider?: DropdownDividerClassNames;
  footer?: DropdownFooterClassNames;
  header?: DropdownHeaderClassNames;
  menu?: DropdownMenuClassNames;
  item?: DropdownItemClassNames;
  section?: DropdownSectionClassNames;
};

type DropdownItemClassNames = {
  base?: string;
  startContent?: string;
  mainContent?: string;
  textContent?: string;
  descriptionContent?: string;
  endContent?: string;
};

type DropdownSectionClassNames = {
  base?: string;
  title?: string;
};
type DropdownTriggerClassNames = {
  base?: string;
};
type DropdownDividerClassNames = {
  base?: string;
};
type DropdownMenuClassNames = {
  base?: string;
};
type DropdownHeaderClassNames = {
  base?: string;
};
type DropdownFooterClassNames = {
  base?: string;
};
// !Dropdown types
export type DropdownProps = {
  /** Whether the dropdown closes after an item is selected */
  shouldCloseOnSelection?: boolean;
  /** Custom caret element replacing the default indicator */
  caret?: React.ReactNode;
  /** Shows or hides the caret indicator */
  showCaret?: boolean;
  /** Custom class names for the dropdown slots */
  classNames?: DropdownClassNames;
  /** Controls which item receives focus when the dropdown opens */
  autoFocus?: ListAutoFocus;
} & Omit<
  PopoverProps,
  'content' | 'delayShow' | 'delayHide' | 'hoverableContent' | 'classNames'
>;

export type DropdownMenuProps = {
  children: React.ReactNode;
  /** Whether the dropdown menu is currently visible */
  isOpen?: boolean;
  classNames?: DropdownMenuClassNames;
};

export type DropdownHeaderProps = {
  children: React.ReactNode;
  /** Keeps the header visible while the menu scrolls */
  isSticky?: boolean;
  classNames?: DropdownHeaderClassNames;
};

export type DropdownFooterProps = {
  children: React.ReactNode;
  /** Keeps the footer visible while the menu scrolls */
  isSticky?: boolean;
  classNames?: DropdownFooterClassNames;
};

export type DropdownSectionProps = {
  children: React.ReactNode;
  /** Enables scrolling within this section */
  scrolling?: boolean;
  /** Title displayed above the section */
  title?: React.ReactNode;
  /** Keeps the section title visible while the section scrolls */
  isStickyTitle?: boolean;
  /** Configuration for infinite scrolling within this section */
  infiniteScrollProps?: InfiniteScrollProps;
  classNames?: DropdownSectionClassNames;
};

export type DropdownItemProps<T extends ElementType = 'div'> = {
  /** Visually highlights the item */
  isHighlighted?: boolean;
  /** Whether selecting this item closes the dropdown */
  shouldCloseOnSelection?: boolean;
  /** Disables the item */
  disabled?: boolean;
  /** Shows disabled visual styles without disabling interaction */
  showDisabledStyles?: boolean;
  /** Content rendered before the item text */
  startContent?: React.ReactNode;
  /** Content rendered after the item text */
  endContent?: React.ReactNode;
  /** Renders the item as a different HTML element or component */
  as?: T;
  classNames?: DropdownItemClassNames;
  /** The description of the dropdown item */
  description?: string;
} & Omit<ComponentPropsWithRef<T>, 'className'>;

export type DropdownTriggerProps = {
  children: React.ReactNode;
  classNames?: DropdownTriggerClassNames;
};

export type DropdownDividerProps = {
  classNames?: DropdownDividerClassNames;
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
  Item?: <T extends ElementType = 'div'>(
    props: DropdownItemProps<T>,
  ) => React.ReactNode;
  /**
   * DropdownTrigger is a clickable element that toggles the dropdown.
   */
  Trigger?: React.FC<DropdownTriggerProps>;

  /**
   * DropdownDivider is a visual separator between sections.
   */
  Divider?: React.FC<DropdownDividerProps>;
};

export type SelectItemTruncate = {
  /**
   * Truncate item text content
   */
  itemText?: boolean;
  /**
   * Truncate item description
   */
  itemDescription?: boolean;
};

export type SelectSectionTruncate = {
  /**
   * Truncate section title
   */
  sectionTitle?: boolean;
};

export type SelectTruncate = {
  /**
   * Truncate the selected value text
   */
  valueText?: boolean;
  /**
   * Truncate the selected value chip text
   */
  valueChipText?: boolean;
} & SelectItemTruncate &
  SelectSectionTruncate;

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
   * Text content of the select item
   */
  textContent?: string;
  /**
   * Description text of the select item
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

export type SelectClassNames = {
  /**
   * The main wrapper of the select. This wraps the rest of the slots.
   */
  base?: string;
  /**
   * The label of the select.
   */
  label?: string;
  /**
   * The asterisk `*` after the label for `isRequired`.
   */
  requiredAsterisk?: string;
  /**
   * The trigger of the select. This wraps placeholder/value(s)/autocomplete-input and loading/caret.
   */
  trigger?: {
    /**
     * Trigger wrapper
     */
    base?: string;
    /**
     * The placeholder of the select.
     */
    placeholder?: string;
    /**
     * The default representation of selected value
     */
    valueText?: string;
    /** The chip representing a selected value (multi-select) */
    valueChip?: string;
    /** The text inside a selected value chip */
    valueChipText?: string;
    /** The search/autocomplete input field */
    searchInput?: string;
    /**
     * The selector icon of the select. This is the icon that rotates when the select is open (data-open).
     */
    selectorIcon?: string;
  };
  /**
   * The wrapper of the select content. This wraps the start/end content and the select value.
   */
  innerWrapper?: string;
  /**
   * The select value. This is also the slot that wraps the renderValue function result.
   */
  value?: string;
  /**
   * The wrapper of `topContent`, the listbox and `bottomContent`.
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
   * The popover slot. Use this to modify the popover styles.
   */
  popover?: PopoverClassNames;
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
  /**
   * Will apply classNames to all SelectItem-s
   */
  item?: SelectItemClassNames;
  /**
   * Will apply classNames to all SelectSection-s
   */
  section?: SelectSectionClassNames;
  /**
   * Will apply classNames to all SelectDivider-s
   */
  divider?: SelectDividerClassNames;
};

export type SelectDividerClassNames = {
  base?: string;
};

export type SelectSectionClassNames = {
  base?: string;
  title?: string;
};

export type RenderOption<T extends OptionItem> = ({
  option,
  currentOptions,
}: {
  option: T & { isSelected?: boolean; children?: React.ReactNode };
  currentOptions?: (T & { isSelected?: boolean })[];
}) => React.ReactNode;

export type SelectProps<T extends OptionItem> = {
  /** Callback fired when the selection changes */
  onSelectionChange?: OnSelectionChange<T>;
  /** Enables multi-select mode */
  multiple?: boolean;
  /** Custom caret element replacing the default indicator */
  caret?: React.ReactNode;
  /** Shows or hides the caret indicator */
  showCaret?: boolean;
  /** Makes the select take the full width of its container */
  fullWidth?: boolean;
  /** Content rendered above the listbox */
  topContent?: React.ReactNode;
  /** Content rendered below the listbox */
  bottomContent?: React.ReactNode;
  /** The list of selectable options */
  items?: T[];
  /** Placeholder text shown when no value is selected */
  placeholder?: string;
  /** The currently selected options (controlled mode) */
  value?: T[];
  /** The initially selected options (uncontrolled mode) */
  defaultValue?: T[];
  /** Custom render function for each option in the listbox */
  renderOption?: RenderOption<T>;
  /** Custom render function for the selected value display */
  renderValue?: (selectedItems: T[]) => React.ReactNode;
  /** Select content when using the composition pattern or render function */
  children?:
    | React.ReactNode
    | ((item: T & { isSelected?: boolean }) => React.ReactNode);
  /** Label displayed above or beside the select */
  label?: React.ReactNode;
  /** Marks the select as required and shows an asterisk */
  isRequired?: boolean;
  /** Callback fired when the select popover closes */
  onClose?: (selectedItems?: T[]) => void;
  /** Opens the select when the label is clicked */
  openOnLabelClick?: boolean;
  /** Whether selecting an item closes the select */
  shouldCloseOnSelection?: boolean;
  /** Controls text truncation for various select parts */
  truncate?: SelectTruncate;
  /** Controls which item receives focus when the select opens */
  autoFocus?: ListAutoFocus;
  /** Enables search filtering; pass a function for custom filtering */
  search?: boolean | ((items: T[]) => T[]);
  /** Callback fired when the search query changes */
  onSearchChange?: (searchQuery: string) => void;
  /** Helper text displayed below the select */
  description?: React.ReactNode;
  /** Error message displayed below the select */
  errorMessage?: React.ReactNode;
  /** Message displayed when search yields no results */
  noResultsMessage?: React.ReactNode;
  /** Configuration for infinite scrolling within the listbox */
  infiniteScrollProps?: InfiniteScrollProps;
  /** Shows a loading indicator inside the select */
  isLoading?: boolean;
  /**
   * Removes selected from the options list. Works only with `items` prop.
   */
  popOnSelection?: boolean;
  /**
   * Shows "Add <value>" option when search is enabled and no results are found.
   */
  isAddNewOption?: boolean;
  /**
   * Callback fired when a new option is added via the "Add <value>" action.
   * For controlled Select, handle adding the option yourself.
   * For uncontrolled Select, the option is prepended to the list automatically.
   */
  onAddNewOption?: (newOption: T) => void;
  /**
   * Custom label prefix for the "Add new" option. Defaults to "Add".
   */
  addNewLabel?: string;
  /**
   * Clears the search input when an option is selected. Defaults to `true`.
   */
  clearSearchOnSelection?: boolean;
  /**
   * Allows to set custom class names for the Select slots.
   */
  classNames?: SelectClassNames;
} & Omit<
  PopoverProps,
  | 'content'
  | 'delayShow'
  | 'delayHide'
  | 'hoverableContent'
  | 'openOnHover'
  | 'children'
  | 'classNames'
  | 'placement'
  | 'onClose'
>;

export type SelectItemProps<T extends OptionItem> = {
  children: React.ReactNode;
  /** Whether selecting this item closes the select */
  shouldCloseOnSelection?: boolean;
  /** Shows disabled visual styles without disabling interaction */
  showDisabledStyles?: boolean;
  /** Content rendered before the item text */
  startContent?: React.ReactNode;
  /** Content rendered after the item text */
  endContent?: React.ReactNode;
  classNames?: SelectItemClassNames;
  ref?: React.RefObject<HTMLLIElement | null>;
  /** Callback fired when a new option is added via this item */
  onAddNewOption?: (newOption: T) => void;
  /**
   * Override global truncate settings for this item
   */
  truncate?: SelectItemTruncate;
} & T;

export type SelectTriggerProps = {
  children: React.ReactNode;
};

export type SelectSectionProps = {
  children: React.ReactNode;
  /** Title displayed above the section */
  title?: React.ReactNode;
  /** Keeps the section title visible while the section scrolls */
  isStickyTitle?: boolean;
  /** Shows a visual divider below this section */
  showDivider?: boolean;
  classNames?: SelectSectionClassNames;
  /**
   * Override global truncate settings for this section
   */
  truncate?: SelectSectionTruncate;
};

export type SelectDividerProps = {
  classNames?: SelectDividerClassNames;
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
  Divider?: React.FC<SelectDividerProps>;
};

export type OptionItem = {
  /** Unique identifier for the option */
  value: string | number;
  /** Display text for the option */
  text: string;
  /** Custom React content rendered in place of plain text */
  textContent?: React.ReactNode;
  /** Additional description displayed below the option text */
  description?: React.ReactNode;
  /** Disables the option */
  disabled?: boolean;
};

export type OnSelectionChange<T extends OptionItem> = (value: {
  selectedOption?: T & { isSelected?: boolean };
  selectedOptions: (T & { isSelected?: boolean })[];
}) => void;

export type ListAutoFocus = 'first-item' | 'last-item' | 'menu' | 'none';

export type InfiniteScrollProps = {
  /** Callback fired when more items should be loaded */
  onLoadMore: (search?: string) => void;
  /** Whether a load-more request is in progress */
  isLoading?: boolean;
  /** Whether there are more items to load */
  hasMore: boolean;
};

// !Tooltip types
export type TooltipPlacement = PopoverPlacement;

export type TooltipClassNames = {
  base?: string;
  triggerWrapper?: string;
  content?: string;
};

export type TooltipProps = {
  /** The element that triggers the tooltip */
  children?: React.ReactNode;
  /** Content displayed inside the tooltip */
  content: React.ReactNode;
  /** Custom class names for the tooltip slots */
  classNames?: TooltipClassNames;
  /** Wraps the trigger in a span instead of using Slot */
  triggerWrapper?: boolean;
  /** Makes the trigger wrapper take full width */
  fullWidthTriggerWrapper?: boolean;
} & Pick<
  PopoverProps,
  | 'shouldFlip'
  | 'showArrow'
  | 'shouldCloseOnClickOutside'
  | 'shouldCloseOnEsc'
  | 'placement'
  | 'offset'
  | 'isDisabled'
  | 'isOpen'
  | 'onOpen'
  | 'onClose'
  | 'onClickOutside'
  | 'onOpenChange'
  | 'delayShow'
  | 'delayHide'
  | 'hoverableContent'
  | 'onTriggerFocus'
  | 'onTriggerBlur'
  | 'openOnFocus'
  | 'size'
  | 'shouldCloseOnTriggerBlur'
>;

// !Timeline types
export type TimelineVariant = 'default' | 'simple';

export type TimelineItemClassNames = {
  item?: string;
  dotColumn?: string;
  dotAlignWrapper?: string;
  dot?: string;
  dotDefaultInner?: string;
  line?: string;
  content?: string;
};

export type TimelineItem = {
  /** Unique name identifying this timeline step */
  name: string;
  /** Content rendered beside the timeline dot */
  content: React.ReactNode;
  /** Marks this step as the current active step */
  isActive?: boolean;
  /** Custom content rendered inside the dot */
  dotContent?: React.ReactNode;
  /** Custom class names for this item's slots */
  classNames?: TimelineItemClassNames;
};

export type TimelineClassNames = {
  base?: string;
  item?: string;
  dotColumn?: string;
  dotAlignWrapper?: string;
  dot?: string;
  dotDefaultInner?: string;
  line?: string;
  content?: string;
};

export type RenderDotContext = {
  /** The timeline item data */
  item: TimelineItem;
  /** Zero-based index of the item */
  index: number;
  /** Whether this is the active step */
  isActive: boolean;
  /** Whether this step is before the active step */
  isPast: boolean;
  /** Whether this step is after the active step */
  isFuture: boolean;
};

export type TimelineProps = {
  /** The list of timeline steps */
  items: TimelineItem[];
  /** Visual variant of the timeline */
  variant?: TimelineVariant;
  /** Shows a pulse animation on the active step dot */
  showPulseOnActiveStep?: boolean;
  /** Custom content rendered inside the active step dot */
  activeDotContent?: React.ReactNode;
  /** Default content rendered inside every step dot */
  dotContent?: React.ReactNode;
  /** Custom render function for each step dot */
  renderDot?: (ctx: RenderDotContext) => React.ReactNode;
  /** Custom class names for the timeline slots */
  classNames?: TimelineClassNames;
};
