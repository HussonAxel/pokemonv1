import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explorer/talents")({ component: EmptyRoute });

function EmptyRoute() {
  return null;
}
