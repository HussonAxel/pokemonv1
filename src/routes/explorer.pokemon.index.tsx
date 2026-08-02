import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "@tanstack/react-db";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import { PokemonLink } from "#/features/pokemon/PokemonLink";
import { createPokemonSummaryCollection } from "#/features/pokemon/pokemon.collection";
import { getDefaultPokemonListParams } from "#/features/pokemon/pokemon.api";
import { pokemonListQueryOptions } from "#/features/pokemon/pokemon.queries";

const listParams = getDefaultPokemonListParams();

export const Route = createFileRoute("/explorer/pokemon/")({
  component: PokemonIndexPage,
  loader: async ({ context }) => {
    await Promise.resolve(context.queryCacheReady);
    return context.queryClient.ensureQueryData(pokemonListQueryOptions(listParams));
  },
});

function PokemonIndexPage() {
  const { data } = useSuspenseQuery(pokemonListQueryOptions(listParams));
  const { queryClient } = Route.useRouteContext();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Explorer · API live
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Pokédex</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Premier exemple de flux typé OpenAPI : la réponse paginée reste dans TanStack Query,
            tandis que ses résumés sont normalisés dans TanStack DB.
          </p>
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

function PokemonGrid({ entries }: { entries: Array<{ name: string }> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <PokemonLink key={entry.name} name={entry.name} />
      ))}
    </div>
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

  return isLoading ? (
    <p className="text-muted-foreground">Synchronisation DB…</p>
  ) : (
    <PokemonGrid entries={entries} />
  );
}
