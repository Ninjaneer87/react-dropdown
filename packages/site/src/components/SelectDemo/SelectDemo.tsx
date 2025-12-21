import {
  debounceCallback,
  Dropdown,
  Select,
} from '@andrejground/lab';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { usePokemonList } from '@site/src/hooks/usePokemonList';
import styles from './SelectDemo.module.scss';

function SelectDemoContent() {
  const { items, isLoading, onLoadMore, hasMore } = usePokemonList({
    fetchDelay: 300,
  });

  const { callback: debouncedSearch } = debounceCallback(
    (searchQuery?: string) => onLoadMore({ newOffset: 0, search: searchQuery }),
    500,
  );

  return (
    <>
      <Select
        items={items}
        onSelectionChange={(value) => console.log(value)}
        multiple
        search
        onSearchChange={debouncedSearch}
        placeholder="Select with children function"
        onClose={() => console.log('onClose')}
        infiniteScrollProps={{
          onLoadMore: (searchVal) => onLoadMore({ search: searchVal }),
          hasMore,
          isLoading,
        }}
        classNames={{ trigger: { base: styles.triggerBase } }}
      >
        {(item) => (
          <Select.Item key={item.value} {...item}>
            {item.text}
          </Select.Item>
        )}
      </Select>

      <Select onSelectionChange={(value) => console.log(value)} multiple>
        <Select.Section title="Section 1">
          <Select.Item value={'1'} text="Item 1">
            Item 1
          </Select.Item>
          <Select.Item value={'2'} text="Item 2">
            Item 2
          </Select.Item>
          <Select.Item value={'3'} text="Item 3">
            Item 3
          </Select.Item>
          <Select.Item value={'4'} text="Item 4">
            Item 4
          </Select.Item>
          <Select.Item value={'5'} text="Item 5">
            Item 5
          </Select.Item>
          <Select.Item value={'6'} text="Item 6">
            Item 6
          </Select.Item>
        </Select.Section>

        <Select.Section title="Section 2" showDivider={false}>
          <Select.Item value={'1'} text="Item 1">
            Item 1
          </Select.Item>
          <Select.Item value={'2'} text="Item 2">
            Item 2
          </Select.Item>
          <Select.Item value={'3'} text="Item 3">
            Item 3
          </Select.Item>
          <Select.Item value={'4'} text="Item 4">
            Item 4
          </Select.Item>
          <Select.Item value={'5'} text="Item 5">
            Item 5
          </Select.Item>
          <Select.Item value={'6'} text="Item 6">
            Item 6
          </Select.Item>
        </Select.Section>
      </Select>

      <Dropdown
        placement="bottom-center"
        shouldBlockScroll={false}
        shouldCloseOnScroll={false}
        // openOnHover
        onOpen={() => console.log('onOpen dropdown')}
        // shouldFlip={false}
        // fullWidth
        // autoFocus="first-item"
      >
        <Dropdown.Trigger>
          <button className="w-full cursor-pointer p-4 rounded-lg border-solid border-[1px] bg-black">
            DropdownTrigger Nested
          </button>
        </Dropdown.Trigger>

        <Dropdown.Menu>
          <Dropdown.Header>
            <input placeholder="Header" />
          </Dropdown.Header>

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
              <Dropdown placement="left-center" isNested isDisabled>
                <Dropdown.Trigger>Nested 1</Dropdown.Trigger>

                <Dropdown.Menu>
                  <Dropdown.Header>Header</Dropdown.Header>
                  <Dropdown.Section>
                    <Dropdown.Item>Item 1</Dropdown.Item>
                    <Dropdown.Item>Item 2</Dropdown.Item>
                    <Dropdown.Item>Item 3</Dropdown.Item>

                    <Dropdown placement="left-center" isNested>
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
              <Dropdown placement="right-end" isNested>
                <Dropdown.Trigger>Nested 1</Dropdown.Trigger>

                <Dropdown.Menu>
                  <Dropdown.Header>Header</Dropdown.Header>
                  <Dropdown.Section>
                    <Dropdown.Item>Item 1</Dropdown.Item>
                    <Dropdown.Item>Item 2</Dropdown.Item>
                    <Dropdown.Item>Item 3</Dropdown.Item>

                    <Dropdown placement="left-center" isNested>
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
    </>
  );
}

function SelectDemo() {
  return <BrowserOnly>{() => <SelectDemoContent />}</BrowserOnly>;
}

export default SelectDemo;
