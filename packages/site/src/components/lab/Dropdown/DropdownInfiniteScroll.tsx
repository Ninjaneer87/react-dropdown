import BrowserOnly from '@docusaurus/BrowserOnly';
import { mdiMenuDown } from '@mdi/js';
import Icon from '@mdi/react';
import SiteDropdown from '@site/src/components/site-lab/SiteDropdown/SiteDropdown';
import { usePokemonList } from '@site/src/hooks/usePokemonList';
import React from 'react';

function DropdownInfiniteScrollContent() {
  const { items, isLoading, onLoadMore, hasMore } = usePokemonList({
    fetchDelay: 300,
  });

  return (
    <SiteDropdown>
      <SiteDropdown.Trigger>
        <button className="button button--secondary button--outline inline-flex items-center gap-1">
          Pokémons
          <Icon path={mdiMenuDown} size={1} />
        </button>
      </SiteDropdown.Trigger>
      <SiteDropdown.Menu>
        <SiteDropdown.Section
          title="Pokémons"
          scrolling
          infiniteScrollProps={{
            onLoadMore: () => onLoadMore(),
            hasMore,
            isLoading,
          }}
        >
          {items.map((item) => (
            <SiteDropdown.Item
              key={item.value}
              onClick={() => console.log(item.text)}
            >
              {item.text}
            </SiteDropdown.Item>
          ))}
        </SiteDropdown.Section>
      </SiteDropdown.Menu>
    </SiteDropdown>
  );
}

function DropdownInfiniteScroll() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <DropdownInfiniteScrollContent />}
    </BrowserOnly>
  );
}
export default DropdownInfiniteScroll;
