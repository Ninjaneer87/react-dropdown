'use client';

import { useEffect, useRef } from 'react';

export function useWindowResize(callback: (e?: UIEvent) => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const onResize = () => {
      if (!callbackRef.current) {
        return;
      }

      callbackRef.current();
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
}
