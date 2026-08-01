import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/db";
import type { QueryClient, QueryFunctionContext } from "@tanstack/react-query";

import type { PokemonSummary } from "#/api/client";
import {
  getDefaultPokemonListParams,
  type PokemonListParams,
} from "#/features/pokemon/pokemon.api";
import {
  POKEMON_GC_TIME,
  POKEMON_STALE_TIME,
  pokemonListQueryOptions,
} from "#/features/pokemon/pokemon.queries";

export function createPokemonSummaryCollection(
  queryClient: QueryClient,
  params: PokemonListParams = getDefaultPokemonListParams(),
) {
  const query = pokemonListQueryOptions(params);
  const collectionQueryKey = [...query.queryKey, "rows"] as const;
  type PokemonSummaryQueryFn = (context: QueryFunctionContext) => Promise<PokemonSummary[]>;
  const queryFn: PokemonSummaryQueryFn = async () => {
    const response = await queryClient.ensureQueryData(query);
    return response.results;
  };

  return createCollection(
    queryCollectionOptions<PokemonSummary, PokemonSummaryQueryFn>({
      gcTime: POKEMON_GC_TIME,
      getKey: (pokemon) => pokemon.name,
      queryClient,
      queryFn,
      queryKey: collectionQueryKey as readonly unknown[],
      staleTime: POKEMON_STALE_TIME,
    }),
  );
}
