import { useDropdownContext } from '../../context/DropdownContext';
import { useDropdownMenuContext } from '../../context/DropdownMenuContext';
import { DropdownSectionProps } from '../../types';

function DropdownSection({ children, scrolling }: DropdownSectionProps) {
  const dropdownContext = useDropdownContext();
  const dropdownMenuContext = useDropdownMenuContext();

  if (!dropdownContext) {
    throw new Error(
      'DropdownSection should be used within a Dropdown component',
    );
  }

  if (!dropdownMenuContext) {
    throw new Error(
      'DropdownSection should be used within a DropdownMenu component',
    );
  }

  return (
    <div
      className={`bg-inherit ${
        scrolling ? 'max-h-[200px] overflow-y-auto ' : ''
      }`}
    >
      {children}
    </div>
  );
}

export default DropdownSection;
