"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronDown } from "@hugeicons/core-free-icons";

import { CenterMorphModalPreview } from "./PokemonDetails";
import { Badge, type BadgeColor } from "#/components/ui/badge";
interface Member {
  id: string;
  name: string;
  number: string;
  level: number;
  online: boolean;
  types: BadgeColor[];
  avatar: string;
  avatarBackground: string;
}

interface PokemonDetail {
  ability: string;
  abilityDescription: string;
  item: string;
  stats: Array<{ label: string; value: number; iv: number; ev: number; color: string }>;
  moves: Array<{ name: string; type: BadgeColor }>;
}

const POKEMON_DETAILS = {
  "01": {
    name: "Arcanine",
    type: "Feu",
    ability: "Intimidation",
    moves: ["Boutefeu", "Vitesse Extrême", "Mâchouille", "Aboiement"],
  },
  "02": {
    name: "Venusaur",
    type: "Plante · Poison",
    ability: "Engrais",
    moves: ["Giga-Sangsue", "Bomb-Beurk", "Poudre Dodo", "Synthèse"],
  },
  "03": {
    name: "Gengar",
    type: "Spectre · Poison",
    ability: "Lévitation",
    moves: ["Ball'Ombre", "Bomb-Beurk", "Onde Folie", "Exploforce"],
  },
  "04": {
    name: "Serperior",
    type: "Plante",
    ability: "Contestation",
    moves: ["Tempête Verte", "Draco-Queue", "Clonage", "Giga-Sangsue"],
  },
  "05": {
    name: "Reshiram",
    type: "Dragon · Feu",
    ability: "Turboblaze",
    moves: ["Flamme Croix", "Draco Météore", "Telluriforce", "Luminocanon"],
  },
  "06": {
    name: "Haxorus",
    type: "Dragon",
    ability: "Brise Moule",
    moves: ["Danse-Lames", "Colère", "Séisme", "Direct Toxik"],
  },
  "07": {
    name: "Ninetales",
    type: "Feu",
    ability: "Sécheresse",
    moves: ["Lance-Flammes", "Feu Follet", "Extrasenseur", "Machination"],
  },
} as const;

const EXPANDED_DETAILS: Record<string, PokemonDetail> = {
  "01": {
    ability: "Intimidation",
    abilityDescription: "Réduit l’attaque adverse.",
    item: "Bandeau Choix",
    stats: [
      { label: "PV", value: 90, iv: 31, ev: 4, color: "#C75A4F" },
      { label: "+Atk", value: 110, iv: 31, ev: 252, color: "#D59635" },
      { label: "Def", value: 80, iv: 31, ev: 0, color: "#6799BB" },
      { label: "−SpA", value: 100, iv: 31, ev: 0, color: "#D59635" },
      { label: "SpD", value: 80, iv: 31, ev: 0, color: "#C75A4F" },
      { label: "Vit", value: 95, iv: 31, ev: 252, color: "#D07830" },
    ],
    moves: [
      { name: "Boutefeu", type: "fire" },
      { name: "Vitesse Extrême", type: "normal" },
      { name: "Mâchouille", type: "dark" },
      { name: "Aboiement", type: "dark" },
    ],
  },
};

const ALL_MEMBERS: Member[] = [
  {
    id: "01",
    name: "Arcanine",
    number: "#0059",
    level: 58,
    online: true,
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
    online: true,
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
    online: true,
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
    online: true,
    types: ["water", "ice"],
    avatar:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png",
    avatarBackground: "bg-sky-100/80 dark:bg-sky-950/30",
  },
];

const ACTIVE_MEMBERS = ALL_MEMBERS.filter((m) => m.online);

const sweepSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
  mass: 0.5,
};

