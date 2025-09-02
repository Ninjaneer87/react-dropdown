import React from 'react';
import { useSelectContext } from '../../context/SelectContext';
import { SelectSectionProps } from '../../types';
import SelectItem from './SelectItem';
import SelectDivider from './SelectDivider';

function SelectSection({
  children,
  title,
  isStickyTitle = true,
  showDivider = true,
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
          className={`p-1 text-sm font-semibold text-gray-400 mb-2 ${
            isStickyTitle ? 'bg-gray-800 sticky top-0 z-10 rounded-sm' : ''
          }`}
        >
          {title}
        </div>
      )}

      <ul>{children}</ul>

      {showDivider && <SelectDivider />}
    </li>
  );
}

export default SelectSection;
