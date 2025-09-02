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
  } = selectContext;
  const { handleCloseRoot } = popoverRootContext;

  const isOptionSelected = selected.some((item) => item.value === value);
  const optionItem: T = {
    value,
    text,
    description,
    disabled,
    isSelected: isOptionSelected,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(rest as any),
  };

  function handleSelection() {
    if (disabled) return;

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
    'p-2 hover:bg-gray-500 focus-visible:bg-gray-500 focus-within:bg-gray-500 rounded-lg transition-all w-full flex cursor-pointer items-center gap-2',
  );
  const contentWrapperClassName = cn('grow shrink-0 basis-36 justify-between');
  const startContentClassName = cn('shrink-0 inline-flex');
  const mainContentClassName = cn('shrink-0 grow inline-block');
  const textContentClassName = cn(
    truncate?.itemText ? 'line-clamp-1 break-all grow' : '',
  );
  const descriptionContentClassName = cn(
    'text-xs opacity-60',
    truncate?.itemText ? 'line-clamp-1 break-all grow' : '',
  );
  const endContentClassName = cn('ml-auto shrink-0 inline-flex');
  const selectedIconClassName = cn(
    'transition-all origin-left',
    isOptionSelected ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0',
  );

  if (renderOption) {
    return (
      <Slot
        data-select-item
        data-value={value}
        data-text={text}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={handleSelection}
        onKeyDown={onKeyDown}
      >
        {renderOption(optionItem)}
      </Slot>
    );
  }

  return (
    <li
      data-select-item
      data-value={value}
      data-text={text}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleSelection}
      onKeyDown={onKeyDown}
      className={cn(baseClassName, classNames?.base)}
    >
      <span className={cn(contentWrapperClassName, classNames?.contentWrapper)}>
        {startContent && (
          <span className={cn(startContentClassName, classNames?.startContent)}>
            {startContent}
          </span>
        )}

        <span className={cn(mainContentClassName, classNames?.mainContent)}>
          <div
            title={`${text}`}
            className={cn(textContentClassName, classNames?.textContent)}
          >
            {children}
          </div>
          <div
            className={cn(
              descriptionContentClassName,
              classNames?.descriptionContent,
            )}
          >
            Description of the item
          </div>
        </span>

        {endContent && (
          <span className={cn(endContentClassName, classNames?.endContent)}>
            {endContent}
          </span>
        )}
      </span>

      <span className={cn(selectedIconClassName, classNames?.selectedIcon)}>
        {'✔'}
      </span>
    </li>
  );
}

export default SelectItem;
