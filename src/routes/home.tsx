import { createFileRoute } from "@tanstack/react-router";
import { DocumentsBrowser } from "#/components/FileSystem";

export const Route = createFileRoute("/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DocumentsBrowser />;
}
