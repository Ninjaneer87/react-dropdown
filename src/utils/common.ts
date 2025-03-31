import { CSSProperties } from 'react';
import { PopoverPlacement } from '../types';

export type Coords = {
  top?: CSSProperties['width'];
  left?: CSSProperties['width'];
  bottom?: CSSProperties['width'];
  right?: CSSProperties['width'];
  translate?: CSSProperties['translate'];
};
export function createPositionFromPlacement(
  placement: PopoverPlacement,
  triggerRect: DOMRect,
): Coords {
  const [position, align] = placement.split('-');

  let top, left, bottom, right, translateY, translateX: CSSProperties['width'];

  // Coords
  // Top
  if (position === 'top') {
    top = triggerRect.top;
    translateY = '-100%';
  }
  // Bottom
  if (position === 'bottom') {
    top = triggerRect.bottom;
  }
  // Left
  if (position === 'left') {
    left = triggerRect.left;
    translateX = '-100%';
  }
  // Right
  if (position === 'right') {
    left = triggerRect.right;
  }

  // Align
  // Start
  if (align === 'start') {
    if (position === 'top' || position === 'bottom') {
      left = triggerRect.left;
    }
    if (position === 'left' || position === 'right') {
      top = triggerRect.top;
    }
  }
  // End
  if (align === 'end') {
    if (position === 'top' || position === 'bottom') {
      left = triggerRect.right;
      translateX = '-100%';
    }
    if (position === 'left' || position === 'right') {
      top = triggerRect.bottom;
      translateY = '-100%';
    }
  }
  // Center
  if (align === undefined) {
    if (position === 'top' || position === 'bottom') {
      left = triggerRect.right - triggerRect.width / 2;
      translateX = '-50%';
    }
    if (position === 'left' || position === 'right') {
      top = triggerRect.bottom - triggerRect.height / 2;
      translateY = '-50%';
    }
  }

  return {
    ...(top !== undefined && { top }),
    ...(left !== undefined && { left }),
    ...(bottom !== undefined && { bottom }),
    ...(right !== undefined && { right }),
    translate: `${translateX ?? '0px'} ${translateY ?? '0px'}`,
  };
}

export function createChildPositionFromPlacement(
  placement: PopoverPlacement,
  triggerRect: DOMRect,
): Coords {
  const [position, align] = placement.split('-');

  let top, left, bottom, right, translateY, translateX: CSSProperties['width'];

  if (position === 'left') {
    // Coords
    // Left
    left = triggerRect.left;
    translateX = '-100%';
  }
  // Right
  if (position === 'top' || position === 'bottom' || position === 'right') {
    left = triggerRect.right;
  }

  // Align
  // Start
  if (!align || align === 'start') {
    if (position === 'left' || position === 'right') {
      top = triggerRect.bottom;
      translateY = '-100%';
    }
  }
  // End
  if (align === 'end') {
    if (position === 'left' || position === 'right') {
      top = triggerRect.top;
    }
  }

  return {
    ...(top !== undefined && { top }),
    ...(left !== undefined && { left }),
    ...(bottom !== undefined && { bottom }),
    ...(right !== undefined && { right }),
    translate: `${translateX ?? '0px'} ${translateY ?? '0px'}`,
  };
}
