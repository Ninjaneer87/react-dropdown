import Dropdown from './components/Dropdown';

function App() {
  return (
    <>
      <h1 className="py-4 text-center">Title</h1>
      <hr className="mb-16" />
      <div className="flex justify-center items-center flex-col min-h-[100vh]">
        <Dropdown backdrop="blur" showCaret={false} placement="bottom">
          <Dropdown.Trigger>
            <button className="cursor-pointer p-4 rounded-2xl border-solid border-[1px] bg-black">
              DropdownTrigger
            </button>
          </Dropdown.Trigger>

          <Dropdown.Menu>
            <Dropdown.Header>Header</Dropdown.Header>

            <Dropdown.Divider />

            <Dropdown.Section scrolling>
              <Dropdown.Section>
                <Dropdown.Header>Section 1</Dropdown.Header>
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
                <Dropdown.Item>Item 3</Dropdown.Item>
              </Dropdown.Section>

              <Dropdown.Section>
                <Dropdown.Header>Section 2</Dropdown.Header>
                <Dropdown.Item onClick={() => console.log('Item 1 clicked')}>
                  Item 1
                </Dropdown.Item>
                <Dropdown placement="left-start">
                  <Dropdown.Trigger>Nested 1</Dropdown.Trigger>

                  <Dropdown.Menu>
                    <Dropdown.Header>Header</Dropdown.Header>
                    <Dropdown.Section>
                      <Dropdown.Item>Item 1</Dropdown.Item>
                      <Dropdown.Item>Item 2</Dropdown.Item>
                      <Dropdown.Item>Item 3</Dropdown.Item>

                      <Dropdown placement="left-end">
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
            <Dropdown.Footer>Footer</Dropdown.Footer>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default App;
