export const installationMyPopoverTsx = `import { Popover, PopoverProps } from '@andrejground/lab';
import React from 'react';
import styles from './MyPopover.module.scss';

type Props = PopoverProps;

function MyPopover(props: Props) {
  return (
    <Popover
      {...props}
      classNames={{
        content: styles.popoverContent,
      }}
    />
  );
}

MyPopover.Content = Popover.Content;
MyPopover.Trigger = Popover.Trigger;

export default MyPopover;`;

export const installationMyPopoverScss = `.popoverContent {
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}`;

export const installationAppTsx = `import MyPopover from './MyPopover';
// ...
return (
  <MyPopover>
    <MyPopover.Trigger>Popover Trigger</MyPopover.Trigger>
    <MyPopover.Content>Popover Content</MyPopover.Content>
  </MyPopover>
);`;
