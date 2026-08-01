import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/preferences")({
  component: EmptyRoute,
});

function EmptyRoute() {
  return null;
}
