import { useEffect, useMemo, useState } from 'react';
import Dropdown from './components/Dropdown';
import Popover from './components/Popover';
import Select from './components/Select';
import { usePokemonList } from './utils/dummy-data-hooks';
import { debounceCallback } from './utils/common';

// const items = [
//   {
//     text: 'Andrej',
//     value: 'option-1',
//     extraProp: 'Extra prop',
//     disabled: false,
//   },
//   {
//     text: 'Denis',
//     value: 'option-2',
//     extraProp: 'Extra prop',
//     disabled: true,
//   },
//   {
//     text: 'Farcry',
//     value: 'option-3',
//     extraProp: 'Extra prop',
//     disabled: false,
//   },
//   {
//     text: 'North',
//     value: 'option-4',
//     extraProp: 'Extra prop',
//     disabled: false,
//   },
//   {
//     text: 'Zenit',
//     value: 'option-5',
//     extraProp: 'Extra prop',
//   },
//   {
//     text: 'Fantom',
//     value: 'option-6',
//     extraProp: 'Extra prop',
//   },
//   {
//     text: 'Austral',
//     value: 'option-7',
//     extraProp: 'Extra prop',
//   },
// ];

// const manyItems = [...Array(100).keys()].map((item) => ({
//   text: `Option-${item}`,
//   value: `option-${item}`,
//   extraProp: 'Extra prop',
// }));

// const groups = [
//   {
//     title: 'Group 1',
//     items,
//   },
//   {
//     title: 'Group 2',
//     items,
//   },
//   {
//     title: 'Group 3',
//     items,
//   },
// ];

