import { useDropdownContext } from '../../context/DropdownContext';
import { DropdownMenuContext } from '../../context/DropdownMenuContext';
import { usePopoverContext } from '../../context/PopoverContext';
import { DropdownMenuProps } from '../../types';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { cn } from '../../utils/common';

function DropdownMenu({ children, classNames }: DropdownMenuProps) {
  const dropdownContext = useDropdownContext();
  const popoverContext = usePopoverContext();

  if (!dropdownContext) {
    throw new Error('DropdownMenu should be used within a Dropdown component');
  }

  if (!popoverContext) {
    throw new Error('DropdownMenu should be used within a Popover component');
  }

  const { autoFocus, classNames: contextClassNames } = dropdownContext;
  const { isOpen } = popoverContext;
  const { containerRef, onKeyDown } = useKeyboardNavigation<HTMLDivElement>({
    isActive: isOpen,
    autoFocus,
  });

  const baseClassName =
    'bg-gray-700 rounded-lg w-full min-w-[200px] relative !outline-none !border-none';

  return (
    <DropdownMenuContext.Provider value={{}}>
      <div
        className={cn(
          baseClassName,
          contextClassNames?.menu?.base,
          classNames?.base,
        )}
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
