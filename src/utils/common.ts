import { CSSProperties } from 'react';
import { PopoverAlign, PopoverPlacement, PopoverPosition } from '../types';

export type Coords = {
  top?: CSSProperties['width'];
  left?: CSSProperties['width'];
  bottom?: CSSProperties['width'];
  right?: CSSProperties['width'];
};

export function growContentPosition(
  placement: PopoverPlacement,
  offset: number,
  triggerRect: DOMRect,
): Coords {
  const [position] = placement.split('-') as [PopoverPosition, PopoverAlign];

  let top, left, bottom, right: CSSProperties['width'];

  //! Position
  // Top
  if (position === 'top') {
    bottom = window.innerHeight - triggerRect.top + offset;
    left = 0;
    right = 0;
  }
  // Bottom
  if (position === 'bottom') {
    top = triggerRect.bottom + offset;
    left = 0;
    right = 0;
  }
  // Left
  if (position === 'left') {
    right = window.innerWidth - triggerRect.left + offset;
    top = 0;
    bottom = 0;
    left = 0;
  }
  // Right
  if (position === 'right') {
    left = triggerRect.right + offset;
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
): Coords {
  const [position, align] = placement.split('-') as [
    PopoverPosition,
    PopoverAlign,
  ];

  let top, left, bottom, right: CSSProperties['width'];

  //! Position
  // Top
  if (position === 'top') {
    bottom = window.innerHeight - triggerRect.top + offset;
  }
  // Bottom
  if (position === 'bottom') {
    top = triggerRect.bottom + offset;
  }
  // Left
  if (position === 'left') {
    right = window.innerWidth - triggerRect.left + offset;
  }
  // Right
  if (position === 'right') {
    left = triggerRect.right + offset;
  }

  //! Align
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
      right = window.innerWidth - triggerRect.right;
    }
    if (position === 'left' || position === 'right') {
      bottom = window.innerHeight - triggerRect.bottom;
    }
  }
  // Center
  if (align === 'center') {
    if (position === 'top' || position === 'bottom') {
      left =
        triggerRect.right -
        triggerRect.width / 2 -
        (popoverElement?.clientWidth ?? 1) / 2;
    }
    if (position === 'left' || position === 'right') {
      top =
        triggerRect.bottom -
        triggerRect.height / 2 -
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

export function buildPlacement(
  placement: PopoverPlacement,
  offset: number,
  triggerRect: DOMRect,
  popoverRect: DOMRect | undefined,
): PopoverPlacement {
  if (!popoverRect) {
    return placement;
  }

  const [position, align] = placement.split('-') as [
    PopoverPosition,
    PopoverAlign,
  ];

  //! POSITION FITS CHECK
  let fitPosition = position;

  // Fits top check
  if (position === 'top') {
    const fits = triggerRect.top - popoverRect.height >= offset;
    if (!fits) {
      fitPosition = 'bottom';
    }
  }

  // Fits bottom check
  if (position === 'bottom') {
    const fits =
      window.innerHeight - triggerRect.bottom - popoverRect.height >= offset;
    if (!fits) {
      fitPosition = 'top';
    }
  }

  // Fits left check
  if (position === 'left') {
    const fits = triggerRect.left - popoverRect.width >= offset;
    if (!fits) {
      fitPosition = 'right';
    }
  }

  // Fits right check
  if (position === 'right') {
    const fits =
      window.innerWidth - triggerRect.right - popoverRect.width >= offset;
    if (!fits) {
      fitPosition = 'left';
    }
  }

  //! ALIGN FITS CHECK
  let fitAlign = align;

  // Fits start check
  if (fitAlign === 'start') {
    if (position === 'top' || position === 'bottom') {
      const fits =
        window.innerWidth - triggerRect.left - popoverRect.width >= 0;
      if (!fits) {
        fitAlign = 'center';
      }
    }
    if (position === 'left' || position === 'right') {
      const fits =
        window.innerHeight - triggerRect.top - popoverRect.height >= 0;
      if (!fits) {
        fitAlign = 'center';
      }
    }
  }

  // Fits end check
  if (fitAlign === 'end') {
    if (position === 'top' || position === 'bottom') {
      const fits = triggerRect.right - popoverRect.width >= 0;
      if (!fits) {
        fitAlign = 'center';
      }
    }
    if (position === 'left' || position === 'right') {
      const fits = triggerRect.bottom - popoverRect.height >= 0;
      if (!fits) {
        fitAlign = 'center';
      }
    }
  }

  // Fits center check
  if (fitAlign === 'center') {
    if (position === 'top' || position === 'bottom') {
      const overflowsOnStart =
        triggerRect.right - triggerRect.width / 2 < popoverRect.width / 2;
      if (overflowsOnStart) {
        fitAlign = 'start';
      }

      const overflowsOnEnd =
        window.innerWidth - triggerRect.left - triggerRect.width / 2 <
        popoverRect.width / 2;
      if (overflowsOnEnd) {
        fitAlign = 'end';
      }
    }

    if (position === 'left' || position === 'right') {
      const overflowsOnStart =
        triggerRect.bottom - triggerRect.height / 2 < popoverRect.height / 2;
      if (overflowsOnStart) {
        fitAlign = 'start';
      }

      const overflowsOnEnd =
        window.innerHeight - triggerRect.top - triggerRect.height / 2 <
        popoverRect.height / 2;
      if (overflowsOnEnd) {
        fitAlign = 'end';
      }
    }
  }

  const fitPlacement = `${fitPosition}-${fitAlign}` as PopoverPlacement;

  return fitPlacement;
}
