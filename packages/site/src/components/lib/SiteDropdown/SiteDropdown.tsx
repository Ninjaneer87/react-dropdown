import { Dropdown, DropdownProps } from '@andrejground/react-dropdown';
import React from 'react';
import styles from './SiteDropdown.module.scss';

type Props = DropdownProps;

function SiteDropdown(props: Props) {
  return (
    <Dropdown
      {...props}
      classNames={{
        popover: { content: styles.popoverContent },
        item: { base: styles.itemBase },
        section: { base: styles.sectionBase, title: styles.sectionTitle },
        divider: { base: styles.dividerBase },
      }}
    />
  );
}

SiteDropdown.Menu = Dropdown.Menu;
SiteDropdown.Header = Dropdown.Header;
SiteDropdown.Footer = Dropdown.Footer;
SiteDropdown.Section = Dropdown.Section;
SiteDropdown.Item = Dropdown.Item;
SiteDropdown.Trigger = Dropdown.Trigger;
SiteDropdown.Divider = Dropdown.Divider;

export default SiteDropdown;
