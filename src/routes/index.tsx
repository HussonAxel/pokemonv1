import { createFileRoute } from "@tanstack/react-router";

import MenuBento from "#/components/MenuBento";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <MenuBento />;
}
