import { useEffect } from 'react';
import { usePopoverContext } from '../../context/PopoverContext';
import { useSelectContext } from '../../context/SelectContext';
import { cn } from '../../utils/common';

type Props = {
  placeholder: string;
  searchRef: React.RefObject<HTMLInputElement | null>;
  className?: string;
};

function SelectSearch({
  placeholder = 'Search...',
  searchRef,
  className,
}: Props) {
  const popoverContext = usePopoverContext();
  const selectContext = useSelectContext();

  if (!popoverContext) {
    throw new Error('SelectSearch should be used within a Popover component');
  }
  if (!selectContext) {
    throw new Error('SelectSearch should be used within a Select component');
  }

  const { popoverId, isOpen, handleClose, handleOpen } = popoverContext;
  const {
    selected,
    setSelected,
    focusItem,
    setSearchValue,
    searchValue,
    onSearchChange,
  } = selectContext;

  useEffect(() => {
    if (!isOpen || !searchRef.current) return () => setSearchValue('');

    searchRef.current.focus();

    return () => setSearchValue('');
  }, [isOpen, setSearchValue, searchRef]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();
    setSearchValue(e.target.value);
    onSearchChange?.(e.target.value);
  }

  function onClick(e: React.MouseEvent<HTMLInputElement>) {
    if (!isOpen) return;

    e.preventDefault();
    e.stopPropagation();
  }

  function onKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
    }

    if (e.key === 'Tab') {
      handleClose(false);
    }

    if (e.key === 'Backspace') {
      if (!e.currentTarget.value && selected.length > 0) {
        e.preventDefault();
        e.stopPropagation();

        setSelected((prev) => prev.slice(0, -1));
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      focusItem({ focusLast: true });
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      focusItem({ index: 0 });
    }
  }

  function onFocus() {
    handleOpen();
  }

  const baseClassName =
    'outline-none! bg-transparent border-none! grow max-w-full min-w-10 basis-10 text-[1em] leading-[1.2em] text-inherit p-0 font-[inherit] placeholder:text-gray-500';

  return (
    <input
      onClick={onClick}
      onKeyDown={onKeydown}
      onChange={onChange}
      onFocus={onFocus}
      tabIndex={-1}
      value={searchValue}
      ref={searchRef}
      className={cn(baseClassName, className)}
      data-select-search={popoverId}
      placeholder={selected.length > 0 ? '' : placeholder}
    />
  );
}

export default SelectSearch;
