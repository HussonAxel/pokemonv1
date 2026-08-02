import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useCallback } from "react";

import { pokemonDetailQueryOptions } from "#/features/pokemon/pokemon.queries";

interface PokemonLinkProps {
  name: string;
  url?: string;
}

function getPokemonId(url: string | undefined) {
  const id = Number(url?.split("/").filter(Boolean).at(-1));
  return Number.isInteger(id) && id > 0 ? id : undefined;
}

export function PokemonLink({ name, url }: PokemonLinkProps) {
  const queryClient = useQueryClient();
  const id = getPokemonId(url);

  const prefetchDetail = useCallback(() => {
    void queryClient.prefetchQuery(pokemonDetailQueryOptions(name));
  }, [name, queryClient]);

  return (
    <Link
      aria-label={`Voir la fiche de ${name}`}
      className="group flex min-h-32 items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-[border-color,background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
      onFocus={prefetchDetail}
      onMouseEnter={prefetchDetail}
      params={{ id: name }}
      to="/explorer/pokemon/$id"
    >
      <div className="grid size-20 shrink-0 place-items-center rounded-xl bg-muted/70 p-2">
        {id ? (
          <img
            alt=""
            className="size-full object-contain outline outline-1 outline-black/10 dark:outline-white/10"
            loading="lazy"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <span className="block truncate font-semibold capitalize text-foreground">{name}</span>
        <span className="mt-1 block font-mono text-xs tabular-nums text-muted-foreground">
          #{id ? String(id).padStart(4, "0") : "----"}
        </span>
      </div>
      <span
        aria-hidden="true"
        className="text-lg text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
