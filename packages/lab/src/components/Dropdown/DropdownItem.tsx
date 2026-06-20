'use client';

import { ElementType, forwardRef, ForwardedRef } from 'react';
import { useDropdownContext } from '@/context/DropdownContext';
import { useDropdownMenuContext } from '@/context/DropdownMenuContext';
import { DropdownItemProps } from '@/types';
import { cn } from '@/utils/common';
import styles from '@/components/Dropdown/DropdownItem.module.scss';
import { useDropdownRootContext } from '@/context/DropdownRootContext';

type DropdownItemComponent = {
  <T extends ElementType = 'div'>(
    props: DropdownItemProps<T> & { ref?: ForwardedRef<HTMLElement> },
  ): React.ReactNode;
  displayName?: string;
};

const DropdownItemInner = forwardRef<
  HTMLElement,
  DropdownItemProps<ElementType>
>((props, ref) => {
  const {
    children,
    onClick,
    isHighlighted,
    as: Component = 'div',
    shouldCloseOnSelection,
    disabled,
    showDisabledStyles = disabled,
    startContent,
    endContent,
    classNames,
    description,
    ...rest
  } = props;
  const dropdownContext = useDropdownContext();
  const dropdownMenuContext = useDropdownMenuContext();
  const dropdownRootContext = useDropdownRootContext();

  if (!dropdownContext) {
    throw new Error('DropdownItem should be used within a Dropdown component');
  }

  if (!dropdownMenuContext) {
    throw new Error(
      'DropdownItem should be used within a DropdownMenu component',
    );
  }

  if (!dropdownRootContext) {
    throw new Error('DropdownItem should be used within a Popover component');
  }

  const { classNames: contextClassNames } = dropdownContext;

  const { handleCloseRoot } = dropdownRootContext;

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
      if (event.key === ' ') event.preventDefault();

      event.stopPropagation();

      if (onClick) {
        handleClick();

        return;
      }

      // Trigger native click to support Link components and other clickable elements
      (event.currentTarget as HTMLElement).click();

      if (closeOnSelection) {
        handleCloseRoot();
      }
    }
  }

  const baseClassName = cn(
    styles.item,
    'p-2 focus-visible:bg-gray-100 rounded-lg transition-all w-full flex cursor-pointer items-center gap-2',
    disabled && showDisabledStyles ? 'opacity-60 pointer-events-none' : '',
    isHighlighted ? 'bg-gray-200' : '',
  );
  const startContentClassName = cn('shrink-0 inline-flex');
  const mainContentClassName = cn('shrink-0 grow inline-block');
  const textContentClassName = cn('');
  const descriptionContentClassName = cn('text-[0.75em] opacity-60');
  const endContentClassName = cn('ml-auto shrink-0 inline-flex');

  return (
    <Component
      data-dropdown-item
      {...rest}
      ref={ref}
      data-focusable-item
      data-highlighted-item={isHighlighted}
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
          data-dropdown-item-start-content
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
        data-dropdown-item-main-content
        className={cn(
          mainContentClassName,
          contextClassNames?.item?.mainContent,
          classNames?.mainContent,
        )}
      >
        <div
          data-dropdown-item-text-content
          className={cn(
            textContentClassName,
            contextClassNames?.item?.textContent,
            classNames?.textContent,
          )}
        >
          {children}
        </div>

        {description && (
          <div
            data-dropdown-item-description-content
            className={cn(
              descriptionContentClassName,
              contextClassNames?.item?.descriptionContent,
              classNames?.descriptionContent,
            )}
          >
            {description}
          </div>
        )}
      </span>

      {endContent && (
        <span
          data-dropdown-item-end-content
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
});

DropdownItemInner.displayName = 'DropdownItem';

const DropdownItem = DropdownItemInner as DropdownItemComponent;

export default DropdownItem;
