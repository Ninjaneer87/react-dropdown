import { useRef } from 'react';
import { usePopoverRootContext } from '../../context/PopoverRootContext';
import { useSelectContext } from '../../context/SelectContext';
import { OptionItem, SelectItemProps } from '../../types';
import { cn } from '../../utils/common';
import { Slot } from '../utility/Slot';

function SelectItem<T extends OptionItem>({
  children,
  shouldCloseOnSelection = true,
  disabled,
  showDisabledStyles = true,
  startContent,
  endContent,
  value,
  text,
  description,
  classNames,
  ref,
  ...rest
}: SelectItemProps<T>) {
  const selectContext = useSelectContext<T>();
  const popoverRootContext = usePopoverRootContext();

  if (!selectContext) {
    throw new Error('SelectItem should be used within a Select component');
  }

  if (!popoverRootContext) {
    throw new Error('SelectItem should be used within a Popover component');
  }

  const {
    onSelectionChange,
    multiple,
    selected,
    setSelected,
    renderOption,
    truncate,
    itemClassNames,
    setFocusedIndex,
    focusSearch,
    popOnSelection,
    currentOptions,
    search,
  } = selectContext;

  const { handleCloseRoot } = popoverRootContext;

  const isOptionSelected = selected.some((item) => item.value === value);
  const optionItem: T = {
    value,
    text,
    description,
    disabled,
    children,
    isSelected: isOptionSelected,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(rest as any),
  };
  const selectItemRef = useRef<HTMLLIElement | null>(null);

  function handleSelection() {
    if (disabled) return;

    const focusedIndex = selectItemRef.current?.dataset.focusableIndex;

    if (onSelectionChange) {
      const selectedValues = selected.map((item) => item.value);
      const isSelected = selectedValues.includes(value);
      const isNewSelection = !isSelected;

      let newSelectedOptions = [...selected];

      if (isSelected) {
        newSelectedOptions = newSelectedOptions.filter(
          (item) => item.value !== value,
        );
      }

      if (isNewSelection) {
        if (multiple) {
          newSelectedOptions = [...newSelectedOptions, optionItem];
        } else {
          newSelectedOptions = [optionItem];
        }
      }

      onSelectionChange({
        selectedOption: optionItem,
        selectedOptions: newSelectedOptions,
      });

      setSelected(newSelectedOptions);

      if (focusedIndex && !search) {
        setFocusedIndex(undefined);
        setTimeout(() => {
          setFocusedIndex(+focusedIndex);
        }, 1);
      }
    }

    if (multiple && popOnSelection && search && focusSearch) {
      focusSearch();
    }

    if (!multiple && shouldCloseOnSelection) {
      handleCloseRoot();
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLLIElement>) {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelection();

      return;
    }
  }

  const baseClassName = cn(
    disabled && showDisabledStyles ? 'opacity-60 pointer-events-none' : '',
    'p-2 hover:bg-gray-200 data-[focused="true"]:bg-gray-200 focus-visible:bg-gray-200 focus-within:bg-gray-200 rounded-lg transition-all w-full flex cursor-pointer items-center gap-2',
  );
  const contentWrapperClassName = cn(
    'flex grow shrink-0 basis-36 justify-between items-center',
  );
  const startContentClassName = cn('shrink-0 inline-flex');
  const mainContentClassName = cn('shrink-0 grow inline-block');
  const textContentClassName = cn(
    truncate?.itemText ? 'line-clamp-1 break-all grow' : '',
  );
  const descriptionContentClassName = cn(
    'text-xs opacity-60',
    truncate?.itemDescription ? 'line-clamp-1 break-all grow' : '',
  );
  const endContentClassName = cn('ml-auto shrink-0 inline-flex');
  const selectedIconClassName = cn(
    'transition-all origin-left',
    isOptionSelected ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0',
  );

  const itemProps = {
    'data-focusable-item': true,
    'data-select-menu-item': true,
    'data-value': value,
    'data-text': text,
    tabIndex: disabled ? -1 : 0,
    'data-disabled': disabled,
    'aria-disabled': disabled,
    onClick: handleSelection,
    onKeyDown: onKeyDown,
    ref: (node: HTMLLIElement | null) => {
      selectItemRef.current = node;
      if (ref) ref.current = node;
    },
    className: cn(baseClassName, itemClassNames?.base, classNames?.base),
  };

  if (renderOption) {
    return (
      <Slot {...itemProps}>
        {renderOption({ option: optionItem, currentOptions })}
      </Slot>
    );
  }

  return (
    <li {...itemProps}>
      <span
        className={cn(
          contentWrapperClassName,
          itemClassNames?.contentWrapper,
          classNames?.contentWrapper,
        )}
      >
        {startContent && (
          <span
            className={cn(
              startContentClassName,
              itemClassNames?.startContent,
              classNames?.startContent,
            )}
          >
            {startContent}
          </span>
        )}

        <span
          className={cn(
            mainContentClassName,
            itemClassNames?.mainContent,
            classNames?.mainContent,
          )}
        >
          <div
            title={`${text}`}
            className={cn(
              textContentClassName,
              itemClassNames?.textContent,
              classNames?.textContent,
            )}
          >
            {children}
          </div>

          {description && (
            <div
              className={cn(
                descriptionContentClassName,
                itemClassNames?.descriptionContent,
                classNames?.descriptionContent,
              )}
            >
              {description}
            </div>
          )}
        </span>

        {endContent && (
          <span
            className={cn(
              endContentClassName,
              itemClassNames?.endContent,
              classNames?.endContent,
            )}
          >
            {endContent}
          </span>
        )}
      </span>

      <span
        className={cn(
          selectedIconClassName,
          itemClassNames?.selectedIcon,
          classNames?.selectedIcon,
        )}
      >
        &#10003;
      </span>
    </li>
  );
}

export default SelectItem;
