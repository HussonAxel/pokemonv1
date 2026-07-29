import { Share2, SlidersHorizontal } from "lucide-react";

import { Badge, type BadgeColor } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";

type Stat = { label: string; value: number; iv: number; ev: number; color: string };
type Move = { name: string; type: BadgeColor };
type Pokemon = {
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
  { label: "PV", value: 90, iv: 31, ev: 0, color: "#C75A4F" },
  { label: "Atk", value: 110, iv: 31, ev: 252, color: "#D59635" },
  { label: "Def", value: 80, iv: 31, ev: 0, color: "#6799BB" },
  { label: "SpA", value: 100, iv: 31, ev: 0, color: "#D59635" },
  { label: "SpD", value: 80, iv: 31, ev: 0, color: "#C75A4F" },
  { label: "Vit", value: 95, iv: 31, ev: 252, color: "#D07830" },
];

const pokemon: Pokemon[] = [
  [
    "Arcanine",
    "#0059",
    58,
    "Intimidation",
    "Bandeau Choix",
    ["fire"],
    59,
    "bg-orange-100/80",
    ["Boutefeu", "Vitesse Extrême", "Mâchouille", "Aboiement"],
    ["fire", "normal", "dark", "dark"],
  ],
  [
    "Venusaur",
    "#0003",
    57,
    "Engrais",
    "Restes",
    ["grass", "poison"],
    3,
    "bg-emerald-100/80",
    ["Giga-Sangsue", "Bomb-Beurk", "Poudre Dodo", "Synthèse"],
    ["grass", "normal", "grass", "normal"],
  ],
  [
    "Gengar",
    "#0094",
    56,
    "Lévitation",
    "Orbe Vie",
    ["ghost", "poison"],
    94,
    "bg-violet-100/80",
    ["Ball'Ombre", "Bomb-Beurk", "Onde Folie", "Exploforce"],
    ["ghost", "normal", "ghost", "normal"],
  ],
  [
    "Lapras",
    "#0131",
    54,
    "Absorb Eau",
    "Restes",
    ["water", "ice"],
    131,
    "bg-sky-100/80",
    ["Hydrocanon", "Laser Glace", "Éclats Glace", "Requiem"],
    ["water", "normal", "water", "normal"],
  ],
  [
    "Togekiss",
    "#0468",
    55,
    "Sérénité",
    "Lunettes Choix",
    ["fairy"],
    468,
    "bg-pink-100/80",
    ["Air Slash", "Éclat Magique", "Aura Sphère", "Atterrissage"],
    ["fairy", "normal", "fairy", "normal"],
  ],
  [
    "Corviknight",
    "#0823",
    52,
    "Pression",
    "Casque Brut",
    ["flying"],
    823,
    "bg-indigo-100/80",
    ["Rapace", "Atterrissage", "Demi-Tour", "Anti-Brume"],
    ["flying", "normal", "flying", "normal"],
  ],
].map(
  ([name, number, level, ability, item, types, image, avatarBackground, moveNames, moveTypes]) => ({
    name: name as string,
    number: number as string,
    level: level as number,
    ability: ability as string,
    item: item as string,
    types: types as BadgeColor[],
    avatar: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${image}.png`,
    avatarBackground: avatarBackground as string,
    stats: baseStats,
    moves: (moveNames as string[]).map((move, index) => ({
      name: move,
      type: (moveTypes as BadgeColor[])[index],
    })),
  }),
);

function PokemonCard({ member }: { member: Pokemon }) {
  const bst = member.stats.reduce((total, stat) => total + stat.value, 0);
  return (
    <article className="rounded-[22px] border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-3">
        <div className={`relative size-14 shrink-0 rounded-full ${member.avatarBackground}`}>
          <img
            src={member.avatar}
            alt=""
            className="absolute inset-[-8px] size-[72px] object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <h2 className="truncate text-lg font-semibold tracking-tight">{member.name}</h2>
            <span className="shrink-0 text-[10px] text-muted-foreground">{member.number}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Niv. {member.level} · {member.ability}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1">
          {member.types.map((type) => (
            <Badge key={type} color={type} size="sm" variant="dot">
              {type}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_7.5rem] gap-2 rounded-xl bg-background/70 p-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
            Talent
          </p>
          <p className="mt-1 text-sm font-semibold">{member.ability}</p>
          <p className="text-[10px] text-muted-foreground">Rôle et effet de la capacité.</p>
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
            Objet
          </p>
          <p className="mt-1 text-xs font-semibold">{member.item}</p>
        </div>
      </div>

      <section className="mt-4">
        <div className="mb-2 flex justify-between text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
          <span>Statistiques</span>
          <span>IV&nbsp;&nbsp;&nbsp;&nbsp;EV</span>
        </div>
        <div className="rounded-xl bg-background/70 px-3 py-2">
          {member.stats.map((stat) => (
            <div key={stat.label} className="flex h-6 items-center gap-2 text-[10px]">
              <span className="w-7 shrink-0 text-muted-foreground">{stat.label}</span>
              <span className="w-6 shrink-0 font-semibold">{stat.value}</span>
              <span className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${Math.round((stat.value / 135) * 100)}%`,
                    backgroundColor: stat.color,
                  }}
                />
              </span>
              <span className="w-5 text-right text-muted-foreground">{stat.iv}</span>
              <span className="w-6 text-right text-muted-foreground">{stat.ev}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[9px] text-muted-foreground">
          <span>BST {bst}</span>
          <span>IV 100%</span>
          <span className="font-medium text-foreground">508 / 508 EVs</span>
        </div>
      </section>

      <section className="mt-4">
        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
          Attaques
        </p>
        <div className="grid grid-cols-1 gap-1.5 min-[480px]:grid-cols-2">
          {member.moves.map((move) => (
            <div
              key={move.name}
              className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-border bg-background/70 px-2.5 py-2"
            >
              <span className="truncate text-[11px] font-medium">{move.name}</span>
              <Badge color={move.type} size="sm">
                {move.type}
              </Badge>
            </div>
          ))}
        </div>
      </section>
    </article>
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
