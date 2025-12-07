import React, { useCallback } from 'react';

type PokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};
export type Pokemon = {
  name: string;
  url: string;
};

export type Option = {
  text: string;
  value: string;
};

export type UsePokemonListProps = {
  /** Delay to wait before fetching more items */
  fetchDelay?: number;
};

export function usePokemonList({ fetchDelay = 0 }: UsePokemonListProps = {}) {
  const [items, setItems] = React.useState<Option[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const limit = 8; // Number of items per page, adjust as necessary

  const loadPokemon = useCallback(
    async (currentOffset: number, search?: string) => {
      if (search) alert('Search: ' + search);
      const controller = new AbortController();
      const { signal } = controller;

      try {
        setIsLoading(true);

        if (offset > 0) {
          // Delay to simulate network latency
          await new Promise((resolve) => setTimeout(resolve, fetchDelay));
        }

        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${limit}`,
          { signal },
        );

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const json: PokemonResponse = await res.json();
        console.log({ json });

        setHasMore(json.next !== null);
        // Append new results to existing ones
        setItems((prevItems) => {
          const loadedItems = [
            ...json.results.map((item) => ({
              text: item.name,
              value: item.url,
            })),
          ];
          const newItems = [
            ...new Map(
              [...prevItems, ...loadedItems].map((item) => [item.value, item]),
            ).values(),
          ];
          return newItems;
        });
      } catch (error) {
        if (
          error &&
          typeof error === 'object' &&
          'name' in error &&
          error.name === 'AbortError'
        ) {
          console.log('Fetch aborted');
        } else {
          console.error('There was an error with the fetch operation:', error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [fetchDelay, offset],
  );

  React.useEffect(() => {
    console.log('mounted');
    loadPokemon(offset);
  }, []);

  const onLoadMore = useCallback(
    ({
      search,
      newOffset = offset,
    }: {
      search?: string;
      newOffset?: number;
    } = {}) => {
      console.info(JSON.stringify({ search }, null, 2));
      const newCalcOffset = newOffset + limit;

      setOffset(newCalcOffset);
      loadPokemon(newCalcOffset);
    },
    [offset, loadPokemon],
  );

  return {
    items,
    hasMore,
    isLoading,
    onLoadMore,
  };
}
