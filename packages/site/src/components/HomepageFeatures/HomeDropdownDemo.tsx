import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import {
  mdiCodeJson,
  mdiContentCopy,
  mdiExport,
  mdiFileDelimitedOutline,
  mdiFileEdit,
  mdiFilePdfBox,
  mdiHelpCircleOutline,
  mdiInformationOutline,
  mdiMenuDown,
  mdiNotePlus,
} from '@mdi/js';
import Icon from '@mdi/react';
import SiteDropdown from '@site/src/components/lib/SiteDropdown/SiteDropdown';
import SitePopover from '@site/src/components/lib/SitePopover/SitePopover';
import React from 'react';

function HomeDropdownDemo() {
  return (
    <BrowserOnly>
      {() => (
        <SiteDropdown>
          <SiteDropdown.Trigger>
            <div>
              <button className="button button--secondary button--md">
                Actions <Icon path={mdiMenuDown} size={1} />
              </button>

              <SitePopover
                // openOnHover
                placement="top-center"
                // focusTriggerOnClose={false}
                // hoverableContent={false}
                onOpen={() => console.log('Opened')}
                onClose={() => console.log('Closed')}
                onOpenChange={(isOpen) => console.log('Open change:', isOpen)}
              >
                <SitePopover.Trigger>
                  <Icon
                    path={mdiInformationOutline}
                    size={1}
                    className="text--warning"
                  />
                </SitePopover.Trigger>
                <SitePopover.Content>
                  <div style={{ maxWidth: '250px' }}>
                    Edit mode will be deprecated on January 1st, 2028.
                  </div>

                  <SiteDropdown>
                    <SiteDropdown.Trigger>
                      <div>
                        <button className="button button--secondary button--md">
                          Actions <Icon path={mdiMenuDown} size={1} />
                        </button>

                        <SitePopover
                          openOnHover
                          placement="top-center"
                          // focusTriggerOnClose={false}
                          hoverableContent={false}
                          onOpen={() => console.log('Opened')}
                          onClose={() => console.log('Closed')}
                          onOpenChange={(isOpen) =>
                            console.log('Open change:', isOpen)
                          }
                        >
                          <SitePopover.Trigger>
                            <Icon
                              path={mdiInformationOutline}
                              size={1}
                              className="text--warning"
                            />
                          </SitePopover.Trigger>
                          <SitePopover.Content>
                            <div style={{ maxWidth: '250px' }}>
                              Edit mode will be deprecated on January 1st, 2028.
                            </div>
                          </SitePopover.Content>
                        </SitePopover>
                      </div>
                    </SiteDropdown.Trigger>
                    <SiteDropdown.Menu>
                      <SiteDropdown.Section title="Actions">
                        <SiteDropdown.Item
                          startContent={<Icon path={mdiNotePlus} size={1} />}
                          description="Create a new file"
                        >
                          New file
                        </SiteDropdown.Item>

                        <SiteDropdown.Item
                          startContent={<Icon path={mdiContentCopy} size={1} />}
                          description="Copy the file link"
                        >
                          Copy link
                        </SiteDropdown.Item>

                        <SiteDropdown.Item
                          startContent={<Icon path={mdiFileEdit} size={1} />}
                          description="Start editing the file"
                          // disabled
                          endContent={
                            <SitePopover
                              openOnHover
                              placement="top-center"
                              focusTriggerOnClose={false}
                              hoverableContent={false}
                            >
                              <SitePopover.Trigger>
                                <Icon
                                  path={mdiInformationOutline}
                                  size={1}
                                  className="text--warning"
                                />
                              </SitePopover.Trigger>
                              <SitePopover.Content>
                                <div style={{ maxWidth: '250px' }}>
                                  Edit mode will be deprecated on January 1st,
                                  2028.
                                </div>
                              </SitePopover.Content>
                            </SitePopover>
                          }
                        >
                          Edit
                        </SiteDropdown.Item>

                        <SiteDropdown isNested placement="right-start">
                          <SiteDropdown.Trigger>
                            <SiteDropdown.Item
                              startContent={<Icon path={mdiExport} size={1} />}
                              description="Export all results"
                              shouldCloseOnSelection={false}
                            >
                              Export
                            </SiteDropdown.Item>
                          </SiteDropdown.Trigger>
                          <SiteDropdown.Menu>
                            <SiteDropdown.Item
                              startContent={
                                <Icon path={mdiCodeJson} size={1} />
                              }
                              description="Export as JSON"
                            >
                              JSON
                            </SiteDropdown.Item>
                            <SiteDropdown.Item
                              startContent={
                                <Icon path={mdiFileDelimitedOutline} size={1} />
                              }
                              description="Export as CSV"
                            >
                              CSV
                            </SiteDropdown.Item>
                            <SiteDropdown.Item
                              startContent={
                                <Icon path={mdiFilePdfBox} size={1} />
                              }
                              description="Export as PDF"
                            >
                              PDF
                            </SiteDropdown.Item>

                            <SiteDropdown isNested placement="right-start">
                              <SiteDropdown.Trigger>
                                <SiteDropdown.Item
                                  startContent={
                                    <Icon path={mdiExport} size={1} />
                                  }
                                  description="Export report"
                                  shouldCloseOnSelection={false}
                                >
                                  Report
                                </SiteDropdown.Item>
                              </SiteDropdown.Trigger>
                              <SiteDropdown.Menu>
                                <SiteDropdown.Item
                                  startContent={
                                    <Icon path={mdiCodeJson} size={1} />
                                  }
                                  description="Export as JSON"
                                >
                                  JSON
                                </SiteDropdown.Item>
                                <SiteDropdown.Item
                                  startContent={
                                    <Icon
                                      path={mdiFileDelimitedOutline}
                                      size={1}
                                    />
                                  }
                                  description="Export as CSV"
                                >
                                  CSV
                                </SiteDropdown.Item>
                                <SiteDropdown.Item
                                  startContent={
                                    <Icon path={mdiFilePdfBox} size={1} />
                                  }
                                  description="Export as PDF"
                                >
                                  PDF
                                </SiteDropdown.Item>
                              </SiteDropdown.Menu>
                            </SiteDropdown>
                          </SiteDropdown.Menu>
                        </SiteDropdown>
                      </SiteDropdown.Section>

                      <SiteDropdown.Divider />

                      <SiteDropdown.Section title="Help">
                        <SiteDropdown.Item
                          as={Link}
                          to="/blog"
                          startContent={
                            <Icon path={mdiHelpCircleOutline} size={1} />
                          }
                          description="Read more about the Dropdown"
                        >
                          Help (as Link)
                        </SiteDropdown.Item>
                      </SiteDropdown.Section>
                    </SiteDropdown.Menu>
                  </SiteDropdown>
                </SitePopover.Content>
              </SitePopover>
            </div>
          </SiteDropdown.Trigger>
          <SiteDropdown.Menu>
            <SiteDropdown.Section title="Actions">
              <SiteDropdown.Item
                startContent={<Icon path={mdiNotePlus} size={1} />}
                description="Create a new file"
              >
                New file
              </SiteDropdown.Item>

              <SiteDropdown.Item
                startContent={<Icon path={mdiContentCopy} size={1} />}
                description="Copy the file link"
              >
                Copy link
              </SiteDropdown.Item>

              <SiteDropdown.Item
                startContent={<Icon path={mdiFileEdit} size={1} />}
                description="Start editing the file"
                // disabled
                endContent={
                  <SitePopover
                    openOnHover
                    placement="top-center"
                    focusTriggerOnClose={false}
                    hoverableContent={false}
                  >
                    <SitePopover.Trigger>
                      <Icon
                        path={mdiInformationOutline}
                        size={1}
                        className="text--warning"
                      />
                    </SitePopover.Trigger>
                    <SitePopover.Content>
                      <div style={{ maxWidth: '250px' }}>
                        Edit mode will be deprecated on January 1st, 2028.
                      </div>
                    </SitePopover.Content>
                  </SitePopover>
                }
              >
                Edit
              </SiteDropdown.Item>

              <SiteDropdown isNested placement="right-start">
                <SiteDropdown.Trigger>
                  <SiteDropdown.Item
                    startContent={<Icon path={mdiExport} size={1} />}
                    description="Export all results"
                    shouldCloseOnSelection={false}
                  >
                    Export
                  </SiteDropdown.Item>
                </SiteDropdown.Trigger>
                <SiteDropdown.Menu>
                  <SiteDropdown.Item
                    startContent={<Icon path={mdiCodeJson} size={1} />}
                    description="Export as JSON"
                  >
                    JSON
                  </SiteDropdown.Item>
                  <SiteDropdown.Item
                    startContent={
                      <Icon path={mdiFileDelimitedOutline} size={1} />
                    }
                    description="Export as CSV"
                  >
                    CSV
                  </SiteDropdown.Item>
                  <SiteDropdown.Item
                    startContent={<Icon path={mdiFilePdfBox} size={1} />}
                    description="Export as PDF"
                  >
                    PDF
                  </SiteDropdown.Item>

                  <SiteDropdown isNested placement="right-start">
                    <SiteDropdown.Trigger>
                      <SiteDropdown.Item
                        startContent={<Icon path={mdiExport} size={1} />}
                        description="Export report"
                        shouldCloseOnSelection={false}
                      >
                        Report
                      </SiteDropdown.Item>
                    </SiteDropdown.Trigger>
                    <SiteDropdown.Menu>
                      <SiteDropdown.Item
                        startContent={<Icon path={mdiCodeJson} size={1} />}
                        description="Export as JSON"
                      >
                        JSON
                      </SiteDropdown.Item>
                      <SiteDropdown.Item
                        startContent={
                          <Icon path={mdiFileDelimitedOutline} size={1} />
                        }
                        description="Export as CSV"
                      >
                        CSV
                      </SiteDropdown.Item>
                      <SiteDropdown.Item
                        startContent={<Icon path={mdiFilePdfBox} size={1} />}
                        description="Export as PDF"
                      >
                        PDF
                      </SiteDropdown.Item>
                    </SiteDropdown.Menu>
                  </SiteDropdown>
                </SiteDropdown.Menu>
              </SiteDropdown>
            </SiteDropdown.Section>

            <SiteDropdown.Divider />

            <SiteDropdown.Section title="Help">
              <SiteDropdown.Item
                as={Link}
                to="/blog"
                startContent={<Icon path={mdiHelpCircleOutline} size={1} />}
                description="Read more about the Dropdown"
              >
                Help (as Link)
              </SiteDropdown.Item>
            </SiteDropdown.Section>
          </SiteDropdown.Menu>
        </SiteDropdown>
      )}
    </BrowserOnly>
  );
}

export default HomeDropdownDemo;
