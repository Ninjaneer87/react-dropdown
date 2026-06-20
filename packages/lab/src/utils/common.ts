import { CSSProperties } from 'react';
import { PopoverAlign, PopoverPlacement, PopoverPosition } from '../types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export type Coords = {
  top?: CSSProperties['width'];
  left?: CSSProperties['width'];
  bottom?: CSSProperties['width'];
  right?: CSSProperties['width'];
};

type ViewportMetrics = {
  width: number;
  height: number;
  left: number;
  top: number;
};

type RectMetrics = {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
};

function getViewportMetrics(viewportElement?: Element | null): ViewportMetrics {
  if (!viewportElement) {
    const vv = window.visualViewport;
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      left: -(vv?.offsetLeft ?? 0),
      top: -(vv?.offsetTop ?? 0),
    };
  }

  const rect = viewportElement.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    left: rect.left,
    top: rect.top,
  };
}

function toViewportRelativeRect(
  rect: DOMRect,
  viewport: ViewportMetrics,
): RectMetrics {
  return {
    top: rect.top - viewport.top,
    bottom: rect.bottom - viewport.top,
    left: rect.left - viewport.left,
    right: rect.right - viewport.left,
    width: rect.width,
    height: rect.height,
  };
}

export function growContentPosition(
  placement: PopoverPlacement,
  offset: number,
  triggerRect: DOMRect,
  viewportElement?: Element | null,
): Coords {
  const [position] = placement.split('-') as [PopoverPosition, PopoverAlign];

  const viewport = getViewportMetrics(viewportElement);
  const trigger = toViewportRelativeRect(triggerRect, viewport);

  let top, left, bottom, right: CSSProperties['width'];

  //! Position
  // Top
  if (position === 'top') {
    bottom = viewport.height - trigger.top + offset;
    left = 0;
    right = 0;
  }
  // Bottom
  if (position === 'bottom') {
    top = trigger.bottom + offset;
    left = 0;
    right = 0;
  }
  // Left
  if (position === 'left') {
    right = viewport.width - trigger.left + offset;
    top = 0;
    bottom = 0;
    left = 0;
  }
  // Right
  if (position === 'right') {
    left = trigger.right + offset;
    top = 0;
    bottom = 0;
    right = 0;
  }

  return {
    ...(top !== undefined && { top }),
    ...(left !== undefined && { left }),
    ...(bottom !== undefined && { bottom }),
    ...(right !== undefined && { right }),
  };
}

export function createPositionFromPlacement(
  placement: PopoverPlacement,
  offset: number,
  triggerRect: DOMRect,
  popoverElement: HTMLDivElement | undefined,
  viewportElement?: Element | null,
): Coords {
  const [position, align] = placement.split('-') as [
    PopoverPosition,
    PopoverAlign,
  ];

  const viewport = getViewportMetrics(viewportElement);
  const trigger = toViewportRelativeRect(triggerRect, viewport);

  let top, left, bottom, right: CSSProperties['width'];

  //! Position
  // Top
  if (position === 'top') {
    bottom = viewport.height - trigger.top + offset;
  }
  // Bottom
  if (position === 'bottom') {
    top = trigger.bottom + offset;
  }
  // Left
  if (position === 'left') {
    right = viewport.width - trigger.left + offset;
  }
  // Right
  if (position === 'right') {
    left = trigger.right + offset;
  }

  //! Align
  // Start
  if (align === 'start') {
    if (position === 'top' || position === 'bottom') {
      left = trigger.left;
    }
    if (position === 'left' || position === 'right') {
      top = trigger.top;
    }
  }
  // End
  if (align === 'end') {
    if (position === 'top' || position === 'bottom') {
      right = viewport.width - trigger.right;
    }
    if (position === 'left' || position === 'right') {
      bottom = viewport.height - trigger.bottom;
    }
  }
  // Center
  if (align === 'center') {
    if (position === 'top' || position === 'bottom') {
      left =
        trigger.right -
        trigger.width / 2 -
        (popoverElement?.clientWidth ?? 1) / 2;
    }
    if (position === 'left' || position === 'right') {
      top =
        trigger.bottom -
        trigger.height / 2 -
        (popoverElement?.clientHeight ?? 1) / 2;
    }
  }

  return {
    ...(top !== undefined && { top }),
    ...(left !== undefined && { left }),
    ...(bottom !== undefined && { bottom }),
    ...(right !== undefined && { right }),
  };
}

