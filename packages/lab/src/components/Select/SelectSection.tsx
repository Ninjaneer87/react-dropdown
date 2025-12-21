import React from 'react';
import { useSelectContext } from '../../context/SelectContext';
import { SelectSectionProps } from '../../types';
import SelectItem from './SelectItem';
import SelectDivider from './SelectDivider';
import { cn } from '../../utils/common';

function SelectSection({
  children,
  title,
  isStickyTitle = true,
  showDivider = true,
  classNames,
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
  const { sectionClassNames } = selectContext;
  const baseClassName = cn('bg-inherit');
  const titleClassName = cn(
    'bg-gray-100 p-1 text-sm font-semibold mb-2',
    isStickyTitle ? 'sticky top-0 z-10 rounded-sm' : '',
  );
  const listClassName = 'pl-0 mb-0 list-none';

  return (
    <li
      className={cn(baseClassName, sectionClassNames?.base, classNames?.base)}
    >
      {title && (
        <div
          className={cn(
            titleClassName,
            sectionClassNames?.title,
            classNames?.title,
          )}
        >
          {title}
        </div>
      )}

      <ul className={listClassName}>{children}</ul>

      {showDivider && <SelectDivider />}
    </li>
  );
}

export default SelectSection;
