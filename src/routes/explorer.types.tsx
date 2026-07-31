import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explorer/types")({ component: EmptyRoute });

function EmptyRoute() {
  return null;
}
