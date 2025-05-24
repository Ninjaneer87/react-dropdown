import { useEffect, useRef, useState } from 'react';
import { useDropdownContext } from '../../context/DropdownContext';
import { DropdownMenuContext } from '../../context/DropdownMenuContext';
import { usePopoverContext } from '../../context/PopoverContext';
import { DropdownMenuProps } from '../../types';

const menuClassName =
  'bg-gray-700 rounded-2xl w-full min-w-[200px] relative !outline-none !border-none';

function DropdownMenu({ children }: DropdownMenuProps) {
  const dropdownContext = useDropdownContext();
  const popoverContext = usePopoverContext();
  const menuRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | undefined>();
  const [dropdownItemsLength, setDropdownItemsLength] = useState(0);

  if (!dropdownContext) {
    throw new Error('DropdownMenu should be used within a Dropdown component');
  }

  if (!popoverContext) {
    throw new Error('DropdownMenu should be used within a Popover component');
  }

  const { handleClose } = popoverContext;

  useEffect(() => {
    menuRef.current?.focus();
  }, []);

  useEffect(() => {
    focusItem(focusedIndex);
  }, [focusedIndex]);

  function focusItem(index: number | undefined) {
    const menuElement = menuRef.current;
    if (!menuElement) return;

    const dropdownItems = [
      ...menuElement.querySelectorAll('[data-dropdown-item]'),
    ].filter((element) => !element.hasAttribute('disabled'));
    setDropdownItemsLength(dropdownItems.length);

    if (index === undefined) return;

    if (dropdownItems.length > 0) {
      const firstFocusableElement = dropdownItems[index] as HTMLElement;
      firstFocusableElement.focus();
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    event.stopPropagation();

    if (event.key === 'Escape') {
      event.stopPropagation();
      handleClose();

      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (focusedIndex === undefined) {
        focusItem(dropdownItemsLength - 1);
        setFocusedIndex(dropdownItemsLength - 1);
        return;
      }

      setFocusedIndex((prevIndex) => {
        if (prevIndex === undefined) return undefined;

        const newIndex = prevIndex - 1;
        return newIndex < 0 ? dropdownItemsLength - 1 : newIndex;
      });

      if (focusedIndex === undefined) {
        focusItem(dropdownItemsLength - 1);
      }

      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (focusedIndex === undefined) {
        focusItem(0);
        setFocusedIndex(0);
        return;
      }

      setFocusedIndex((prevIndex) => {
        if (prevIndex === undefined) return undefined;

        const newIndex = prevIndex + 1;
        return newIndex < dropdownItemsLength ? newIndex : 0;
      });

      return;
    }
  }

  return (
    <DropdownMenuContext.Provider value={{}}>
      <div
        className={menuClassName}
        onKeyDown={onKeyDown}
        ref={menuRef}
        tabIndex={0}
      >
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

export default DropdownMenu;
