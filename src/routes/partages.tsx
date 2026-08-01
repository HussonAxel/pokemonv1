import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/partages")({
  component: EmptyRoute,
});

function EmptyRoute() {
  return null;
}
