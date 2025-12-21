import { Popover, PopoverProps } from '@andrejground/lab';
import React from 'react';
import styles from './SitePopover.module.scss';

type Props = PopoverProps;

function SitePopover(props: Props) {
  return (
    <Popover
      {...props}
      classNames={{
        content: styles.popoverContent,
      }}
    />
  );
}

SitePopover.Content = Popover.Content;
SitePopover.Trigger = Popover.Trigger;

export default SitePopover;
