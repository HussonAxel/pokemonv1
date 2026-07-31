import { linkOptions } from "@tanstack/react-router";
import type { LinkOptions } from "@tanstack/react-router";
import type { ReactNode, SVGProps } from "react";
import type { FileRouteTypes } from "../../routeTree.gen";

export type NavigationIcon = (props: SVGProps<SVGSVGElement>) => ReactNode;

export type MegaMenuLink = {
  id: string;
  label: string;
  icon: NavigationIcon;
  link: LinkOptions;
  description?: string;
};

export type MegaMenuGroup = {
  id: string;
  label: string;
  tone: string;
  links: readonly MegaMenuLink[];
};

export type MegaMenuSection = {
  id: string;
  label: string;
  tone: string;
  groups: readonly MegaMenuGroup[];
  browse?: {
    label: string;
    link: LinkOptions;
  };
};

const icon =
  (children: ReactNode): NavigationIcon =>
  (props) => (
    <svg aria-hidden="true" fill="none" focusable="false" viewBox="0 0 24 24" {...props}>
      {children}
    </svg>
  );

const SearchIcon = icon(
  <>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m16 16 4 4" />
  </>,
);
const BookIcon = icon(
  <>
    <path d="M5 4h14v16H5z" />
    <path d="M8 8h8M8 12h6" />
  </>,
);
const SparkIcon = icon(<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />);
const BoxIcon = icon(
  <>
    <rect x="4" y="5" width="16" height="14" rx="2" />
    <path d="m4 9 8 4 8-4" />
  </>,
);
const ChartIcon = icon(
  <>
    <path d="M4 18V6M4 18h16" />
    <path d="m7 14 3-3 3 2 5-6" />
  </>,
);
const ShieldIcon = icon(
  <>
    <path d="m12 3 8 3v5c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </>,
);
const PlusIcon = icon(
  <>
    <path d="M12 5v14M5 12h14" />
    <rect x="4" y="4" width="16" height="16" rx="4" />
  </>,
);
const FileIcon = icon(
  <>
    <path d="M7 3h7l4 4v14H7z" />
    <path d="M14 3v5h4M10 12h5M10 16h5" />
  </>,
);
const SlidersIcon = icon(
  <>
    <path d="M4 7h16M4 12h16M4 17h16" />
    <circle cx="8" cy="7" r="1.5" fill="currentColor" />
    <circle cx="15" cy="12" r="1.5" fill="currentColor" />
    <circle cx="11" cy="17" r="1.5" fill="currentColor" />
  </>,
);
const TargetIcon = icon(
  <>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </>,
);
const DiceIcon = icon(
  <>
    <rect x="5" y="5" width="14" height="14" rx="3" />
    <circle cx="9" cy="9" r="1" fill="currentColor" />
    <circle cx="15" cy="15" r="1" fill="currentColor" />
  </>,
);
const ShareIcon = icon(
  <>
    <circle cx="18" cy="5" r="2" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="19" r="2" />
    <path d="m8 11 8-5M8 13l8 5" />
  </>,
);
const LockIcon = icon(
  <>
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </>,
);
const ClockIcon = icon(
  <>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7v5l3 2" />
  </>,
);
const EyeIcon = icon(
  <>
    <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" />
    <circle cx="12" cy="12" r="2.5" />
  </>,
);
const CheckIcon = icon(<path d="m5 12 4 4L19 6" />);
const ExportIcon = icon(
  <>
    <path d="M12 3v12M8 7l4-4 4 4M5 14v5h14v-5" />
  </>,
);
const ResetIcon = icon(
  <>
    <path d="M5 12a7 7 0 1 0 2-5" />
    <path d="M5 5v5h5" />
  </>,
);

type AppPath = FileRouteTypes["to"];

const route = (to: AppPath): LinkOptions =>
  linkOptions({ to: to as NonNullable<LinkOptions["to"]>, preload: "intent" });

const link = (id: string, label: string, icon: NavigationIcon, to: AppPath): MegaMenuLink => ({
  id,
  label,
  icon,
  link: route(to),
});

const group = (
  id: string,
  label: string,
  tone: string,
  links: readonly MegaMenuLink[],
): MegaMenuGroup => ({ id, label, tone, links });

