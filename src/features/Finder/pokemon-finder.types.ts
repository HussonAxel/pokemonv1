import { pokemonCollectionFilters } from "@/data/data";

export type PokemonFilterState = {
  ability?: string[];
  abilityOperator?: "is_any_of" | "includes_all" | "is_not_any_of";
  bstOperator?: "greater_than" | "less_than" | "between" | "not_between" | "equals" | "not_equals";
  catchedView?: boolean;
  collection?: (typeof pokemonCollectionFilters)[number]["key"];
  collectionOperator?: "is" | "is_not";
  filterJoin?: "and" | "or";
  generation?: number;
  generationOperator?: "is" | "is_not";
  maxBst?: number;
  minBst?: number;
  shinyView?: boolean;
  type?: string[];
  typeOperator?: "is_any_of" | "includes_all" | "is_not_any_of";
};