const MemberItem = ({ member }: { member: Member }) => {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pokemon =
    POKEMON_DETAILS[member.id as keyof typeof POKEMON_DETAILS] ?? POKEMON_DETAILS["01"];
  const detail =
    EXPANDED_DETAILS[member.id] ??
    ({
      ...EXPANDED_DETAILS["01"],
      ability: pokemon.ability,
    } satisfies PokemonDetail);

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, x: 10, y: 15, rotate: 1 },
        visible: { opacity: 1, x: 0, y: 0, rotate: 0 },
      }}
      transition={sweepSpring}
      style={{ originX: 1, originY: 1 }}
      className="overflow-hidden rounded-[18px] border border-transparent bg-background transition-[background-color,border-color,box-shadow] duration-300 hover:border-border/60 hover:bg-sidebar-accent/50 data-[open=true]:border-[#ECE8DF] data-[open=true]:shadow-[0_5px_18px_rgba(40,31,18,0.03)] dark:data-[open=true]:border-border"
      data-open={isOpen}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`pokemon-details-${member.id}`}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-[88px] w-full items-center gap-3.5 px-3.5 text-left outline-none"
      >
        <div className="relative h-16 w-16 shrink-0 overflow-visible">
          <div
            className={`absolute inset-0 rounded-full ring-1 ring-background shadow-sm ${member.avatarBackground}`}
          />
          <img
            src={member.avatar}
            alt={member.name}
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 object-contain grayscale-[0.1] transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <h3 className="truncate text-lg font-semibold leading-5.5 tracking-tight text-foreground">
              {member.name}
            </h3>
            <span className="text-[10px] leading-3 text-muted-foreground">{member.number}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-orange-400" />
            <p className="text-sm leading-4 text-muted-foreground">Niv. {member.level}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
          {member.types.map((type) => (
            <Badge key={type} color={type} size="sm" variant="dot">
              {type}
            </Badge>
          ))}
        </div>
        <span
          aria-hidden="true"
          className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <HugeiconsIcon icon={ChevronDown} size={18} strokeWidth={2} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`pokemon-details-${member.id}`}
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={
              reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 32 }
            }
            className="overflow-hidden"
          >
            <div className="space-y-3.5 border-t border-[#ECE9E1] px-3.5 pb-5 pt-4 dark:border-border">
              <div className="flex gap-2.5">
                <section className="min-w-0 flex-1 rounded-[10px] border border-[#EBE7DF] bg-[#FFFEFA] px-3 py-2.5 dark:border-border dark:bg-card">
                  <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-amber-700 dark:text-amber-400">
                    Talent
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{detail.ability}</p>
                  <p className="mt-1 text-[10px] leading-[13px] text-muted-foreground">
                    {detail.abilityDescription}
                  </p>
                </section>
                <section className="w-32 shrink-0 rounded-[10px] border border-[#EBE7DF] bg-[#FFFEFA] px-3 py-2.5 dark:border-border dark:bg-card">
                  <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                    Objet
                  </p>
                  <p className="mt-2 text-xs font-semibold leading-3.5 text-foreground">
                    {detail.item}
                  </p>
                </section>
              </div>

              <section>
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                    Statistiques
                  </p>
                  <div className="flex gap-3 text-[9px] font-bold tracking-[0.07em] text-muted-foreground">
                    <span>IV</span>
                    <span>EV</span>
                  </div>
                </div>
                <div className="space-y-0.5 rounded-[10px] border border-[#EBE7DF] bg-[#FFFEFA] px-3 py-2 dark:border-border dark:bg-card">
                  {detail.stats.map((stat) => (
                    <div key={stat.label} className="flex h-6 items-center gap-2">
                      <span className="w-7 shrink-0 text-[10px] font-semibold text-muted-foreground">
                        {stat.label}
                      </span>
                      <span className="w-6 shrink-0 text-[11px] font-semibold text-foreground">
                        {stat.value}
                      </span>
                      <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[#EBE8E1] dark:bg-muted">
                        <span
                          className="block h-full rounded-full"
                          style={{
                            width: `${Math.round((stat.value / 135) * 100)}%`,
                            backgroundColor: stat.color,
                          }}
                        />
                      </span>
                      <span className="w-5 shrink-0 text-right text-[10px] font-semibold text-muted-foreground">
                        {stat.iv}
                      </span>
                      <span className="w-6 shrink-0 text-right text-[10px] font-semibold text-muted-foreground">
                        {stat.ev}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-1.5 flex items-center justify-between px-0.5 text-[10px]">
                  <span className="text-muted-foreground">
                    BST {detail.stats.reduce((total, stat) => total + stat.value, 0)}
                  </span>
                  <span className="text-foreground">IV 100%</span>
                  <span className="text-foreground">508 / 508 EVs</span>
                </div>
              </section>

              <section>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                  Attaques
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {detail.moves.map((move) => (
                    <div
                      key={move.name}
                      className="flex h-9.5 min-w-0 items-center justify-between gap-2 rounded-lg border border-[#E7E3DC] bg-white px-2.5 dark:border-border dark:bg-card"
                    >
                      <span className="truncate text-[11px] font-medium text-foreground">
                        {move.name}
                      </span>
                      <Badge color={move.type} size="sm">
                        {move.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
    className="flex items-center group py-4 first:pt-0 border-b border-border/40 last:border-0"
  >
    <div className="relative mr-4 shrink-0">
      <img
        src="https://archives.bulbagarden.net/media/upload/8/8e/Spr_3r_000.png"
        alt="Missing Pokémon"
        className="w-12 h-12 rounded-full ring-2 ring-background shadow-sm grayscale-[0.1] group-hover:grayscale-0 transition-all duration-300"
      />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-background rounded-full flex items-center justify-center shadow-sm">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-base font-semibold text-foreground tracking-tight leading-none mb-1.5 truncate">
        Emplacement Vide{" "}
      </h3>
      <div className="flex items-center gap-1.5 opacity-80">
        <p className={`text-sm font-medium leading-none`}>"Status"</p>
      </div>
    </div>
    <CenterMorphModalPreview />
  </motion.div>
);

export default function TeamDetails() {
  const MAX_ACTIVE_POKEMONS = 6;
  const VisibleMembers = ACTIVE_MEMBERS.slice(0, MAX_ACTIVE_POKEMONS);
  const MissingMembers = MAX_ACTIVE_POKEMONS - VisibleMembers.length;

  return (
    <div className="flex w-full max-w-[550px] min-w-0 box-border p-6 font-sans not-prose">
      <div className="relative w-full min-w-0 pb-6 bg-background rounded-[40px] border border-border flex flex-col overflow-hidden shadow-none">
        <div className="flex flex-col h-full bg-background">
          <div className="p-8 pb-3">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-foreground tracking-tight flex items-center gap-2">
                Active Team
                <span className="text-xs bg-muted px-2 py-1 mt-0.5 rounded-full text-muted-foreground leading-none font-normal">
                  {ACTIVE_MEMBERS.length}
                </span>
              </h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8">
            <motion.div
              initial={false}
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              className="space-y-0.5"
            >
              {ACTIVE_MEMBERS.map((member) => (
                <MemberItem key={`active-${member.id}`} member={member} />
              ))}
              {Array.from({ length: MissingMembers }).map((_, index) => (
                <MissingMember key={`missing-${index}`} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
