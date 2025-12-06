import { useEffect, useRef } from 'react';

export function useFocusTrap(isActive: boolean, shouldAutoFocus = true) {
  const focusContainerRef = useRef<HTMLDivElement>(null);
  const firstFocusableItemRef = useRef<HTMLDivElement>(null);
  const lastFocusableItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) {
      return () => {
        document.removeEventListener('keydown', trapFocus);
      };
    }

    function trapFocus(event: KeyboardEvent) {
      if (event.key !== 'Tab') return;

      const firstElement = firstFocusableItemRef.current;
      const lastElement = lastFocusableItemRef.current;

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    if (shouldAutoFocus) {
      firstFocusableItemRef.current?.focus(); // Auto-focus first element when mounted
    }

    document.addEventListener('keydown', trapFocus);

    return () => {
      document.removeEventListener('keydown', trapFocus);
    };
  }, [isActive, shouldAutoFocus]);

  return { focusContainerRef, firstFocusableItemRef, lastFocusableItemRef };
}
