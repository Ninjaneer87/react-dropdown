/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';

let debounceTimer: ReturnType<typeof setTimeout>;
let progressTimer: ReturnType<typeof setTimeout>;

export function useDebouncedValue<T>(
  value: T,
  delay: number,
): { value: T; progress: number; isInProgress: boolean } {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [progress, setProgress] = useState(0);
  const [isInProgress, setIsInProgress] = useState(false);

  useEffect(() => {
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
      setDebouncedValue(value);

      setIsInProgress(false);
      if (debounceTimer) clearTimeout(debounceTimer);
    }, delay);
  }, [value, delay]);

  return { value: debouncedValue, progress, isInProgress };
}
