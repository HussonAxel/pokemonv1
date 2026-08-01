import BetterAuthHeader from "../integrations/better-auth/header-user.tsx";
import MegaMenu from "./navigation/MegaMenu";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 px-4 backdrop-blur-md">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4 m-auto">
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <MegaMenu />
          <BetterAuthHeader />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
