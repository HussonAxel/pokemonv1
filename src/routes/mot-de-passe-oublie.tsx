import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/mot-de-passe-oublie")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const result = await authClient.requestPasswordReset({
      email,
      redirectTo: `${window.location.origin}/nouveau-mot-de-passe`,
    });

    if (result.error) {
      setError("Impossible d’envoyer le lien. Vérifiez l’adresse puis réessayez.");
    } else {
      setMessage("Si un compte correspond à cette adresse, un lien de réinitialisation vient d’être envoyé.");
    }

    setLoading(false);
  }

  return (
    <main className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[var(--background)] px-4 py-12 text-[var(--foreground)] sm:px-6">
      <div className="pointer-events-none absolute -left-24 top-20 size-72 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-500/10" />
      <section className="relative mx-auto w-full max-w-xl rounded-[2rem] border border-[var(--border)] bg-[var(--card)]/95 p-7 shadow-2xl shadow-slate-950/10 backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">Sécurité du compte</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Réinitialiser votre mot de passe</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
          Saisissez votre adresse email. Nous vous enverrons un lien valable pendant une durée limitée.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <div className="grid gap-2">
            <label htmlFor="reset-email" className="text-sm font-medium">Adresse email</label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              className="h-12 rounded-xl border border-[var(--input)] bg-[var(--background)] px-4 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--ring)]"
            />
          </div>

          {error && <p role="alert" className="text-sm text-[var(--destructive)]">{error}</p>}
          {message && <p role="status" className="rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)] shadow-lg shadow-orange-950/15 transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            {loading ? "Envoi en cours…" : "Envoyer le lien"}
          </button>
        </form>

        <Link to="/connexion" className="mt-6 block text-center text-sm font-medium text-[var(--primary)] underline-offset-4 hover:underline">
          Retour à la connexion
        </Link>
      </section>
    </main>
  );
}
