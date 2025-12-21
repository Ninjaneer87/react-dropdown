import { ComponentProps } from 'react';
import styles from './PinkSelect.module.css';
import { Select } from '@andrejground/lab';

type PinkSelectProps = ComponentProps<typeof Select>;

function PinkSelect(props: PinkSelectProps) {
  return (
    <Select
      {...props}
      classNames={{
        item: {
          contentWrapper: styles.itemContentWrapper,
        },
      }}
    />
  );
}

export default PinkSelect;
