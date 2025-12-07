import type { ReactNode } from 'react';
import '@andrejground/react-dropdown/style.css';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import { usePokemonList } from '@site/src/hooks/usePokemonList';
import {
  debounceCallback,
  Dropdown,
  Select,
} from '@andrejground/react-dropdown';
import clsx from 'clsx';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { items, isLoading, onLoadMore, hasMore } = usePokemonList({
    fetchDelay: 300,
  });

  const { callback: debouncedSearch } = debounceCallback(
    (searchQuery?: string) => onLoadMore({ newOffset: 0, search: searchQuery }),
    500,
  );

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
          {/* Render the Select component directly, passing the fetched items */}

          <Select
            items={items}
            onSelectionChange={(value) => console.log(value)}
            multiple
            search
            onSearchChange={debouncedSearch}
            // popOnSelection={false}
            label="Select with children function"
            placeholder="Select with children function"
            onClose={() => console.log('onClose')}
            infiniteScrollProps={{
              onLoadMore: (searchVal) => onLoadMore({ search: searchVal }),
              hasMore,
              isLoading,
            }}
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
            // autoFocus="first-item"
          >
            <Dropdown.Trigger>
              <button className="w-full cursor-pointer p-4 rounded-lg border-solid border-[1px] bg-black">
                DropdownTrigger Nested
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
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
