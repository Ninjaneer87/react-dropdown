import { useDropdownContext } from '../../context/DropdownContext';
import {
  DropdownMenuContext,
  useDropdownMenuContext,
} from '../../context/DropdownMenuContext';
import { DropdownMenuProps } from '../../types';

const menuClassName =
  'bg-gray-700 rounded-2xl min-w-40 relative';

function DropdownMenu({ children }: DropdownMenuProps) {
  const dropdownContext = useDropdownContext();
  const dropdownMenuContext = useDropdownMenuContext();
  const isRootDropdownMenu = dropdownMenuContext === null;

  if (!dropdownContext) {
    throw new Error('DropdownMenu should be used within a Dropdown component');
  }

  if (isRootDropdownMenu) {
    return (
      <DropdownMenuContext.Provider value={{}}>
        <div className={menuClassName}>{children}</div>
      </DropdownMenuContext.Provider>
    );
  }

  return <div className={menuClassName}>{children}</div>;
}

export default DropdownMenu;
