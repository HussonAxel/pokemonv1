import { createFileRoute } from "@tanstack/react-router";

import TeamDetails from "#/features/teams/TeamDetails";

export const Route = createFileRoute("/builder")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex w-full m-auto min-w-0 flex-row flex-wrap justify-center gap-4 overflow-x-hidden">
      <TeamDetails />
      <TeamDetails />
      <TeamDetails />
      <TeamDetails />
    </main>
  );
}
