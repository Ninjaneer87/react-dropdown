import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutationObserver } from './useMutationObserver';
import { ListAutoFocus } from '../types';

type Props = {
  autoFocus?: ListAutoFocus;
  onFirstUp?: () => void;
  onLastDown?: () => void;
  onEsc?: () => void;
  isActive: boolean;
};

export function useKeyboardNavigation<T extends HTMLElement>({
  autoFocus = 'menu',
  onFirstUp,
  onEsc,
  onLastDown,
  isActive,
}: Props) {
  const containerRef = useRef<T>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | undefined>();
  const [focusableItems, setFocusableItems] = useState<T[]>([]);
  const focusableItemsLength = focusableItems.length;

  const getItems = useCallback(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const items = [
      ...containerElement.querySelectorAll('[data-focusable-item="true"]'),
    ].filter(
      (element) =>
        !element.hasAttribute('disabled') &&
        element.getAttribute('data-disabled') !== 'true',
    ) as T[];

    items.forEach((item, i) =>
      item.setAttribute('data-focusable-index', i.toString()),
    );

    setFocusableItems(items);
  }, [containerRef]);

  useMutationObserver({ element: containerRef?.current, onMutation: getItems });

  useEffect(() => {
    if (!isActive || !autoFocus || autoFocus === 'none') return;

    if (autoFocus === 'first-item') {
      if (!focusableItems) return;

      setFocusedIndex(0);

      return;
    }

    if (autoFocus === 'last-item') {
      if (!focusableItems) return;

      setFocusedIndex(focusableItems.length - 1);

      return;
    }

    if (autoFocus === 'menu') {
      containerRef.current?.focus();
    }
  }, [autoFocus, isActive]);

  useEffect(() => {
    if (!isActive) {
      setFocusedIndex(undefined);
      return;
    }

    focusItem(focusedIndex);
  }, [focusedIndex, isActive]);

  useEffect(() => {
    if (!isActive) return;

    getItems();
  }, [getItems, isActive]);

  function focusItem(index: number | undefined) {
    if (!focusableItems) return;

    if (index === undefined) return;

    if (focusableItems.length > 0) {
      const firstFocusableElement = focusableItems[index];
      firstFocusableElement?.focus();
      firstFocusableElement?.scrollIntoView({ block: 'nearest' });
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case 'Escape': {
        onEsc?.();

        break;
      }

      case 'Home': {
        event.preventDefault();
        event.stopPropagation();

        setFocusedIndex(0);
        break;
      }

      case 'End': {
        event.preventDefault();
        event.stopPropagation();

        setFocusedIndex(focusableItemsLength - 1);
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        event.stopPropagation();

        if (focusedIndex === undefined) {
          setFocusedIndex(focusableItemsLength - 1);
          return;
        }

        const newIndex = focusedIndex - 1;
        if (newIndex < 0) {
          if (onFirstUp) {
            setFocusedIndex(undefined);
            onFirstUp();
          } else {
            setFocusedIndex(focusableItemsLength - 1);
          }
        } else {
          setFocusedIndex(newIndex);
        }

        break;
      }

      case 'ArrowDown': {
        event.preventDefault();
        event.stopPropagation();

        if (focusedIndex === undefined) {
          setFocusedIndex(0);
          return;
        }

        const newIndex = focusedIndex + 1;
        if (newIndex > focusableItemsLength - 1) {
          if (onLastDown) {
            setFocusedIndex(undefined);
            onLastDown();
          } else {
            setFocusedIndex(0);
          }
        } else {
          setFocusedIndex(newIndex);
        }

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
    focusedIndex,
    setFocusedIndex,
    focusableItemsLength,
  };
}
