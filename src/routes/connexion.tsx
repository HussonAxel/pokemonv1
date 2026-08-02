import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";
import { AuthCenteredSignin } from "#/components/auth/AuthCenteredSignin";

export const Route = createFileRoute("/connexion")({ component: AuthPage });

function AuthPage() {
  const { data: session, isPending } = authClient.useSession();
  const [linkError, setLinkError] = useState("");

  if (isPending) return <main className="min-h-[calc(100svh-5rem)] bg-background" />;
  if (!session?.user) return <AuthCenteredSignin />;

  return (
    <main className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-background px-4 py-12 text-foreground sm:px-6">
      <section className="relative mx-auto w-full max-w-xl rounded-2xl border border-border bg-card p-7 shadow-xl sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Compte</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Vous êtes connecté</h1>
        <p className="mt-2 text-sm text-muted-foreground">Votre espace est prêt, {session.user.name || session.user.email}.</p>
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-muted/40 p-4">
          {session.user.image ? <img src={session.user.image} alt="" className="size-10 rounded-xl object-cover" /> : <div className="grid size-10 place-items-center rounded-xl bg-muted text-sm font-semibold">{session.user.name?.charAt(0).toUpperCase() || "U"}</div>}
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{session.user.name}</p><p className="truncate text-xs text-muted-foreground">{session.user.email}</p></div>
        </div>
        <div className="mt-6 rounded-2xl border border-border p-4">
          <h2 className="text-sm font-semibold">Méthodes de connexion</h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">Ajoutez Google pour vous connecter rapidement à ce compte.</p>
          <button type="button" onClick={() => { setLinkError(""); void authClient.linkSocial({ provider: "google", callbackURL: "/connexion" }).catch(() => setLinkError("Impossible d’associer Google pour le moment. Réessayez.")); }} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 text-sm font-semibold hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className="grid size-5 place-items-center rounded-full bg-white text-sm font-bold text-[#4285f4] shadow-sm">G</span>Associer Google</button>
          {linkError && <p role="alert" className="mt-3 text-sm text-destructive">{linkError}</p>}
        </div>
        <button onClick={() => void authClient.signOut()} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl border border-border bg-transparent px-4 text-sm font-semibold hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Se déconnecter</button>
        <Link to="/profil" className="mt-3 block text-center text-sm font-medium text-primary underline-offset-4 hover:underline">Ouvrir mon profil</Link>
      </section>
    </main>
  );
}
