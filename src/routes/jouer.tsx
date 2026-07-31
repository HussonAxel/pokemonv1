import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/jouer")({ component: EmptyRoute });

function EmptyRoute() {
  return null;
}
