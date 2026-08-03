import Badge, { type BadgeItem } from "#/components/badge";
import { pokemonCollectionFilters } from "@/data/data";
import { getPokemonTypeStyle } from "@/lib/pokemon-type-styles";
import { X } from "lucide-react";
import * as React from "react";

import type { PokemonFilterState } from "./pokemon-finder.types";

type PokemonActiveFiltersProps = {
  filters: PokemonFilterState;
  onUpdate: (next: Partial<PokemonFilterState>) => void;
};

function formatName(name: string) {
  return name.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function FilterBadgeLabel({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1">
      <span className="text-[9px] opacity-60">{label}</span>
      <span className="truncate">{value}</span>
      <X aria-hidden="true" className="size-3 shrink-0 opacity-60" />
    </span>
  );
}

function emptyFilters(): Partial<PokemonFilterState> {
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

function statFilterLabel(filters: PokemonFilterState) {
  const min = filters.minBst ?? 0;
  const max = filters.maxBst ?? min;

  if (filters.bstOperator === "greater_than") return `BST ≥ ${min}`;
  if (filters.bstOperator === "less_than") return `BST ≤ ${max}`;
  if (filters.bstOperator === "between") return `BST ${min}–${max}`;
  if (filters.bstOperator === "not_between") return `BST outside ${min}–${max}`;
  if (filters.bstOperator === "equals") return `BST = ${min}`;
  return `BST ≠ ${min}`;
}

function filterItems(filters: PokemonFilterState): BadgeItem[] {
  const items: BadgeItem[] = [];

  filters.type?.forEach((type) => {
    items.push({
      ariaLabel: `Remove type ${formatName(type)} filter`,
      key: `type:${type}`,
      label: <FilterBadgeLabel label="Type" value={formatName(type)} />,
      style: getPokemonTypeStyle(type),
      value: `type:${type}`,
      variant: "type",
    });
  });

  filters.ability?.forEach((ability) => {
    items.push({
      ariaLabel: `Remove ability ${formatName(ability)} filter`,
      key: `ability:${ability}`,
      label: <FilterBadgeLabel label="Ability" value={formatName(ability)} />,
      value: `ability:${ability}`,
      variant: "secondary",
    });
  });

  if (filters.generation !== undefined) {
    items.push({
      ariaLabel: `Remove generation ${filters.generation} filter`,
      key: "generation",
      label: <FilterBadgeLabel label="Generation" value={String(filters.generation)} />,
      value: "generation",
      variant: "secondary",
    });
  }

  if (filters.bstOperator) {
    items.push({
      ariaLabel: "Remove base stats filter",
      key: "stats",
      label: <FilterBadgeLabel label="Stats" value={statFilterLabel(filters)} />,
      value: "stats",
      variant: "secondary",
    });
  }

  if (filters.collection) {
    const collection = pokemonCollectionFilters.find((item) => item.key === filters.collection);
    items.push({
      ariaLabel: `Remove ${collection?.title ?? filters.collection} filter`,
      key: "collection",
      label: (
        <FilterBadgeLabel label="Collection" value={collection?.title ?? filters.collection} />
      ),
      value: "collection",
      variant: "secondary",
    });
  }

  if (filters.shinyView) {
    items.push({
      ariaLabel: "Remove shiny display filter",
      key: "status:shiny",
      label: <FilterBadgeLabel label="Display" value="Shiny sprites" />,
      value: "status:shiny",
      variant: "secondary",
    });
  } else if (filters.catchedView) {
    items.push({
      ariaLabel: "Remove caught display filter",
      key: "status:caught",
      label: <FilterBadgeLabel label="Display" value="Caught view" />,
      value: "status:caught",
      variant: "secondary",
    });
  }

  if (filters.filterJoin) {
    items.push({
      ariaLabel: "Remove filter combination filter",
      key: "logic",
      label: (
        <FilterBadgeLabel
          label="Match"
          value={filters.filterJoin === "or" ? "Any condition" : "All conditions"}
        />
      ),
      value: "logic",
      variant: "secondary",
    });
  }

  return items;
}

export function PokemonActiveFilters({ filters, onUpdate }: PokemonActiveFiltersProps) {
  const items = React.useMemo(() => filterItems(filters), [filters]);

  const removeFilter = (_event: React.MouseEvent<HTMLButtonElement>, value: string) => {
    const [kind, rawValue] = value.split(":", 2);

    if (kind === "type" && rawValue) {
      const next = filters.type?.filter((type) => type !== rawValue) ?? [];
      onUpdate({
        type: next.length ? next : undefined,
        typeOperator: next.length ? filters.typeOperator : undefined,
      });
      return;
    }

    if (kind === "ability" && rawValue) {
      const next = filters.ability?.filter((ability) => ability !== rawValue) ?? [];
      onUpdate({
        ability: next.length ? next : undefined,
        abilityOperator: next.length ? filters.abilityOperator : undefined,
      });
      return;
    }

    if (kind === "generation") {
      onUpdate({ generation: undefined, generationOperator: undefined });
      return;
    }

    if (kind === "stats") {
      onUpdate({ bstOperator: undefined, minBst: undefined, maxBst: undefined });
      return;
    }

    if (kind === "collection") {
      onUpdate({ collection: undefined, collectionOperator: undefined });
      return;
    }

    if (kind === "status") {
      onUpdate({ shinyView: undefined, catchedView: undefined });
      return;
    }

    if (kind === "logic") onUpdate({ filterJoin: undefined });
  };

  return (
    <div
      data-slot="pokemon-filters"
      className="shrink-0 border-b bg-muted/10 px-3 py-2"
      aria-label="Pokemon filters"
      aria-live="polite"
    >
      <div className="flex min-w-0 items-center gap-1.5">
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Filters
        </span>
        {items.length ? (
          <>
            <Badge
              className="min-w-0 flex-1 flex-wrap"
              itemClassName="max-w-[min(22rem,60vw)]"
              items={items}
              onItemClick={removeFilter}
              size="sm"
            />
            <button
              type="button"
              className="finder-icon-button h-7 w-7 shrink-0"
              aria-label="Clear all Pokemon filters"
              onClick={() => onUpdate(emptyFilters())}
            >
              <X />
            </button>
          </>
        ) : (
          <span className="min-w-0 flex-1 text-xs text-muted-foreground/75">No active filters</span>
        )}
      </div>
    </div>
  );
}
