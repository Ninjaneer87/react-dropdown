'use client';

import { PopoverContentProps } from '../../types';
import { usePopoverContext } from '../../context/PopoverContext';

function PopoverContent({ children }: PopoverContentProps) {
  const popoverContext = usePopoverContext();

  if (!popoverContext) {
    throw new Error('PopoverContent should be used within a Popover component');
  }

  return children;
}

export default PopoverContent;
