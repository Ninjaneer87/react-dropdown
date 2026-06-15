export const dropdownMyDropdownTsx = `import { Dropdown, DropdownProps } from '@andrejground/lab';
import styles from './MyDropdown.module.scss';

type Props = DropdownProps;

function MyDropdown(props: Props) {
  return (
    <Dropdown
      {...props}
      classNames={{
        popover: { content: styles.popoverContent },
        item: { base: styles.itemBase },
        section: { base: styles.sectionBase, title: styles.sectionTitle },
        divider: { base: styles.dividerBase },
      }}
    />
  );
}

MyDropdown.Menu = Dropdown.Menu;
MyDropdown.Header = Dropdown.Header;
MyDropdown.Footer = Dropdown.Footer;
MyDropdown.Section = Dropdown.Section;
MyDropdown.Item = Dropdown.Item;
MyDropdown.Trigger = Dropdown.Trigger;
MyDropdown.Divider = Dropdown.Divider;

export default MyDropdown;`;

export const dropdownMyDropdownScss = `.popoverContent {
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.sectionTitle {
  background-color: transparent;
  font-size: 80%;
}

.itemBase {
  &:hover,
  &:active,
  &:focus-visible,
  &:focus-within,
  &[data-highlighted-item='true'] {
    background-color: var(--item-hover-bg-color);
  }
}

.dividerBase {
  background-color: var(--divider-color);
}`;

export const dropdownUsageTsx = `import { Dropdown } from '@andrejground/lab';

export default function App() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button>Open Menu</button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => alert('New file')}>
          New file
        </Dropdown.Item>
        <Dropdown.Item onClick={() => alert('Copy link')}>
          Copy link
        </Dropdown.Item>
        <Dropdown.Item onClick={() => alert('Edit')}>
          Edit
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}`;

export const dropdownSectionsTsx = `import { Dropdown } from '@andrejground/lab';

export default function App() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button>Open Menu</button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Section title="Actions">
          <Dropdown.Item description="Create a new file">
            New file
          </Dropdown.Item>
          <Dropdown.Item description="Copy the file link">
            Copy link
          </Dropdown.Item>
        </Dropdown.Section>

        <Dropdown.Divider />

        <Dropdown.Section title="Danger zone">
          <Dropdown.Item description="Permanently delete this file">
            Delete
          </Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
}`;

export const dropdownControlledTsx = `import React from 'react';
import { Dropdown } from '@andrejground/lab';

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
        <Dropdown.Trigger>
          <button>Open Menu</button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>New file</Dropdown.Item>
          <Dropdown.Item>Copy link</Dropdown.Item>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <br />

      <div>
        Open: <code>{\`\${isOpen}\`}</code>
      </div>
    </>
  );
}`;

export const dropdownNestedTsx = `import { Dropdown } from '@andrejground/lab';

export default function App() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button>Actions</button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>New file</Dropdown.Item>
        <Dropdown.Item>Copy link</Dropdown.Item>

        <Dropdown>
          <Dropdown.Trigger>
            <Dropdown.Item shouldCloseOnSelection={false}>
              Export
            </Dropdown.Item>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>JSON</Dropdown.Item>
            <Dropdown.Item>CSV</Dropdown.Item>
            <Dropdown.Item>PDF</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Dropdown.Menu>
    </Dropdown>
  );
}`;

export const dropdownDisabledItemsTsx = `import { Dropdown } from '@andrejground/lab';

export default function App() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button>Open Menu</button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>New file</Dropdown.Item>
        <Dropdown.Item disabled>Copy link (disabled)</Dropdown.Item>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item disabled>Delete (disabled)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}`;

export const dropdownInfiniteScrollTsx = `import React from 'react';
import { Dropdown } from '@andrejground/lab';

// Example hook that fetches paginated data
function usePokemonList() {
  const [items, setItems] = React.useState<{ text: string; value: string }[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const limit = 8;

  const loadPokemon = React.useCallback(async (currentOffset: number) => {
    setIsLoading(true);
    const res = await fetch(
      \`https://pokeapi.co/api/v2/pokemon?offset=\${currentOffset}&limit=\${limit}\`,
    );
    const json = await res.json();
    setHasMore(json.next !== null);
    setItems((prev) => {
      const loaded = json.results.map((p) => ({ text: p.name, value: p.url }));
      return [...new Map([...prev, ...loaded].map((i) => [i.value, i])).values()];
    });
    setIsLoading(false);
  }, []);

  React.useEffect(() => { loadPokemon(0); }, []);

  const onLoadMore = React.useCallback(() => {
    const next = offset + limit;
    setOffset(next);
    loadPokemon(next);
  }, [offset, loadPokemon]);

  return { items, hasMore, isLoading, onLoadMore };
}

export default function App() {
  const { items, isLoading, onLoadMore, hasMore } = usePokemonList();

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button>
          Pokémons ▾
        </button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Section
          title="Pokémons"
          scrolling
          infiniteScrollProps={{
            onLoadMore,
            hasMore,
            isLoading,
          }}
        >
          {items.map((item) => (
            <Dropdown.Item key={item.value}>
              {item.text}
            </Dropdown.Item>
          ))}
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
}`;

export const dropdownPolymorphicTsx = `import { Dropdown } from '@andrejground/lab';

export default function App() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button>Navigation</button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item as="a" href="/blog" description="Visit the blog">
          Blog (Link)
        </Dropdown.Item>
        <Dropdown.Item as="a" href="https://github.com" target="_blank" description="Open GitHub">
          GitHub (anchor)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => alert('Clicked!')} description="Triggers an action">
          Action (div)
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}`;
