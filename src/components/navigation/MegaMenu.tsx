import { Link, useRouterState } from "@tanstack/react-router";
import { useId, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { pokemonMegaMenu } from "./mega-menu-config";
import type { MegaMenuGroup, MegaMenuLink, MegaMenuSection } from "./mega-menu-config";

export type MegaMenuProps = {
  sections?: readonly MegaMenuSection[];
  className?: string;
};

function isSectionActive(section: MegaMenuSection, pathname: string) {
  return section.groups.some((group) =>
    group.links.some((item) => {
      const target = item.link.to;

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
      className="mega-menu__link"
      role="menuitem"
      activeProps={{ className: "mega-menu__link is-active" }}
      onClick={onNavigate}
    >
      <span className="mega-menu__icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="mega-menu__link-copy">
        <span className="mega-menu__link-label">{item.label}</span>
        {item.description ? (
          <span className="mega-menu__link-description">{item.description}</span>
        ) : null}
      </span>
    </Link>
  );
}

function MenuGroup({ group, onNavigate }: { group: MegaMenuGroup; onNavigate?: () => void }) {
  return (
    <section
      className="mega-menu__group"
      style={{ "--mega-menu-tone": group.tone } as CSSProperties}
    >
      <h3 className="mega-menu__group-title">{group.label}</h3>
      <div className="mega-menu__group-links">
        {group.links.map((item) => (
          <MenuLink key={item.id} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}

function MenuPanel({ section, onNavigate }: { section: MegaMenuSection; onNavigate?: () => void }) {
  return (
    <div className="mega-menu__panel-content">
      <div className="mega-menu__groups">
        {section.groups.map((group) => (
          <MenuGroup key={group.id} group={group} onNavigate={onNavigate} />
        ))}
      </div>
      {section.browse ? (
        <div className="mega-menu__footer">
          <Link
            {...section.browse.link}
            className="mega-menu__browse"
            role="menuitem"
            onClick={onNavigate}
          >
            <span aria-hidden="true" className="mega-menu__browse-icon">
              ▦
            </span>
            {section.browse.label}
            <span aria-hidden="true" className="mega-menu__browse-arrow">
              →
            </span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function MobileMenu({ sections }: { sections: readonly MegaMenuSection[] }) {
  return (
    <div className="mega-menu__mobile" aria-label="Navigation principale">
      {sections.map((section) => (
        <details key={section.id} className="mega-menu__mobile-section">
          <summary className="mega-menu__mobile-trigger">
            <span>{section.label}</span>
            <span aria-hidden="true">+</span>
          </summary>
          <MenuPanel section={section} />
        </details>
      ))}
    </div>
  );
}

export function MegaMenu({ sections = pokemonMegaMenu, className = "" }: MegaMenuProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  function cancelClose() {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }

  function scheduleClose() {
    cancelClose();
    closeTimeout.current = setTimeout(() => setOpenSectionId(null), 120);
  }

  function openSection(sectionId: string) {
    cancelClose();
    setOpenSectionId(sectionId);
  }

  return (
    <div className={`mega-menu ${className}`.trim()} onPointerLeave={scheduleClose}>
      <div className="mega-menu__desktop" role="menubar" aria-label="Navigation principale">
        {sections.map((section) => {
          const isOpen = openSectionId === section.id;
          const panelId = `${menuId}-${section.id}`;
          const isActive = isSectionActive(section, pathname);

          return (
            <div
              className="mega-menu__item"
              key={section.id}
              onBlurCapture={(event) => {
                const nextTarget = event.relatedTarget;

                if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                  scheduleClose();
                }
              }}
              onFocusCapture={() => openSection(section.id)}
              onPointerEnter={() => openSection(section.id)}
            >
              <button
                type="button"
                className={`mega-menu__trigger${isOpen || isActive ? " is-active" : ""}`}
                style={{ "--mega-menu-tone": section.tone } as CSSProperties}
                aria-controls={isOpen ? panelId : undefined}
                aria-expanded={isOpen}
                aria-haspopup="true"
                role="menuitem"
                onClick={() => (isOpen ? setOpenSectionId(null) : openSection(section.id))}
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
                <div id={panelId} className="mega-menu__dropdown" role="menu">
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
