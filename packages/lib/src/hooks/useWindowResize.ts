import { useEffect } from 'react';

export function useWindowResize(callback: (e?: UIEvent) => void) {
  useEffect(() => {
    window.addEventListener('resize', callback);

    return () => {
      window.removeEventListener('resize', callback);
    };
  }, [callback]);
}
