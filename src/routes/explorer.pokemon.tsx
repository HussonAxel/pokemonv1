import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explorer/pokemon")({ component: PokemonLayout });

function PokemonLayout() {
  return <Outlet />;
}
