import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explorer/evolutions")({ component: EmptyRoute });

function EmptyRoute() {
  return null;
}
