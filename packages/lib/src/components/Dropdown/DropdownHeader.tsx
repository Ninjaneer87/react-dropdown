import { useDropdownContext } from '../../context/DropdownContext';
import { useDropdownMenuContext } from '../../context/DropdownMenuContext';
import { DropdownHeaderProps } from '../../types';
import { cn } from '../../utils/common';

function DropdownHeader({
  children,
  isSticky,
  classNames,
}: DropdownHeaderProps) {
  const dropdownContext = useDropdownContext();
  const dropdownMenuContext = useDropdownMenuContext();

  if (!dropdownContext) {
    throw new Error(
      'DropdownHeader should be used within a Dropdown component',
    );
  }

  if (!dropdownMenuContext) {
    throw new Error(
      'DropdownHeader should be used within a DropdownMenu component',
    );
  }

  const { classNames: contextClassNames } = dropdownContext;

  const baseClassName = cn(
    'p-2',
    isSticky ? 'sticky top-0 z-10 bg-inherit shadow-sm' : '',
  );

  return (
    <header
      className={cn(
        baseClassName,
        contextClassNames?.header?.base,
        classNames?.base,
      )}
    >
      {children}
    </header>
  );
}

export default DropdownHeader;
