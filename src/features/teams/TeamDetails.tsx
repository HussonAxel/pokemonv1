"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Briefcase01Icon,
  PaintBoardIcon,
  Database01Icon,
  QuillWrite01Icon,
  ChevronDown
} from "@hugeicons/core-free-icons";

import { CenterMorphModalPreview } from "./PokemonDetails";

interface Member {
  id: string;
  name: string;
  status: string;
  online: boolean;
  role: string;
  roleType: "pm" | "designer" | "data" | "creator";
  avatar: string;
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

const ALL_MEMBERS: Member[] = [
  {
    id: "01",
    name: "Oliver Smith",
    status: "Online",
    online: true,
    role: "Project Manager",
    roleType: "pm",
    avatar: "https://tapback.co/api/avatar/Oliver.webp",
  },
  {
    id: "02",
    name: "Sophie Chen",
    status: "Online",
    online: true,
    role: "Designer",
    roleType: "designer",
    avatar: "https://tapback.co/api/avatar/Sophie.webp",
  },
  {
    id: "03",
    name: "Noah Wilson",
    status: "Online",
    online: true,
    role: "Data Specialist",
    roleType: "data",
    avatar: "https://tapback.co/api/avatar/Noah.webp",
  },
  {
    id: "04",
    name: "Emma Davis",
    status: "Online",
    online: true,
    role: "Creator",
    roleType: "creator",
    avatar: "https://tapback.co/api/avatar/Emma.webp",
  },
  {
    id: "05",
    name: "Leo Garcia",
    status: "Online",
    online: false,
    role: "Designer",
    roleType: "designer",
    avatar: "https://tapback.co/api/avatar/Leo.webp",
  },
  {
    id: "06",
    name: "Mia Thompson",
    status: "Online",
    online: false,
    role: "Project Manager",
    roleType: "pm",
    avatar: "https://tapback.co/api/avatar/Mia.webp",
  },
  {
    id: "07",
    name: "Ethan Wright",
    status: "5h ago",
    online: false,
    role: "Data Specialist",
    roleType: "data",
    avatar: "https://tapback.co/api/avatar/Ethan.webp",
  },
];

const ACTIVE_MEMBERS = ALL_MEMBERS.filter((m) => m.online);

const sweepSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
  mass: 0.5,
};

const RoleBadge = ({ type, label }: { type: Member["roleType"]; label: string }) => {
  const styles = {
    pm: {
      bg: "bg-[#FFFCEB]",
      text: "text-[#856404]",
      border: "border-[#FFEBA5]",
      icon: Briefcase01Icon,
    },
    designer: {
      bg: "bg-[#F0F7FF]",
      text: "text-[#004085]",
      border: "border-[#B8DAFF]",
      icon: PaintBoardIcon,
    },
    data: {
      bg: "bg-[#F3FAF4]",
      text: "text-[#155724]",
      border: "border-[#C3E6CB]",
      icon: Database01Icon,
    },
    creator: {
      bg: "bg-[#FCF5FF]",
      text: "text-[#522785]",
      border: "border-[#E8D1FF]",
      icon: QuillWrite01Icon,
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${style.bg} ${style.text} ${style.border} shrink-0`}
    >
      <HugeiconsIcon icon={Icon} size={12} strokeWidth={1.8} />
      <span className="text-xs font-regular tracking-tight uppercase whitespace-nowrap truncate max-w-[60px] sm:max-w-none">
        {label}
      </span>
    </div>
  );
};

const MemberItem = ({ member }: { member: Member }) => {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pokemon =
    POKEMON_DETAILS[member.id as keyof typeof POKEMON_DETAILS] ?? POKEMON_DETAILS["01"];

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, x: 10, y: 15, rotate: 1 },
        visible: { opacity: 1, x: 0, y: 0, rotate: 0 },
      }}
      transition={sweepSpring}
      style={{ originX: 1, originY: 1 }}
      className="rounded-2xl border border-transparent transition-[background-color,border-color] duration-300 hover:border-border/60 hover:bg-sidebar-accent/50"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`pokemon-details-${member.id}`}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center gap-4 py-4 px-2 text-left outline-none "
      >
        <div className="relative shrink-0">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-12 h-12 rounded-full ring-2 ring-background shadow-sm grayscale-[0.1] group-hover:grayscale-0 transition-all duration-300"
          />
          {member.online && (
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-background rounded-full flex items-center justify-center shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-foreground tracking-tight leading-none mb-1.5 truncate">
            {member.name}
          </h3>
          <div className="flex items-center gap-1.5 opacity-80">
            {member.online && <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />}
            <p
              className={`text-sm font-medium leading-none ${
                member.online ? "text-green-600" : "text-muted-foreground"
              }`}
            >
              {member.status}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <RoleBadge type={member.roleType} label={member.role} />
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
            <div className="grid gap-4 border-t border-border/30 px-2 pb-5 pt-4 sm:grid-cols-[auto_1fr] sm:items-start">
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Talent
                  </p>
                  <p className="mt-1 text-sm text-foreground">{pokemon.ability}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Attaques
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {pokemon.moves.map((move) => (
                      <span
                        key={move}
                        className="rounded-full bg-background px-2 py-1 text-xs text-foreground ring-1 ring-border/60"
                      >
                        {move}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
    <div className="flex w-full max-w-[500px] min-w-0 box-border p-6 font-sans not-prose">
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
