import { PopoverContentProps } from '../types';
import { usePopoverContext } from '../context/PopoverContext';

function PopoverContent({ children }: PopoverContentProps) {
  const popoverContext = usePopoverContext();

  if (!popoverContext) {
    throw new Error('PopoverContent should be used within a Popover component');
  }

  return (
    <div className="p-2 bg-gray-700 rounded-2xl min-w-40 relative">
      {children}
    </div>
  );
}

export default PopoverContent;
