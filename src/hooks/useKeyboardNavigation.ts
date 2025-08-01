import { useEffect, useRef, useState } from 'react';
import { usePopoverContext } from '../context/PopoverContext';

type Props = {
  itemSelector: '[data-dropdown-item]' | '[data-select-item]';
};

export function useKeyboardNavigation({ itemSelector }: Props) {
  const popoverContext = usePopoverContext();
  const menuRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | undefined>();
  const [itemsLength, setItemsLength] = useState(0);

  if (!popoverContext) {
    throw new Error(
      '"useKeyboardNavigation" hook should be used within a Popover component',
    );
  }

  const { handleClose } = popoverContext;

  useEffect(() => {
    menuRef.current?.focus();
  }, []);

  useEffect(() => {
    focusItem(focusedIndex);
  }, [focusedIndex]);

  function focusItem(index: number | undefined) {
    const menuElement = menuRef.current;
    if (!menuElement) return;

    const items = [...menuElement.querySelectorAll(itemSelector)].filter(
      (element) =>
        !element.hasAttribute('disabled') &&
        element.getAttribute('aria-disabled') !== 'true',
    );
    setItemsLength(items.length);

    if (index === undefined) return;

    if (items.length > 0) {
      const firstFocusableElement = items[index] as HTMLElement;
      firstFocusableElement.focus();
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    event.stopPropagation();

    if (event.key === 'Escape') {
      event.stopPropagation();
      handleClose();

      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (focusedIndex === undefined) {
        focusItem(itemsLength - 1);
        setFocusedIndex(itemsLength - 1);
        return;
      }

      setFocusedIndex((prevIndex) => {
        if (prevIndex === undefined) return undefined;

        const newIndex = prevIndex - 1;
        return newIndex < 0 ? itemsLength - 1 : newIndex;
      });

      if (focusedIndex === undefined) {
        focusItem(itemsLength - 1);
      }

      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (focusedIndex === undefined) {
        focusItem(0);
        setFocusedIndex(0);
        return;
      }

      setFocusedIndex((prevIndex) => {
        if (prevIndex === undefined) return undefined;

        const newIndex = prevIndex + 1;
        return newIndex < itemsLength ? newIndex : 0;
      });

      return;
    }
  }

  return {
    onKeyDown,
    menuRef,
  };
}
