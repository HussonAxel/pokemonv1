import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explorer")({ component: ExplorerLayout });

function ExplorerLayout() {
  return <Outlet />;
}
