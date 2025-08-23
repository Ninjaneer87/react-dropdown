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
  const [doubleViewportSize, setDoubleViewportSize] = useState(false);

  return (
    <>
      <div
        className={`flex justify-center gap-2 items-center flex-col 
        ${
          doubleViewportSize
            ? 'min-h-[200vh] min-w-[200vw]'
            : 'min-h-[100vh] w-[50vw]'
        }`}
      >
        <h1 className="w-full py-4 text-center">React dropdown</h1>
        <hr className="w-full mb-16" />

        <button
          className="p-2 border cursor-pointer rounded-sm"
          onClick={() => {
            setDoubleViewportSize((prev) => !prev);
          }}
        >
          {doubleViewportSize
            ? 'Regular viewport size'
            : 'Double viewport size'}
        </button>
        <button
          className="p-2 border cursor-pointer rounded-sm"
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
          className="p-2 border cursor-pointer rounded-sm"
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
          isDisabled
          onSelectionChange={(value) => {
            console.log({ value });
            setSelectedValue(value.selectedOptions);
          }}
          classNames={{ mainWrapper: 'bg-amber-800', placeholder: 'opacity-60', base: 'w-80' }}
        />

        <Select
          onSelectionChange={(value) => {
            console.log({ value });
            setSelectedValue(value.selectedOptions);
          }}
          multiple
          // isDisabled
          placeholder="Select with sections"
          onClose={() => console.log('onClose')}
          // defaultValue={selectedValue}
          value={selectedValue}
          label="Select with sections"
          isRequired
          shouldBlockScroll={false}
          shouldCloseOnScroll={false}
        >
          {groups.map((group, i) => (
            <Select.Section
              key={group.title}
              title={group.title}
              showDivider={i !== groups.length - 1}
            >
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
            // setSelectedValue(value.selectedOptions);
          }}
          label='Select with children'
          isRequired
          multiple
          placeholder="Select with children"
          onClose={() => console.log('onClose')}
          // defaultValue={selectedValue}
          // value={selectedValue}
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
          label='Select with children function'
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
          placement="bottom-center"
          shouldBlockScroll={false}
          shouldCloseOnScroll={false}
          // shouldFlip={false}
          // fullWidth
        >
          <Dropdown.Trigger>
            <button className="w-full cursor-pointer p-4 rounded-lg border-solid border-[1px] bg-black">
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
          placement="bottom-center"
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
            <button className="cursor-pointer p-4 rounded-lg border-solid border-[1px] bg-black">
              PopoverTrigger
            </button>
          </Popover.Trigger>
          <Popover.Content>
            <div className="flex flex-col gap-2 max-w-80">
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
              <button className="cursor-pointer p-4 rounded-lg border-solid border-[1px] bg-black">
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
              <button className="cursor-pointer p-4 rounded-lg border-solid border-[1px] bg-black">
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
              <button className="cursor-pointer p-4 rounded-lg border-solid border-[1px] bg-black">
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
