import { useDropdownContext } from '../../context/DropdownContext';
import { DropdownMenuContext } from '../../context/DropdownMenuContext';
import { usePopoverContext } from '../../context/PopoverContext';
import { DropdownMenuProps } from '../../types';

const menuClassName = 'bg-gray-700 rounded-2xl min-w-40 relative';

function DropdownMenu({ children }: DropdownMenuProps) {
  const dropdownContext = useDropdownContext();
  const popoverContext = usePopoverContext();

  if (!dropdownContext) {
    throw new Error('DropdownMenu should be used within a Dropdown component');
  }

  if (!popoverContext) {
    throw new Error('DropdownMenu should be used within a Popover component');
  }

  const { handleClose } = popoverContext;

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      handleClose();
    }
  }
  return (
    <DropdownMenuContext.Provider value={{}}>
      <div className={menuClassName} onKeyDown={onKeyDown}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

export default DropdownMenu;
