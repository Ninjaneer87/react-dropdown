import { useEffect, useRef, useState } from 'react';
import { usePopoverContext } from '../context/PopoverContext';

type Props = {
  autoFocus?: 'first-item' | 'last-item' | 'menu' | 'none';
};

export function useDropdownKeyboardNavigation(
  { autoFocus = 'first-item' }: Props = { autoFocus: 'first-item' },
) {
  const popoverContext = usePopoverContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | undefined>();
  const [itemsLength, setItemsLength] = useState(0);

  if (!popoverContext) {
    throw new Error(
      '"useKeyboardNavigation" hook should be used within a Popover component',
    );
  }

  const { handleClose } = popoverContext;

  useEffect(() => {
    console.log({ autoFocus });
    if (!autoFocus || autoFocus === 'none') return;

    if (autoFocus === 'first-item') {
      const items = getItems();
      if (!items) return;

      setFocusedIndex(0);
      setItemsLength(items.length);

      return;
    }

    if (autoFocus === 'last-item') {
      const items = getItems();
      if (!items) return;

      setFocusedIndex(items.length - 1);
      setItemsLength(items.length);

      return;
    }

    if (autoFocus === 'menu') {
      containerRef.current?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    console.log({ focusedIndex });
    focusItem(focusedIndex);
  }, [focusedIndex]);

  function getItems() {
    const menuElement = containerRef.current;
    if (!menuElement) return;

    const items = [
      ...menuElement.querySelectorAll('[data-focusable-item="true"]'),
    ].filter(
      (element) =>
        !element.hasAttribute('disabled') &&
        element.getAttribute('data-disabled') !== 'true',
    );

    return items;
  }

  function focusItem(index: number | undefined) {
    const items = getItems();
    if (!items) return;

    setItemsLength(items.length);

    if (index === undefined) return;

    if (items.length > 0) {
      const firstFocusableElement = items[index] as HTMLElement;
      firstFocusableElement.focus();
      firstFocusableElement.scrollIntoView({ block: 'nearest' });
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    event.stopPropagation();

    switch (event.key) {
      case 'Escape': {
        event.stopPropagation();
        handleClose();

        break;
      }

      case 'Home': {
        event.preventDefault();

        focusItem(0);
        setFocusedIndex(0);
        break;
      }

      case 'End': {
        event.preventDefault();

        focusItem(itemsLength - 1);
        setFocusedIndex(itemsLength - 1);
        break;
      }

      case 'ArrowUp': {
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

        break;
      }

      case 'ArrowDown': {
        event.preventDefault();

        console.log('arrow-down');
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

        break;
      }

      //   case ' ': {
      //     event.preventDefault();

      //     break;
      //   }

      default: {
        break;
      }
    }
  }

  return {
    onKeyDown,
    containerRef,
  };
}
