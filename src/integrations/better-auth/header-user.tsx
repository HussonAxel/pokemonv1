import { authClient } from "#/lib/auth-client";
import { Link } from "@tanstack/react-router";
import { SignIn, SignOut } from "@phosphor-icons/react";

import { headerActionClassName } from "../../components/header-action";

export default function BetterAuthHeader() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="size-10 animate-pulse rounded-xl bg-muted" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-1.5">
        {session.user.image ? (
          <img src={session.user.image} alt="" className="size-10 rounded-xl object-cover" />
        ) : (
          <div className="flex size-10 items-center justify-center rounded-xl border border-border/70 bg-muted text-muted-foreground">
            <span className="text-sm font-semibold">
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        )}
        <button
          onClick={() => {
            void authClient.signOut();
          }}
          aria-label="Se déconnecter"
          title="Se déconnecter"
          className={headerActionClassName}
        >
          <SignOut aria-hidden="true" size={20} weight="duotone" />
        </button>
      </div>
    );
  }

  return (
    <Link
      to="/demo/better-auth"
      aria-label="Se connecter"
      title="Se connecter"
      className={headerActionClassName}
    >
      <SignIn aria-hidden="true" size={20} weight="duotone" />
    </Link>
  );
}
