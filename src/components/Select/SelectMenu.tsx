import { usePopoverContext } from '../../context/PopoverContext';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { SelectMenuProps } from '../../types';
import { cn } from '../../utils/common';

function SelectMenu({ children, classNames }: SelectMenuProps) {
  const popoverContext = usePopoverContext();
  const { menuRef, onKeyDown } = useKeyboardNavigation({
    itemSelector: '[data-select-item]',
  });

  if (!popoverContext) {
    throw new Error('SelectMenu should be used within a Popover component');
  }

  const baseClassName = 'relative !outline-none !border-none p-2 grow';

  return (
    <div
      className={cn(baseClassName, classNames?.base)}
      onKeyDown={onKeyDown}
      ref={menuRef}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

export default SelectMenu;
