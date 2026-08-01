import BetterAuthHeader from "../integrations/better-auth/header-user.tsx";
import MegaMenu from "./navigation/MegaMenu";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="app-header sticky top-0 z-50 px-4 backdrop-blur-md">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4 m-auto">
        <MegaMenu className="mega-menu--header order-3 w-full sm:order-0 sm:w-auto" />
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <BetterAuthHeader />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
