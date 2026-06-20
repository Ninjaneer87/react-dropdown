'use client';

import { forwardRef } from 'react';
import { useDropdownContext } from '@/context/DropdownContext';
import { DropdownTriggerProps } from '@/types';
import { Slot } from '@/components/utility/Slot';

const DropdownTrigger = forwardRef<
  HTMLElement,
  DropdownTriggerProps & Record<string, unknown>
>(({ children, ...rest }, ref) => {
  const dropdownContext = useDropdownContext();

  if (!dropdownContext) {
    throw new Error(
      'DropdownTrigger should be used within a Dropdown component',
    );
  }

  return (
    <Slot {...rest} ref={ref}>
      {children}
    </Slot>
  );
});

DropdownTrigger.displayName = 'DropdownTrigger';

export default DropdownTrigger;
