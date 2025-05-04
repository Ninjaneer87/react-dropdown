import { useDropdownContext } from '../../context/DropdownContext';
import { useDropdownMenuContext } from '../../context/DropdownMenuContext';
import { DropdownSectionProps } from '../../types';

function DropdownSection({ children, scrolling, title }: DropdownSectionProps) {
  const dropdownContext = useDropdownContext();
  const dropdownMenuContext = useDropdownMenuContext();

  if (!dropdownContext) {
    throw new Error(
      'DropdownSection should be used within a Dropdown component',
    );
  }

  if (!dropdownMenuContext) {
    throw new Error(
      'DropdownSection should be used within a DropdownMenu component',
    );
  }

  return (
    <div
      className={`bg-inherit ${
        scrolling ? 'max-h-[200px] overflow-y-auto ' : ''
      }`}
    >
      {title && (
        <div className="py-2 text-sm font-semibold text-gray-400">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

export default DropdownSection;
