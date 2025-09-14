import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { OptionItem, SelectCompositionProps, SelectProps } from '../../types';
import SelectDivider from './SelectDivider';
import SelectItem from './SelectItem';
import SelectSection from './SelectSection';
import Popover from '../Popover';
import { SelectContext, SelectContextType } from '../../context/SelectContext';
// import SelectMenu from './SelectMenu';
import CaretIcon from '../ui/CaretIcon';
import { cn } from '../../utils/common';
import SelectSearch from './SelectSearch';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

function Select<T extends OptionItem>({
  // caret,
  children,
  trigger,
  shouldFlip = true,
  shouldBlockScroll = true,
  shouldCloseOnScroll = !shouldBlockScroll,
  shouldCloseOnBlur = true,
  shouldCloseOnEsc = true,
  backdrop,
  isDisabled,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onBlur,
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
  truncate,
  itemClassNames,
  sectionClassNames,
  autoFocusMenu = true,
  focusTrapProps = {
    autoFocus: !autoFocusMenu,
    trapFocus: true,
  },
  search,
  onSearchChange,
  description,
  errorMessage,
  renderValue,
  noResultsMessage,
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

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T[]>([]);
  const [hasMountedDefaultValue, setHasMountedDefaultValue] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const baseRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const open = controlledIsOpen ?? isOpen;

  const focusSearch = useCallback(() => {
    searchRef.current?.focus();
  }, []);

  const { containerRef, onKeyDown, setFocusedIndex, focusableItemsLength } =
    useKeyboardNavigation<HTMLDivElement>({
      autoFocus: 'none',
      onFirstUp: focusSearch,
      onLastDown: focusSearch,
      isMounted: open,
    });

  useEffect(() => {
    if (!value) return;

    setSelected(value);
  }, [value]);

  useEffect(() => {
    if (!defaultValue || !defaultValue.length || hasMountedDefaultValue) return;

    setSelected(defaultValue);
    setHasMountedDefaultValue(true);
  }, [defaultValue, hasMountedDefaultValue]);

  const contextValue: SelectContextType<T> = useMemo(
    () => ({
      multiple,
      onSelectionChange,
      setSelected,
      selected,
      renderOption,
      truncate,
      itemClassNames,
      sectionClassNames,
      items,
      searchValue,
      setSearchValue,
      setFocusedIndex,
      focusableItemsLength,
      search,
      onSearchChange,
    }),
    [
      multiple,
      onSelectionChange,
      setSelected,
      selected,
      renderOption,
      truncate,
      itemClassNames,
      sectionClassNames,
      items,
      searchValue,
      setSearchValue,
      setFocusedIndex,
      focusableItemsLength,
      search,
      onSearchChange,
    ],
  );

  const popoverContentClassName = cn('p-0');
  const baseClassName = cn(
    fullWidth ? 'w-full' : 'w-80',
    isDisabled ? 'opacity-60' : '',
  );
  const labelClassName = cn('mb-1 w-fit');
  const placeholderClassName = cn('grow flex items-center opacity-60');
  const requiredAsteriskClassName = cn('text-red-700 ml-1');
  // const triggerClassName = cn('w-full grow relative');
  const triggerClassName = cn(
    'rounded-lg border p-2 grow flex items-center gap-2 relative',
  );
  const selectorIconClassName = cn('ml-auto');

  const contentWrapperClassName =
    'relative !outline-none !border-none p-2 grow';
  const listboxClassName = cn(
    'max-h-[250px] overflow-y-auto relative  scroll-pt-12',
  );
  const helperWrapperClassName = cn('text-xs mt-1');
  const descriptionClassName = cn('opacity-60');
  const errorMessageClassName = cn('text-red-700');

  const showPlaceholder = !selected.length && !search;

  const showValue = !!selected.length || search;

  const baseWidth = baseRef.current
    ? window.getComputedStyle(baseRef.current).width
    : 'initial';

  const filteredItems = useMemo(() => {
    if (!search || !items) return items;

    if (typeof search === 'function') return search(items);

    console.log({ searchValue, items });
    return items.filter((item) =>
      item.text.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [items, search, searchValue]);

  const showNoFilteredResults =
    filteredItems && !filteredItems.length && !!searchValue.length;

  if (showNoFilteredResults) {
    filteredItems.push({
      textContent: noResultsMessage,
      text: 'No results',
      value: 'no-results',
      disabled: true,
    } as T);
  }

  const showHelperSection = !!errorMessage || !!description;

  return (
    <SelectContext.Provider value={contextValue}>
      <div className={cn(baseClassName, classNames?.base)} ref={baseRef}>
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

        <Popover
          fullWidth
          shouldFlip={shouldFlip}
          shouldBlockScroll={shouldBlockScroll}
          shouldCloseOnScroll={shouldCloseOnScroll}
          shouldCloseOnBlur={shouldCloseOnBlur}
          shouldCloseOnEsc={shouldCloseOnEsc}
          backdrop={backdrop}
          focusTriggerOnClose
          placement="bottom-center"
          isDisabled={isDisabled}
          isOpen={open}
          growContent={growContent}
          offset={offset}
          onOpen={() => {
            setIsOpen(true);
            if (onOpen) onOpen();
          }}
          onClose={() => {
            setIsOpen(false);
            console.log({ selected });
            if (onClose) onClose(selected);
          }}
          onBlur={() => {
            if (onBlur) onBlur();
          }}
          onOpenChange={(isOpen) => {
            setIsOpen(isOpen);
            if (onOpenChange) onOpenChange(isOpen);
          }}
          classNames={{
            content: cn(popoverContentClassName, classNames?.popoverContent),
          }}
          focusTrapProps={focusTrapProps}
          focusableTrigger={!search}
        >
          <Popover.Trigger>
            {trigger ? (
              trigger
            ) : (
              <div className={cn(triggerClassName, classNames?.trigger)}>
                {showPlaceholder && (
                  <div
                    className={cn(
                      placeholderClassName,
                      classNames?.placeholder,
                    )}
                  >
                    {placeholder ?? 'Select'}
                  </div>
                )}

                {showValue && (
                  <div className="flex items-center grow flex-wrap gap-1">
                    {renderValue ? (
                      renderValue(selected)
                    ) : (
                      <>
                        {selected.map((item) => (
                          <span key={item.value} tabIndex={0}>
                            {item.textContent ?? item.text}
                          </span>
                        ))}
                      </>
                    )}

                    {search && (
                      <SelectSearch
                        searchRef={searchRef}
                        placeholder={placeholder}
                      />
                    )}
                  </div>
                )}

                <div
                  className={cn(
                    selectorIconClassName,
                    classNames?.selectorIcon,
                  )}
                >
                  <CaretIcon open={open} />
                </div>
              </div>
            )}
          </Popover.Trigger>

          <Popover.Content>
            <div style={{ width: baseWidth }}>
              <div
                className={cn(
                  contentWrapperClassName,
                  classNames?.contentWrapper,
                )}
                ref={containerRef}
                onKeyDown={onKeyDown}
                tabIndex={0}
              >
                {topContent && topContent}
                <ul className={cn(listboxClassName, classNames?.listbox)}>
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
                </ul>
                {bottomContent && bottomContent}
              </div>
            </div>
          </Popover.Content>
        </Popover>

        {showHelperSection && (
          <div
            className={cn(helperWrapperClassName, classNames?.helperWrapper)}
          >
            {description && (
              <div
                className={cn(descriptionClassName, classNames?.description)}
              >
                {description}
              </div>
            )}

            {errorMessage && (
              <div
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
