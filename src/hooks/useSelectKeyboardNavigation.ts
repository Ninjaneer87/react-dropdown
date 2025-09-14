import { useCallback, useEffect, useRef, useState } from 'react';
import { usePopoverContext } from '../context/PopoverContext';
import { useDebouncedValue } from './useDebouncedValue';

type Props = {
  itemSelector: '[data-focusable-item]' | '[data-focusable-item]';
  autoFocusMenu: boolean;
};

export function useSelectKeyboardNavigation({
  itemSelector,
  autoFocusMenu,
}: Props) {
  const popoverContext = usePopoverContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | undefined>();
  const [itemsLength, setItemsLength] = useState(0);
  const [chars, setChars] = useState('');
  const debouncedChars = useDebouncedValue(chars, 1000);

  if (!popoverContext) {
    throw new Error(
      '"useSelectKeyboardNavigation" hook should be used within a Popover component',
    );
  }

  const { handleClose } = popoverContext;

  const getItems = useCallback(() => {
    const menuElement = containerRef.current;
    if (!menuElement) return;

    const items = [...menuElement.querySelectorAll(itemSelector)].filter(
      (element) =>
        !element.hasAttribute('disabled') &&
        element.getAttribute('data-disabled') !== 'true',
    );

    return items;
  }, [itemSelector]);

  const focusItem = useCallback(
    (index: number | undefined) => {
      const items = getItems();
      if (!items) return;

      setItemsLength(items.length);

      if (index === undefined) return;

      if (items.length > 0) {
        const firstFocusableElement = items[index] as HTMLElement;

        console.log({ items, firstFocusableElement });
        // firstFocusableElement.focus();
        items.forEach((item) => item.setAttribute('data-focused', 'false'));
        firstFocusableElement.setAttribute('data-focused', 'true');
        firstFocusableElement.scrollIntoView({ block: 'nearest' });
      }
    },
    [getItems],
  );

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

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.stopPropagation();

      console.log('first');

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

        case 'Enter': {
          event.preventDefault();

          const items = getItems();
          if (items && focusedIndex !== undefined && focusedIndex > -1) {
            const item = items[focusedIndex];
            item.click();
          }
          break;
        }

        case 'ArrowUp': {
          event.preventDefault();

          if (focusedIndex === undefined) {
            console.log({ itemsLength });
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

        // case ' ': {
        //   event.preventDefault();

        //   break;
        // }

        default: {
          setChars((prev) => prev + event.key);

          break;
        }
      }
    },
    [focusItem, focusedIndex, handleClose, itemsLength, getItems],
  );

  useEffect(() => {
    const itemIndex = getFilteredIndex(chars.trim());
    if (itemIndex === undefined || itemIndex < 0) return;

    focusItem(itemIndex);
    setFocusedIndex(itemIndex);
  }, [chars]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    return () => setChars('');
  }, [debouncedChars.value]);

  useEffect(() => {
    // console.log('menu focus');
    if (!autoFocusMenu) return;

    containerRef.current?.focus();
  }, [autoFocusMenu]);

  useEffect(() => {
    focusItem(focusedIndex);
  }, [focusedIndex]);

  return {
    onKeyDown,
    containerRef,
  };
}
