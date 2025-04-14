import React, { ComponentPropsWithRef } from 'react';

type Props = ComponentPropsWithRef<'div'>;
const FocusTrapper = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
  <div className="absolute w-0 h-0" tabIndex={0} {...props} ref={ref} />
));

FocusTrapper.displayName = 'FocusTrapper';

export default FocusTrapper;
