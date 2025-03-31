import { useDropdownContext } from '../context/DropdownContext';
import { useDropdownMenuContext } from '../context/DropdownMenuContext';
import { DropdownHeaderProps } from '../types';

function DropdownHeader({ children, isSticky }: DropdownHeaderProps) {
  const dropdownContext = useDropdownContext();
  const dropdownMenuContext = useDropdownMenuContext();

  if (!dropdownContext) {
    throw new Error(
      'DropdownHeader should be used within a Dropdown component',
    );
  }

  if (!dropdownMenuContext) {
    throw new Error(
      'DropdownHeader should be used within a DropdownMenu component',
    );
  }

  return (
    <header
      className={`${
        isSticky ? 'sticky top-0 z-10 bg-inherit shadow-sm' : ''
      } p-2 mb-2`}
    >
      {children}
    </header>
  );
}

export default DropdownHeader;
