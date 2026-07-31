import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explorer/pokemon")({ component: EmptyRoute });

function EmptyRoute() {
  return null;
}
