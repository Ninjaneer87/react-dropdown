'use client';

import { useDropdownContext } from '../../context/DropdownContext';
import { DropdownTriggerProps } from '../../types';
import { Slot } from '@/components/utility/Slot';

function DropdownTrigger({
  children,
  ...rest
}: DropdownTriggerProps & Record<string, unknown>) {
  const dropdownContext = useDropdownContext();

  if (!dropdownContext) {
    throw new Error(
      'DropdownTrigger should be used within a Dropdown component',
    );
  }

  return <Slot {...rest}>{children}</Slot>;
}

export default DropdownTrigger;
