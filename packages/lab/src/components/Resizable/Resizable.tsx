import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEventHandler,
} from 'react';
import styles from './Resizable.module.scss';
import { cn } from '@/utils/common';
import { useLocalStorage } from '@/hooks';

type HtmlTag =
  | 'div'
  | 'aside'
  | 'main'
  | 'section'
  | 'article'
  | 'footer'
  | 'header'
  | 'nav'
  | 'p'
  | 'span';

type ResizableProps = {
  /**
   * className attached to the resizable element
   */
  className?: string;
  children: React.ReactNode;
  resizableSide: 'left' | 'right';
  minWidth?: number;
  maxWidth?: number;
  initialWidth?: number;
  /**
   * Used for persisting the width value
   */
  name: string;
  isVisible?: boolean;
  as?: HtmlTag;
  /**
   * Ref attached to the resizable element
   */
  ref?: React.RefObject<HTMLElement | null>;
  onResize?: (width: number) => void;
};

/**
 * Component able to resize it's width on a selected side
 */
function Resizable(props: ResizableProps) {
  const {
    className,
    children,
    name,
    resizableSide,
    minWidth = 200,
    maxWidth = 600,
    initialWidth = 200,
    isVisible = true,
    ref,
    as: Component = 'div',
    onResize,
    ...rest
  } = props;
  const resizableRef = useRef<HTMLDivElement>(null);

  const onMouseMoveRef = useRef<((e: MouseEvent) => void) | null>(null);
  const onMouseUpRef = useRef<(() => void) | null>(null);
  const onResizeRef = useRef<(width: number) => void | undefined>(onResize);

  const newWidthRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [isResizing, setIsResizing] = useState(false);
  const [, setSavedWidth, getSavedWidth] = useLocalStorage(
    `${name}-resizable-width`,
    initialWidth,
  );

  const updateWidth = useCallback(() => {
    if (!resizableRef.current || newWidthRef.current === null) {
      animationFrameRef.current = null;
      return;
    }

    const newWidth = newWidthRef.current;
    resizableRef.current.style.width = `${newWidth}px`;
    setSavedWidth(newWidth);
    onResizeRef.current?.(newWidth);

    newWidthRef.current = null;
    animationFrameRef.current = null;
  }, [setSavedWidth]);

  const onMouseUp = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = 'default';

    if (onMouseUpRef.current) {
      document.removeEventListener('mouseup', onMouseUpRef.current);
    }
    if (onMouseMoveRef.current) {
      document.removeEventListener('mousemove', onMouseMoveRef.current);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (!resizableRef.current) return;
      const resizableRect = resizableRef.current.getBoundingClientRect();
      if (!resizableRect) return;

      setIsResizing(true);

      const { clientX } = e;
      const { left, right } = resizableRect;

      let newWidth = right - clientX;
      if (resizableSide === 'right') {
        newWidth = clientX - left;
      }

      newWidthRef.current = Math.max(minWidth, Math.min(maxWidth, newWidth));

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateWidth);
      }
    },
    [maxWidth, minWidth, resizableSide, updateWidth],
  );

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      onMouseUpRef.current = onMouseUp;
      onMouseMoveRef.current = onMouseMove;

      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);

      document.body.style.cursor = 'col-resize';

      e.stopPropagation();
      e.preventDefault();
    },
    [onMouseUp, onMouseMove],
  );

  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  useLayoutEffect(() => {
    if (!resizableRef.current) return;

    onResizeRef.current?.(getSavedWidth());
    resizableRef.current.style.width = `${getSavedWidth()}px`;
  }, [getSavedWidth]);

  useLayoutEffect(() => {
    if (!resizableRef.current) return;

    const elPosition = window.getComputedStyle(resizableRef.current).position;
    if (elPosition === 'static') {
      resizableRef.current.style.position = 'relative';
    }
  }, []);

  // Used for stopping the width-transition while resizing
  useEffect(() => {
    const customEvent = new CustomEvent('resizingInProgress', {
      detail: { resizingInProgress: isResizing },
    });
    window.dispatchEvent(customEvent);
  }, [isResizing]);

  // Clean-up on unmount
  useEffect(() => {
    return () => {
      if (onMouseUpRef.current) {
        document.removeEventListener('mouseup', onMouseUpRef.current);
      }
      if (onMouseMoveRef.current) {
        document.removeEventListener('mousemove', onMouseMoveRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <Component
      className={cn(className, styles.resizable)}
      ref={(node) => {
        resizableRef.current = node;
        if (ref) ref.current = node;
      }}
      {...rest}
    >
      <div
        className={cn(styles.resizer, {
          [styles.resizerResizing]: isResizing,
          [styles.resizerHidden]: !isVisible,
          [styles.resizerLeft]: resizableSide === 'left',
          [styles.resizerRight]: resizableSide === 'right',
        })}
        onMouseDown={onMouseDown}
      >
        <div className={styles.resizerIndicator} />
      </div>

      {children}
    </Component>
  );
}

export default Resizable;
