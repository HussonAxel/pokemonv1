import { Link } from "@tanstack/react-router";

import BetterAuthHeader from "../integrations/better-auth/header-user.tsx";
import MegaMenu from "./navigation/MegaMenu";
import SoundToggle from "./SoundToggle";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 px-4 backdrop-blur-md">
      <nav className="page-wrap mx-auto flex h-16 items-center justify-between sm:h-[74px]">
        <Link
          to="/"
          data-cuelume-hover="chime"
          aria-label="Pokémon Home"
          className="inline-flex items-center gap-2 rounded-xl text-foreground no-underline outline-none focus-visible:ring-2 focus-visible:ring-ring min-[901px]:invisible"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-foreground text-[11px] font-bold tracking-[-0.06em] text-background">
            PH
          </span>
          <span className="hidden text-sm font-semibold tracking-tight min-[390px]:block">
            Pokémon Home
          </span>
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <BetterAuthHeader />
          <ThemeToggle />
          <SoundToggle />
          <MegaMenu />
        </div>
      </nav>
    </header>
  );
}
