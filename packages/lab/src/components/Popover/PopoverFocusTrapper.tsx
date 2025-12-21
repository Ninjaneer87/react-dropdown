import React, { ComponentPropsWithRef } from 'react';
import { usePopoverContext } from '../../context/PopoverContext';

type Props = ComponentPropsWithRef<'div'>;
const PopoverFocusTrapper = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const popoverContext = usePopoverContext();
    if (!popoverContext) {
      throw new Error(
        'PopoverFocusTrapper should be used within a Popover component',
      );
    }

    const { popoverId } = popoverContext;

    return (
      <div
        data-focus-trapper={popoverId}
        className="absolute w-0 h-0"
        tabIndex={0}
        {...props}
        ref={ref}
      />
    );
  },
);

PopoverFocusTrapper.displayName = 'PopoverFocusTrapper';

export default PopoverFocusTrapper;
