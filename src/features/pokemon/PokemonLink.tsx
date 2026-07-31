import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useCallback } from "react";

import { pokemonDetailQueryOptions } from "#/features/pokemon/pokemon.queries";

interface PokemonLinkProps {
  name: string;
}

export function PokemonLink({ name }: PokemonLinkProps) {
  const queryClient = useQueryClient();

  const prefetchDetail = useCallback(() => {
    void queryClient.prefetchQuery(pokemonDetailQueryOptions(name));
  }, [name, queryClient]);

  return (
    <Link
      aria-label={`Voir la fiche de ${name}`}
      className="group flex items-center justify-between rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-sm transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/50 hover:bg-accent/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onFocus={prefetchDetail}
      onMouseEnter={prefetchDetail}
      params={{ id: name }}
      to="/explorer/pokemon/$id"
    >
      <span className="font-medium capitalize text-foreground">{name}</span>
      <span className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
