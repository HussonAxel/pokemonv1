"use client";

import { Archive, ArrowUpRight, Zap } from "lucide-react";
import { motion } from "motion/react";

import { Badge, type BadgeColor } from "#/components/ui/badge";
import { CenterMorphModalPreview, PokemonDetailsModal } from "./PokemonDetails";

export interface Member {
  id: string;
  name: string;
  number: string;
  level: number;
  types: BadgeColor[];
  avatar: string;
  avatarBackground: string;
}

type MoveCategory = "physical" | "special" | "status";

export interface PokemonDetail {
  ability: string;
  abilityDescription: string;
  item: string;
  itemDescription: string;
  stats: Array<{
    label: string;
    ev: number;
    value: number;
    baseWidth: number;
    boostWidth: number;
  }>;
  moves: Array<{
    name: string;
    type: BadgeColor;
    category: MoveCategory;
    power: string;
    accuracy: string;
    pp: number;
  }>;
}

const EXPANDED_DETAILS: Record<string, PokemonDetail> = {
  "01": {
    ability: "Intimidation",
    abilityDescription: "Lowers the opposing Pokémon’s Attack when Arcanine enters battle.",
    item: "Choice Band",
    itemDescription: "Boosts Attack by 50% but locks into one move.",
    stats: [
      { label: "HP", ev: 4, value: 321, baseWidth: 42, boostWidth: 0 },
      { label: "+Atk", ev: 252, value: 350, baseWidth: 56, boostWidth: 14 },
      { label: "Def", ev: 0, value: 176, baseWidth: 44, boostWidth: 0 },
      { label: "−SpA", ev: 0, value: 212, baseWidth: 53, boostWidth: 0 },
      { label: "SpD", ev: 0, value: 196, baseWidth: 49, boostWidth: 0 },
      { label: "Spe", ev: 252, value: 289, baseWidth: 45, boostWidth: 13 },
    ],
    moves: [
      {
        name: "Boutefeu",
        type: "fire",
        category: "physical",
        power: "120",
        accuracy: "100%",
        pp: 15,
      },
      {
        name: "Vitesse Extrême",
        type: "normal",
        category: "physical",
        power: "80",
        accuracy: "100%",
        pp: 8,
      },
      {
        name: "Mâchouille",
        type: "dark",
        category: "physical",
        power: "80",
        accuracy: "100%",
        pp: 15,
      },
      {
        name: "Aboiement",
        type: "dark",
        category: "special",
        power: "55",
        accuracy: "95%",
        pp: 15,
      },
    ],
  },
  "02": {
    ability: "Overgrow",
    abilityDescription: "Strengthens Grass-type moves when Venusaur is low on health.",
    item: "Black Sludge",
    itemDescription: "Gradually restores HP to Poison-type Pokémon each turn.",
    stats: [
      { label: "HP", ev: 0, value: 301, baseWidth: 50, boostWidth: 0 },
      { label: "−Atk", ev: 0, value: 180, baseWidth: 31, boostWidth: 0 },
      { label: "Def", ev: 4, value: 202, baseWidth: 36, boostWidth: 0 },
      { label: "+SpA", ev: 252, value: 328, baseWidth: 52, boostWidth: 14 },
      { label: "SpD", ev: 0, value: 236, baseWidth: 42, boostWidth: 0 },
      { label: "Spe", ev: 252, value: 259, baseWidth: 39, boostWidth: 13 },
    ],
    moves: [
      {
        name: "Giga-Sangsue",
        type: "grass",
        category: "special",
        power: "75",
        accuracy: "100%",
        pp: 10,
      },
      {
        name: "Bomb-Beurk",
        type: "poison",
        category: "special",
        power: "90",
        accuracy: "100%",
        pp: 10,
      },
      {
        name: "Telluriforce",
        type: "ground",
        category: "special",
        power: "90",
        accuracy: "100%",
        pp: 10,
      },
      {
        name: "Poudre Dodo",
        type: "grass",
        category: "status",
        power: "—",
        accuracy: "75%",
        pp: 15,
      },
    ],
  },
  "03": {
    ability: "Cursed Body",
    abilityDescription: "May disable a move that has just dealt damage to Gengar.",
    item: "Choice Specs",
    itemDescription: "Boosts Special Attack by 50% but locks Gengar into one move.",
    stats: [
      { label: "HP", ev: 0, value: 261, baseWidth: 43, boostWidth: 0 },
      { label: "−Atk", ev: 0, value: 149, baseWidth: 25, boostWidth: 0 },
      { label: "Def", ev: 4, value: 157, baseWidth: 27, boostWidth: 0 },
      { label: "SpA", ev: 252, value: 359, baseWidth: 58, boostWidth: 14 },
      { label: "SpD", ev: 0, value: 186, baseWidth: 32, boostWidth: 0 },
      { label: "+Spe", ev: 252, value: 350, baseWidth: 56, boostWidth: 14 },
    ],
    moves: [
      {
        name: "Ball’Ombre",
        type: "ghost",
        category: "special",
        power: "80",
        accuracy: "100%",
        pp: 15,
      },
      {
        name: "Bomb-Beurk",
        type: "poison",
        category: "special",
        power: "90",
        accuracy: "100%",
        pp: 10,
      },
      {
        name: "Exploforce",
        type: "fighting",
        category: "special",
        power: "120",
        accuracy: "70%",
        pp: 5,
      },
      {
        name: "Tourmagik",
        type: "psychic",
        category: "status",
        power: "—",
        accuracy: "100%",
        pp: 10,
      },
    ],
  },
  "04": {
    ability: "Water Absorb",
    abilityDescription: "Restores HP when Lapras is hit by a Water-type move.",
    item: "Leftovers",
    itemDescription: "Restores a small amount of HP at the end of every turn.",
    stats: [
      { label: "HP", ev: 252, value: 464, baseWidth: 67, boostWidth: 14 },
      { label: "−Atk", ev: 0, value: 185, baseWidth: 32, boostWidth: 0 },
      { label: "+Def", ev: 252, value: 284, baseWidth: 43, boostWidth: 14 },
      { label: "SpA", ev: 0, value: 206, baseWidth: 36, boostWidth: 0 },
      { label: "SpD", ev: 4, value: 226, baseWidth: 39, boostWidth: 0 },
      { label: "Spe", ev: 0, value: 156, baseWidth: 27, boostWidth: 0 },
    ],
    moves: [
      {
        name: "Lyophilisation",
        type: "ice",
        category: "special",
        power: "70",
        accuracy: "100%",
        pp: 20,
      },
      {
        name: "Surf",
        type: "water",
        category: "special",
        power: "90",
        accuracy: "100%",
        pp: 15,
      },
      {
        name: "Repos",
        type: "psychic",
        category: "status",
        power: "—",
        accuracy: "—",
        pp: 5,
      },
      {
        name: "Glas de Soin",
        type: "normal",
        category: "status",
        power: "—",
        accuracy: "—",
        pp: 5,
      },
    ],
  },
};

