import { useDropdownContext } from '../../context/DropdownContext';
import { DropdownTriggerProps } from '../../types';

function DropdownTrigger({ children }: DropdownTriggerProps) {
  const dropdownContext = useDropdownContext();

  if (!dropdownContext) {
    throw new Error(
      'DropdownTrigger should be used within a Dropdown component',
    );
  }

  return children;
}

export default DropdownTrigger;
