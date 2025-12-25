'use client';

import { useEffect, useRef } from 'react';

/**
 * Observes an element's viewport position (top/left) and calls a callback
 * if the position changes, which is useful for detecting movement caused
 * by DOM changes outside of the element's subtree.
 * * @param element The HTML element to observe.
 * @param callback The function to call when the position changes.
 */
export const usePositionObserver = ({
  element,
  callback,
  isActive,
}: {
  element: HTMLElement | null;
  callback: () => void;
  isActive: boolean;
}) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const lastPositionRef = useRef({ top: 0, left: 0 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive || !element) {
      // Clean up any existing frame if the element is null
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    // Initialize the last known position
    const rect = element.getBoundingClientRect();
    lastPositionRef.current = { top: rect.top, left: rect.left };

    const checkPosition = () => {
      const currentRect = element.getBoundingClientRect();
      const currentTop = currentRect.top;
      const currentLeft = currentRect.left;

      const lastTop = lastPositionRef.current.top;
      const lastLeft = lastPositionRef.current.left;

      // Check for position change (only interested in vertical change here, but checking both)
      if (currentTop !== lastTop || currentLeft !== lastLeft) {
        // Position has moved due to reflow
        callbackRef.current();
      }

      // Update the last known position for the next frame
      lastPositionRef.current = { top: currentTop, left: currentLeft };

      // Schedule the check for the next animation frame
      animationFrameRef.current = requestAnimationFrame(checkPosition);
    };

    // Start the continuous check
    animationFrameRef.current = requestAnimationFrame(checkPosition);

    return () => {
      // Cleanup: Stop the animation frame loop when the component unmounts
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [element, isActive]);
};