export const pokemonMegaMenu: readonly MegaMenuSection[] = [
  {
    id: "explorer",
    label: "Explorer",
    tone: "#6e86e8",
    groups: [
      group("explorer", "Explorer", "#6e86e8", [
        link("search", "Recherche globale", SearchIcon, "/explorer"),
        link("pokemon", "Pokémon", BoxIcon, "/explorer/pokemon"),
        link("attacks", "Attaques", SparkIcon, "/explorer/attaques"),
        link("abilities", "Talents", ShieldIcon, "/explorer/talents"),
        link("items", "Objets", BookIcon, "/explorer/objets"),
      ]),
      group("data", "Données", "#79c6d4", [
        link("types", "Types", TargetIcon, "/explorer/types"),
        link("evolutions", "Évolutions", ResetIcon, "/explorer/evolutions"),
        link("stats", "Statistiques", ChartIcon, "/explorer/statistiques"),
        link("related", "Fiches liées", BookIcon, "/explorer"),
      ]),
    ],
    browse: { label: "Voir l’explorer complet", link: route("/explorer") },
  },
  {
    id: "strategie",
    label: "Stratégie",
    tone: "#e18a3a",
    groups: [
      group("teams", "Équipes", "#e18a3a", [
        link("my-teams", "Mes équipes", BoxIcon, "/builder"),
        link("create-team", "Créer une équipe", PlusIcon, "/builder"),
        link("team-analysis", "Analyse d’équipe", ChartIcon, "/builder"),
      ]),
      group("formats", "Formats", "#d4b56a", [
        link("showdown-import", "Importer Showdown", ExportIcon, "/builder"),
        link("team-export", "Exporter une équipe", FileIcon, "/builder"),
        link("team-roles", "Rôles & synergies", SparkIcon, "/builder"),
      ]),
    ],
    browse: { label: "Voir toutes les équipes", link: route("/strategie") },
  },
  {
    id: "outils",
    label: "Outils",
    tone: "#a992d1",
    groups: [
      group("analysis", "Analyse", "#a992d1", [
        link("coverage", "Couverture d’équipe", ChartIcon, "/outils"),
        link("weaknesses", "Faiblesses & résistances", ShieldIcon, "/outils"),
        link("roles", "Résumé des rôles", SlidersIcon, "/outils"),
      ]),
      group("shortcuts", "Raccourcis", "#79c6d4", [
        link("open-team", "Ouvrir une équipe", BoxIcon, "/builder"),
        link("view-types", "Voir les types", TargetIcon, "/explorer/types"),
        link("search-pokemon", "Rechercher un Pokémon", SearchIcon, "/explorer"),
      ]),
    ],
    browse: { label: "Ouvrir les outils", link: route("/outils") },
  },
  {
    id: "collectionner",
    label: "Collectionner",
    tone: "#d96b65",
    groups: [
      group("pokedex", "Pokédex", "#d96b65", [
        link("pokedex", "Pokédex Gen 9", BookIcon, "/collectionner"),
        link("forms", "Formes", ResetIcon, "/collectionner"),
        link("shiny", "Shiny", SparkIcon, "/collectionner"),
        link("goals", "Objectifs personnels", TargetIcon, "/collectionner"),
      ]),
      group("states", "Suivi", "#e3a85f", [
        link("seen", "Vu", EyeIcon, "/collectionner"),
        link("obtained", "Obtenu", CheckIcon, "/collectionner"),
        link("wanted", "À obtenir", ClockIcon, "/collectionner"),
      ]),
    ],
    browse: { label: "Suivre ma progression", link: route("/collectionner") },
  },
  {
    id: "chasser",
    label: "Chasser",
    tone: "#e3a85f",
    groups: [
      group("hunt", "Chasse", "#e3a85f", [
        link("new-hunt", "Nouvelle chasse", TargetIcon, "/chasser"),
        link("active-hunts", "Chasses en cours", ClockIcon, "/chasser"),
        link("hunt-history", "Historique", BookIcon, "/chasser"),
      ]),
      group("hunt-detail", "Suivi détaillé", "#d96b65", [
        link("hunt-sheet", "Fiche de chasse", FileIcon, "/chasser"),
        link("hunt-methods", "Méthodes & probabilités", ChartIcon, "/chasser"),
        link("hunt-notes", "Notes & résultats", CheckIcon, "/chasser"),
      ]),
    ],
    browse: { label: "Ouvrir le suivi de chasse", link: route("/chasser") },
  },
  {
    id: "jouer",
    label: "Jouer",
    tone: "#d4b56a",
    groups: [
      group("modes", "Modes", "#d4b56a", [
        link("daily", "Défi du jour", SparkIcon, "/jouer"),
        link("pokédle", "Pokédle-like", DiceIcon, "/jouer"),
        link("pokédoku", "Pokédoku-like", BoxIcon, "/jouer"),
        link("unlimited", "Mode illimité", ResetIcon, "/jouer"),
      ]),
      group("sharing", "Statistiques & partage", "#b5a8cf", [
        link("personal-stats", "Statistiques personnelles", ChartIcon, "/jouer"),
        link("spoiler-free-sharing", "Partage sans spoiler", ShareIcon, "/partages"),
        link("preferences", "Préférences", LockIcon, "/preferences"),
      ]),
    ],
    browse: { label: "Jouer maintenant", link: route("/jouer") },
  },
] as const;
