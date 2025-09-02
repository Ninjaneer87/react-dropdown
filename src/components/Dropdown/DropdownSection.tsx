import { useDropdownContext } from '../../context/DropdownContext';
import { useDropdownMenuContext } from '../../context/DropdownMenuContext';
import { DropdownSectionProps } from '../../types';

function DropdownSection({
  children,
  scrolling,
  title,
  isStickyTitle = true,
}: DropdownSectionProps) {
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
        scrolling ? 'max-h-[250px] overflow-y-auto scroll-pt-12' : ''
      }`}
    >
      {title && (
        <div
          className={`p-1 mb-2 text-sm font-semibold text-gray-400 ${
            isStickyTitle ? 'bg-gray-800 sticky top-0 z-10 rounded-sm' : ''
          }`}
        >
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

export default DropdownSection;
