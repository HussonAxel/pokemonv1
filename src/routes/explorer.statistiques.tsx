import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explorer/statistiques")({ component: EmptyRoute });

function EmptyRoute() {
  return null;
}
