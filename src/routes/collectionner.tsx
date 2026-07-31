import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/collectionner")({ component: EmptyRoute });

function EmptyRoute() {
  return null;
}
