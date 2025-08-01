import { PropsWithChildren } from 'react';
import { usePopoverContext } from '../../context/PopoverContext';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

function SelectMenu({ children }: PropsWithChildren) {
  const popoverContext = usePopoverContext();
  const { menuRef, onKeyDown } = useKeyboardNavigation({
    itemSelector: '[data-select-item]',
  });

  if (!popoverContext) {
    throw new Error('SelectMenu should be used within a Popover component');
  }

  return (
    <div
      className="relative !outline-none !border-none"
      onKeyDown={onKeyDown}
      ref={menuRef}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

export default SelectMenu;
