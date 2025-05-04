import React, { ComponentPropsWithRef } from 'react';
import { usePopoverContext } from '../../context/PopoverContext';

type Props = ComponentPropsWithRef<'div'>;
const PopoverFocusTrapper = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const popoverContext = usePopoverContext();
  if (!popoverContext) {
    throw new Error('DropdownMenu should be used within a Popover component');
  }

  const { handleClose } = popoverContext;

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      handleClose();
    }
  }

  return (
    <div
      onKeyDown={onKeyDown}
      className="absolute w-0 h-0"
      tabIndex={0}
      {...props}
      ref={ref}
    />
  );
});

PopoverFocusTrapper.displayName = 'PopoverFocusTrapper';

export default PopoverFocusTrapper;
