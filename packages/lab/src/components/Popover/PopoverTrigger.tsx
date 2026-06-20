'use client';

import React, { forwardRef } from 'react';
import { PopoverTriggerProps } from '@/types';
import { usePopoverContext } from '@/context/PopoverContext';
import { Slot } from '@/components/utility/Slot';

const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
  ({ children, ...rest }, ref) => {
    const popoverContext = usePopoverContext();

    if (!popoverContext) {
      throw new Error(
        'PopoverTrigger should be used within a Popover component',
      );
    }

    const child = React.Children.only(children);

    if (React.isValidElement(child) && child.type === React.Fragment) {
      throw new Error(
        'PopoverTrigger requires a single element, not a React.Fragment',
      );
    }

    return (
      <Slot {...rest} ref={ref}>
        {child}
      </Slot>
    );
  },
);

PopoverTrigger.displayName = 'PopoverTrigger';

export default PopoverTrigger;
