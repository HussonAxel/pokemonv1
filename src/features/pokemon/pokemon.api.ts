import { api } from "#/api/api";
import type { PaginatedPokemonSummaryList, PokemonDetail } from "#/api/client";

export type PokemonIdentifier = string | number;

export interface PokemonListParams {
  limit?: number;
  offset?: number;
}

const DEFAULT_PAGE_SIZE = 24;
const DEFAULT_POKEMON_LIST_PARAMS = {
  limit: DEFAULT_PAGE_SIZE,
  offset: 0,
} satisfies Required<PokemonListParams>;

export const getDefaultPokemonListParams = (): Required<PokemonListParams> => ({
  ...DEFAULT_POKEMON_LIST_PARAMS,
});

export async function getPokemonList(
  params: PokemonListParams & { signal?: AbortSignal } = {},
): Promise<PaginatedPokemonSummaryList> {
  const { limit = DEFAULT_PAGE_SIZE, offset = 0, signal } = params;

  return api.get("/api/v2/pokemon/", {
    overrides: signal ? { signal } : undefined,
    query: { limit, offset },
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
