import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/outils")({ component: EmptyRoute });

function EmptyRoute() {
  return null;
}
