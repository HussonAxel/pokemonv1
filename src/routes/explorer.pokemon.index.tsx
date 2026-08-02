import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "@tanstack/react-db";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { PokemonLink } from "#/features/pokemon/PokemonLink";
import { createPokemonSummaryCollection } from "#/features/pokemon/pokemon.collection";
import { getDefaultPokemonListParams } from "#/features/pokemon/pokemon.api";
import { pokemonListQueryOptions } from "#/features/pokemon/pokemon.queries";

const listParams = getDefaultPokemonListParams();
const PAGE_SIZE = 48;

export const Route = createFileRoute("/explorer/pokemon/")({
  component: PokemonIndexPage,
  pendingComponent: PokemonListPending,
  errorComponent: PokemonListError,
  loader: async ({ context }) => {
    await Promise.resolve(context.queryCacheReady);
    return context.queryClient.ensureQueryData(pokemonListQueryOptions(listParams));
  },
});

type PokemonEntry = { name: string; url: string };

function PokemonIndexPage() {
  const { data } = useSuspenseQuery(pokemonListQueryOptions(listParams));
  const { queryClient } = Route.useRouteContext();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Explorer · API live
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Pokédex</h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Parcourez les Pokémon nationaux, recherchez par nom ou numéro et ouvrez une fiche
              détaillée alimentée par PokéAPI.
            </p>
          </div>
        </div>

        {!isHydrated ? (
          <PokemonGrid entries={data.results} />
        ) : (
          <PokemonCollectionGrid queryClient={queryClient} params={listParams} />
        )}
      </div>
    </main>
  );
}

function PokemonGrid({ entries }: { entries: PokemonEntry[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());
  const filteredEntries = useMemo(
    () =>
      entries.filter(
        (entry) =>
          !deferredSearch ||
          entry.name.includes(deferredSearch) ||
          entry.url.split("/").filter(Boolean).at(-1)?.includes(deferredSearch),
      ),
    [deferredSearch, entries],
  );
  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleEntries = filteredEntries.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <section aria-label="Liste des Pokémon">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="sr-only" htmlFor="pokemon-search">
          Rechercher un Pokémon
        </label>
        <input
          className="h-11 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 sm:max-w-sm"
          id="pokemon-search"
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Rechercher par nom ou numéro…"
          type="search"
          value={search}
        />
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {filteredEntries.length} Pokémon · page {currentPage} sur {totalPages}
        </p>
      </div>

      {visibleEntries.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleEntries.map((entry) => (
            <PokemonLink key={entry.name} {...entry} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          Aucun Pokémon ne correspond à « {search} ».
        </div>
      )}

      {totalPages > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => setPage((value) => value - 1)}
            type="button"
          >
            Précédent
          </button>
          <span className="min-w-20 text-center text-sm tabular-nums text-muted-foreground">
            {currentPage} / {totalPages}
          </span>
          <button
            className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentPage === totalPages}
            onClick={() => setPage((value) => value + 1)}
            type="button"
          >
            Suivant
          </button>
        </div>
      ) : null}
    </section>
  );
}

function PokemonCollectionGrid({
  params,
  queryClient,
}: {
  params: typeof listParams;
  queryClient: Parameters<typeof createPokemonSummaryCollection>[0];
}) {
  const collection = useMemo(
    () => createPokemonSummaryCollection(queryClient, params),
    [params, queryClient],
  );
  const { data: entries, isLoading } = useLiveQuery(collection);
  return isLoading ? <PokemonListPending /> : <PokemonGrid entries={entries as PokemonEntry[]} />;
}

function PokemonListPending() {
  return (
    <main className="min-h-screen px-5 py-14 text-muted-foreground sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="h-12 w-64 animate-pulse rounded-xl bg-muted" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div className="h-32 animate-pulse rounded-2xl bg-muted" key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

function PokemonListError({ error }: { error: Error }) {
  return (
    <main className="min-h-screen px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-xl rounded-2xl border border-destructive/40 bg-destructive/5 p-6">
        <h1 className="text-xl font-semibold">Impossible de charger le Pokédex</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {error.message || "Vérifiez votre connexion puis réessayez."}
        </p>
      </div>
    </main>
  );
}
