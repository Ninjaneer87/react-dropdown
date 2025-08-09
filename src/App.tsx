import { useState } from 'react';
import Dropdown from './components/Dropdown';
import Popover from './components/Popover';
import Select from './components/Select';

const items = [
  {
    label: 'Option 1',
    value: 'option-1',
    extraProp: 'Extra prop',
  },
  {
    label: 'Option 2',
    value: 'option-2',
    extraProp: 'Extra prop',
    disabled: true,
  },
  {
    label: 'Option 3',
    value: 'option-3',
    extraProp: 'Extra prop',
  },
  {
    label: 'Option 4',
    value: 'option-4',
    extraProp: 'Extra prop',
  },
  {
    label: 'Option 5',
    value: 'option-5',
    extraProp: 'Extra prop',
  },
];

const groups = [
  {
    title: 'Group 1',
    items,
  },
  {
    title: 'Group 2',
    items,
  },
  {
    title: 'Group 3',
    items,
  },
];

function App() {
  const [selectedValue, setSelectedValue] = useState([items[0]]);

  console.log({ selectedValue });
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
        <button
          onClick={() => {
            setSelectedValue((prev) => [...new Set([...prev, items[1]])]);
          }}
        >
          Change selected value
        </button>

        <Select
          items={items}
          backdrop="blur"
          defaultValue={selectedValue}
          value={selectedValue}
          onClose={() => console.log('onClose')}
          onSelectionChange={(value) => {
            console.log({ value });
            setSelectedValue(value.selectedOptions);
          }}
        />

        <Select
          onSelectionChange={(value) => {
            console.log({ value });
            setSelectedValue(value.selectedOptions);
          }}
          multiple
          placeholder="Select with sections"
          onClose={() => console.log('onClose')}
          // defaultValue={selectedValue}
          value={selectedValue}
        >
          {groups.map((group) => (
            <Select.Section title={group.title}>
              {group.items.map((item) => (
                <Select.Item key={item.value} {...item}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Section>
          ))}
        </Select>

        <Select
          onSelectionChange={(value) => {
            console.log({ value });
            setSelectedValue(value.selectedOptions);
          }}
          multiple
          placeholder="Select with children"
          onClose={() => console.log('onClose')}
          // defaultValue={selectedValue}
          value={selectedValue}
        >
          {items.map((item) => (
            <Select.Item key={item.value} {...item}>
              {item.label}
            </Select.Item>
          ))}
        </Select>

        <Select
          items={items}
          onSelectionChange={(value) => console.log(value)}
          multiple
          placeholder="Select with children function"
          onClose={() => console.log('onClose')}
        >
          {(item) => (
            <Select.Item key={item.value} {...item}>
              {item.label}
            </Select.Item>
          )}
        </Select>
        <Dropdown
          placement="bottom-end"
          shouldBlockScroll={false}
          shouldCloseOnScroll={false}
          // shouldFlip={false}
          // fullWidth
        >
          <Dropdown.Trigger>
            <button className="w-full cursor-pointer p-4 rounded-2xl border-solid border-[1px] bg-black">
              DropdownTrigger
            </button>
          </Dropdown.Trigger>

          <Dropdown.Menu>
            <Dropdown.Header>Header</Dropdown.Header>

            <Dropdown.Divider />

            <Dropdown.Section scrolling>
              <Dropdown.Section title="Section 1">
                <Dropdown.Item>Andrej ksnm forgac</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
                <Dropdown.Item>Item 3</Dropdown.Item>
              </Dropdown.Section>

              <Dropdown.Divider />

              <Dropdown.Section title="Section 2">
                <Dropdown.Item onClick={() => console.log('Item 1 clicked')}>
                  Item 1
                </Dropdown.Item>
                <Dropdown placement="left-center" isChild isDisabled>
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
          placement="bottom-start"
          shouldBlockScroll={false}
          shouldCloseOnScroll={false}
          shouldFlip={false}
          shouldCloseOnBlur
          openOnHover
          delayHide={300}
          delayShow={300}
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

        <div className="flex">
          <Popover
            placement="bottom-start"
            growContent
            shouldBlockScroll={false}
            shouldCloseOnScroll={false}
            shouldFlip={false}
            shouldCloseOnBlur
            openOnHover
            delayHide={300}
            delayShow={300}
            focusTriggerOnClose={false}
            // hoverableContent={false}
          >
            <Popover.Trigger>
              <button className="cursor-pointer p-4 rounded-2xl border-solid border-[1px] bg-black">
                Fullscreen PopoverTrigger
              </button>
            </Popover.Trigger>
            <Popover.Content>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">Popover Content 1</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam , voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Quisquam ,
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                </p>
              </div>
            </Popover.Content>
          </Popover>

          <Popover
            placement="bottom-start"
            growContent
            shouldBlockScroll={false}
            shouldCloseOnScroll={false}
            shouldFlip={false}
            shouldCloseOnBlur
            openOnHover
            delayHide={300}
            delayShow={300}
            focusTriggerOnClose={false}
            // hoverableContent={false}
          >
            <Popover.Trigger>
              <button className="cursor-pointer p-4 rounded-2xl border-solid border-[1px] bg-black">
                Fullscreen PopoverTrigger
              </button>
            </Popover.Trigger>
            <Popover.Content>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">Popover Content 2</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam , voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Quisquam ,
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                </p>
              </div>
            </Popover.Content>
          </Popover>

          <Popover
            placement="bottom-start"
            growContent
            shouldBlockScroll={false}
            shouldCloseOnScroll={false}
            shouldFlip={false}
            shouldCloseOnBlur
            openOnHover
            delayHide={300}
            delayShow={300}
            focusTriggerOnClose={false}
            // hoverableContent={false}
          >
            <Popover.Trigger>
              <button className="cursor-pointer p-4 rounded-2xl border-solid border-[1px] bg-black">
                Fullscreen PopoverTrigger
              </button>
            </Popover.Trigger>
            <Popover.Content>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">Popover Content 3</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam , voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Quisquam ,
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                  voluptatibus, blanditiis, exercitationem, doloribus
                </p>
              </div>
            </Popover.Content>
          </Popover>
        </div>
      </div>
    </>
  );
}

export default App;
