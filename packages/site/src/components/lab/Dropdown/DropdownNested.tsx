import BrowserOnly from '@docusaurus/BrowserOnly';
import SiteDropdown from '@site/src/components/site-lab/SiteDropdown/SiteDropdown';
import React from 'react';

function DropdownNestedContent() {
  return (
    <SiteDropdown>
      <SiteDropdown.Trigger>
        <button className="button button--secondary button--outline">
          Actions
        </button>
      </SiteDropdown.Trigger>
      <SiteDropdown.Menu>
        <SiteDropdown.Item>New file</SiteDropdown.Item>
        <SiteDropdown.Item>Copy link</SiteDropdown.Item>

        <SiteDropdown>
          <SiteDropdown.Trigger>
            <SiteDropdown.Item shouldCloseOnSelection={false}>
              Export
            </SiteDropdown.Item>
          </SiteDropdown.Trigger>
          <SiteDropdown.Menu>
            <SiteDropdown.Item>JSON</SiteDropdown.Item>
            <SiteDropdown.Item>CSV</SiteDropdown.Item>
            <SiteDropdown.Item>PDF</SiteDropdown.Item>
          </SiteDropdown.Menu>
        </SiteDropdown>
      </SiteDropdown.Menu>
    </SiteDropdown>
  );
}

function DropdownNested() {
  return (
    <BrowserOnly fallback={<DropdownNestedContent />}>
      {() => <DropdownNestedContent />}
    </BrowserOnly>
  );
}
export default DropdownNested;
