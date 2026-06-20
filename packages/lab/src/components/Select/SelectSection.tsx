'use client';

import React from 'react';
import { useSelectContext } from '@/context/SelectContext';
import { SelectSectionProps } from '@/types';
import SelectItem from '@/components/Select/SelectItem';
import SelectDivider from '@/components/Select/SelectDivider';
import { cn } from '@/utils/common';

function SelectSection({
  children,
  title,
  isStickyTitle = true,
  showDivider = true,
  classNames,
  truncate: localTruncate,
}: SelectSectionProps) {
  const selectContext = useSelectContext();

  if (!selectContext) {
    throw new Error('SelectSection should be used within a Select component');
  }

  // Validate children
  if (children) {
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      if (child.type !== SelectItem) {
        throw new Error(
          `"SelectSection" component only accepts "SelectItem" components as children`,
        );
      }
    });
  }
  const { sectionClassNames, truncate: globalTruncate } = selectContext;
  const truncateSectionTitle = localTruncate?.sectionTitle ?? globalTruncate?.sectionTitle;

  const baseClassName = cn('bg-inherit');
  const titleClassName = cn(
    'bg-gray-100 p-1 text-[0.875em] font-semibold mb-2',
    isStickyTitle ? 'sticky top-0 z-10 rounded-sm' : '',
    truncateSectionTitle ? 'line-clamp-1 break-all' : '',
  );
  const listClassName = 'pl-0 mb-0 list-none';

  return (
    <li
      data-select-section
      className={cn(baseClassName, sectionClassNames?.base, classNames?.base)}
    >
      {title && (
        <div
          data-select-section-title
          className={cn(
            titleClassName,
            sectionClassNames?.title,
            classNames?.title,
          )}
        >
          {title}
        </div>
      )}

      <ul data-select-section-list className={listClassName}>
        {children}
      </ul>

      {showDivider && <SelectDivider />}
    </li>
  );
}

export default SelectSection;
