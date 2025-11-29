import { useDropdownContext } from '../../context/DropdownContext';
import { useDropdownMenuContext } from '../../context/DropdownMenuContext';
import { DropdownFooterProps } from '../../types';
import { cn } from '../../utils/common';

function DropdownFooter({
  children,
  isSticky,
  classNames,
}: DropdownFooterProps) {
  const dropdownContext = useDropdownContext();
  const dropdownMenuContext = useDropdownMenuContext();

  if (!dropdownContext) {
    throw new Error(
      'DropdownFooter should be used within a Dropdown component',
    );
  }

  if (!dropdownMenuContext) {
    throw new Error(
      'DropdownFooter should be used within a DropdownMenu component',
    );
  }

  const { classNames: contextClassNames } = dropdownContext;

  const baseClassNames = cn(
    'p-2',
    isSticky ? 'sticky bottom-0 z-10 bg-inherit shadow-sm' : '',
  );

  return (
    <footer
      className={cn(
        baseClassNames,
        contextClassNames?.footer?.base,
        classNames?.base,
      )}
    >
      {children}
    </footer>
  );
}

export default DropdownFooter;
