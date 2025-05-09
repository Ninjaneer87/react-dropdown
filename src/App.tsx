import Dropdown from './components/Dropdown';
import Popover from './components/Popover';

function App() {
  return (
    <>
      <h1 className="py-4 text-center">Title</h1>
      <hr className="mb-16" />
      <div className="flex justify-center items-center flex-col min-h-[200vh] min-w-[200vw]">
        <button
          onClick={() => {
            const currentBodyOverflowY = window.getComputedStyle(
              document.body,
            ).overflowY;
            document.body.style.overflowY =
              currentBodyOverflowY === 'hidden' ? 'auto' : 'hidden';
          }}
        >
          Toggle OverflowY
        </button>
        <Dropdown
          placement="bottom-end"
          shouldBlockScroll={false}
          shouldCloseOnScroll={false}
          shouldFlip={false}
        >
          <Dropdown.Trigger>
            <button className="cursor-pointer p-4 rounded-2xl border-solid border-[1px] bg-black">
              DropdownTrigger
            </button>
          </Dropdown.Trigger>

          <Dropdown.Menu>
            <Dropdown.Header>Header</Dropdown.Header>

            <Dropdown.Divider />

            <Dropdown.Section scrolling>
              <Dropdown.Section title="Section 1">
                <Dropdown.Item disabled>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
                <Dropdown.Item>Item 3</Dropdown.Item>
              </Dropdown.Section>

              <Dropdown.Divider />

              <Dropdown.Section title="Section 2">
                <Dropdown.Item onClick={() => console.log('Item 1 clicked')}>
                  Item 1
                </Dropdown.Item>
                <Dropdown placement="left-center" isChild>
                  <Dropdown.Trigger>Nested 1</Dropdown.Trigger>

                  <Dropdown.Menu>
                    <Dropdown.Header>Header</Dropdown.Header>
                    <Dropdown.Section>
                      <Dropdown.Item>Item 1</Dropdown.Item>
                      <Dropdown.Item>Item 2</Dropdown.Item>
                      <Dropdown.Item>Item 3</Dropdown.Item>

                      <Dropdown placement="left-center" isChild>
                        <Dropdown.Trigger>Nested 2</Dropdown.Trigger>

                        <Dropdown.Menu>
                          <Dropdown.Header>Header</Dropdown.Header>
                          <Dropdown.Section>
                            <Dropdown.Item>Item 1</Dropdown.Item>
                            <Dropdown.Item>Item 2</Dropdown.Item>
                            <Dropdown.Item>Item 3</Dropdown.Item>
                          </Dropdown.Section>

                          <Dropdown.Section>
                            <Dropdown.Item>Item 1</Dropdown.Item>
                            <Dropdown.Item>Item 2</Dropdown.Item>
                            <Dropdown.Item>Item 3</Dropdown.Item>
                          </Dropdown.Section>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Dropdown.Section>

                    <Dropdown.Section>
                      <Dropdown.Item>Item 1</Dropdown.Item>
                      <Dropdown.Item>Item 2</Dropdown.Item>
                      <Dropdown.Item>Item 3</Dropdown.Item>
                    </Dropdown.Section>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown placement="left-center" isChild>
                  <Dropdown.Trigger>Nested 1</Dropdown.Trigger>

                  <Dropdown.Menu>
                    <Dropdown.Header>Header</Dropdown.Header>
                    <Dropdown.Section>
                      <Dropdown.Item>Item 1</Dropdown.Item>
                      <Dropdown.Item>Item 2</Dropdown.Item>
                      <Dropdown.Item>Item 3</Dropdown.Item>

                      <Dropdown placement="left-center" isChild>
                        <Dropdown.Trigger>Nested 2</Dropdown.Trigger>

                        <Dropdown.Menu>
                          <Dropdown.Header>Header</Dropdown.Header>
                          <Dropdown.Section>
                            <Dropdown.Item>Item 1</Dropdown.Item>
                            <Dropdown.Item>Item 2</Dropdown.Item>
                            <Dropdown.Item>Item 3</Dropdown.Item>
                          </Dropdown.Section>

                          <Dropdown.Section>
                            <Dropdown.Item>Item 1</Dropdown.Item>
                            <Dropdown.Item>Item 2</Dropdown.Item>
                            <Dropdown.Item>Item 3</Dropdown.Item>
                          </Dropdown.Section>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Dropdown.Section>

                    <Dropdown.Section>
                      <Dropdown.Item>Item 1</Dropdown.Item>
                      <Dropdown.Item>Item 2</Dropdown.Item>
                      <Dropdown.Item>Item 3</Dropdown.Item>
                    </Dropdown.Section>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown.Item>Item 2</Dropdown.Item>
                <Dropdown.Item>Item 3</Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Section>

            <Dropdown.Divider />

            <Dropdown.Footer>
              <div className="flex justify-between">
                <button>Cancel</button>
                <button>Save</button>
              </div>
            </Dropdown.Footer>
          </Dropdown.Menu>
        </Dropdown>

        <Popover
          placement="bottom-center"
          shouldBlockScroll={false}
          shouldCloseOnScroll={false}
          // shouldFlip={false}
          shouldCloseOnBlur
          openOnHover
          delayHide={500}
          delayShow={500}
          focusTriggerOnClose={false}
          hoverableContent={false}
        >
          <Popover.Trigger>
            <button className="cursor-pointer p-4 rounded-2xl border-solid border-[1px] bg-black">
              PopoverTrigger
            </button>
          </Popover.Trigger>
          <Popover.Content>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">Popover Content</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam , voluptatibus, blanditiis, exercitationem, doloribus
                voluptatibus, blanditiis, exercitationem, doloribus
                voluptatibus, blanditiis, exercitationem, doloribus
                voluptatibus, blanditiis, exercitationem, doloribus
              </p>
            </div>
          </Popover.Content>
        </Popover>
      </div>
    </>
  );
}

export default App;
