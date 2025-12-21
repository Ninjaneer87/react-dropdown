import React from 'react';
import styles from './SiteSelect.module.scss';
import { OptionItem, Select, SelectProps } from '@andrejground/lab';

type Props<T extends OptionItem> = SelectProps<T>;

function SiteSelect<T extends OptionItem>(props: Props<T>) {
  return (
    <Select
      {...props}
      classNames={{
        popover: { content: styles.popoverContent },
        trigger: {
          base: styles.triggerBase,
          valueChip: styles.triggerValueChip,
        },
        section: { title: styles.sectionTitle },
        item: { base: styles.itemBase },
      }}
    />
  );
}

SiteSelect.Section = Select.Section;
SiteSelect.Item = Select.Item;
SiteSelect.Divider = Select.Divider;

export default SiteSelect;
