import { useState, type FormEvent } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { authClient } from "#/lib/auth-client";
import { Button } from "#/components/ui/button";
import { Card, CardHeader, CardPanel } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group";
import { Separator } from "#/components/ui/separator";

export function AuthCenteredSignin() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [reveal, setReveal] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setPending(true);
    try {
      const result = isSignUp
        ? await authClient.signUp.email({ email, password, name })
        : await authClient.signIn.email({ email, password });
      if (result.error) {
        setError(result.error.message || "Impossible de continuer. Vérifiez vos informations.");
      } else if (isSignUp) {
        setSuccess("Compte créé. Vous pouvez maintenant vous connecter.");
        setPassword("");
      }
    } catch {
      setError("Impossible de continuer. Vérifiez vos informations puis réessayez.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="relative flex min-h-[calc(100svh-5rem)] items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="relative w-full max-w-sm">
        <Card className="p-7">
          <CardHeader className="flex flex-col items-center gap-4 p-0 text-center">
            <BrandMark />
            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl font-semibold tracking-tight">{isSignUp ? "Créer votre compte" : "Bon retour"}</h1>
              <p className="text-sm text-muted-foreground">{isSignUp ? "Sauvegardez votre progression partout." : "Connectez-vous pour retrouver votre espace."}</p>
            </div>
          </CardHeader>
          <CardPanel className="mt-6 flex flex-col gap-5 p-0">
            <Button variant="outline" type="button" onClick={() => void authClient.signIn.social({ provider: "google", callbackURL: "/" })}>
              <GoogleIcon /> Continuer avec Google
            </Button>
            <div className="flex items-center gap-3"><Separator className="flex-1" /><span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">ou avec votre email</span><Separator className="flex-1" /></div>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              {isSignUp && <Field label="Nom" htmlFor="centered-name"><Input id="centered-name" required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" nativeInput /></Field>}
              <Field label="Adresse email" htmlFor="centered-email"><Input id="centered-email" type="email" required placeholder="vous@exemple.fr" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} nativeInput /></Field>
              <Field label="Mot de passe" htmlFor="centered-password"><InputGroup><InputGroupInput id="centered-password" type={reveal ? "text" : "password"} required minLength={8} placeholder="Votre mot de passe" autoComplete={isSignUp ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} nativeInput /><InputGroupAddon align="inline-end"><button type="button" onClick={() => setReveal((value) => !value)} aria-label={reveal ? "Masquer le mot de passe" : "Afficher le mot de passe"} className="rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{reveal ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}</button></InputGroupAddon></InputGroup></Field>
              {error && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
              {success && <p role="status" className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm text-emerald-700 dark:text-emerald-300">{success}</p>}
              <Button type="submit" size="lg" loading={pending} className="mt-1 w-full">{isSignUp ? "Créer le compte" : "Se connecter"}</Button>
            </form>
            {!isSignUp && <Link to="/mot-de-passe-oublie" className="text-center text-xs text-muted-foreground hover:text-foreground hover:underline">Mot de passe oublié ?</Link>}
            <p className="text-center text-xs text-muted-foreground">{isSignUp ? "Vous avez déjà un compte ?" : "Pas encore de compte ?"}{" "}<button type="button" onClick={() => { setIsSignUp((value) => !value); setError(""); setSuccess(""); }} className="text-foreground hover:underline">{isSignUp ? "Se connecter" : "Créer un compte"}</button></p>
          </CardPanel>
        </Card>
      </div>
    </main>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) { return <div className="flex flex-col gap-1.5"><label htmlFor={htmlFor} className="text-sm font-medium">{label}</label>{children}</div>; }
function PageBackdrop() { return <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ background: "radial-gradient(50% 40% at 0% 0%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 70%), radial-gradient(55% 45% at 100% 100%, color-mix(in oklch, var(--foreground) 8%, transparent), transparent 70%)" }} />; }
function BrandMark() { return <svg viewBox="0 0 40 40" aria-hidden className="size-9" xmlns="http://www.w3.org/2000/svg" fill="none"><circle cx="20" cy="20" r="17" stroke="currentColor" strokeOpacity=".35" strokeWidth="1" strokeDasharray="2 3" /><rect x="11" y="11" width="18" height="18" rx="3" fill="currentColor" /><path d="M16 22.5c.6.7 1.7 1.2 2.9 1.2 1.5 0 2.6-.7 2.6-1.8 0-1-.7-1.5-2.2-1.8l-.9-.2c-.9-.2-1.3-.5-1.3-1 0-.6.6-1 1.4-1 .9 0 1.5.4 1.7 1l1.4-.5c-.3-1.1-1.4-1.8-3-1.8-1.6 0-2.7.8-2.7 2 0 1 .7 1.6 2.1 1.9l.9.2c.9.2 1.4.5 1.4 1.1 0 .6-.6 1-1.5 1-1 0-1.7-.4-2-1.1l-1.5.6Z" fill="var(--background)" /></svg>; }
function GoogleIcon() { return <svg viewBox="0 0 24 24" aria-hidden className="size-4"><path fill="#EA4335" d="M12 5c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.5 15 .5 12 .5 7.3.5 3.3 3.2 1.4 7.1l3.8 3c.9-2.8 3.5-4.6 6.8-4.6Z" /><path fill="#34A853" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.7-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.6Z" /><path fill="#FBBC05" d="M5.2 14.1c-.2-.7-.4-1.4-.4-2.1s.1-1.4.4-2.1l-3.8-3C.5 8.7 0 10.3 0 12s.5 3.3 1.4 4.7l3.8-2.6Z" /><path fill="#4285F4" d="M12 23.5c3.2 0 5.9-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.3 0-6-2-6.9-4.6l-3.8 3C3.3 20.8 7.3 23.5 12 23.5Z" /></svg>; }
