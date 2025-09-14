import { useEffect, useRef } from 'react';

type Props<T extends Element> = {
  element: T | null;
  onMutation: (list?: MutationRecord[]) => void;
};
export function useMutationObserver<T extends Element>({
  element,
  onMutation,
}: Props<T>) {
  const onMutationRef = useRef(onMutation);

  useEffect(() => {
    onMutationRef.current = onMutation;
  }, [onMutation]);

  useEffect(() => {
    if (!element) return;

    const observer = new MutationObserver((mutations) => {
      console.log({ mutations });
      onMutationRef.current(mutations);
    });

    observer.observe(element, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [element]);
}
