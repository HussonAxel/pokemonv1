import { queryOptions } from "@tanstack/react-query";

import {
  getDefaultPokemonListParams,
  getPokemon,
  getPokemonList,
  type PokemonIdentifier,
  type PokemonListParams,
} from "#/features/pokemon/pokemon.api";

export const POKEMON_STALE_TIME = 1000 * 60 * 60 * 24;
export const POKEMON_GC_TIME = 1000 * 60 * 60 * 24 * 7;

export const pokemonQueryKeys = {
  all: ["pokemon"] as const,
  details: () => [...pokemonQueryKeys.all, "detail"] as const,
  detail: (identifier: PokemonIdentifier) =>
    [...pokemonQueryKeys.details(), String(identifier)] as const,
  lists: () => [...pokemonQueryKeys.all, "list"] as const,
  list: (params: Required<PokemonListParams>) => [...pokemonQueryKeys.lists(), params] as const,
};

export const pokemonListQueryOptions = (
  params: PokemonListParams = getDefaultPokemonListParams(),
) => {
  const defaults = getDefaultPokemonListParams();
  const normalizedParams = {
    limit: params.limit ?? defaults.limit,
    offset: params.offset ?? defaults.offset,
  };

  return queryOptions({
    gcTime: POKEMON_GC_TIME,
    queryFn: ({ signal }) => getPokemonList({ ...normalizedParams, signal }),
    queryKey: pokemonQueryKeys.list(normalizedParams),
    staleTime: POKEMON_STALE_TIME,
  });
};

export const pokemonDetailQueryOptions = (identifier: PokemonIdentifier) => {
  const normalizedIdentifier = String(identifier);

  return queryOptions({
    gcTime: POKEMON_GC_TIME,
    queryFn: ({ signal }) => getPokemon(normalizedIdentifier, signal),
    queryKey: pokemonQueryKeys.detail(normalizedIdentifier),
    staleTime: POKEMON_STALE_TIME,
  });
};
