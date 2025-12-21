import { debounceCallback } from '@andrejground/lab';
import BrowserOnly from '@docusaurus/BrowserOnly';
import SiteSelect from '@site/src/components/lab/SiteSelect/SiteSelect';
import { usePokemonList } from '@site/src/hooks/usePokemonList';

const SELECT_ITEMS = [
  {
    section: 'Animals',
    items: [
      {
        value: 'cat',
        text: 'Cat',
      },
      {
        value: 'dog',
        text: 'Dog',
      },
      {
        value: 'rabbit',
        text: 'Rabbit',
      },
      {
        value: 'mouse',
        text: 'Mouse',
      },
      {
        value: 'snake',
        text: 'Snake',
      },
      {
        value: 'bird',
        text: 'Bird',
      },
      {
        value: 'fish',
        text: 'Fish',
      },
    ],
  },
  {
    section: 'Cars',
    items: [
      {
        value: 'toyota',
        text: 'Toyota',
      },
      {
        value: 'mazda',
        text: 'Mazda',
      },
      {
        value: 'bmw',
        text: 'BMW',
      },
      {
        value: 'audi',
        text: 'Audi',
      },
      {
        value: 'nissan',
        text: 'Nissan',
      },
      {
        value: 'honda',
        text: 'Honda',
      },
      {
        value: 'lexus',
        text: 'Lexus',
      },
      {
        value: 'mercedes',
        text: 'Mercedes',
      },
    ],
  },
];

function HomeSelectDemoContent() {
  const { items, isLoading, onLoadMore, hasMore } = usePokemonList({
    fetchDelay: 300,
  });

  const { callback: debouncedSearch } = debounceCallback(
    (searchQuery?: string) => onLoadMore({ newOffset: 0, search: searchQuery }),
    500,
  );

  return (
    <>
      <SiteSelect
        openOnLabelClick
        items={items}
        onSelectionChange={() => {}}
        multiple
        label="Multi-select autocomplete & infinite scroll"
        search
        // popOnSelection={false}
        onSearchChange={debouncedSearch}
        placeholder="Select pokemons"
        onClose={() => console.log('onClose')}
        infiniteScrollProps={{
          onLoadMore: (searchVal) => onLoadMore({ search: searchVal }),
          hasMore,
          isLoading,
        }}
      />

      <br />

      <SiteSelect
        openOnLabelClick
        label="Multi-select with sections"
        onSelectionChange={(value) => console.log(value)}
        multiple
        placeholder="Select items"
      >
        {SELECT_ITEMS.map(({ section, items }, index) => (
          <SiteSelect.Section
            title={section}
            key={section}
            showDivider={index !== SELECT_ITEMS.length - 1}
          >
            {items.map((item) => (
              <SiteSelect.Item key={item.value} {...item}>
                {item.text}
              </SiteSelect.Item>
            ))}
          </SiteSelect.Section>
        ))}
      </SiteSelect>
    </>
  );
}

function HomeSelectDemo() {
  return <BrowserOnly>{() => <HomeSelectDemoContent />}</BrowserOnly>;
}

export default HomeSelectDemo;
