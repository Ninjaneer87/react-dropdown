import { ElementType } from 'react';
import { useDropdownContext } from '../context/DropdownContext';
import { useDropdownMenuContext } from '../context/DropdownMenuContext';
import { DropdownItemProps } from '../types';
import { usePopoverContext } from '../context/PopoverContext';

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
    if (closeOnSelection) {
      handleClose();
    }

    if (onClick) {
      onClick();
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick();
    }
  }

  return (
    <Component
      {...rest}
      ref={ref}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      className={`p-2 ${
        isHighlighted ? 'bg-gray-600' : ''
      } hover:bg-gray-500 focus-visible:bg-gray-500 rounded-lg transition-all my-2 w-full inline-flex cursor-pointer items-center gap-4`}
    >
      {children}
    </Component>
  );
}

export default DropdownItem;
