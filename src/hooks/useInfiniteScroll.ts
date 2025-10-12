import { useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import { debounceCallback } from '../utils/common';

export interface UseInfiniteScrollProps {
  /**
   * Whether the infinite scroll is enabled.
   * @default true
   */
  isEnabled?: boolean;
  /**
   * Whether there are more items to load, the observer will disconnect when there are no more items to load.
   */
  hasMore?: boolean;
  /**
   * The distance in pixels before the end of the items that will trigger a call to load more.
   * @default 100
   */
  distance?: number;
  /**
   * Use loader element for the scroll detection.
   */
  shouldUseLoader?: boolean;
  /**
   * Callback to load more items.
   */
  onLoadMore?: () => void;

  /**
   * Override opinionated init options for intersection observer.
   */
  optionsOverride?: IntersectionObserverInit;
}

export function useInfiniteScroll<
  LoaderEl extends HTMLElement,
  ScrollContainerEl extends HTMLElement,
>(props: UseInfiniteScrollProps = {}) {
  const {
    hasMore = true,
    distance = 100,
    isEnabled = true,
    shouldUseLoader = true,
    onLoadMore,
    optionsOverride,
  } = props;

  const scrollContainerRef = useRef<ScrollContainerEl>(null);
  const loaderRef = useRef<LoaderEl>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isLoadingRef = useRef(false);
  const onLoadMoreRef = useRef(onLoadMore);
  const optionsRef = useRef(optionsOverride);

  const loadMore = useCallback(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!isLoadingRef.current && hasMore && onLoadMoreRef.current) {
      isLoadingRef.current = true;
      onLoadMoreRef.current();

      timer = setTimeout(() => {
        isLoadingRef.current = false;
      }, 100); // Debounce time to prevent multiple calls
    }

    return () => clearTimeout(timer);
  }, [hasMore]);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    optionsRef.current = optionsOverride;
  }, [optionsOverride]);

  useLayoutEffect(() => {
    const scrollContainerNode = scrollContainerRef.current;

    if (!isEnabled || !scrollContainerNode || !hasMore) return;

    if (shouldUseLoader) {
      const loaderNode = loaderRef.current;

      if (!loaderNode) return;

      const options = {
        root: scrollContainerNode,
        rootMargin: `0px 0px ${distance}px 0px`,
        threshold: 0.1,
        ...optionsRef.current,
      };

      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          loadMore();
        }
      }, options);

      observer.observe(loaderNode);
      observerRef.current = observer;

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }

    const { callback: debouncedCheckIfNearBottom } = debounceCallback(() => {
      if (
        scrollContainerNode.scrollHeight - scrollContainerNode.scrollTop <=
        scrollContainerNode.clientHeight + distance
      ) {
        loadMore();
      }
    }, 100);

    scrollContainerNode.addEventListener('scroll', debouncedCheckIfNearBottom);

    return () => {
      scrollContainerNode.removeEventListener(
        'scroll',
        debouncedCheckIfNearBottom,
      );
    };
  }, [hasMore, distance, isEnabled, shouldUseLoader, loadMore]);

  return [loaderRef, scrollContainerRef] as const;
}

export type UseInfiniteScrollReturn = ReturnType<typeof useInfiniteScroll>;
