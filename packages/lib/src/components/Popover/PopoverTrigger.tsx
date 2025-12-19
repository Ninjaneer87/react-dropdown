import React from 'react';
import { PopoverTriggerProps } from '../../types';
import { usePopoverContext } from '../../context/PopoverContext';
import { Slot } from '@/components/utility/Slot';

function PopoverTrigger({ children, ...rest }: PopoverTriggerProps) {
  const popoverContext = usePopoverContext();

  if (!popoverContext) {
    throw new Error('PopoverTrigger should be used within a Popover component');
  }

  const child = React.Children.only(children);

  if (React.isValidElement(child) && child.type === React.Fragment) {
    throw new Error(
      'PopoverTrigger requires a single element, not a React.Fragment',
    );
  }

  return <Slot {...rest}>{child}</Slot>;
}

export default PopoverTrigger;
