import { useEffect, useRef } from 'react';

type Props<T extends Element> = {
  element: T | null;
  onResize: (entries?: ResizeObserverEntry[]) => void;
};
export const useResizeObserver = <T extends Element>({
  element,
  onResize,
}: Props<T>) => {
  const onResizeRef = useRef(onResize);

  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  useEffect(() => {
    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      onResizeRef.current(entries);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element]);
};
