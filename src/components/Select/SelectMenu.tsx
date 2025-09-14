import { usePopoverContext } from '../../context/PopoverContext';
import { SelectMenuContext } from '../../context/SelectMenuContext';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { SelectMenuProps } from '../../types';
import { cn } from '../../utils/common';

function SelectMenu({
  children,
  classNames,
  autoFocusMenu = true,
}: SelectMenuProps) {
  const popoverContext = usePopoverContext();

  if (!popoverContext) {
    throw new Error('SelectMenu should be used within a Popover component');
  }

  const { popoverId } = popoverContext;

  function focusTrigger() {
    console.log('onFirstUp');
    const searchInput = document.querySelector(
      `[data-select-search="${popoverId}"]`,
    ) as HTMLElement;
    searchInput?.focus();
  }

  const { containerRef, onKeyDown, setFocusedIndex } =
    useKeyboardNavigation<HTMLDivElement>({
      autoFocus: 'none',
      onFirstUp: focusTrigger,
      onLastDown: focusTrigger,
    });

  const baseClassName = 'relative !outline-none !border-none p-2 grow';

  return (
    <SelectMenuContext.Provider value={{ setFocusedIndex }}>
      <div
        className={cn(baseClassName, classNames?.base)}
        ref={containerRef}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        {children}
      </div>
    </SelectMenuContext.Provider>
  );
}

export default SelectMenu;
