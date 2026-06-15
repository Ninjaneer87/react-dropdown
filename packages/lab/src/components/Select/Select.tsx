'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  OptionItem,
  SelectCompositionProps,
  SelectProps,
  SelectTruncate,
} from '../../types';
import SelectDivider from './SelectDivider';
import SelectItem from './SelectItem';
import SelectSection from './SelectSection';
import Popover from '../Popover/Popover';
import { SelectContext, SelectContextType } from '../../context/SelectContext';
import CaretIcon from '../ui/CaretIcon';
import { cn } from '../../utils/common';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';
import SelectSearch from '@/components/Select/SelectSearch';

const DEFAULT_TRUNCATE: SelectTruncate = {
  itemText: false,
  valueChipText: true,
  itemDescription: false,
  sectionTitle: true,
  valueText: true,
};
function Select<T extends OptionItem>({
  // caret,
  children,
  trigger,
  shouldFlip = true,
  shouldBlockScroll = false,
  shouldCloseOnScroll = false,
  shouldCloseOnClickOutside = true,
  shouldCloseOnEsc = true,
  backdrop,
  isDisabled,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onClickOutside,
  onTriggerFocus,
  onTriggerBlur,
  onOpenChange,
  fullWidth = false,
  // showCaret,
  growContent,
  offset,
  topContent,
  bottomContent,
  items,
  onSelectionChange,
  multiple = false,
  renderOption,
  placeholder = 'Select',
  value,
  defaultValue,
  classNames,
  label,
  isRequired,
  openOnLabelClick,
  shouldCloseOnSelection,
  truncate: truncateOverride,
  autoFocus = 'menu',
  focusTrapProps = {
    autoFocus: autoFocus === 'none',
    trapFocus: true,
  },
  search,
  onSearchChange,
  description,
  errorMessage,
  renderValue,
  noResultsMessage,
  popOnSelection,
  isAddNewOption,
  onAddNewOption,
  addNewLabel = 'Add',
  clearSearchOnSelection = true,
  infiniteScrollProps,
  isLoading,
  showArrow = false,
  size = 'trigger',
  triggerWrapper,
  fullWidthTriggerWrapper,
  ...rest
}: SelectProps<T> & SelectCompositionProps<T>) {
  if (items && children && typeof children !== 'function') {
    throw new Error(
      'Invalid items configuration. Use only "items" prop (can be used with "children" as function) or only "children" as ReactNode, not both.',
    );
  }

  if (!items && !children) {
    throw new Error(
      'Options are missing. Provide either "items" prop or "children".',
    );
  }

  // Validate children
  if (children && typeof children !== 'function') {
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      if (child.type !== SelectSection && child.type !== SelectItem) {
        throw new Error(
          `"Select" component only accepts "SelectSection" and "SelectItem" components as children`,
        );
      }
    });
  }

  const truncate: SelectTruncate = {
    ...DEFAULT_TRUNCATE,
    ...truncateOverride,
  };

  const {
    item: itemClassNames,
    section: sectionClassNames,
    divider: dividerClassNames,
  } = classNames || {};
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T[]>([]);
  const [hasMountedDefaultValue, setHasMountedDefaultValue] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [internalItems, setInternalItems] = useState<T[]>(items ?? []);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const open = controlledIsOpen ?? isOpen;
  const loading = !!isLoading || !!infiniteScrollProps?.isLoading;

  const focusSearch = useCallback(() => {
    requestAnimationFrame(() => {
      searchRef.current?.focus();
    });
  }, []);

  const [loaderRef, scrollerRef] = useInfiniteScroll<never, HTMLUListElement>({
    hasMore: infiniteScrollProps?.hasMore,
    isEnabled: isOpen && !!infiniteScrollProps,
    onLoadMore: () => infiniteScrollProps?.onLoadMore(searchValue),
  });

  const {
    lastFocusedIndex,
    containerRef,
    onKeyDown,
    focusItem,
    mutationContainerRef,
  } = useKeyboardNavigation<HTMLDivElement>({
    autoFocus,
    onFirstUp: search ? focusSearch : undefined,
    onLastDown: search ? focusSearch : undefined,
    isActive: open,
  });

  useEffect(() => {
    if (!value) return;

    setSelected(value);
  }, [value]);

  useEffect(() => {
    if (!search || !open) return;

    focusSearch();
  }, [search, focusSearch, open]);

  useEffect(() => {
    if (!defaultValue || !defaultValue.length || hasMountedDefaultValue) return;

    setSelected(defaultValue);
    setHasMountedDefaultValue(true);
  }, [defaultValue, hasMountedDefaultValue]);

  useEffect(() => {
    setInternalItems((prev) => {
      if (!items) return prev;

      const newItems = [...prev, ...items];
      const uniqueByValueItems = [
        ...new Set(newItems.map((item) => item.value)),
      ];
      const uniqueItems = uniqueByValueItems
        .map((value) => newItems.find((item) => item.value === value))
        .filter((item): item is T => item !== undefined);
      return uniqueItems;
    });
  }, [items]);

  function handleAddNewOption(currentSearchValue: string) {
    if (!currentSearchValue.trim() || !isAddNewOption) return;

    const newOption = {
      value: currentSearchValue,
      text: currentSearchValue,
    } as T;

    if (onAddNewOption) {
      onAddNewOption(newOption);
    }

    if (!value) {
      setInternalItems((prev) => (prev ? [newOption, ...prev] : [newOption]));
    }

    const newSelected = multiple ? [...selected, newOption] : [newOption];

    setSelected(newSelected);

    if (onSelectionChange) {
      onSelectionChange({
        selectedOption: newOption,
        selectedOptions: newSelected,
      });
    }

    setSearchValue('');
    if (onSearchChange) onSearchChange('');
    focusSearch();
  }

  function handleRemoveSelected(selectedValue: string | number) {
    if (isDisabled) return;

    const newSelected = selected.filter((item) => item.value !== selectedValue);
    setSelected(newSelected);

    if (onSelectionChange) {
      onSelectionChange({
        selectedOptions: newSelected,
      });
    }
  }

  function handleClose() {
    setIsOpen(false);
    if (onClose) onClose();
    if (onOpenChange) onOpenChange(false);
  }

  const popoverContentClassName = cn('p-0');
  const baseClassName = cn(
    fullWidth ? 'w-full' : 'w-70',
    isDisabled ? 'opacity-60 pointer-events-none' : '',
  );
  const labelClassName = cn('mb-1 w-fit', isDisabled ? 'opacity-60' : '');
  const requiredAsteriskClassName = cn('text-red-700 ml-1');

  const triggerBaseClassName = cn(
    'rounded-lg border text-gray-800 border-gray-200 px-2 py-1 min-h-8 grow flex items-center gap-2 relative',
  );
  const triggerPlaceholderClassName = cn(
    'text-[1em] leading-[1.2em] grow flex items-center text-gray-500',
  );
  const triggerValueTextClassName = cn(
    'flex items-center grow flex-wrap gap-1 leading-none max-w-full min-w-0 wrap-anywhere',
    !multiple && truncate?.valueText ? 'line-clamp-1 break-all' : '',
  );
  const triggerValueChipClassName = cn('inline-flex items-center max-w-full');
  const triggerValueChipTextClassName = cn(
    'text-start',
    truncate?.valueChipText
      ? 'line-clamp-1 break-all'
      : 'min-w-0 wrap-anywhere',
  );
  const triggerSelectorIconClassName = cn('ml-auto inline-flex items-center');

  const contentWrapperClassName =
    'relative outline-none! border-none! p-2 grow';
  const listboxClassName = cn(
    'list-none pl-0 m-0 max-h-[250px] overflow-y-auto touch-auto relative  scroll-pt-12',
  );
  const helperWrapperClassName = cn('text-[0.75em] mt-1');
  const descriptionClassName = cn('opacity-60');
  const errorMessageClassName = cn('text-red-700');

  const showPlaceholder = !selected.length && !search;

  const showValue = !!selected.length || search;
  const trimmedSearchValue = searchValue.trim();

  const filteredItems = useMemo(() => {
    let newItems = [...internalItems];

    if (search) {
      if (typeof search === 'function') {
        newItems = search(internalItems);
      } else {
        newItems = internalItems.filter((item) =>
          item.text.toLowerCase().includes(trimmedSearchValue.toLowerCase()),
        );
      }
    }

    if (popOnSelection) {
      newItems = newItems.filter((item) =>
        selected.every((sel) => sel.value !== item.value),
      );
    }

    return newItems;
  }, [internalItems, search, trimmedSearchValue, popOnSelection, selected]);

  const showAddNewOption =
    !!items &&
    isAddNewOption &&
    trimmedSearchValue &&
    selected.every(
      (item) =>
        trimmedSearchValue &&
        item.text?.toLowerCase() !== trimmedSearchValue.toLowerCase(),
    ) &&
    internalItems?.every(
      (item) =>
        trimmedSearchValue &&
        item.text?.toLowerCase() !== trimmedSearchValue.toLowerCase(),
    );

  const showNoFilteredResults =
    !showAddNewOption &&
    filteredItems &&
    !filteredItems.length &&
    (!!searchValue.length ||
      (popOnSelection && selected.length === internalItems?.length));

  if (showNoFilteredResults) {
    filteredItems.push({
      textContent: noResultsMessage,
      text: 'No results',
      value: 'no-results',
      disabled: true,
    } as T);
  }

  const showHelperSection = !!errorMessage || !!description;

  const contextValue: SelectContextType<T> = {
    multiple,
    onSelectionChange,
    setSelected,
    selected,
    renderOption,
    truncate,
    itemClassNames,
    sectionClassNames,
    dividerClassNames,
    items: internalItems,
    searchValue,
    setSearchValue,
    focusItem,
    search,
    onSearchChange,
    focusSearch: search ? focusSearch : undefined,
    popOnSelection,
    clearSearchOnSelection,
    currentOptions: filteredItems,
    lastFocusedIndex,
    handleClose,
  };

  return (
    <SelectContext.Provider value={contextValue}>
      {label && (
        <div
          className={cn(labelClassName, classNames?.label)}
          onClick={() => {
            if (!openOnLabelClick) return;

            setIsOpen((prev) => !prev);
          }}
        >
          {label}
          {isRequired && (
            <span
              className={cn(
                requiredAsteriskClassName,
                classNames?.requiredAsterisk,
              )}
            >
              *
            </span>
          )}
        </div>
      )}

      <div className={cn(baseClassName, classNames?.base)}>
        <Popover
          shouldFlip={shouldFlip}
          shouldBlockScroll={shouldBlockScroll}
          shouldCloseOnScroll={shouldCloseOnScroll}
          shouldCloseOnClickOutside={shouldCloseOnClickOutside}
          shouldCloseOnEsc={shouldCloseOnEsc}
          backdrop={backdrop}
          focusTriggerOnClose
          placement="bottom-center"
          isDisabled={isDisabled}
          isOpen={open}
          growContent={growContent}
          offset={offset}
          showArrow={showArrow}
          size={size}
          onTriggerFocus={onTriggerFocus}
          onTriggerBlur={onTriggerBlur}
          onOpen={() => {
            setIsOpen(true);
            if (onOpen) onOpen();
          }}
          onClose={() => {
            setIsOpen(false);
            if (onClose) onClose(selected);
          }}
          onClickOutside={() => {
            if (onClickOutside) onClickOutside();
          }}
          onOpenChange={(isOpen) => {
            setIsOpen(isOpen);
            if (onOpenChange) onOpenChange(isOpen);
          }}
          classNames={{
            ...classNames?.popover,
            content: cn(popoverContentClassName, classNames?.popover?.content),
          }}
          focusTrapProps={focusTrapProps}
          triggerWrapper={triggerWrapper}
          fullWidthTriggerWrapper={fullWidthTriggerWrapper}
        >
          <Popover.Trigger
            data-select-trigger
            aria-haspopup="listbox"
            {...rest}
          >
            {trigger ? (
              trigger
            ) : (
              <div
                data-select-trigger-base
                className={cn(triggerBaseClassName, classNames?.trigger?.base)}
              >
                {showPlaceholder && (
                  <div
                    data-select-trigger-placeholder
                    className={cn(
                      triggerPlaceholderClassName,
                      classNames?.trigger?.placeholder,
                    )}
                  >
                    {placeholder ?? 'Select'}
                  </div>
                )}

                {showValue && (
                  <div
                    data-select-trigger-value-text
                    className={cn(
                      triggerValueTextClassName,
                      classNames?.trigger?.valueText,
                    )}
                  >
                    {renderValue ? (
                      renderValue(selected)
                    ) : (
                      <>
                        {multiple ? (
                          <>
                            {selected.map((item) => (
                              <button
                                data-select-trigger-value-chip
                                className={cn(
                                  triggerValueChipClassName,
                                  classNames?.trigger?.valueChip,
                                )}
                                key={item.value}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.stopPropagation();
                                    e.preventDefault();

                                    handleRemoveSelected(item.value);
                                  }
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();

                                  handleRemoveSelected(item.value);
                                }}
                              >
                                <span
                                  data-select-trigger-value-chip-text
                                  className={cn(
                                    triggerValueChipTextClassName,
                                    classNames?.trigger?.valueChipText,
                                  )}
                                >
                                  {item.textContent ?? item.text}
                                </span>
                                <span className="shrink-0">&nbsp;&times;</span>
                              </button>
                            ))}

                            {search && (
                              <SelectSearch
                                searchRef={searchRef}
                                placeholder={placeholder}
                                className={classNames?.trigger?.searchInput}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            {search ? (
                              <SelectSearch
                                searchRef={searchRef}
                                placeholder={placeholder}
                                className={classNames?.trigger?.searchInput}
                              />
                            ) : (
                              (selected[0]?.textContent ?? selected[0]?.text)
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}

                {loading ? (
                  <SpinnerLoader />
                ) : (
                  <div
                    data-select-trigger-selector-icon
                    className={cn(
                      triggerSelectorIconClassName,
                      classNames?.trigger?.selectorIcon,
                    )}
                  >
                    <CaretIcon open={open} />
                  </div>
                )}
              </div>
            )}
          </Popover.Trigger>

          <Popover.Content data-select-content>
            <div
              data-select-content-wrapper
              className={cn(
                contentWrapperClassName,
                classNames?.contentWrapper,
              )}
              ref={(node) => {
                containerRef.current = node;
                mutationContainerRef.current = node;
              }}
              onKeyDown={onKeyDown}
              tabIndex={0}
            >
              {topContent && topContent}
              <ul
                role="listbox"
                data-select-listbox
                ref={scrollerRef}
                className={cn(listboxClassName, classNames?.listbox)}
              >
                {showAddNewOption && (
                  <SelectItem
                    onAddNewOption={() => handleAddNewOption(searchValue)}
                    value={searchValue}
                    text={searchValue}
                    shouldCloseOnSelection={false}
                  >
                    {addNewLabel} <b>&ldquo;{searchValue}&rdquo;</b>
                  </SelectItem>
                )}

                {typeof children !== 'function' && children}

                {typeof children === 'function' &&
                  filteredItems &&
                  filteredItems.map((item) => {
                    const renderedItem = children({
                      ...item,
                      isSelected: selected.some(
                        (sel) => sel.value === item.value,
                      ),
                    });
                    if (
                      !React.isValidElement(renderedItem) ||
                      renderedItem.type !== SelectItem
                    ) {
                      throw new Error(
                        `"Select" children function only accepts "SelectItem" as a root returned element`,
                      );
                    }

                    return renderedItem;
                  })}

                {!children &&
                  filteredItems &&
                  filteredItems.map((item) => (
                    <SelectItem
                      key={item.value}
                      {...item}
                      shouldCloseOnSelection={shouldCloseOnSelection}
                    >
                      {item.textContent ?? item.text}
                    </SelectItem>
                  ))}

                {infiniteScrollProps?.hasMore && (
                  <li data-infinite-scroll-loader ref={loaderRef} />
                )}

                {infiniteScrollProps?.isLoading && (
                  <SelectItem
                    key="loading"
                    value="loading"
                    text="Loading..."
                    disabled
                    classNames={{ base: 'flex justify-center' }}
                  >
                    <SpinnerLoader />
                  </SelectItem>
                )}
              </ul>
              {bottomContent && bottomContent}
            </div>
          </Popover.Content>
        </Popover>

        {showHelperSection && (
          <div
            data-select-helper-wrapper
            className={cn(helperWrapperClassName, classNames?.helperWrapper)}
          >
            {description && (
              <div
                data-select-description
                className={cn(descriptionClassName, classNames?.description)}
              >
                {description}
              </div>
            )}

            {errorMessage && (
              <div
                data-select-error-message
                className={cn(errorMessageClassName, classNames?.errorMessage)}
              >
                {errorMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </SelectContext.Provider>
  );
}

Select.Section = SelectSection;
Select.Item = SelectItem;
Select.Divider = SelectDivider;

export default Select;
