'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutationObserver } from './useMutationObserver';
import { ListAutoFocus } from '../types';

export type FocusItemProps =
  | {
      index?: number;
    }
  | {
      focusLast?: boolean;
    };

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
  const [lastFocusedIndex, setLastFocusedIndex] = useState<
    number | undefined
  >();
  const focusableItemsRef = useRef<T[]>([]);

  const onEscRef = useRef(onEsc);
  const onFirstUpRef = useRef(onFirstUp);
  const onLastDownRef = useRef(onLastDown);

  const getItems = useCallback(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const items = [
      ...containerElement.querySelectorAll(
        '[data-focusable-item="true"]:not([disabled]):not([data-disabled="true"])',
      ),
    ] as T[];

    focusableItemsRef.current = items;
  }, []);

  const focusItem = useCallback((props: FocusItemProps) => {
    requestAnimationFrame(() => {
      if (!focusableItemsRef.current) return;

      if ('index' in props) {
        if (props.index === undefined) return;

        if (focusableItemsRef.current.length > 0) {
          const firstFocusableElement = focusableItemsRef.current[props.index];
          firstFocusableElement?.focus();
          firstFocusableElement?.scrollIntoView({ block: 'nearest' });
          setLastFocusedIndex(props.index);
        }
        return;
      }

      if ('focusLast' in props) {
        if (props.focusLast === undefined) return;

        const lastIndex = focusableItemsRef.current.length - 1;
        const firstFocusableElement = focusableItemsRef.current[lastIndex];
        firstFocusableElement?.focus();
        firstFocusableElement?.scrollIntoView({ block: 'nearest' });
        setLastFocusedIndex(lastIndex);
      }
    });
  }, []);

  const { mutationContainerRef } = useMutationObserver({
    onMutation: getItems,
    isActive,
  });

  useEffect(() => {
    onEscRef.current = onEsc;
    onFirstUpRef.current = onFirstUp;
    onLastDownRef.current = onLastDown;
  }, [onEsc, onFirstUp, onLastDown]);

  useEffect(() => {
    if (!isActive || !autoFocus || autoFocus === 'none') return;

    if (autoFocus === 'first-item') {
      if (!focusableItemsRef.current) return;

      focusItem({ index: 0 });

      return;
    }

    if (autoFocus === 'last-item') {
      if (!focusableItemsRef.current) return;

      focusItem({ focusLast: true });

      return;
    }

    if (autoFocus === 'menu') {
      containerRef.current?.focus();
    }
  }, [autoFocus, isActive, focusItem]);

  useEffect(() => {
    if (!isActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLastFocusedIndex(undefined);
      return;
    }

    getItems();
  }, [getItems, isActive]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case 'Escape': {
          onEscRef.current?.();

          break;
        }

        case 'Home': {
          event.preventDefault();
          event.stopPropagation();

          focusItem({ index: 0 });
          break;
        }

        case 'End': {
          event.preventDefault();
          event.stopPropagation();

          focusItem({ focusLast: true });
          break;
        }

        case 'ArrowUp': {
          event.preventDefault();
          event.stopPropagation();

          if (lastFocusedIndex === undefined) {
            focusItem({ focusLast: true });
            return;
          }

          const newIndex = lastFocusedIndex - 1;
          if (newIndex < 0) {
            if (onFirstUpRef.current) {
              onFirstUpRef.current();
            } else {
              focusItem({ focusLast: true });
            }
          } else {
            focusItem({ index: newIndex });
          }

          break;
        }

        case 'ArrowDown': {
          event.preventDefault();
          event.stopPropagation();

          if (lastFocusedIndex === undefined) {
            focusItem({ index: 0 });
            return;
          }

          const newIndex = lastFocusedIndex + 1;
          if (newIndex > focusableItemsRef.current.length - 1) {
            if (onLastDownRef.current) {
              onLastDownRef.current();
            } else {
              focusItem({ index: 0 });
            }
          } else {
            focusItem({ index: newIndex });
          }

          break;
        }

        default: {
          break;
        }
      }
    },
    [focusItem, lastFocusedIndex],
  );

  return {
    onKeyDown,
    mutationContainerRef,
    containerRef,
    lastFocusedIndex,
    focusItem,
  };
}
