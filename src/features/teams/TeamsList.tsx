"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { Input } from "#/components/ui/input.tsx";
import { Button } from "#/components/ui/button.tsx";
import { HugeiconsIcon } from "@hugeicons/react";
import { ProfileIcon, Search01Icon, Cancel01Icon, Add01Icon } from "@hugeicons/core-free-icons";
import { Link } from "@tanstack/react-router";

interface Member {
  id: string;
  name: string;
  status: string;
  online: boolean;
  role: string;
  roleType: "pm" | "designer" | "data" | "creator";
  avatar: string;
}

const ALL_MEMBERS: Member[] = [
  {
    id: "01",
    name: "Rain Dance",
    status: "Smogon - OU",
    online: true,
    role: "Project Manager",
    roleType: "pm",
    avatar: "https://img.pokemondb.net/sprites/black-white/normal/ninetales.png",
  },
  {
    id: "02",
    name: "Sophie Chen",
    status: "Online",
    online: true,
    role: "Designer",
    roleType: "designer",
    avatar: "https://img.pokemondb.net/sprites/black-white/normal/venusaur.png",
  },
  {
    id: "03",
    name: "Noah Wilson",
    status: "Online",
    online: true,
    role: "Data Specialist",
    roleType: "data",
    avatar: "https://img.pokemondb.net/sprites/black-white/normal/gengar.png",
  },
  {
    id: "04",
    name: "Emma Davis",
    status: "Online",
    online: true,
    role: "Creator",
    roleType: "creator",
    avatar: "https://img.pokemondb.net/sprites/black-white/normal/serperior.png",
  },
  {
    id: "05",
    name: "Leo Garcia",
    status: "Online",
    online: true,
    role: "Designer",
    roleType: "designer",
    avatar: "https://img.pokemondb.net/sprites/black-white/normal/reshiram.png",
  },
  {
    id: "06",
    name: "Mia Thompson",
    status: "Online",
    online: true,
    role: "Project Manager",
    roleType: "pm",
    avatar: "https://img.pokemondb.net/sprites/black-white/normal/haxorus.png",
  },
  {
    id: "07",
    name: "Ethan Wright",
    status: "5h ago",
    online: false,
    role: "Data Specialist",
    roleType: "data",
    avatar: "https://img.pokemondb.net/sprites/black-white/normal/ninetales.png",
  },
];

const ACTIVE_MEMBERS = ALL_MEMBERS.filter((m) => m.online);

const matchesTeamSearch = (member: Member, query: string) => {
  const normalizedQuery = query.toLowerCase();

  return (
    member.name.toLowerCase().includes(normalizedQuery) ||
    member.role.toLowerCase().includes(normalizedQuery)
  );
};

const sweepSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
  mass: 0.5,
};

const MemberItem = ({ member }: { member: Member }) => (
  <Link
    to="/teams/$team"
    params={{ team: member.id }}
    viewTransition
    aria-label={`Ouvrir l'équipe ${member.name}`}
    className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring/70 sm:rounded-md"
  >
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 10, y: 15, rotate: 1 },
        visible: { opacity: 1, x: 0, y: 0, rotate: 0 },
      }}
      transition={sweepSpring}
      style={{ originX: 1, originY: 1 }}
      className="group flex cursor-pointer flex-col gap-4 rounded-2xl border border-transparent p-4 transition-[background-color,border-color] duration-300 hover:border-border/60 hover:bg-sidebar-accent/50 sm:flex-row sm:items-center sm:gap-0 sm:rounded-md sm:px-2"
    >
      <div className="min-w-0 flex-1 ml-2">
        <h2 className="mb-1.5 truncate text-base font-semibold leading-none tracking-tight text-foreground sm:text-lg">
          {member.name}
        </h2>
        <div className="flex items-center gap-1.5 opacity-80">
          {member.online && <div className="size-1.5 rounded-full bg-green-500" />}
          <p
            className={`text-sm font-medium leading-none ${
              member.online && "text-muted-foreground/60 font-light"
            }`}
          >
            {member.status}
          </p>
        </div>
      </div>
      <div
        className="grid w-full grid-cols-6 gap-1.5 sm:mr-4 sm:w-auto sm:shrink-0 sm:flex sm:gap-3"
        aria-label={`Pokémon de l'équipe ${member.name}`}
      >
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={`${member.id}-pokemon-${index}`}
            className="grid aspect-square min-w-0 place-items-center rounded-xl border border-border/70 bg-background p-0.5 shadow-sm transition duration-300 group-hover:border-border sm:size-[54px] sm:rounded-sm"
          >
            <img
              src={member.avatar}
              alt=""
              className="size-9 rounded-full object-cover grayscale-[0.1] transition duration-300 group-hover:grayscale-0 sm:size-12"
            />
          </div>
        ))}
      </div>
    </motion.div>
  </Link>
);

