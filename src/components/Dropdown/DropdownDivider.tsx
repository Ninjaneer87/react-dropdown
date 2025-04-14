import { useDropdownContext } from '../../context/DropdownContext';
import { useDropdownMenuContext } from '../../context/DropdownMenuContext';

function DropdownDivider() {
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

  return <div className="h-[1px] bg-gray-400 w-full my-2" />;
}

export default DropdownDivider;
