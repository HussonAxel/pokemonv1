import { ArrowUpRight, Share2, SlidersHorizontal } from "lucide-react";

import { Badge, type BadgeColor } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { PokemonCompetitiveDetails, type PokemonDetail } from "#/features/teams/TeamDetails";
import { PokemonDetailsModal } from "#/features/teams/PokemonDetails";

type Stat = { label: string; value: number; iv: number; ev: number };
type Move = { name: string; type: BadgeColor };
type Pokemon = {
  id: string;
  name: string;
  number: string;
  level: number;
  ability: string;
  item: string;
  types: BadgeColor[];
  avatar: string;
  avatarBackground: string;
  stats: Stat[];
  moves: Move[];
};

const baseStats: Stat[] = [
  { label: "PV", value: 90, iv: 31, ev: 0 },
  { label: "Atk", value: 110, iv: 31, ev: 252 },
  { label: "Def", value: 80, iv: 31, ev: 0 },
  { label: "SpA", value: 100, iv: 31, ev: 0 },
  { label: "SpD", value: 80, iv: 31, ev: 0 },
  { label: "Vit", value: 95, iv: 31, ev: 252 },
];

function artwork(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

const pokemon: Pokemon[] = [
  {
    id: "01",
    name: "Arcanine",
    number: "#0059",
    level: 58,
    ability: "Intimidation",
    item: "Bandeau Choix",
    types: ["fire"],
    avatar: artwork(59),
    avatarBackground: "bg-orange-100/80 dark:bg-orange-950/30",
    stats: baseStats,
    moves: [
      { name: "Boutefeu", type: "fire" },
      { name: "Vitesse Extrême", type: "normal" },
      { name: "Mâchouille", type: "dark" },
      { name: "Aboiement", type: "dark" },
    ],
  },
  {
    id: "02",
    name: "Venusaur",
    number: "#0003",
    level: 57,
    ability: "Engrais",
    item: "Boue Noire",
    types: ["grass", "poison"],
    avatar: artwork(3),
    avatarBackground: "bg-emerald-100/80 dark:bg-emerald-950/30",
    stats: baseStats,
    moves: [
      { name: "Giga-Sangsue", type: "grass" },
      { name: "Bomb-Beurk", type: "poison" },
      { name: "Poudre Dodo", type: "grass" },
      { name: "Synthèse", type: "grass" },
    ],
  },
  {
    id: "03",
    name: "Gengar",
    number: "#0094",
    level: 56,
    ability: "Corps Maudit",
    item: "Orbe Vie",
    types: ["ghost", "poison"],
    avatar: artwork(94),
    avatarBackground: "bg-violet-100/80 dark:bg-violet-950/30",
    stats: baseStats,
    moves: [
      { name: "Ball’Ombre", type: "ghost" },
      { name: "Bomb-Beurk", type: "poison" },
      { name: "Onde Folie", type: "ghost" },
      { name: "Exploforce", type: "fighting" },
    ],
  },
  {
    id: "04",
    name: "Lapras",
    number: "#0131",
    level: 54,
    ability: "Absorb Eau",
    item: "Restes",
    types: ["water", "ice"],
    avatar: artwork(131),
    avatarBackground: "bg-sky-100/80 dark:bg-sky-950/30",
    stats: baseStats,
    moves: [
      { name: "Hydrocanon", type: "water" },
      { name: "Laser Glace", type: "ice" },
      { name: "Éclats Glace", type: "ice" },
      { name: "Requiem", type: "normal" },
    ],
  },
  {
    id: "05",
    name: "Togekiss",
    number: "#0468",
    level: 55,
    ability: "Sérénité",
    item: "Lunettes Choix",
    types: ["fairy", "flying"],
    avatar: artwork(468),
    avatarBackground: "bg-pink-100/80 dark:bg-pink-950/30",
    stats: baseStats,
    moves: [
      { name: "Lame d’Air", type: "flying" },
      { name: "Éclat Magique", type: "fairy" },
      { name: "Aura Sphère", type: "fighting" },
      { name: "Atterrissage", type: "flying" },
    ],
  },
  {
    id: "06",
    name: "Corviknight",
    number: "#0823",
    level: 52,
    ability: "Pression",
    item: "Casque Brut",
    types: ["flying", "steel"],
    avatar: artwork(823),
    avatarBackground: "bg-indigo-100/80 dark:bg-indigo-950/30",
    stats: baseStats,
    moves: [
      { name: "Rapace", type: "flying" },
      { name: "Atterrissage", type: "flying" },
      { name: "Demi-Tour", type: "bug" },
      { name: "Anti-Brume", type: "flying" },
    ],
  },
];

const statusMoves = new Set([
  "Poudre Dodo",
  "Synthèse",
  "Onde Folie",
  "Requiem",
  "Atterrissage",
  "Anti-Brume",
]);

const specialMoves = new Set([
  "Giga-Sangsue",
  "Bomb-Beurk",
  "Ball’Ombre",
  "Exploforce",
  "Hydrocanon",
  "Laser Glace",
  "Lame d’Air",
  "Éclat Magique",
  "Aura Sphère",
  "Aboiement",
]);

function toCompetitiveDetail(member: Pokemon): PokemonDetail {
  return {
    ability: member.ability,
    abilityDescription: `Effet compétitif de ${member.ability} pour ce set.`,
    item: member.item,
    itemDescription: `Objet tenu par ${member.name} dans cette composition.`,
    stats: member.stats.map((stat) => {
      const investment = Math.floor(stat.ev / 4);
      const rawValue = Math.floor(((2 * stat.value + stat.iv + investment) * member.level) / 100);
      const value = stat.label === "PV" ? rawValue + member.level + 10 : rawValue + 5;
      const boostWidth = stat.ev > 0 ? Math.round((stat.ev / 252) * 14) : 0;

      return {
        label: stat.label,
        ev: stat.ev,
        value,
        baseWidth: Math.max(18, Math.min(72, Math.round(value / 4) - boostWidth)),
        boostWidth,
      };
    }),
    moves: member.moves.map((move) => ({
      name: move.name,
      type: move.type,
      category: statusMoves.has(move.name)
        ? ("status" as const)
        : specialMoves.has(move.name)
          ? ("special" as const)
          : ("physical" as const),
      power: "—",
      accuracy: "—",
      pp: 10,
    })),
  };
}

function PokemonCard({ member }: { member: Pokemon }) {
  return (
    <PokemonDetailsModal
      ariaLabel={`${member.name} competitive details`}
      className="max-w-[760px] rounded-[24px] dark:border-[#343842] dark:bg-[#101116]"
      trigger={
        <button
          type="button"
          className="group flex min-h-[118px] w-full items-center gap-4 rounded-[22px] border border-border bg-card p-4 text-left shadow-sm transition-[background-color,border-color,box-shadow] duration-200 hover:border-foreground/20 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 sm:p-5"
        >
          <div className={`relative size-[72px] shrink-0 rounded-full ${member.avatarBackground}`}>
            <img
              src={member.avatar}
              alt=""
              className="absolute inset-[-10px] size-[92px] object-contain transition-transform duration-150 group-hover:scale-[1.02]"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-1.5">
              <h2 className="truncate text-xl font-bold tracking-tight">{member.name}</h2>
              <span className="shrink-0 text-[10px] text-muted-foreground">{member.number}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Niv. {member.level} · {member.ability}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {member.types.map((type) => (
                <Badge key={type} color={type} size="sm" variant="dot">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
          />
        </button>
      }
    >
      <PokemonCompetitiveDetails member={member} detail={toCompetitiveDetail(member)} />
    </PokemonDetailsModal>
  );
}

export default function TeamDetails() {
  return (
    <main className="min-h-screen w-full bg-background px-4 py-6 font-sans sm:px-8 sm:py-10 xl:px-[72px] xl:py-14">
      <div className="mx-auto max-w-[1776px]">
        <header className="mb-8 flex flex-col gap-5 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Mes équipes / détails
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Omega Ruby OU
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Rain Protocol · 6 Pokémon actifs · mise à jour il y a 2 jours
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full">
              <SlidersHorizontal className="mr-2 size-4" />
              Modifier l’équipe
            </Button>
            <Button className="rounded-full">
              <Share2 className="mr-2 size-4" />
              Partager
            </Button>
          </div>
        </header>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pokemon.map((member) => (
            <PokemonCard key={member.number} member={member} />
          ))}
        </div>
      </div>
    </main>
  );
}
