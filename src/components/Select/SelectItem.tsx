import { usePopoverRootContext } from '../../context/PopoverRootContext';
import { useSelectContext } from '../../context/SelectContext';
import { OptionItem, SelectItemProps } from '../../types';
import { Slot } from '../utility/Slot';

function SelectItem<T extends OptionItem>({
  children,
  shouldCloseOnSelection = true,
  disabled,
  showDisabledStyles = true,
  startContent,
  endContent,
  value,
  label,
  description,
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

  const { onSelectionChange, multiple, selected, setSelected, renderOption } =
    selectContext;
  const { handleCloseRoot } = popoverRootContext;

  const isOptionSelected = selected.some((item) => item.value === value);
  const optionItem: T = {
    value,
    label,
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

  if (renderOption) {
    return (
      <Slot
        data-select-item
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
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleSelection}
      onKeyDown={onKeyDown}
      className={`p-2 ${
        disabled && showDisabledStyles ? 'opacity-60 pointer-events-none' : ''
      } hover:bg-gray-500 focus-visible:bg-gray-500 focus-within:bg-gray-500 rounded-lg transition-all my-2 w-full flex cursor-pointer items-center gap-2`}
    >
      <span className="grow shrink-0 basis-36 justify-between">
        {startContent && (
          <span className="shrink-0 inline-flex">{startContent}</span>
        )}

        <span className="shrink-0 grow inline-flex">{children}</span>

        {endContent && (
          <span className="ml-auto shrink-0 inline-flex">{endContent}</span>
        )}
      </span>

      <span
        className={`transition-all origin-left ${
          isOptionSelected ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
      >
        {'✔'}
      </span>
    </li>
  );
}

export default SelectItem;
