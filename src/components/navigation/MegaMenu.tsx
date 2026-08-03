import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { headerActionClassName } from "../header-action";
import { pokemonMegaMenu } from "./mega-menu-config";
import type { MegaMenuGroup, MegaMenuLink, MegaMenuSection } from "./mega-menu-config";

export type MegaMenuProps = { sections?: readonly MegaMenuSection[]; className?: string };

const menuInteractionStates =
  "hover:bg-foreground/[0.04] hover:text-foreground focus-visible:bg-foreground/[0.04] focus-visible:text-foreground dark:hover:bg-muted dark:focus-visible:bg-muted";
const menuActiveState = "bg-foreground/[0.04] text-foreground dark:bg-muted";

const menuLinkClassName = `group flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2 text-muted-foreground no-underline transition-[color,background-color] duration-150 ease-out ${menuInteractionStates} focus-visible:outline-none motion-reduce:transition-none`;

function isSectionActive(section: MegaMenuSection, pathname: string) {
  return section.groups.some((group) =>
    group.links.some(({ link }) => {
      const target = link.to;
      return (
        typeof target === "string" && (pathname === target || pathname.startsWith(`${target}/`))
      );
    }),
  );
}

function MenuLink({ item, onNavigate }: { item: MegaMenuLink; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <Link
      {...item.link}
      data-cuelume-hover="tick"
      className={menuLinkClassName}
      activeProps={{ className: `${menuLinkClassName} ${menuActiveState}` }}
      role="menuitem"
      onClick={onNavigate}
    >
      <span
        className="flex size-[25px] shrink-0 items-center justify-center text-[var(--mega-menu-tone)] transition-transform duration-150 ease-out group-hover:rotate-[-2deg] group-hover:scale-[1.06] motion-reduce:transform-none motion-reduce:transition-none [&>svg]:size-[19px] [&>svg]:stroke-current [&>svg]:stroke-[1.7]"
        aria-hidden="true"
      >
        <Icon />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-medium leading-5">{item.label}</span>
        {item.description ? (
          <span className="text-xs leading-4 text-muted-foreground">{item.description}</span>
        ) : null}
      </span>
    </Link>
  );
}

