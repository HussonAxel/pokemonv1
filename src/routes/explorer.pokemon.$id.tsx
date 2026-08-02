import { Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import Badge from "#/components/badge";
import { pokemonDetailQueryOptions } from "#/features/pokemon/pokemon.queries";

export const Route = createFileRoute("/explorer/pokemon/$id")({
  component: PokemonDetailPage,
  loader: async ({ context, params }) => {
    await Promise.resolve(context.queryCacheReady);
    return context.queryClient.ensureQueryData(pokemonDetailQueryOptions(params.id));
  },
});

function PokemonDetailPage() {
  const { id } = Route.useParams();
  const { data: pokemon } = useSuspenseQuery(pokemonDetailQueryOptions(id));
  const image = pokemon.sprites.front_default;

  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-8">
      <article className="mx-auto max-w-4xl">
        <Link
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          to="/explorer/pokemon"
        >
          ← Retour au Pokédex
        </Link>

        <div className="mt-8 grid gap-8 rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:grid-cols-[220px_1fr] sm:p-8">
          <div className="grid aspect-square place-items-center rounded-2xl bg-muted/60 p-5">
            {image ? (
              <img alt={pokemon.name} className="size-full object-contain" src={image} />
            ) : (
              <span className="text-sm text-muted-foreground">Image indisponible</span>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">N° {pokemon.id}</p>
            <h1 className="mt-1 text-4xl font-semibold capitalize tracking-tight">
              {pokemon.name}
            </h1>
            <Badge
              className="mt-4 gap-1"
              items={pokemon.types.map(({ type }) => type.name)}
              size="xs"
            />

            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <DetailMetric label="Taille" value={`${pokemon.height ?? "—"} dm`} />
              <DetailMetric label="Poids" value={`${pokemon.weight ?? "—"} hg`} />
              <DetailMetric label="Expérience" value={String(pokemon.base_experience ?? "—")} />
              <DetailMetric label="Attaques" value={String(pokemon.moves.length)} />
            </dl>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold">Statistiques de base</h2>
          <div className="mt-5 space-y-4">
            {pokemon.stats.map(({ base_stat: value, stat }) => (
              <div className="grid grid-cols-[110px_1fr_40px] items-center gap-3" key={stat.name}>
                <span className="text-sm capitalize text-muted-foreground">{stat.name}</span>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-500"
                    style={{ width: `${Math.min(value, 150) / 1.5}%` }}
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

function DetailMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
