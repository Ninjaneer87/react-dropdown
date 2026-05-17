'use client';

import { useCallback, useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not(:disabled)',
  'input:not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  '[contenteditable]:not([contenteditable="false"])',
  'audio[controls]',
  'video[controls]',
  'summary',
  '[tabindex]:not([tabindex="-1"]):not([data-focus-trapper])',
].join(', ');

function getEdgeFocusables(container: HTMLElement | null) {
  if (!container) return { first: null, last: null };
  const focusables = [
    ...container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ];
  return {
    first: focusables[0] ?? null,
    last: focusables[focusables.length - 1] ?? null,
  };
}
function configureSentinel(sentinel: HTMLDivElement | null) {
  if (!sentinel) return;

  sentinel.setAttribute('tabindex', '0');
  sentinel.setAttribute('data-focus-trapper', 'true');
  sentinel.style.width = '0';
  sentinel.style.height = '0';
  sentinel.style.position = 'fixed';
}

type Props = {
  /**
   * Whether the focus trap is active
   */
  isActive: boolean;
  /**
   * Whether to automatically focus the container on mount
   */
  shouldAutoFocus?: boolean;
};

export function useFocusTrap({ isActive, shouldAutoFocus = true }: Props) {
  const trapContainerRef = useRef<HTMLDivElement>(null);
  const startTrapRef = useRef<HTMLDivElement>(null);
  const endTrapRef = useRef<HTMLDivElement>(null);

  const focusLastFocusableElement = useCallback(() => {
    const { last } = getEdgeFocusables(trapContainerRef.current);

    requestAnimationFrame(() => {
      last?.focus();
    });
  }, []);

  const focusFirstFocusableElement = useCallback(() => {
    const { first } = getEdgeFocusables(trapContainerRef.current);

    requestAnimationFrame(() => {
      first?.focus();
    });
  }, []);

  const handleFocusContainerKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Tab' && e.target === e.currentTarget) {
        e.preventDefault();
        focusFirstFocusableElement();
      }

      if (e.key === 'Tab' && e.shiftKey && e.target === e.currentTarget) {
        e.preventDefault();
        focusLastFocusableElement();
      }
    },
    [focusFirstFocusableElement, focusLastFocusableElement],
  );

  // Handle autofocus container
  useEffect(() => {
    if (!isActive || !shouldAutoFocus || !trapContainerRef.current) return;

    trapContainerRef.current.setAttribute('tabindex', '0');
    requestAnimationFrame(() => {
      trapContainerRef.current?.focus();
    });

    trapContainerRef.current.addEventListener(
      'keydown',
      handleFocusContainerKeyDown,
    );

    return () => {
      trapContainerRef.current?.removeEventListener(
        'keydown',
        handleFocusContainerKeyDown,
      );
    };
  }, [isActive, shouldAutoFocus, handleFocusContainerKeyDown]);

  // Handle focus trap sentinels
  useEffect(() => {
    if (!isActive || !startTrapRef.current || !endTrapRef.current)
      return;

    configureSentinel(startTrapRef.current);
    startTrapRef.current.addEventListener(
      'focus',
      focusLastFocusableElement,
    );

    configureSentinel(endTrapRef.current);
    endTrapRef.current.addEventListener(
      'focus',
      focusFirstFocusableElement,
    );

    return () => {
      startTrapRef.current?.removeEventListener(
        'focus',
        focusLastFocusableElement,
      );

      endTrapRef.current?.removeEventListener(
        'focus',
        focusFirstFocusableElement,
      );
    };
  }, [
    focusFirstFocusableElement,
    focusLastFocusableElement,
    configureSentinel,
    isActive,
  ]);

  return {
    trapContainerRef,
    startTrapRef,
    endTrapRef,
  };
}
