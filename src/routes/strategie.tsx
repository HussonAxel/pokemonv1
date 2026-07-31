import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/strategie")({ component: EmptyRoute });

function EmptyRoute() {
  return null;
}
