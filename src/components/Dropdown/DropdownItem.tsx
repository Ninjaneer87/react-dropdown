import { ElementType } from 'react';
import { useDropdownContext } from '../../context/DropdownContext';
import { useDropdownMenuContext } from '../../context/DropdownMenuContext';
import { DropdownItemProps } from '../../types';
import { usePopoverContext } from '../../context/PopoverContext';

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
    ...rest
  } = props;
  const dropdownContext = useDropdownContext();
  const dropdownMenuContext = useDropdownMenuContext();
  const popoverContext = usePopoverContext();

  if (!dropdownContext) {
    throw new Error('DropdownItem should be used within a Dropdown component');
  }

  if (!dropdownMenuContext) {
    throw new Error(
      'DropdownItem should be used within a DropdownMenu component',
    );
  }

  if (!popoverContext) {
    throw new Error('DropdownItem should be used within a Popover component');
  }

  const { handleClose } = popoverContext;

  const closeOnSelection =
    shouldCloseOnSelection ?? dropdownContext.shouldCloseOnSelection;

  function handleClick() {
    if (disabled) return;

    if (onClick) {
      onClick();
    }

    if (closeOnSelection) {
      handleClose();
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;

    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick();
    }
  }

  return (
    <Component
      {...rest}
      ref={ref}
      data-dropdown-item
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      aria-disabled
      className={`p-2 ${
        disabled && showDisabledStyles ? 'opacity-60 pointer-events-none' : ''
      } ${
        isHighlighted ? 'bg-gray-600' : ''
      } hover:bg-gray-500 focus-visible:bg-gray-500 rounded-lg transition-all my-2 w-full inline-flex cursor-pointer items-center gap-4`}
    >
      {children}
    </Component>
  );
}

export default DropdownItem;