export function buildDynamicPlacement(
  placement: PopoverPlacement,
  offset: number,
  triggerRect: DOMRect,
  popoverRect: DOMRect | undefined,
  viewportElement?: Element | null,
): PopoverPlacement {
  if (!popoverRect) {
    return placement;
  }

  const viewport = getViewportMetrics(viewportElement);
  const trigger = toViewportRelativeRect(triggerRect, viewport);

  const [position, align] = placement.split('-') as [
    PopoverPosition,
    PopoverAlign,
  ];

  //! POSITION FITS CHECK
  let fitPosition = position;

  const fitsTop = trigger.top - popoverRect.height >= offset;
  const fitsBottom =
    viewport.height - trigger.bottom - popoverRect.height >= offset;
  const fitsLeft = trigger.left - popoverRect.width >= offset;
  const fitsRight =
    viewport.width - trigger.right - popoverRect.width >= offset;

  // Fits top check
  if (position === 'top') {
    if (fitsTop) {
      fitPosition = 'top';
    } else if (fitsBottom) {
      fitPosition = 'bottom';
    }
  }

  // Fits bottom check
  if (position === 'bottom') {
    if (fitsBottom) {
      fitPosition = 'bottom';
    } else if (fitsTop) {
      fitPosition = 'top';
    }
  }

  // Fits left check
  if (position === 'left') {
    if (fitsLeft) {
      fitPosition = 'left';
    } else if (fitsRight) {
      fitPosition = 'right';
    } else if (fitsBottom) {
      fitPosition = 'bottom';
    } else if (fitsTop) {
      fitPosition = 'top';
    }
  }

  // Fits right check
  if (position === 'right') {
    if (fitsRight) {
      fitPosition = 'right';
    } else if (fitsLeft) {
      fitPosition = 'left';
    } else if (fitsBottom) {
      fitPosition = 'bottom';
    } else if (fitsTop) {
      fitPosition = 'top';
    }
  }

  //! ALIGN FITS CHECK
  let fitAlign = align;

  // Fits start check
  if (fitAlign === 'start') {
    if (position === 'top' || position === 'bottom') {
      const fits = viewport.width - trigger.left - popoverRect.width >= 0;
      if (!fits) {
        fitAlign = 'center';
      }
    }
    if (position === 'left' || position === 'right') {
      const fits = viewport.height - trigger.top - popoverRect.height >= 0;
      if (!fits) {
        fitAlign = 'center';
      }
    }
  }

  // Fits end check
  if (fitAlign === 'end') {
    if (position === 'top' || position === 'bottom') {
      const fits = trigger.right - popoverRect.width >= 0;
      if (!fits) {
        fitAlign = 'center';
      }
    }
    if (position === 'left' || position === 'right') {
      const fits = trigger.bottom - popoverRect.height >= 0;
      if (!fits) {
        fitAlign = 'center';
      }
    }
  }

  // Fits center check
  if (fitAlign === 'center') {
    if (position === 'top' || position === 'bottom') {
      const overflowsOnStart =
        trigger.right - trigger.width / 2 < popoverRect.width / 2;
      if (overflowsOnStart) {
        fitAlign = 'start';
      }

      const overflowsOnEnd =
        viewport.width - trigger.left - trigger.width / 2 <
        popoverRect.width / 2;
      if (overflowsOnEnd) {
        fitAlign = 'end';
      }
    }

    if (position === 'left' || position === 'right') {
      const overflowsOnStart =
        trigger.bottom - trigger.height / 2 < popoverRect.height / 2;
      if (overflowsOnStart) {
        fitAlign = 'start';
      }

      const overflowsOnEnd =
        viewport.height - trigger.top - trigger.height / 2 <
        popoverRect.height / 2;
      if (overflowsOnEnd) {
        fitAlign = 'end';
      }
    }
  }

  return `${fitPosition}-${fitAlign}` as const;
}

let debounceTimer: ReturnType<typeof setTimeout>;
let progressTimer: ReturnType<typeof setTimeout>;
export function debounceCallback<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
  delay: number,
) {
  let progress = 0;
  let isInProgress = false;

  const debouncedCallback = (...args: Args) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    if (progressTimer) clearTimeout(progressTimer);

    progress = 0;
    isInProgress = false;

    progressTimer = setTimeout(() => {
      progress = 100;
      isInProgress = true;

      if (progressTimer) clearTimeout(progressTimer);
    }, 10);

    debounceTimer = setTimeout(() => {
      callback(...args);

      isInProgress = false;
      if (debounceTimer) clearTimeout(debounceTimer);
    }, delay);
  };
  return { callback: debouncedCallback, progress, isInProgress };
}
