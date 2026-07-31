import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explorer/attaques")({ component: EmptyRoute });

function EmptyRoute() {
  return null;
}
