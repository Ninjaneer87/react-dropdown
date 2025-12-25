'use client';

import { useCallback, useState } from 'react';

let debounceTimer: ReturnType<typeof setTimeout>;
let progressTimer: ReturnType<typeof setTimeout>;

export function useDebouncedCallback<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
  delay: number,
) {
  const [progress, setProgress] = useState(0);
  const [isInProgress, setIsInProgress] = useState(false);

  const debouncedCallback = useCallback(
    (...args: Args) => {
      if (debounceTimer) clearTimeout(debounceTimer);
      if (progressTimer) clearTimeout(progressTimer);

      setProgress(0);
      setIsInProgress(false);

      progressTimer = setTimeout(() => {
        setProgress(100);
        setIsInProgress(true);

        if (progressTimer) clearTimeout(progressTimer);
      }, 10);

      debounceTimer = setTimeout(() => {
        callback(...args);

        setIsInProgress(false);
        if (debounceTimer) clearTimeout(debounceTimer);
      }, delay);
    },
    [callback, delay],
  );

  return { callback: debouncedCallback, progress, isInProgress };
}
