import { useDropdownContext } from '../context/DropdownContext';
import { useDropdownMenuContext } from '../context/DropdownMenuContext';
import { DropdownFooterProps } from '../types';

function DropdownFooter({ children, isSticky }: DropdownFooterProps) {
  const dropdownContext = useDropdownContext();
  const dropdownMenuContext = useDropdownMenuContext();

  if (!dropdownContext) {
    throw new Error(
      'DropdownFooter should be used within a Dropdown component',
    );
  }

  if (!dropdownMenuContext) {
    throw new Error(
      'DropdownFooter should be used within a DropdownMenu component',
    );
  }

  return (
    <footer
      className={`${
        isSticky ? 'sticky bottom-0 z-10 bg-inherit shadow-sm' : ''
      } p-2 mb-2`}
    >
      {children}
    </footer>
  );
}

export default DropdownFooter;