function MenuGroup({ group, onNavigate }: { group: MegaMenuGroup; onNavigate?: () => void }) {
  return (
    <section
      className="min-w-0 flex-none"
      style={{ "--mega-menu-tone": group.tone } as CSSProperties}
    >
      <h3 className="mb-3 pl-3 font-mono text-xs font-medium uppercase leading-4 tracking-[0.08em] text-[var(--mega-menu-tone)]">
        {group.label}
      </h3>
      <div className="flex flex-col gap-1">
        {group.links.map((item) => (
          <MenuLink key={item.id} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}

function MenuPanel({
  section,
  onNavigate,
  mobile = false,
}: {
  section: MegaMenuSection;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  return (
    <div className={mobile ? "pb-[18px]" : "px-7 pb-6 pt-7"}>
      <div className={mobile ? "flex flex-col gap-5" : "flex items-start gap-6"}>
        {section.groups.map((group) => (
          <MenuGroup key={group.id} group={group} onNavigate={onNavigate} />
        ))}
      </div>
      {section.browse ? (
        <div
          className={`mt-6 flex border-t border-foreground/[0.12] pt-4 ${mobile ? "justify-start" : "justify-center"}`}
        >
          <Link
            {...section.browse.link}
            data-cuelume-hover="tick"
            className={`group flex items-center gap-2 rounded-[9px] px-2.5 py-[7px] font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground no-underline transition-[color,background-color] duration-150 ease-out ${menuInteractionStates} focus-visible:outline-none motion-reduce:transition-none`}
            role="menuitem"
            onClick={onNavigate}
          >
            <span aria-hidden="true" className="text-[15px] leading-none text-primary">
              ▦
            </span>
            {section.browse.label}
            <span
              aria-hidden="true"
              className="text-base text-primary transition-transform duration-150 ease-out group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function MobileMenu({ sections }: { sections: readonly MegaMenuSection[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  function closeMenu() {
    setIsOpen(false);
    setOpenSectionId(null);
  }

  return (
    <div className="static block min-[901px]:hidden">
      <button
        type="button"
        data-cuelume-toggle="toggle"
        className={headerActionClassName}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => {
          if (isOpen) {
            closeMenu();
          } else {
            setIsOpen(true);
          }
        }}
      >
        <span
          className="relative inline-flex h-4 w-[19px] flex-col justify-between"
          aria-hidden="true"
        >
          <span
            className={`block h-0.5 w-[19px] origin-center rounded-full bg-current transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${isOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-[19px] origin-center rounded-full bg-current transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-[19px] origin-center rounded-full bg-current transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </span>
      </button>
      <motion.div
        layout={!shouldReduceMotion}
        transition={{ type: "spring", stiffness: 240, damping: 30, mass: 0.8 }}
        id="mobile-navigation-menu"
        className={`absolute left-1/2 top-[calc(100%+12px)] z-[60] w-[calc(100vw-2rem)] max-w-[420px] -translate-x-1/2 origin-top overflow-hidden rounded-[16px] border border-foreground/20 bg-background/95 px-3.5 py-2.5 shadow-[0_24px_70px_color-mix(in_srgb,var(--shadow-color)_34%,transparent)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${isOpen ? "visible translate-y-0 scale-100 opacity-100 pointer-events-auto" : "invisible -translate-y-2 scale-[0.98] opacity-0 pointer-events-none"}`}
        aria-hidden={!isOpen}
        aria-label="Navigation principale"
      >
        {sections.map((section) => {
          const isSectionOpen = openSectionId === section.id;

          return (
            <div
              key={section.id}
              className={`border-b border-foreground/[0.12] opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.19,1,0.22,1)] last:border-b-0 motion-reduce:translate-y-0 motion-reduce:transition-none ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-1"}`}
            >
              <button
                type="button"
                data-cuelume-toggle="toggle"
                className="flex w-full items-center justify-between px-1 py-[13px] text-left text-[15px] font-semibold text-foreground"
                aria-expanded={isSectionOpen}
                aria-controls={`mobile-navigation-section-${section.id}`}
                onClick={() =>
                  setOpenSectionId((current) => (current === section.id ? null : section.id))
                }
              >
                <span>{section.label}</span>
                <span
                  aria-hidden="true"
                  className={`transition-transform duration-150 motion-reduce:transition-none ${isSectionOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isSectionOpen ? (
                  <motion.div
                    id={`mobile-navigation-section-${section.id}`}
                    initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.15, ease: "easeOut" }
                        : {
                            height: { type: "spring", stiffness: 240, damping: 30, mass: 0.8 },
                            opacity: { duration: 0.18, ease: "easeOut" },
                          }
                    }
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                      <MenuPanel section={section} onNavigate={closeMenu} mobile />
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function MegaMenu({ sections = pokemonMegaMenu, className = "" }: MegaMenuProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();
  const cancelClose = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimeout.current = setTimeout(() => setOpenSectionId(null), 120);
  };
  const openSection = (sectionId: string) => {
    cancelClose();
    setOpenSectionId(sectionId);
  };
  return (
    <div
      className={`static z-[60] font-sans min-[901px]:absolute min-[901px]:left-1/2 min-[901px]:top-1/2 min-[901px]:-translate-x-1/2 min-[901px]:-translate-y-1/2 ${className}`.trim()}
      onPointerLeave={scheduleClose}
    >
      <div
        className="hidden items-center gap-1 min-[901px]:flex"
        role="menubar"
        aria-label="Navigation principale"
      >
        {sections.map((section) => {
          const isOpen = openSectionId === section.id;
          const panelId = `${menuId}-${section.id}`;
          const isActive = isSectionActive(section, pathname);
          return (
            <div
              className="flex h-[42px] items-center"
              key={section.id}
              onBlurCapture={(event) => {
                const nextTarget = event.relatedTarget;
                if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget))
                  scheduleClose();
              }}
              onFocusCapture={() => openSection(section.id)}
              onPointerEnter={() => openSection(section.id)}
            >
              <button
                type="button"
                className={`inline-flex h-[42px] items-center rounded-[10px] px-3 text-sm font-semibold text-muted-foreground transition-[color,background-color,transform] duration-150 ease-out ${menuInteractionStates} focus-visible:outline-none active:scale-[0.98] motion-reduce:transition-[color,background-color] motion-reduce:transform-none ${isOpen || isActive ? menuActiveState : ""}`}
                aria-controls={isOpen ? panelId : undefined}
                aria-expanded={isOpen}
                aria-haspopup="true"
                role="menuitem"
                onClick={() => openSection(section.id)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setOpenSectionId(null);
                    event.currentTarget.focus();
                  }
                }}
              >
                {section.label}
              </button>
              {isOpen ? (
                <div
                  id={panelId}
                  className="absolute left-1/2 top-[calc(100%+12px)] w-fit max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-[16px] bg-background/95 shadow-[0_0_0_1px_color-mix(in_srgb,var(--foreground)_20%,transparent),0_24px_70px_color-mix(in_srgb,var(--shadow-color)_34%,transparent),inset_0_0_0_1px_color-mix(in_srgb,var(--background)_7%,transparent)] backdrop-blur-2xl animate-in fade-in duration-200 motion-reduce:animate-none"
                  role="menu"
                >
                  <MenuPanel section={section} onNavigate={() => setOpenSectionId(null)} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <MobileMenu sections={sections} />
    </div>
  );
}

export default MegaMenu;
