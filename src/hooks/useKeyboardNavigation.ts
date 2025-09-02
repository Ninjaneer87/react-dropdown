import { useEffect, useRef, useState } from 'react';
import { usePopoverContext } from '../context/PopoverContext';
import { useDebouncedValue } from './useDebouncedValue';

type Props = {
  itemSelector: '[data-dropdown-item]' | '[data-select-item]';
};

export function useKeyboardNavigation({ itemSelector }: Props) {
  const popoverContext = usePopoverContext();
  const menuRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | undefined>();
  const [itemsLength, setItemsLength] = useState(0);
  const [chars, setChars] = useState('');
  const debouncedChars = useDebouncedValue(chars, 1000);

  if (!popoverContext) {
    throw new Error(
      '"useKeyboardNavigation" hook should be used within a Popover component',
    );
  }

  const { handleClose } = popoverContext;

  useEffect(() => {
    const itemIndex = getFilteredIndex(chars.trim());
    if (itemIndex === undefined || itemIndex < 0) return;

    focusItem(itemIndex);
    setFocusedIndex(itemIndex);
  }, [chars]);

  useEffect(() => {
    return () => setChars('');
  }, [debouncedChars.value]);

  useEffect(() => {
    menuRef.current?.focus();
  }, []);

  useEffect(() => {
    focusItem(focusedIndex);
  }, [focusedIndex]);

  function getItems() {
    const menuElement = menuRef.current;
    if (!menuElement) return;

    const items = [...menuElement.querySelectorAll(itemSelector)].filter(
      (element) =>
        !element.hasAttribute('disabled') &&
        element.getAttribute('aria-disabled') !== 'true',
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

  function getFilteredIndex(char: string) {
    if (!char) return;

    const items = getItems();
    if (!items) return;

    const itemLabels = items.map((item) => item.getAttribute('data-text'));

    const index = itemLabels.findIndex((item) =>
      item?.toLowerCase()?.startsWith(char.toLowerCase()),
    );

    return index;
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


      case ' ': {
        event.preventDefault();

        break;
      }

      default: {
        setChars((prev) => prev + event.key);

        break;
      }
    }
  }

  return {
    onKeyDown,
    menuRef,
  };
}