function App() {
  const { items, isLoading, onLoadMore, hasMore } = usePokemonList({
    fetchDelay: 300,
  });
  console.log({ items });
  const [selectedValue, setSelectedValue] = useState();
  const [doubleViewportSize, setDoubleViewportSize] = useState(false);
  const [selectItems, setSelectItems] = useState(items);
  const [searchVal, setSearchVal] = useState('');
  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.text.toLowerCase().includes(searchVal.toLowerCase()),
      ),
    [searchVal, items],
  );
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSelectItems([
        ...selectItems,
        {
          text: 'Added optiony',
          value: 'option-999999999',
          extraProp: 'Extra prop',
        },
      ]);
    }, 3000);
  }, []);

  const { callback: debouncedSearch } = debounceCallback(
    (searchQuery?: string) => onLoadMore({ newOffset: 0, search: searchQuery }),
    500,
  );
  return (
    <>
      <div
        className={`flex justify-center gap-2 items-center flex-col 
        ${
          doubleViewportSize
            ? 'min-h-[200vh] min-w-[200vw]'
            : 'min-h-[100vh] w-[100vw]'
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
            setSelectItems((prev) => [
              ...new Set([
                ...prev,
                {
                  text: 'Added option',
                  value: 'option-8',
                  extraProp: 'Extra prop',
                },
              ]),
            ]);
          }}
        >
          Add item
        </button>

        <Select
          // items={items}
          backdrop="blur"
          // defaultValue={selectedValue}
          // value={selectedValue}
          onClose={(items) => console.log(items)}
          // isDisabled
          onSelectionChange={(value) => {
            console.log({ value });
            // setSelectedValue(value.selectedOptions);
          }}
          classNames={{
            trigger: 'bg-blue-800',
            placeholder: 'opacity-60',
            base: 'w-80',
          }}
          // renderOption={(option) => {
          //   return (
          //     <li
          //       className={`p-2 ${
          //         option.disabled ? 'opacity-60 pointer-events-none' : ''
          //       }  hover:bg-blue-500 focus-visible:bg-blue-500 focus-within:bg-blue-500 rounded-lg transition-all my-2 w-full flex cursor-pointer items-center gap-2 bg-blue-600`}
          //     >
          //       <div>{option.label}</div>
          //       {selectedValue.find((item) => item.value === option.value) && (
          //         <>✔</>
          //       )}
          //       <span>{`${option.isSelected}`}</span>
          //     </li>
          //   );
          // }}
        >
          {items.map((item) => (
            <Select.Item key={item.value} {...item}>
              {item.text}
            </Select.Item>
          ))}
        </Select>

        <Select
          infiniteScrollProps={{
            onLoadMore: (searchVal) => onLoadMore({ search: searchVal }),
            hasMore,
            isLoading,
          }}
          onSearchChange={debouncedSearch}
          onSelectionChange={(value) => {
            console.log({ value });
            setSelectedValue(value.selectedOptions);
          }}
          multiple
          // isOpen={open}
          // onOpenChange={setOpen}
          onOpen={() => console.log('onOpen')}
          // isDisabled
          placeholder="Search Select with items"
          onClose={(items) => console.log(items)}
          // defaultValue={selectedValue}
          value={selectedValue}
          label="Search Select with items"
          isRequired
          shouldBlockScroll={false}
          truncate={{ itemText: true, itemDescription: true }}
          // shouldCloseOnScroll={false}
          autoFocus="menu"
          focusTrapProps={{ autoFocus: false, trapFocus: true }}
          search
          items={items}
          noResultsMessage={
            <>
              <i>Dummy no results message</i>
            </>
          }
          description={
            <>
              <i>Dummy description</i>
            </>
          }
          errorMessage={
            <>
              <i>Dummy error message</i>
            </>
          }
          classNames={{
            errorMessage: 'text-amber-600',
            contentWrapper: 'text-sm',
            trigger: 'py-[1px] px-2',
          }}
          renderOption={({ option, currentOptions }) => {
            const isLastItem =
              currentOptions &&
              currentOptions[currentOptions.length - 1].value === option.value;
            return (
              <li>
                {isLastItem && <div>Last Item</div>}
                <div>{option.text}</div>
              </li>
            );
          }}
          // topContent={
          //   <input
          //     // autoFocus
          //     data-focusable-item
          //     onChange={(e) => {
          //       e.stopPropagation();
          //       console.log(e.target.value);
          //     }}
          //   />
          // }
        >
          {/* {groups.map((group, i) => (
            <Select.Section
              key={group.title}
              title={group.title}
              showDivider={i !== groups.length - 1}
            >
              {group.items.map((item) => (
                <Select.Item key={item.value} {...item}>
                  {item.text}
                </Select.Item>
              ))}
            </Select.Section>
          ))} */}
        </Select>

        <Select
          onSelectionChange={(value) => {
            console.log({ value });
            // setSelectedValue(value.selectedOptions);
          }}
          label="Search Select with children"
          isRequired
          multiple
          placeholder="Search Select with children"
          onClose={() => console.log('onClose')}
          // defaultValue={selectedValue}
          // value={selectedValue}
          search
          onSearchChange={setSearchVal}
        >
          {filteredItems.map((item) => (
            <Select.Item key={item.value} {...item}>
              {item.text}
            </Select.Item>
          ))}
        </Select>

        <Select
          items={items}
          onSelectionChange={(value) => console.log(value)}
          multiple
          label="Select with children function"
          placeholder="Select with children function"
          onClose={() => console.log('onClose')}
        >
          {(item) => (
            <Select.Item key={item.value} {...item}>
              {item.text}
            </Select.Item>
          )}
        </Select>

        <Dropdown
          placement="bottom-center"
          shouldBlockScroll={false}
          shouldCloseOnScroll={false}
          // openOnHover
          onOpen={() => console.log('onOpen dropdown')}
          // shouldFlip={false}
          // fullWidth
          focusTrapProps={{ autoFocus: false }}
          autoFocus="first-item"
        >
          <Dropdown.Trigger>
            <button className="w-full cursor-pointer p-4 rounded-lg border-solid border-[1px] bg-black">
              DropdownTrigger
            </button>
          </Dropdown.Trigger>

          <Dropdown.Menu>
            <Dropdown.Header>
              <input
                autoFocus
                data-focusable-item
                onChange={(e) => {
                  e.stopPropagation();
                  console.log(e.target.value);
                }}
              />
            </Dropdown.Header>

            <Dropdown.Divider />

            <Dropdown.Section title="Section 1">
              <Dropdown.Item
                onClick={() => {
                  console.log('Andrej ksnm forgac');
                }}
              >
                Andrej ksnm forgac
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  console.log('Item 2');
                }}
              >
                Item 2
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  console.log('Item 3');
                }}
              >
                Item 3
              </Dropdown.Item>
            </Dropdown.Section>

            <Dropdown.Divider />

            <Dropdown.Footer>
              <div className="flex justify-between">
                <button data-focusable-item>Cancel</button>
                <button data-focusable-item>Save</button>
              </div>
            </Dropdown.Footer>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown
          placement="bottom-center"
          shouldBlockScroll={false}
          shouldCloseOnScroll={false}
          // openOnHover
          onOpen={() => console.log('onOpen dropdown')}
          // shouldFlip={false}
          // fullWidth
          autoFocus="first-item"
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
                <button data-focusable-item>Cancel</button>
                <button data-focusable-item>Save</button>
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
          delayHide={300}
          delayShow={300}
          focusTriggerOnClose={false}
          // hoverableContent={false}
        >
          <Popover.Trigger>
            <button className="cursor-pointer p-4 rounded-lg border-solid border-[1px] bg-black">
              TooltipTrigger
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

              <Popover
                placement="bottom-center"
                shouldBlockScroll={false}
                shouldCloseOnScroll={false}
                // shouldFlip={false}
                shouldCloseOnBlur
                openOnHover
                delayHide={300}
                delayShow={300}
                focusTriggerOnClose={false}
                // hoverableContent={false}
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
                      Quisquam , voluptatibus, blanditiis, exercitationem,
                      doloribus voluptatibus, blanditiis, exercitationem,
                      doloribus voluptatibus, blanditiis, exercitationem,
                      doloribus voluptatibus, blanditiis, exercitationem,
                      doloribus
                    </p>
                  </div>
                </Popover.Content>
              </Popover>
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
