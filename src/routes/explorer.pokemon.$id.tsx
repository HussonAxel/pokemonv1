import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import Badge from "#/components/badge";
import {
  pokemonDetailQueryOptions,
  pokemonSpeciesQueryOptions,
} from "#/features/pokemon/pokemon.queries";

export const Route = createFileRoute("/explorer/pokemon/$id")({
  component: PokemonDetailPage,
  pendingComponent: PokemonDetailPending,
  errorComponent: PokemonDetailError,
  loader: ({ context, params }) => {
    void Promise.resolve(context.queryCacheReady).then(() =>
      Promise.all([
        context.queryClient.prefetchQuery(pokemonDetailQueryOptions(params.id)),
        context.queryClient.prefetchQuery(pokemonSpeciesQueryOptions(params.id)),
      ]),
    );
  },
});

function PokemonDetailPage() {
  const { id } = Route.useParams();
  const pokemonQuery = useQuery(pokemonDetailQueryOptions(id));
  const speciesQuery = useQuery(pokemonSpeciesQueryOptions(id));

  if (pokemonQuery.isPending || speciesQuery.isPending) return <PokemonDetailPending />;
  if (pokemonQuery.isError) {
    return <PokemonDetailError error={pokemonQuery.error} />;
  }
  if (speciesQuery.isError) {
    return <PokemonDetailError error={speciesQuery.error} />;
  }

  const pokemon = pokemonQuery.data;
  const species = speciesQuery.data;
  if (!pokemon || !species) return <PokemonDetailPending />;
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const totalStats = pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
  const description =
    species.flavor_text_entries
      .find((entry) => entry.language.name === "fr")
      ?.flavor_text.replaceAll("\n", " ")
      .replaceAll("\f", " ") ??
    species.flavor_text_entries
      .find((entry) => entry.language.name === "en")
      ?.flavor_text.replaceAll("\n", " ")
      .replaceAll("\f", " ");

  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8 sm:py-14">
      <article className="mx-auto max-w-4xl">
        <Link
          className="inline-flex min-h-10 items-center rounded-lg text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          to="/explorer/pokemon"
        >
          ← Retour au Pokédex
        </Link>

        <div className="mt-6 grid gap-8 rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:grid-cols-[240px_1fr] sm:p-8">
          <div className="grid aspect-square place-items-center rounded-2xl bg-muted/60 p-5">
            <img
              alt={`Illustration de ${pokemon.name}`}
              className="size-full object-contain outline outline-1 outline-black/10 dark:outline-white/10"
              src={image}
            />
          </div>

          <div>
            <p className="font-mono text-sm font-medium tabular-nums text-muted-foreground">
              N° {String(pokemon.id).padStart(4, "0")}
            </p>
            <h1 className="mt-1 text-4xl font-semibold capitalize tracking-tight">
              {pokemon.name}
            </h1>
            <Badge
              className="mt-4 gap-1"
              items={pokemon.types.map(({ type }) => type.name)}
              size="xs"
            />

            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <DetailMetric
                label="Taille"
                value={pokemon.height == null ? "—" : `${(pokemon.height / 10).toFixed(1)} m`}
              />
              <DetailMetric
                label="Poids"
                value={pokemon.weight == null ? "—" : `${(pokemon.weight / 10).toFixed(1)} kg`}
              />
              <DetailMetric label="Expérience" value={String(pokemon.base_experience ?? "—")} />
              <DetailMetric label="Total stats" value={String(totalStats)} />
            </dl>
          </div>
        </div>

        {description ? (
          <p className="mt-6 rounded-2xl bg-accent/50 p-5 text-sm leading-7 text-accent-foreground">
            {description}
          </p>
        ) : null}

        <section className="mt-8 rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold">Talents</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {pokemon.abilities.map(({ ability, is_hidden }) => (
              <span
                className="rounded-lg border bg-muted/50 px-3 py-2 text-sm capitalize"
                key={ability.name}
              >
                {ability.name}
                {is_hidden ? (
                  <span className="ml-2 text-xs text-muted-foreground">caché</span>
                ) : null}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold">Statistiques de base</h2>
            <span className="text-sm tabular-nums text-muted-foreground">Total {totalStats}</span>
          </div>
          <div className="mt-5 space-y-4">
            {pokemon.stats.map(({ base_stat: value, stat }) => (
              <div className="grid grid-cols-[110px_1fr_40px] items-center gap-3" key={stat.name}>
                <span className="text-sm capitalize text-muted-foreground">{stat.name}</span>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-500"
                    style={{ width: `${Math.min(value, 255) / 2.55}%` }}
                  />
                </div>
                <span className="text-right text-sm font-semibold tabular-nums">{value}</span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

function PokemonDetailPending() {
  return (
    <main className="min-h-screen px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="h-6 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-6 h-80 animate-pulse rounded-3xl bg-muted" />
        <div className="mt-8 h-56 animate-pulse rounded-3xl bg-muted" />
      </div>
    </main>
  );
}

function PokemonDetailError({ error }: { error: Error }) {
  return (
    <main className="min-h-screen px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-xl rounded-2xl border border-destructive/40 bg-destructive/5 p-6">
        <h1 className="text-xl font-semibold">Pokémon introuvable</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {error.message || "Cette fiche n’est pas disponible."}
        </p>
        <Link
          className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
          to="/explorer/pokemon"
        >
          Retour au Pokédex
        </Link>
      </div>
    </main>
  );
}

function DetailMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
