import { Dna, Folder, Layers3, ListFilter, RotateCcw, Shapes, Sparkles, X } from "lucide-react";
import * as React from "react";

import CommandPalette, { type Command, type CommandOption } from "@/components/ui/command-palette";
import { pokemonCollectionFilters } from "@/data/data";
import { getPokemonTypeColor } from "@/lib/pokemon-type-styles";
import type { PokemonFilterState } from "./pokemon-finder.types";

const pokemonTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

type PokemonCommandPaletteProps = {
  abilityOptions: string[];
  filters: PokemonFilterState;
  onUpdate: (next: Partial<PokemonFilterState>) => void;
};

const operatorOptions = [
  { value: "Matches any", key: "is_any_of" },
  { value: "Matches all", key: "includes_all" },
  { value: "Matches none", key: "is_not_any_of" },
];

const generationOperatorOptions = [
  { value: "Is", key: "is" },
  { value: "Is not", key: "is_not" },
];

const collectionOperatorOptions = [
  { value: "Is", key: "is" },
  { value: "Is not", key: "is_not" },
];

function formatName(name: string) {
  return name.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function optionKey(option: CommandOption) {
  return option.key ?? option.value.toLowerCase();
}

function typeOptions(): CommandOption[] {
  return pokemonTypes.map((type) => ({
    value: formatName(type),
    key: type,
    dot: getPokemonTypeColor(type),
  }));
}

function generationOptions(): CommandOption[] {
  const ranges = [
    "#001–151",
    "#152–251",
    "#252–386",
    "#387–493",
    "#494–649",
    "#650–721",
    "#722–809",
    "#810–905",
    "#906+",
  ];

  return ranges.map((range, index) => ({
    value: `Generation ${index + 1}`,
    key: String(index + 1),
    hint: range,
  }));
}

function abilityOptions(values: string[]): CommandOption[] {
  return values.map((ability) => ({ value: formatName(ability), key: ability }));
}

function resetFilters(): Partial<PokemonFilterState> {
  return {
    ability: undefined,
    abilityOperator: undefined,
    bstOperator: undefined,
    catchedView: undefined,
    collection: undefined,
    collectionOperator: undefined,
    filterJoin: undefined,
    generation: undefined,
    generationOperator: undefined,
    maxBst: undefined,
    minBst: undefined,
    shinyView: undefined,
    type: undefined,
    typeOperator: undefined,
  };
}

function activeFilterCount(filters: PokemonFilterState) {
  return [
    filters.type?.length,
    filters.ability?.length,
    filters.generation !== undefined,
    filters.bstOperator,
    filters.collection,
    filters.shinyView || filters.catchedView,
    filters.filterJoin,
  ].filter(Boolean).length;
}

export function PokemonCommandPalette({
  abilityOptions: availableAbilities,
  filters,
  onUpdate,
}: PokemonCommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const panelId = React.useId();

  const commands = React.useMemo<Command[]>(() => {
    const commands: Command[] = [
      {
        id: "type",
        label: "Filter by type",
        icon: <Shapes className="size-[15px]" />,
        shortcut: "T",
        slots: [
          {
            name: "operator",
            prompt: "How should types match?",
            kind: "plain",
            options: operatorOptions,
          },
          { name: "type", prompt: "Which type?", kind: "dot", options: typeOptions() },
        ],
        message: (values) =>
          `${values[1]?.value ?? "Type"} · ${values[0]?.value.toLowerCase() ?? "matches"}`,
      },
      ...(availableAbilities.length
        ? [
            {
              id: "ability",
              label: "Filter by ability",
              icon: <Dna className="size-[15px]" />,
              shortcut: "A",
              slots: [
                {
                  name: "operator",
                  prompt: "How should abilities match?",
                  kind: "plain" as const,
                  options: operatorOptions,
                },
                {
                  name: "ability",
                  prompt: "Which ability?",
                  kind: "plain" as const,
                  options: abilityOptions(availableAbilities),
                },
              ],
              message: (values: CommandOption[]) =>
                `${values[1]?.value ?? "Ability"} · ${values[0]?.value.toLowerCase() ?? "matches"}`,
            } satisfies Command,
          ]
        : []),
      {
        id: "generation",
        label: "Filter by generation",
        icon: <Layers3 className="size-[15px]" />,
        shortcut: "G",
        slots: [
          {
            name: "operator",
            prompt: "Include or exclude?",
            kind: "plain",
            options: generationOperatorOptions,
          },
          {
            name: "generation",
            prompt: "Which generation?",
            kind: "plain",
            options: generationOptions(),
          },
        ],
        message: (values) =>
          `${values[1]?.value ?? "Generation"} · ${values[0]?.value?.toLowerCase() ?? "is"}`,
      },
      {
        id: "collection",
        label: "Filter by collection",
        icon: <Folder className="size-[15px]" />,
        shortcut: "C",
        slots: [
          {
            name: "operator",
            prompt: "Include or exclude?",
            kind: "plain",
            options: collectionOperatorOptions,
          },
          {
            name: "collection",
            prompt: "Which collection?",
            kind: "plain",
            options: pokemonCollectionFilters.map((collection) => ({
              value: collection.title,
              key: collection.key,
            })),
          },
        ],
        message: (values) =>
          `${values[1]?.value ?? "Collection"} · ${values[0]?.value?.toLowerCase() ?? "is"}`,
      },
      {
        id: "status",
        label: "Change display",
        icon: <Sparkles className="size-[15px]" />,
        shortcut: "V",
        slots: [
          {
            name: "view",
            prompt: "What should the explorer show?",
            kind: "plain",
            options: [
              { value: "Standard sprites", key: "standard" },
              { value: "Shiny sprites", key: "shiny" },
              { value: "Caught view", key: "caught" },
            ],
          },
        ],
        message: (values) => values[0]?.value ?? "Display updated",
      },
      {
        id: "logic",
        label: "Combine conditions",
        icon: <ListFilter className="size-[15px]" />,
        shortcut: "O",
        slots: [
          {
            name: "logic",
            prompt: "How should active conditions combine?",
            kind: "plain",
            options: [
              { value: "All conditions", key: "and", hint: "AND" },
              { value: "Any condition", key: "or", hint: "OR" },
            ],
          },
        ],
        message: (values) => `${values[0]?.value ?? "Conditions"} will match`,
      },
      {
        id: "reset",
        label: "Reset all filters",
        icon: <RotateCcw className="size-[15px]" />,
        danger: true,
        slots: [],
        message: () => "All filters reset",
      },
    ];

    return commands;
  }, [availableAbilities]);

  const handleApply = React.useCallback(
    (clauses: { command: Command; values: CommandOption[] }[]) => {
      const next: Partial<PokemonFilterState> = {};

      clauses.forEach(({ command, values }) => {
        const first = values[0];
        const second = values[1];
        switch (command.id) {
          case "type":
            if (second) {
              next.type = [optionKey(second)];
              next.typeOperator = optionKey(first) as PokemonFilterState["typeOperator"];
            }
            break;
          case "ability":
            if (second) {
              next.ability = [optionKey(second)];
              next.abilityOperator = optionKey(first) as PokemonFilterState["abilityOperator"];
            }
            break;
          case "generation":
            if (second) {
              const generation = Number(optionKey(second));
              if (Number.isFinite(generation)) {
                next.generation = generation;
                next.generationOperator = optionKey(
                  first,
                ) as PokemonFilterState["generationOperator"];
              }
            }
            break;
          case "collection":
            if (second) {
              next.collection = optionKey(second) as PokemonFilterState["collection"];
              next.collectionOperator = optionKey(
                first,
              ) as PokemonFilterState["collectionOperator"];
            }
            break;
          case "status":
            if (first?.key === "shiny") {
              next.shinyView = true;
              next.catchedView = undefined;
            } else if (first?.key === "caught") {
              next.shinyView = undefined;
              next.catchedView = true;
            } else {
              next.shinyView = undefined;
              next.catchedView = undefined;
            }
            break;
          case "logic":
            if (first) next.filterJoin = optionKey(first) as PokemonFilterState["filterJoin"];
            break;
          case "reset":
            Object.assign(next, resetFilters());
            break;
          default:
            break;
        }
      });

      onUpdate(next);
    },
    [onUpdate],
  );

  const closePalette = React.useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const handlePaletteApply = React.useCallback(
    (clauses: { command: Command; values: CommandOption[] }[]) => {
      handleApply(clauses);
      closePalette();
    },
    [closePalette, handleApply],
  );

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !panelRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      closePalette();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePalette, open]);

  const count = activeFilterCount(filters);
  const triggerLabel = `${open ? "Close" : "Open"} Pokemon filters${count ? ` (${count} active)` : ""}`;

  return (
    <div data-slot="pokemon-command-palette" className="relative">
      <button
        ref={triggerRef}
        type="button"
        className={`finder-icon-button relative h-8 w-8 ${open ? "bg-background text-foreground shadow-xs" : ""}`}
        aria-label={triggerLabel}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <ListFilter />
        {count ? (
          <span
            className="pointer-events-none absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-semibold leading-none text-primary-foreground"
            aria-hidden="true"
          >
            {count}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label="Pokemon filters"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(42rem,calc(100vw-4.5rem))] rounded-xl border border-border/80 bg-background/95 p-1 shadow-xl backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-[11px] font-medium text-muted-foreground">Pokemon filters</span>
            <button
              type="button"
              className="finder-icon-button h-7 w-7"
              aria-label="Close Pokemon filters"
              onClick={closePalette}
            >
              <X />
            </button>
          </div>
          <CommandPalette commands={commands} autoFocus onApply={handlePaletteApply} />
        </div>
      ) : null}
    </div>
  );
}
