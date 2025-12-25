'use client';

import { useDropdownContext } from '../../context/DropdownContext';
import { useDropdownMenuContext } from '../../context/DropdownMenuContext';
import { DropdownDividerProps } from '../../types';
import { cn } from '../../utils/common';
import { dividerBaseClassName } from '../../utils/elements';

function DropdownDivider({ classNames }: DropdownDividerProps) {
  const dropdownContext = useDropdownContext();
  const dropdownMenuContext = useDropdownMenuContext();

  if (!dropdownContext) {
    throw new Error(
      'DropdownDivider should be used within a Dropdown component',
    );
  }

  if (!dropdownMenuContext) {
    throw new Error(
      'DropdownDivider should be used within a DropdownMenu component',
    );
  }

  const { classNames: contextClassNames } = dropdownContext;

  return (
    <div
      className={cn(
        dividerBaseClassName,
        contextClassNames?.divider?.base,
        classNames?.base,
      )}
    />
  );
}

export default DropdownDivider;
