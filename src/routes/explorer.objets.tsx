import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explorer/objets")({ component: EmptyRoute });

function EmptyRoute() {
  return null;
}
