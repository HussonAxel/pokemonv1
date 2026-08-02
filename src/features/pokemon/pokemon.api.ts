import { api } from "#/api/api";
import type {
  AbilityDetail,
  PaginatedAbilitySummaryList,
  PaginatedPokemonSummaryList,
  PokemonDetail,
  PokemonSpeciesDetail,
} from "#/api/client";

export type PokemonIdentifier = string | number;

export interface PokemonListParams {
  limit?: number;
  offset?: number;
  search?: string;
}

const DEFAULT_PAGE_SIZE = 24;
const DEFAULT_POKEMON_LIST_PARAMS = {
  limit: DEFAULT_PAGE_SIZE,
  offset: 0,
} satisfies Required<Pick<PokemonListParams, "limit" | "offset">>;

export const getDefaultPokemonListParams = (): Required<
  Pick<PokemonListParams, "limit" | "offset">
> => ({
  ...DEFAULT_POKEMON_LIST_PARAMS,
});

export async function getPokemonList(
  params: PokemonListParams & { signal?: AbortSignal } = {},
): Promise<PaginatedPokemonSummaryList> {
  const { limit = DEFAULT_PAGE_SIZE, offset = 0, search, signal } = params;

  return api.get("/api/v2/pokemon/", {
    overrides: signal ? { signal } : undefined,
    query: { limit, offset, q: search?.trim() || undefined },
  });
}

export async function getPokemon(
  identifier: PokemonIdentifier,
  signal?: AbortSignal,
): Promise<PokemonDetail> {
  return api.get("/api/v2/pokemon/{id}/", {
    overrides: signal ? { signal } : undefined,
    path: { id: String(identifier) },
  });
}

export async function getPokemonSpecies(
  identifier: PokemonIdentifier,
  signal?: AbortSignal,
): Promise<PokemonSpeciesDetail> {
  return api.get("/api/v2/pokemon-species/{id}/", {
    overrides: signal ? { signal } : undefined,
    path: { id: String(identifier) },
  });
}

export async function getAbilityList(signal?: AbortSignal): Promise<PaginatedAbilitySummaryList> {
  return api.get("/api/v2/ability/", {
    overrides: signal ? { signal } : undefined,
    query: { limit: 1000, offset: 0 },
  });
}

export async function getAbility(
  identifier: PokemonIdentifier,
  signal?: AbortSignal,
): Promise<AbilityDetail> {
  return api.get("/api/v2/ability/{id}/", {
    overrides: signal ? { signal } : undefined,
    path: { id: String(identifier) },
  });
}

export async function getType(identifier: PokemonIdentifier, signal?: AbortSignal) {
  return api.get("/api/v2/type/{id}/", {
    overrides: signal ? { signal } : undefined,
    path: { id: String(identifier) },
  });
}
