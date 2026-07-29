import { createFileRoute } from "@tanstack/react-router";
import TeamOneDetails from "#/features/teams/TeamOneDetails";

export const Route = createFileRoute("/teams/$team")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TeamOneDetails />;
}