export default function TeamsList() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAllMembers = useMemo(
    () => ALL_MEMBERS.filter((member) => matchesTeamSearch(member, searchQuery)),
    [searchQuery],
  );

  const filteredActiveMembers = useMemo(
    () => ACTIVE_MEMBERS.filter((member) => matchesTeamSearch(member, searchQuery)),
    [searchQuery],
  );

  return (
    <div className="not-prose flex min-h-dvh w-full items-center justify-center bg-muted/50 p-2 font-sans sm:p-6">
      <div className="relative flex w-full max-w-[650px] flex-col overflow-hidden rounded-[24px] border border-border bg-background pb-6 shadow-none sm:rounded-[40px]">
        <div className="flex flex-col h-full bg-background">
          <div className="px-4 pt-5 pb-3 sm:p-8 sm:pb-3">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-foreground tracking-tight flex items-center gap-2">
                Équipes actives
                <span className="text-xs bg-muted px-2 py-1 mt-0.5 rounded-full text-muted-foreground leading-none font-normal">
                  {ACTIVE_MEMBERS.length}
                </span>
              </h2>
              <Link to="/builder" viewTransition aria-label="Créer une équipe">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border-border/50 text-muted-foreground hover:bg-muted/50 cursor-pointer"
                >
                  <HugeiconsIcon icon={Add01Icon} size={18} strokeWidth={2.5} />
                </Button>
              </Link>
            </div>

            <div className="relative mb-4">
              <HugeiconsIcon
                icon={Search01Icon}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 z-10"
                size={16}
              />
              <Input
                placeholder="Rechercher une équipe…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 pl-11 pr-4 bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-border rounded-2xl text-base text-foreground placeholder:text-muted-foreground/50 transition-all w-full box-border"
              />
            </div>
          </div>

          <div className="custom-scrollbar scroll-visible flex-1 overflow-y-auto px-2 pb-24 sm:px-8 sm:pb-20">
            <motion.div
              initial={false}
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
            >
              {filteredActiveMembers.map((member) => (
                <MemberItem key={`active-${member.id}`} member={member} />
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          layout
          initial={false}
          animate={{
            height: isExpanded ? "calc(100% - 20px)" : "68px",
            width: isExpanded ? "calc(100% - 20px)" : "calc(100% - 40px)",
            bottom: isExpanded ? "10px" : "20px",
            left: isExpanded ? "10px" : "20px",
            borderRadius: isExpanded ? "32px" : "24px",
          }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 30,
            mass: 0.8,
            ease: "easeInOut",
          }}
          className="absolute z-50 overflow-hidden border border-border shadow-none flex flex-col group/bar bg-card"
          style={{ cursor: isExpanded ? "default" : "pointer" }}
          onClick={() => !isExpanded && setIsExpanded(true)}
        >
          <div
            className={`flex items-center justify-between px-3 h-[68px] shrink-0 transition-colors ${
              isExpanded ? "border-b border-border/40" : "hover:bg-muted/20"
            }`}
          >
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform group-hover/bar:scale-105 sm:size-11">
                <HugeiconsIcon icon={ProfileIcon} size={20} strokeWidth={2} />
              </div>
              <motion.div layout="position">
                <h4 className="truncate text-sm font-medium leading-none tracking-tight text-foreground sm:text-base">
                  Toutes les équipes
                </h4>
                <p className="mt-1 truncate text-[11px] leading-none text-muted-foreground sm:text-xs">
                  {ALL_MEMBERS.length} équipes enregistrées
                </p>
              </motion.div>
            </div>

            <div className="flex items-center gap-3">
              {!isExpanded && (
                <div className="hidden items-center gap-0 min-[390px]:flex">
                  <div className="flex -space-x-3">
                    {ALL_MEMBERS.slice(0, 2).map((m) => (
                      <motion.img
                        key={`sum-${m.id}`}
                        layoutId={`avatar-${m.id}`}
                        src={m.avatar}
                        className="z-1 size-9 rounded-full object-cover ring-1 ring-background shadow-sm sm:size-10"
                        alt="avatar"
                      />
                    ))}
                    <div className="relative z-0 flex size-9 items-center justify-center rounded-full bg-muted ring-1 ring-background shadow-sm sm:size-10">
                      <span className="text-sm font-regular leading-none text-muted-foreground">
                        +{ALL_MEMBERS.length - 2}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {isExpanded && (
                <button
                  className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground transition-all flex items-center justify-center bg-muted/60 active:scale-90"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="px-3 py-4 sm:px-6"
                >
                  <div className="relative">
                    <HugeiconsIcon
                      icon={Search01Icon}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 z-10"
                      size={15}
                    />
                    <Input
                      placeholder="Rechercher une équipe…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-10 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 transition-all w-full box-border pl-10"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="custom-scrollbar scroll-visible flex-1 overflow-y-auto px-2 py-2 sm:px-6">
              <motion.div
                initial="hidden"
                animate={isExpanded ? "visible" : "hidden"}
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.03, delayChildren: 0.1 },
                  },
                  hidden: {
                    transition: { staggerChildren: 0.02, staggerDirection: -1 },
                  },
                }}
                className="space-y-0.5"
              >
                {filteredAllMembers.map((member) => (
                  <MemberItem key={`list-${member.id}`} member={member} />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
