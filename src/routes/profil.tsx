import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KeyRound, LogOut, ShieldCheck, Trash2, Upload } from "lucide-react";
import { authClient } from "#/lib/auth-client";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

export const Route = createFileRoute("/profil")({ component: ProfilePage });

function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!session?.user) return;
    setName(session.user.name ?? "");
    setImage(session.user.image ?? "");
  }, [session?.user]);

  if (isPending) return <main className="min-h-svh bg-background" />;
  if (!session?.user) return <Navigate to="/connexion" />;

  async function saveProfile() {
    setSaving(true);
    setStatus("");
    setError("");
    const result = await authClient.updateUser({ name, image: image || null });
    if (result.error) {
      setError("Impossible d’enregistrer le profil. Vérifiez les informations puis réessayez.");
    } else {
      setDirty(false);
      setStatus("Profil enregistré.");
    }
    setSaving(false);
  }

  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-5 py-10 pb-32 sm:px-8 sm:py-12">
        <Link to="/" className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground">← Retour à l’accueil</Link>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Compte · Profil</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">Votre profil</h1>
        <p className="mt-2 text-sm text-muted-foreground">Gérez les informations associées à votre compte.</p>

        <Section title="Photo">
          <div className="flex items-center gap-5">
            {image ? <img src={image} alt="" className="size-20 shrink-0 rounded-full object-cover ring-1 ring-border/60" /> : <div className="grid size-20 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 text-xl font-semibold ring-1 ring-border/60">{name.charAt(0).toUpperCase() || "U"}</div>}
            <div className="flex flex-1 flex-col gap-2">
              <Button size="sm" variant="outline" type="button" onClick={() => document.getElementById("profile-image")?.focus()}><Upload /> Modifier l’URL</Button>
              <p className="text-xs text-muted-foreground">Utilisez une URL d’image HTTPS. L’image est stockée avec votre profil.</p>
            </div>
          </div>
          <Input id="profile-image" aria-label="URL de la photo" value={image} onChange={(event) => { setImage(event.target.value); setDirty(true); }} placeholder="https://…" nativeInput />
        </Section>

        <Separator />
        <Section title="Identité">
          <Field label="Nom affiché" htmlFor="profile-name"><Input id="profile-name" value={name} onChange={(event) => { setName(event.target.value); setDirty(true); }} nativeInput /></Field>
          <Field label="Adresse email" htmlFor="profile-email"><Input id="profile-email" value={session.user.email} readOnly nativeInput /></Field>
        </Section>

        <Separator />
        <Section title="Sécurité">
          <SecurityRow icon={<ShieldCheck />} title="Connexion Google" description="Associez Google depuis la page de connexion pour utiliser le SSO." cta="Gérer" href="/connexion" />
          <SecurityRow icon={<KeyRound />} title="Mot de passe" description="Modifiez votre mot de passe depuis le parcours sécurisé." cta="Réinitialiser" href="/mot-de-passe-oublie" />
          <SecurityRow icon={<LogOut />} title="Sessions actives" description="La révocation des autres appareils sera disponible ici." cta="Bientôt disponible" disabled />
          <SecurityRow destructive icon={<Trash2 />} title="Supprimer le compte" description="La suppression définitive sera activée avec la confirmation email." cta="Bientôt disponible" disabled />
        </Section>

        {(status || error) && <p role={error ? "alert" : "status"} className={`mt-6 text-sm ${error ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}>{error || status}</p>}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{dirty ? "Modifications non enregistrées" : "Profil à jour"}</div>
          <div className="flex items-center gap-2"><Button variant="ghost" size="sm" type="button" disabled={!dirty} onClick={() => { setName(session.user.name ?? ""); setImage(session.user.image ?? ""); setDirty(false); }}>Annuler</Button><Button size="sm" type="button" disabled={!dirty} loading={saving} onClick={() => void saveProfile()}>Enregistrer</Button></div>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className="mt-8"><h2 className="text-base font-semibold">{title}</h2><div className="mt-4 flex flex-col gap-4">{children}</div></section>; }
function Separator() { return <div className="my-8 h-px bg-border/70" />; }
function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) { return <div className="flex flex-col gap-1.5"><label htmlFor={htmlFor} className="text-sm font-medium">{label}</label>{children}</div>; }
function SecurityRow({ icon, title, description, cta, href, destructive = false, disabled = false }: { icon: React.ReactNode; title: string; description: string; cta: string; href?: "/connexion" | "/mot-de-passe-oublie"; destructive?: boolean; disabled?: boolean }) { const content = <><div className={`flex size-8 shrink-0 items-center justify-center rounded-md ${destructive ? "bg-destructive/10 text-destructive" : "bg-foreground/[0.06]"}`}>{icon}</div><div className="min-w-0 flex-1"><div className="text-sm font-medium">{title}</div><p className="mt-0.5 text-xs text-muted-foreground">{description}</p></div>{href ? <Link to={href} className="inline-flex h-8 items-center rounded-lg border border-transparent px-2.5 text-xs font-medium text-foreground hover:bg-accent">{cta}</Link> : <Button variant={destructive ? "destructive-outline" : "ghost"} size="sm" disabled={disabled}>{cta}</Button>}</>; return <div className={`flex items-center gap-4 rounded-lg border p-3.5 ${destructive ? "border-destructive/40 bg-destructive/[0.03]" : "border-border/60 bg-background/40"}`}>{content}</div>; }
