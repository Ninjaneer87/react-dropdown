/* eslint-disable react-hooks/refs */
import { useCallback, useRef, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const initialValueRef = useRef(initialValue);
  const getValue = useCallback(() => {
    try {
      const storageValue = localStorage.getItem(key);
      const value: T = storageValue
        ? JSON.parse(storageValue)
        : initialValueRef.current;
      return value;
    } catch {
      return initialValueRef.current;
    }
  }, [key]);
  const [storedValue, setStoredValue] = useState(getValue);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prevValue) => {
        const newValue = value instanceof Function ? value(prevValue) : value;

        localStorage.setItem(key, JSON.stringify(newValue));
        return newValue;
      });
    },
    [key],
  );

  return [storedValue, setValue, getValue] as const;
}
