import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";
import { z } from "zod";

export const Route = createFileRoute("/nouveau-mot-de-passe")({
  validateSearch: z.object({ token: z.string().optional() }),
  component: NewPasswordPage,
});

function NewPasswordPage() {
  const { token } = useSearch({ from: "/nouveau-mot-de-passe" });
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!token) {
      setError("Ce lien de réinitialisation est incomplet ou invalide.");
      return;
    }
    if (password !== confirmation) {
      setError("Les deux mots de passe doivent être identiques.");
      return;
    }
    setLoading(true);
    const result = await authClient.resetPassword({ newPassword: password, token });
    if (result.error) {
      setError("Ce lien est invalide ou expiré. Demandez un nouveau lien.");
    } else {
      setDone(true);
    }
    setLoading(false);
  }

  return (
    <main className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[var(--background)] px-4 py-12 text-[var(--foreground)] sm:px-6">
      <section className="relative mx-auto w-full max-w-xl rounded-[2rem] border border-[var(--border)] bg-[var(--card)]/95 p-7 shadow-2xl shadow-slate-950/10 backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">Sécurité du compte</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Choisir un nouveau mot de passe</h1>
        {done ? (
          <div className="mt-6 space-y-4">
            <p className="text-sm leading-6 text-[var(--muted-foreground)]">Votre mot de passe a été modifié. Vous pouvez maintenant vous connecter.</p>
            <Link to="/connexion" className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)]">Se connecter</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <label className="grid gap-2 text-sm font-medium" htmlFor="new-password">Nouveau mot de passe
              <input id="new-password" type="password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 rounded-xl border border-[var(--input)] bg-[var(--background)] px-4 text-sm font-normal outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--ring)]" />
            </label>
            <label className="grid gap-2 text-sm font-medium" htmlFor="confirm-password">Confirmer le mot de passe
              <input id="confirm-password" type="password" minLength={8} required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="h-12 rounded-xl border border-[var(--input)] bg-[var(--background)] px-4 text-sm font-normal outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--ring)]" />
            </label>
            {error && <p role="alert" className="text-sm text-[var(--destructive)]">{error}</p>}
            <button type="submit" disabled={loading} className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)] disabled:opacity-60">{loading ? "Enregistrement…" : "Enregistrer le mot de passe"}</button>
          </form>
        )}
      </section>
    </main>
  );
}
