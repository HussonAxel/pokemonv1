import { queryOptions } from "@tanstack/react-query";

import {
  getAbility,
  getAbilityList,
  getDefaultPokemonListParams,
  getPokemon,
  getPokemonList,
  getPokemonSpecies,
  getType,
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
  abilities: () => [...pokemonQueryKeys.all, "ability"] as const,
  abilityList: () => [...pokemonQueryKeys.abilities(), "list"] as const,
  abilityDetail: (identifier: PokemonIdentifier) =>
    [...pokemonQueryKeys.abilities(), String(identifier)] as const,
  lists: () => [...pokemonQueryKeys.all, "list"] as const,
  list: (params: { limit: number; offset: number; search?: string }) =>
    [...pokemonQueryKeys.lists(), params] as const,
  species: () => [...pokemonQueryKeys.all, "species"] as const,
  speciesDetail: (identifier: PokemonIdentifier) =>
    [...pokemonQueryKeys.species(), String(identifier)] as const,
  types: () => [...pokemonQueryKeys.all, "type"] as const,
  typeDetail: (identifier: PokemonIdentifier) =>
    [...pokemonQueryKeys.types(), String(identifier)] as const,
};

export const pokemonListQueryOptions = (
  params: PokemonListParams = getDefaultPokemonListParams(),
) => {
  const defaults = getDefaultPokemonListParams();
  const normalizedParams = {
    limit: params.limit ?? defaults.limit,
    offset: params.offset ?? defaults.offset,
    search: params.search?.trim() || undefined,
  };

  return queryOptions({
    gcTime: POKEMON_GC_TIME,
    queryFn: ({ signal }) => getPokemonList({ ...normalizedParams, signal }),
    queryKey: pokemonQueryKeys.list(normalizedParams),
    staleTime: POKEMON_STALE_TIME,
  });
};

export const pokemonSpeciesQueryOptions = (identifier: PokemonIdentifier) => {
  const normalizedIdentifier = String(identifier);

  return queryOptions({
    gcTime: POKEMON_GC_TIME,
    queryFn: ({ signal }) => getPokemonSpecies(normalizedIdentifier, signal),
    queryKey: pokemonQueryKeys.speciesDetail(normalizedIdentifier),
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

export const pokemonAbilityListQueryOptions = () =>
  queryOptions({
    gcTime: POKEMON_GC_TIME,
    queryFn: ({ signal }) => getAbilityList(signal),
    queryKey: pokemonQueryKeys.abilityList(),
    staleTime: POKEMON_STALE_TIME,
  });

export const pokemonAbilityQueryOptions = (identifier: PokemonIdentifier) => {
  const normalizedIdentifier = String(identifier);

  return queryOptions({
    gcTime: POKEMON_GC_TIME,
    queryFn: ({ signal }) => getAbility(normalizedIdentifier, signal),
    queryKey: pokemonQueryKeys.abilityDetail(normalizedIdentifier),
    staleTime: POKEMON_STALE_TIME,
  });
};

export const pokemonTypeQueryOptions = (identifier: PokemonIdentifier) => {
  const normalizedIdentifier = String(identifier);

  return queryOptions({
    gcTime: POKEMON_GC_TIME,
    queryFn: ({ signal }) => getType(normalizedIdentifier, signal),
    queryKey: pokemonQueryKeys.typeDetail(normalizedIdentifier),
    staleTime: POKEMON_STALE_TIME,
  });
};