const ALL_MEMBERS: Member[] = [
  {
    id: "01",
    name: "Arcanine",
    number: "#0059",
    level: 58,
    types: ["fire"],
    avatar:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png",
    avatarBackground: "bg-orange-100/80 dark:bg-orange-950/30",
  },
  {
    id: "02",
    name: "Venusaur",
    number: "#0003",
    level: 57,
    types: ["grass", "poison"],
    avatar:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
    avatarBackground: "bg-emerald-100/80 dark:bg-emerald-950/30",
  },
  {
    id: "03",
    name: "Gengar",
    number: "#0094",
    level: 56,
    types: ["ghost", "poison"],
    avatar:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    avatarBackground: "bg-violet-100/80 dark:bg-violet-950/30",
  },
  {
    id: "04",
    name: "Lapras",
    number: "#0131",
    level: 54,
    types: ["water", "ice"],
    avatar:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png",
    avatarBackground: "bg-sky-100/80 dark:bg-sky-950/30",
  },
];

const sweepSpring = { type: "spring" as const, stiffness: 400, damping: 35, mass: 0.5 };

const categoryStyles: Record<MoveCategory, string> = {
  physical: "bg-orange-500 text-white dark:bg-[#d85e4c]",
  special: "bg-pink-500 text-white dark:bg-[#d677a5]",
  status: "bg-emerald-600 text-white dark:bg-[#92caa1] dark:text-[#102517]",
};

const categoryIcon: Record<MoveCategory, string> = {
  physical: "●",
  special: "✦",
  status: "◆",
};

