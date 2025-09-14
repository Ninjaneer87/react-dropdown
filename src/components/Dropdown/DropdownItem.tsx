import { ElementType } from 'react';
import { useDropdownContext } from '../../context/DropdownContext';
import { useDropdownMenuContext } from '../../context/DropdownMenuContext';
import { DropdownItemProps } from '../../types';
import { usePopoverRootContext } from '../../context/PopoverRootContext';

function DropdownItem<T extends ElementType = 'div'>(
  props: DropdownItemProps<T>,
) {
  const {
    children,
    onClick,
    isHighlighted,
    ref,
    as: Component = 'div',
    shouldCloseOnSelection,
    disabled,
    showDisabledStyles = disabled,
    startContent,
    endContent,
    ...rest
  } = props;
  const dropdownContext = useDropdownContext();
  const dropdownMenuContext = useDropdownMenuContext();
  const popoverRootContext = usePopoverRootContext();

  if (!dropdownContext) {
    throw new Error('DropdownItem should be used within a Dropdown component');
  }

  if (!dropdownMenuContext) {
    throw new Error(
      'DropdownItem should be used within a DropdownMenu component',
    );
  }

  if (!popoverRootContext) {
    throw new Error('DropdownItem should be used within a Popover component');
  }

  const { handleCloseRoot } = popoverRootContext;

  const closeOnSelection =
    shouldCloseOnSelection ?? dropdownContext.shouldCloseOnSelection;

  function handleClick() {
    if (disabled) return;

    if (onClick) {
      onClick();
    }

    if (closeOnSelection) {
      handleCloseRoot();
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onClick) handleClick();

      if (closeOnSelection) {
        handleCloseRoot();
      }

      return;
    }
  }

  return (
    <Component
      {...rest}
      ref={ref}
      data-focusable-item
      tabIndex={disabled ? -1 : 0}
      data-disabled={disabled}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      className={`p-2 ${
        disabled && showDisabledStyles ? 'opacity-60 pointer-events-none' : ''
      } ${
        isHighlighted ? 'bg-gray-600' : ''
      } hover:bg-gray-500 focus-visible:bg-gray-500 focus-within:bg-gray-500 rounded-lg transition-all w-full flex cursor-pointer items-center gap-2`}
    >
      {startContent && (
        <span className="shrink-0 inline-flex">{startContent}</span>
      )}

      <span className="shrink-0 grow inline-flex">{children}</span>

      {endContent && (
        <span className="ml-auto shrink-0 inline-flex">{endContent}</span>
      )}
    </Component>
  );
}

export default DropdownItem;
