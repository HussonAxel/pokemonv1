import { createFileRoute } from "@tanstack/react-router";
import { NativeLikesCounterDemo } from "#/components/LikesCounter";
import { NativeTabsDemo } from "#/components/DynamicTabs";
import { DocumentsBrowser } from "#/components/FileSystem";

export const Route = createFileRoute("/components/components")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div>Hello "/components/components"!</div>
      <NativeLikesCounterDemo />
      <NativeTabsDemo />
      <DocumentsBrowser />
    </>
  );
}