function DetailPill({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "warm";
}) {
  return (
    <span
      className={
        tone === "warm"
          ? "inline-flex w-fit items-center gap-2 rounded-lg bg-orange-100 px-3 py-1.5 text-sm font-semibold text-orange-950 dark:bg-[#3a2d27] dark:text-[#f3f4f6]"
          : "inline-flex w-fit items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-900 dark:bg-[#2a3140] dark:text-[#f3f4f6]"
      }
    >
      {children}
    </span>
  );
}

export function PokemonCompetitiveDetails({
  member,
  detail,
}: {
  member: Member;
  detail: PokemonDetail;
}) {
  return (
    <div className="dark:bg-[#101116]">
      <header className="flex min-h-[120px] items-center gap-4 border-b border-border px-5 py-5 pr-16 dark:border-[#343842] sm:px-6 sm:pr-16">
        <div className="relative size-[82px] shrink-0 overflow-visible">
          <div className={`absolute inset-0 rounded-full shadow-sm ${member.avatarBackground}`} />
          <img
            src={member.avatar}
            alt={member.name}
            className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h2 className="truncate text-2xl font-bold tracking-tight text-foreground">
              {member.name}
            </h2>
            <span className="text-xs text-muted-foreground">{member.number}</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-orange-400 dark:bg-[#ff8a18]" />
            <p className="text-base text-muted-foreground">Niv. {member.level}</p>
          </div>
        </div>
        <div className="hidden shrink-0 flex-wrap justify-end gap-1.5 sm:flex">
          {member.types.map((type) => (
            <Badge key={type} color={type} size="sm" variant="dot">
              {type}
            </Badge>
          ))}
        </div>
      </header>

      <div className="space-y-6 px-5 pb-7 pt-6 sm:px-6">
        <section className="space-y-4 border-b border-border pb-5 dark:border-[#343842]">
          <div className="grid grid-cols-[78px_minmax(0,1fr)] items-center gap-x-4 gap-y-2">
            <p className="text-xs font-bold tracking-[0.09em] text-muted-foreground">ITEM</p>
            <DetailPill>
              <Archive className="size-4" />
              {detail.item}
            </DetailPill>
            <p className="col-start-2 text-sm leading-5 text-muted-foreground">
              {detail.itemDescription}
            </p>
            <p className="text-xs font-bold tracking-[0.09em] text-muted-foreground">ABILITY</p>
            <DetailPill tone="warm">
              <Zap className="size-4" />
              {detail.ability}
            </DetailPill>
            <p className="col-start-2 text-sm leading-5 text-muted-foreground">
              {detail.abilityDescription}
            </p>
          </div>
        </section>

        <section>
          <p className="mb-3 text-xs font-bold tracking-[0.09em] text-muted-foreground">MOVES</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {detail.moves.map((move) => (
              <article
                key={move.name}
                className="flex min-h-[108px] flex-col justify-between rounded-xl border border-border p-3 dark:border-[#383c46]"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-sm font-black text-foreground dark:border-[#a75419] dark:bg-[#27231f] dark:text-[#ff9d53]">
                    {categoryIcon[move.category]}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-base font-bold tracking-tight text-foreground">
                    {move.name}
                  </span>
                  <span
                    className={`rounded-md px-2 py-1 text-[10px] font-extrabold tracking-[0.04em] ${categoryStyles[move.category]}`}
                  >
                    {move.category.toUpperCase()}
                  </span>
                </div>
                <div className="flex gap-2 text-[10px] font-bold text-muted-foreground">
                  <span className="rounded bg-muted px-2 py-1 dark:bg-[#29262e]">
                    PWR {move.power}
                  </span>
                  <span className="rounded bg-muted px-2 py-1 dark:bg-[#29262e]">
                    ACC {move.accuracy}
                  </span>
                  <span className="rounded bg-muted px-2 py-1 dark:bg-[#29262e]">PP {move.pp}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border pt-5 dark:border-[#343842]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold tracking-[0.09em] text-muted-foreground">STATS</p>
            <span className="rounded-md border border-emerald-600/60 px-2.5 py-1 text-sm font-bold text-emerald-700 dark:border-[#668d43] dark:text-[#9dde65]">
              508 / 508
            </span>
          </div>
          <div className="space-y-2.5">
            {detail.stats.map((stat) => (
              <div
                key={stat.label}
                className="grid grid-cols-[42px_36px_minmax(0,1fr)_42px] items-center gap-3"
              >
                <span className="text-[15px] font-bold text-foreground">{stat.label}</span>
                <span className="text-right text-sm text-muted-foreground">{stat.ev}</span>
                <span className="relative h-2.5 overflow-hidden rounded-full bg-muted dark:bg-[#292d36]">
                  <span
                    className="absolute inset-y-0 left-0 rounded-l-full bg-orange-500 dark:bg-[#ff8a18]"
                    style={{ width: `${stat.baseWidth}%` }}
                  />
                  {stat.boostWidth > 0 && (
                    <span
                      className="absolute inset-y-0 bg-orange-300 dark:bg-[#ffc087]"
                      style={{ left: `${stat.baseWidth}%`, width: `${stat.boostWidth}%` }}
                    />
                  )}
                </span>
                <span className="text-right text-base font-bold text-foreground">{stat.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const MemberItem = ({ member }: { member: Member }) => {
  const detail = EXPANDED_DETAILS[member.id] ?? EXPANDED_DETAILS["01"];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 10, y: 15, rotate: 1 },
        visible: { opacity: 1, x: 0, y: 0, rotate: 0 },
      }}
      transition={sweepSpring}
      style={{ originX: 1, originY: 1 }}
      className="group overflow-hidden rounded-[22px] border border-border bg-background transition-[background-color,border-color,box-shadow] duration-300 hover:border-foreground/20 hover:bg-muted/30 dark:bg-[#101116]"
    >
      <PokemonDetailsModal
        ariaLabel={`${member.name} competitive details`}
        className="max-w-[660px] rounded-[24px] dark:border-[#343842] dark:bg-[#101116]"
        trigger={
          <button
            type="button"
            className="flex h-[104px] w-full items-center gap-4 px-5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/70"
          >
            <div className="relative h-[78px] w-[78px] shrink-0 overflow-visible">
              <div
                className={`absolute inset-0 rounded-full shadow-sm ${member.avatarBackground}`}
              />
              <img
                src={member.avatar}
                alt={member.name}
                className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-150 group-hover:scale-[1.02]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <h3 className="truncate text-xl font-bold leading-6 tracking-tight text-foreground">
                  {member.name}
                </h3>
                <span className="text-xs text-muted-foreground">{member.number}</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-orange-400 dark:bg-[#ff8a18]" />
                <p className="text-base text-muted-foreground">Niv. {member.level}</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
              {member.types.map((type) => (
                <Badge key={type} color={type} size="sm" variant="dot">
                  {type}
                </Badge>
              ))}
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
            />
          </button>
        }
      >
        <PokemonCompetitiveDetails member={member} detail={detail} />
      </PokemonDetailsModal>
    </motion.div>
  );
};

const MissingMember = () => (
  <motion.div
    variants={{
      hidden: { opacity: 0, x: 10, y: 15, rotate: 1 },
      visible: { opacity: 1, x: 0, y: 0, rotate: 0 },
    }}
    transition={sweepSpring}
    style={{ originX: 1, originY: 1 }}
    className="flex items-center border-t border-border py-4 first:border-t-0"
  >
    <div className="relative mr-4 size-12 shrink-0 rounded-full bg-muted">
      <img
        src="https://archives.bulbagarden.net/media/upload/8/8e/Spr_3r_000.png"
        alt="Empty Pokémon slot"
        className="size-full rounded-full object-contain opacity-60"
      />
    </div>
    <div className="min-w-0 flex-1">
      <h3 className="truncate text-base font-semibold text-foreground">Emplacement vide</h3>
      <p className="mt-1 text-sm text-muted-foreground">Ajouter un Pokémon</p>
    </div>
    <CenterMorphModalPreview />
  </motion.div>
);

export default function TeamDetails() {
  const maxActivePokemons = 6;
  const visibleMembers = ALL_MEMBERS.slice(0, maxActivePokemons);
  const missingMembers = maxActivePokemons - visibleMembers.length;

  return (
    <div className="w-full max-w-[600px] p-4 font-sans not-prose sm:p-6">
      <section className="overflow-hidden rounded-[32px] border border-border bg-background p-5 sm:p-7 dark:border-[#343842] dark:bg-[#101116]">
        <header className="mb-6 flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Active Team</h2>
          <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
            {visibleMembers.length}
          </span>
        </header>
        <motion.div
          initial={false}
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          className="space-y-3"
        >
          {visibleMembers.map((member) => (
            <MemberItem key={member.id} member={member} />
          ))}
          {Array.from({ length: missingMembers }).map((_, index) => (
            <MissingMember key={`missing-${index}`} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
