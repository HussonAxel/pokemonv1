import { createFileRoute } from "@tanstack/react-router";

import { PokemonFinder } from "#/features/Finder/PokemonFinder";

export const Route = createFileRoute("/explorer/")({
  component: PokemonFinder,
});
