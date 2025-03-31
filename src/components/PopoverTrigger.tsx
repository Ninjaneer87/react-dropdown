import { PopoverTriggerProps } from '../types';
import { usePopoverContext } from '../context/PopoverContext';

function PopoverTrigger({ children }: PopoverTriggerProps) {
  const popoverContext = usePopoverContext();

  if (!popoverContext) {
    throw new Error(
      'PopoverTrigger should be used within a Popover component',
    );
  }

  return children;
}

export default PopoverTrigger;
