import { useDropdownContext } from '../../context/DropdownContext';
import { DropdownMenuContext } from '../../context/DropdownMenuContext';
import { usePopoverContext } from '../../context/PopoverContext';
import { DropdownMenuProps } from '../../types';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

const menuClassName =
  'bg-gray-700 rounded-lg w-full min-w-[200px] relative !outline-none !border-none';

function DropdownMenu({ children }: DropdownMenuProps) {
  const dropdownContext = useDropdownContext();
  const popoverContext = usePopoverContext();

  if (!dropdownContext) {
    throw new Error('DropdownMenu should be used within a Dropdown component');
  }

  if (!popoverContext) {
    throw new Error('DropdownMenu should be used within a Popover component');
  }

  const { isOpen } = popoverContext;
  const { containerRef, onKeyDown } = useKeyboardNavigation<HTMLDivElement>({
    isMounted: isOpen,
  });

  return (
    <DropdownMenuContext.Provider value={{}}>
      <div
        className={menuClassName}
        onKeyDown={onKeyDown}
        ref={containerRef}
        tabIndex={0}
      >
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

export default DropdownMenu;
