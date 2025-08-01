import React from 'react';
import { useSelectContext } from '../../context/SelectContext';
import { SelectSectionProps } from '../../types';
import SelectItem from './SelectItem';

function SelectSection({
  children,
  title,
  isStickyTitle = true,
}: SelectSectionProps) {
  const dropdownContext = useSelectContext();

  if (!dropdownContext) {
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

  return (
    <li className={`bg-inherit`}>
      {title && (
        <div
          className={`py-2 text-sm font-semibold text-gray-400 ${
            isStickyTitle ? 'bg-inherit sticky top-0 z-10' : ''
          }`}
        >
          {title}
        </div>
      )}
      <ul>{children}</ul>
    </li>
  );
}

export default SelectSection;
