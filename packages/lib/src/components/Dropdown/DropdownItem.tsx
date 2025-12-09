import { ElementType } from 'react';
import { useDropdownContext } from '../../context/DropdownContext';
import { useDropdownMenuContext } from '../../context/DropdownMenuContext';
import { DropdownItemProps } from '../../types';
import { usePopoverRootContext } from '../../context/PopoverRootContext';
import { cn } from '../../utils/common';

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
    classNames,
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

  const { classNames: contextClassNames } = dropdownContext;

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

  const baseClassName = cn(
    'p-2 hover:bg-gray-200 focus-visible:bg-gray-200 focus-within:bg-gray-200 rounded-lg transition-all w-full flex cursor-pointer items-center gap-2',
    disabled && showDisabledStyles ? 'opacity-60 pointer-events-none' : '',
    isHighlighted ? 'bg-gray-300' : '',
  );
  const startContentClassName = cn('shrink-0 inline-flex');
  const mainContentClassName = cn('shrink-0 grow inline-block');
  const endContentClassName = cn('ml-auto shrink-0 inline-flex');

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
      className={cn(
        baseClassName,
        contextClassNames?.item?.base,
        classNames?.base,
      )}
    >
      {startContent && (
        <span
          className={cn(
            startContentClassName,
            contextClassNames?.item?.startContent,
            classNames?.startContent,
          )}
        >
          {startContent}
        </span>
      )}

      <span
        className={cn(
          mainContentClassName,
          contextClassNames?.item?.mainContent,
          classNames?.mainContent,
        )}
      >
        {children}
      </span>

      {endContent && (
        <span
          className={cn(
            endContentClassName,
            contextClassNames?.item?.endContent,
            classNames?.endContent,
          )}
        >
          {endContent}
        </span>
      )}
    </Component>
  );
}

export default DropdownItem;
