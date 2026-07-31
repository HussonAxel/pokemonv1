import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chasser")({ component: EmptyRoute });

function EmptyRoute() {
  return null;
}
