'use client';

import { useEffect, useRef } from 'react';

type Props = {
  onMutation: (list?: MutationRecord[]) => void;
  isActive?: boolean;
};
export function useMutationObserver<T extends Element>({
  onMutation,
  isActive,
}: Props) {
  const onMutationRef = useRef(onMutation);
  const mutationContainerRef = useRef<T>(null);

  useEffect(() => {
    onMutationRef.current = onMutation;
  }, [onMutation]);

  useEffect(() => {
    if (!isActive || !mutationContainerRef.current) return;

    const observer = new MutationObserver((mutations) => {
      onMutationRef.current(mutations);
    });

    observer.observe(mutationContainerRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [isActive]);

  return { mutationContainerRef };
}
