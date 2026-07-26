// @ts-nocheck
import type * as __TypedOpenapi from "./client.types.js";

import { z } from "zod";

// <Schemas>
export type VersionGroupSummary = __TypedOpenapi.Schemas.VersionGroupSummary;
export const VersionGroupSummary = z.object({ name: z.string().max(200), url: z.url() });

export type LanguageSummary = __TypedOpenapi.Schemas.LanguageSummary;
export const LanguageSummary = z.object({ name: z.string().max(200), url: z.url() });

export type AbilityChangeEffectText = __TypedOpenapi.Schemas.AbilityChangeEffectText;
export const AbilityChangeEffectText = z.object({
  effect: z.string().max(6000),
  language: LanguageSummary,
});

export type AbilityChange = __TypedOpenapi.Schemas.AbilityChange;
export const AbilityChange = z.object({
  version_group: VersionGroupSummary,
  effect_entries: z.array(AbilityChangeEffectText),
});

export type GenerationSummary = __TypedOpenapi.Schemas.GenerationSummary;
export const GenerationSummary = z.object({ name: z.string().max(200), url: z.url() });

export type AbilityName = __TypedOpenapi.Schemas.AbilityName;
export const AbilityName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type AbilityEffectText = __TypedOpenapi.Schemas.AbilityEffectText;
export const AbilityEffectText = z.object({
  effect: z.string().max(6000),
  short_effect: z.string().max(300),
  language: LanguageSummary,
});

export type AbilityFlavorText = __TypedOpenapi.Schemas.AbilityFlavorText;
export const AbilityFlavorText = z.object({
  flavor_text: z.string(),
  language: LanguageSummary,
  version_group: VersionGroupSummary,
});

export type AbilityDetail = __TypedOpenapi.Schemas.AbilityDetail;
export const AbilityDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  is_main_series: z.boolean().optional(),
  generation: GenerationSummary,
  names: z.array(AbilityName),
  effect_entries: z.array(AbilityEffectText),
  effect_changes: z.array(AbilityChange),
  flavor_text_entries: z.array(AbilityFlavorText),
  pokemon: z.array(
    z.object({
      is_hidden: z.boolean(),
      slot: z.number().int(),
      pokemon: z.object({ name: z.string(), url: z.url() }),
    }),
  ),
});

export type AbilitySummary = __TypedOpenapi.Schemas.AbilitySummary;
export const AbilitySummary = z.object({ name: z.string().max(200), url: z.url() });

export type BerryFirmnessSummary = __TypedOpenapi.Schemas.BerryFirmnessSummary;
export const BerryFirmnessSummary = z.object({ name: z.string().max(200), url: z.url() });

export type ItemSummary = __TypedOpenapi.Schemas.ItemSummary;
export const ItemSummary = z.object({ name: z.string().max(200), url: z.url() });

export type TypeSummary = __TypedOpenapi.Schemas.TypeSummary;
export const TypeSummary = z.object({ name: z.string().max(200), url: z.url() });

export type BerryDetail = __TypedOpenapi.Schemas.BerryDetail;
export const BerryDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  growth_time: z.number().int().min(-2147483648).max(2147483647),
  max_harvest: z.number().int().min(-2147483648).max(2147483647),
  natural_gift_power: z.number().int().min(-2147483648).max(2147483647),
  size: z.number().int().min(-2147483648).max(2147483647),
  smoothness: z.number().int().min(-2147483648).max(2147483647),
  soil_dryness: z.number().int().min(-2147483648).max(2147483647),
  firmness: BerryFirmnessSummary,
  flavors: z.array(
    z.object({
      potency: z.number().int(),
      flavor: z.object({ name: z.string(), url: z.url() }).partial(),
    }),
  ),
  item: ItemSummary,
  natural_gift_type: TypeSummary,
});

export type BerrySummary = __TypedOpenapi.Schemas.BerrySummary;
export const BerrySummary = z.object({ name: z.string().max(200), url: z.url() });

export type BerryFirmnessName = __TypedOpenapi.Schemas.BerryFirmnessName;
export const BerryFirmnessName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type BerryFirmnessDetail = __TypedOpenapi.Schemas.BerryFirmnessDetail;
export const BerryFirmnessDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  berries: z.array(BerrySummary),
  names: z.array(BerryFirmnessName),
});

export type ContestTypeSummary = __TypedOpenapi.Schemas.ContestTypeSummary;
export const ContestTypeSummary = z.object({ name: z.string().max(200), url: z.url() });

export type BerryFlavorName = __TypedOpenapi.Schemas.BerryFlavorName;
export const BerryFlavorName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type BerryFlavorDetail = __TypedOpenapi.Schemas.BerryFlavorDetail;
export const BerryFlavorDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  berries: z.array(
    z.object({
      potency: z.number().int(),
      berry: z.object({ name: z.string(), url: z.url() }).partial(),
    }),
  ),
  contest_type: ContestTypeSummary,
  names: z.array(BerryFlavorName),
});

export type BerryFlavorSummary = __TypedOpenapi.Schemas.BerryFlavorSummary;
export const BerryFlavorSummary = z.object({ name: z.string().max(200), url: z.url() });

export type CharacteristicDescription = __TypedOpenapi.Schemas.CharacteristicDescription;
export const CharacteristicDescription = z.object({
  description: z.string().max(2000).optional(),
  language: LanguageSummary,
});

export type StatSummary = __TypedOpenapi.Schemas.StatSummary;
export const StatSummary = z.object({ name: z.string().max(200), url: z.url() });

export type CharacteristicDetail = __TypedOpenapi.Schemas.CharacteristicDetail;
export const CharacteristicDetail = z.object({
  id: z.number().int(),
  gene_modulo: z.number().int(),
  possible_values: z.array(z.number().int()),
  highest_stat: StatSummary,
  descriptions: z.array(CharacteristicDescription),
});

export type CharacteristicSummary = __TypedOpenapi.Schemas.CharacteristicSummary;
export const CharacteristicSummary = z.object({ url: z.url() });

export type ContestEffectEffectText = __TypedOpenapi.Schemas.ContestEffectEffectText;
export const ContestEffectEffectText = z.object({
  effect: z.string().max(6000),
  language: LanguageSummary,
});

export type ContestEffectFlavorText = __TypedOpenapi.Schemas.ContestEffectFlavorText;
export const ContestEffectFlavorText = z.object({
  flavor_text: z.string().max(500),
  language: LanguageSummary,
});

export type ContestEffectDetail = __TypedOpenapi.Schemas.ContestEffectDetail;
export const ContestEffectDetail = z.object({
  id: z.number().int(),
  appeal: z.number().int().min(-2147483648).max(2147483647),
  jam: z.number().int().min(-2147483648).max(2147483647),
  effect_entries: z.array(ContestEffectEffectText),
  flavor_text_entries: z.array(ContestEffectFlavorText),
});

export type ContestEffectSummary = __TypedOpenapi.Schemas.ContestEffectSummary;
export const ContestEffectSummary = z.object({ url: z.url() });

export type ContestTypeName = __TypedOpenapi.Schemas.ContestTypeName;
export const ContestTypeName = z.object({
  name: z.string().max(200),
  color: z.string().max(10),
  language: LanguageSummary,
});

export type ContestTypeDetail = __TypedOpenapi.Schemas.ContestTypeDetail;
export const ContestTypeDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  berry_flavor: BerryFlavorSummary.and(z.unknown()),
  names: z.array(ContestTypeName),
});

export type EggGroupName = __TypedOpenapi.Schemas.EggGroupName;
export const EggGroupName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type EggGroupDetail = __TypedOpenapi.Schemas.EggGroupDetail;
export const EggGroupDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  names: z.array(EggGroupName),
  pokemon_species: z.array(z.object({ name: z.string().optional(), url: z.url().optional() })),
});

export type EggGroupSummary = __TypedOpenapi.Schemas.EggGroupSummary;
export const EggGroupSummary = z.object({ name: z.string().max(200), url: z.url() });

export type EncounterConditionValueSummary = __TypedOpenapi.Schemas.EncounterConditionValueSummary;
export const EncounterConditionValueSummary = z.object({ name: z.string().max(200), url: z.url() });

export type EncounterConditionName = __TypedOpenapi.Schemas.EncounterConditionName;
export const EncounterConditionName = z.object({
  name: z.string().max(200),
  language: LanguageSummary,
});

export type EncounterConditionDetail = __TypedOpenapi.Schemas.EncounterConditionDetail;
export const EncounterConditionDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  values: z.array(EncounterConditionValueSummary),
  names: z.array(EncounterConditionName),
});

export type EncounterConditionSummary = __TypedOpenapi.Schemas.EncounterConditionSummary;
export const EncounterConditionSummary = z.object({ name: z.string().max(200), url: z.url() });

export type EncounterConditionValueName = __TypedOpenapi.Schemas.EncounterConditionValueName;
export const EncounterConditionValueName = z.object({
  name: z.string().max(200),
  language: LanguageSummary,
});

export type EncounterConditionValueDetail = __TypedOpenapi.Schemas.EncounterConditionValueDetail;
export const EncounterConditionValueDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  condition: EncounterConditionSummary,
  names: z.array(EncounterConditionValueName),
});

export type EncounterMethodName = __TypedOpenapi.Schemas.EncounterMethodName;
export const EncounterMethodName = z.object({
  name: z.string().max(200),
  language: LanguageSummary,
});

export type EncounterMethodDetail = __TypedOpenapi.Schemas.EncounterMethodDetail;
export const EncounterMethodDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  order: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  names: z.array(EncounterMethodName),
});

export type EncounterMethodSummary = __TypedOpenapi.Schemas.EncounterMethodSummary;
export const EncounterMethodSummary = z.object({ name: z.string().max(200), url: z.url() });

export type EvolutionChainDetail = __TypedOpenapi.Schemas.EvolutionChainDetail;
export const EvolutionChainDetail = z.object({
  id: z.number().int(),
  baby_trigger_item: ItemSummary,
  chain: z.object({
    evolution_details: z.array(z.unknown()),
    evolves_to: z.array(
      z.object({
        evolution_details: z.array(
          z.object({
            version_group: z.object({ name: z.string(), url: z.url() }),
            is_default: z.boolean(),
            gender: z.object({ name: z.string(), url: z.url() }).nullable(),
            held_item: z.object({ name: z.string(), url: z.url() }).nullable(),
            item: z.object({ name: z.string(), url: z.url() }).nullable(),
            known_move: z.unknown().nullable(),
            known_move_type: z.unknown().nullable(),
            location: z.object({ name: z.string(), url: z.url() }).nullable(),
            min_affection: z.number().int().nullable(),
            min_beauty: z.number().int().nullable(),
            min_damage_taken: z.number().int().nullable(),
            min_happiness: z.number().int().nullable(),
            min_level: z.number().int().nullable(),
            min_move_count: z.number().int().nullable(),
            min_steps: z.number().int().nullable(),
            near_special_rock: z.boolean().nullable(),
            needs_multiplayer: z.boolean().nullable(),
            needs_overworld_rain: z.boolean().nullable(),
            party_species: z.string().nullable(),
            party_type: z.string().nullable(),
            relative_physical_stats: z.string().nullable(),
            time_of_day: z.string(),
            trade_species: z.string().nullable(),
            trigger: z.object({ name: z.string(), url: z.url() }),
            turn_upside_down: z.boolean(),
            used_move: z.unknown().nullable(),
            region: z.object({ name: z.string(), url: z.url() }).nullable(),
            base_form: z.object({ name: z.string(), url: z.url() }).nullable(),
            evolved_form: z.object({ name: z.string(), url: z.url() }).nullable(),
          }),
        ),
        is_baby: z.boolean(),
        species: z.object({ name: z.string(), url: z.url() }),
      }),
    ),
    is_baby: z.boolean(),
    species: z.object({ name: z.string(), url: z.url() }),
  }),
});

export type EvolutionChainSummary = __TypedOpenapi.Schemas.EvolutionChainSummary;
export const EvolutionChainSummary = z.object({ url: z.url() });

export type EvolutionTriggerName = __TypedOpenapi.Schemas.EvolutionTriggerName;
export const EvolutionTriggerName = z.object({
  name: z.string().max(200),
  language: LanguageSummary,
});

export type EvolutionTriggerDetail = __TypedOpenapi.Schemas.EvolutionTriggerDetail;
export const EvolutionTriggerDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  names: z.array(EvolutionTriggerName),
  pokemon_species: z.array(z.object({ name: z.string(), url: z.url() })),
});

export type EvolutionTriggerSummary = __TypedOpenapi.Schemas.EvolutionTriggerSummary;
export const EvolutionTriggerSummary = z.object({ name: z.string().max(200), url: z.url() });

export type Experience = __TypedOpenapi.Schemas.Experience;
export const Experience = z.object({
  level: z.number().int().min(-2147483648).max(2147483647),
  experience: z.number().int().min(-2147483648).max(2147483647),
});

export type GenderDetail = __TypedOpenapi.Schemas.GenderDetail;
export const GenderDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  pokemon_species_details: z.array(
    z.object({
      rate: z.number().int(),
      pokemon_species: z.object({ name: z.string(), url: z.url() }),
    }),
  ),
  required_for_evolution: z.array(z.object({ name: z.string(), url: z.url() })),
});

export type GenderSummary = __TypedOpenapi.Schemas.GenderSummary;
export const GenderSummary = z.object({ name: z.string().max(200), url: z.url() });

export type RegionSummary = __TypedOpenapi.Schemas.RegionSummary;
export const RegionSummary = z.object({ name: z.string().max(200), url: z.url() });

export type MoveSummary = __TypedOpenapi.Schemas.MoveSummary;
export const MoveSummary = z.object({ name: z.string().max(200), url: z.url() });

export type GenerationName = __TypedOpenapi.Schemas.GenerationName;
export const GenerationName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type PokemonSpeciesSummary = __TypedOpenapi.Schemas.PokemonSpeciesSummary;
export const PokemonSpeciesSummary = z.object({ name: z.string().max(200), url: z.url() });

export type GenerationDetail = __TypedOpenapi.Schemas.GenerationDetail;
export const GenerationDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  abilities: z.array(AbilitySummary),
  main_region: RegionSummary,
  moves: z.array(MoveSummary),
  names: z.array(GenerationName),
  pokemon_species: z.array(PokemonSpeciesSummary),
  types: z.array(TypeSummary),
  version_groups: z.array(VersionGroupSummary),
});

export type GrowthRateDescription = __TypedOpenapi.Schemas.GrowthRateDescription;
export const GrowthRateDescription = z.object({
  description: z.string().max(2000).optional(),
  language: LanguageSummary,
});

export type GrowthRateDetail = __TypedOpenapi.Schemas.GrowthRateDetail;
export const GrowthRateDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  formula: z.string().max(500),
  descriptions: z.array(GrowthRateDescription),
  levels: z.array(Experience),
  pokemon_species: z.array(PokemonSpeciesSummary),
});

export type GrowthRateSummary = __TypedOpenapi.Schemas.GrowthRateSummary;
export const GrowthRateSummary = z.object({ name: z.string().max(200), url: z.url() });

export type ItemAttributeDescription = __TypedOpenapi.Schemas.ItemAttributeDescription;
export const ItemAttributeDescription = z.object({
  description: z.string().max(2000).optional(),
  language: LanguageSummary,
});

export type ItemAttributeName = __TypedOpenapi.Schemas.ItemAttributeName;
export const ItemAttributeName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type ItemAttributeDetail = __TypedOpenapi.Schemas.ItemAttributeDetail;
export const ItemAttributeDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  descriptions: z.array(ItemAttributeDescription),
  items: z.array(z.object({ name: z.string(), url: z.url() })),
  names: z.array(ItemAttributeName),
});

export type ItemAttributeSummary = __TypedOpenapi.Schemas.ItemAttributeSummary;
export const ItemAttributeSummary = z.object({ name: z.string().max(200), url: z.url() });

export type ItemCategoryName = __TypedOpenapi.Schemas.ItemCategoryName;
export const ItemCategoryName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type ItemPocketSummary = __TypedOpenapi.Schemas.ItemPocketSummary;
export const ItemPocketSummary = z.object({ name: z.string().max(200), url: z.url() });

export type ItemCategoryDetail = __TypedOpenapi.Schemas.ItemCategoryDetail;
export const ItemCategoryDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  items: z.array(ItemSummary),
  names: z.array(ItemCategoryName),
  pocket: ItemPocketSummary,
});

export type ItemCategorySummary = __TypedOpenapi.Schemas.ItemCategorySummary;
export const ItemCategorySummary = z.object({ name: z.string().max(200), url: z.url() });

export type ItemFlingEffectSummary = __TypedOpenapi.Schemas.ItemFlingEffectSummary;
export const ItemFlingEffectSummary = z.object({ name: z.string().max(200), url: z.url() });

export type ItemEffectText = __TypedOpenapi.Schemas.ItemEffectText;
export const ItemEffectText = z.object({
  effect: z.string().max(6000),
  short_effect: z.string().max(300),
  language: LanguageSummary,
});

export type ItemFlavorText = __TypedOpenapi.Schemas.ItemFlavorText;
export const ItemFlavorText = z.object({
  text: z.string(),
  version_group: VersionGroupSummary,
  language: LanguageSummary,
});

export type ItemGameIndex = __TypedOpenapi.Schemas.ItemGameIndex;
export const ItemGameIndex = z.object({
  game_index: z.number().int().min(-2147483648).max(2147483647),
  generation: GenerationSummary,
});

export type ItemName = __TypedOpenapi.Schemas.ItemName;
export const ItemName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type ItemDetail = __TypedOpenapi.Schemas.ItemDetail;
export const ItemDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  cost: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  fling_power: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  fling_effect: ItemFlingEffectSummary,
  attributes: z.array(z.object({ name: z.string(), url: z.url() })),
  category: ItemCategorySummary,
  effect_entries: z.array(ItemEffectText),
  flavor_text_entries: z.array(ItemFlavorText),
  game_indices: z.array(ItemGameIndex),
  names: z.array(ItemName),
  held_by_pokemon: z.array(
    z.object({
      pokemon: z.object({ name: z.string(), url: z.url() }),
      "version-details": z.array(
        z.object({
          rarity: z.number().int(),
          version: z.object({ name: z.string(), url: z.url() }),
        }),
      ),
    }),
  ),
  sprites: z.object({ default: z.url() }),
  baby_trigger_for: z.object({ url: z.url() }),
  machines: z.array(
    z.object({ machine: z.url(), version_group: z.object({ name: z.string(), url: z.url() }) }),
  ),
});

export type ItemFlingEffectEffectText = __TypedOpenapi.Schemas.ItemFlingEffectEffectText;
export const ItemFlingEffectEffectText = z.object({
  effect: z.string().max(6000),
  language: LanguageSummary,
});

export type ItemFlingEffectDetail = __TypedOpenapi.Schemas.ItemFlingEffectDetail;
export const ItemFlingEffectDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  effect_entries: z.array(ItemFlingEffectEffectText),
  items: z.array(ItemSummary),
});

export type ItemPocketName = __TypedOpenapi.Schemas.ItemPocketName;
export const ItemPocketName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type ItemPocketDetail = __TypedOpenapi.Schemas.ItemPocketDetail;
export const ItemPocketDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  categories: z.array(ItemCategorySummary),
  names: z.array(ItemPocketName),
});

export type LanguageName = __TypedOpenapi.Schemas.LanguageName;
export const LanguageName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type LanguageDetail = __TypedOpenapi.Schemas.LanguageDetail;
export const LanguageDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  official: z.boolean().optional(),
  iso639: z.string().max(10),
  iso3166: z.string().max(2),
  names: z.array(LanguageName),
});

export type LocationSummary = __TypedOpenapi.Schemas.LocationSummary;
export const LocationSummary = z.object({ name: z.string().max(200), url: z.url() });

export type LocationAreaName = __TypedOpenapi.Schemas.LocationAreaName;
export const LocationAreaName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type LocationAreaDetail = __TypedOpenapi.Schemas.LocationAreaDetail;
export const LocationAreaDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  game_index: z.number().int().min(-2147483648).max(2147483647),
  encounter_method_rates: z.array(
    z.object({
      encounter_method: z.object({ name: z.string(), url: z.url() }),
      version_details: z.array(
        z.object({ rate: z.number().int(), version: z.object({ name: z.string(), url: z.url() }) }),
      ),
    }),
  ),
  location: LocationSummary,
  names: z.array(LocationAreaName),
  pokemon_encounters: z.array(
    z.object({
      pokemon: z.object({ name: z.string(), url: z.url() }),
      version_details: z.array(
        z.object({
          version: z.object({ name: z.string(), url: z.url() }),
          max_chance: z.number().int(),
          encounter_details: z.object({
            min_level: z.number().int(),
            max_level: z.number().int(),
            condition_values: z.object({ name: z.string(), url: z.url() }).optional(),
            chance: z.number().int(),
            method: z.object({ name: z.string(), url: z.url() }),
          }),
        }),
      ),
    }),
  ),
});

export type LocationAreaSummary = __TypedOpenapi.Schemas.LocationAreaSummary;
export const LocationAreaSummary = z.object({ name: z.string().max(200), url: z.url() });

export type LocationName = __TypedOpenapi.Schemas.LocationName;
export const LocationName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type LocationGameIndex = __TypedOpenapi.Schemas.LocationGameIndex;
export const LocationGameIndex = z.object({
  game_index: z.number().int().min(-2147483648).max(2147483647),
  generation: GenerationSummary,
});

export type LocationDetail = __TypedOpenapi.Schemas.LocationDetail;
export const LocationDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  region: RegionSummary,
  names: z.array(LocationName),
  game_indices: z.array(LocationGameIndex),
  areas: z.array(LocationAreaSummary),
});

export type MachineDetail = __TypedOpenapi.Schemas.MachineDetail;
export const MachineDetail = z.object({
  id: z.number().int(),
  item: ItemSummary,
  version_group: VersionGroupSummary,
  move: MoveSummary,
});

export type MachineSummary = __TypedOpenapi.Schemas.MachineSummary;
export const MachineSummary = z.object({ url: z.url() });

export type MoveBattleStyleName = __TypedOpenapi.Schemas.MoveBattleStyleName;
export const MoveBattleStyleName = z.object({
  name: z.string().max(200),
  language: LanguageSummary,
});

export type MoveBattleStyleDetail = __TypedOpenapi.Schemas.MoveBattleStyleDetail;
export const MoveBattleStyleDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  names: z.array(MoveBattleStyleName),
});

export type MoveBattleStyleSummary = __TypedOpenapi.Schemas.MoveBattleStyleSummary;
export const MoveBattleStyleSummary = z.object({ name: z.string().max(200), url: z.url() });

export type MoveChange = __TypedOpenapi.Schemas.MoveChange;
export const MoveChange = z.object({
  accuracy: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  power: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  pp: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  effect_chance: z.number().int(),
  effect_entries: z.array(
    z.object({
      effect: z.string(),
      short_effect: z.string(),
      language: z.object({ name: z.string(), url: z.url() }),
    }),
  ),
  type: TypeSummary,
  version_group: VersionGroupSummary,
});

export type MoveDamageClassDescription = __TypedOpenapi.Schemas.MoveDamageClassDescription;
export const MoveDamageClassDescription = z.object({
  description: z.string().max(2000).optional(),
  language: LanguageSummary,
});

export type MoveDamageClassName = __TypedOpenapi.Schemas.MoveDamageClassName;
export const MoveDamageClassName = z.object({
  name: z.string().max(200),
  language: LanguageSummary,
});

export type MoveDamageClassDetail = __TypedOpenapi.Schemas.MoveDamageClassDetail;
export const MoveDamageClassDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  descriptions: z.array(MoveDamageClassDescription),
  moves: z.array(MoveSummary),
  names: z.array(MoveDamageClassName),
});

export type MoveDamageClassSummary = __TypedOpenapi.Schemas.MoveDamageClassSummary;
export const MoveDamageClassSummary = z.object({ name: z.string().max(200), url: z.url() });

export type MoveMetaAilmentSummary = __TypedOpenapi.Schemas.MoveMetaAilmentSummary;
export const MoveMetaAilmentSummary = z.object({ name: z.string().max(200), url: z.url() });

export type MoveMetaCategorySummary = __TypedOpenapi.Schemas.MoveMetaCategorySummary;
export const MoveMetaCategorySummary = z.object({ name: z.string().max(200), url: z.url() });

export type MoveMeta = __TypedOpenapi.Schemas.MoveMeta;
export const MoveMeta = z.object({
  ailment: MoveMetaAilmentSummary,
  category: MoveMetaCategorySummary,
  min_hits: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  max_hits: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  min_turns: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  max_turns: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  drain: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  healing: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  crit_rate: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  ailment_chance: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  flinch_chance: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  stat_chance: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
});

export type MoveName = __TypedOpenapi.Schemas.MoveName;
export const MoveName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type SuperContestEffectSummary = __TypedOpenapi.Schemas.SuperContestEffectSummary;
export const SuperContestEffectSummary = z.object({ url: z.url() });

export type MoveTargetSummary = __TypedOpenapi.Schemas.MoveTargetSummary;
export const MoveTargetSummary = z.object({ name: z.string().max(200), url: z.url() });

export type MoveFlavorText = __TypedOpenapi.Schemas.MoveFlavorText;
export const MoveFlavorText = z.object({
  flavor_text: z.string(),
  language: LanguageSummary,
  version_group: VersionGroupSummary,
});

export type MoveDetail = __TypedOpenapi.Schemas.MoveDetail;
export const MoveDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  accuracy: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  effect_chance: z.number().int(),
  pp: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  priority: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  power: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  contest_combos: z.object({
    normal: z.object({
      use_before: z.array(z.object({ name: z.string(), url: z.url() })).nullable(),
      use_after: z.array(z.object({ name: z.string(), url: z.url() })).nullable(),
    }),
    super: z.object({
      use_before: z.array(z.object({ name: z.string(), url: z.url() })).nullable(),
      use_after: z.array(z.object({ name: z.string(), url: z.url() })).nullable(),
    }),
  }),
  contest_type: ContestTypeSummary,
  contest_effect: ContestEffectSummary,
  damage_class: MoveDamageClassSummary,
  effect_entries: z.array(
    z.object({
      effect: z.string(),
      short_effect: z.string(),
      language: z.object({ name: z.string(), url: z.url() }),
    }),
  ),
  effect_changes: z.array(
    z.object({
      effect_entries: z.array(
        z.object({ effect: z.string(), language: z.object({ name: z.string(), url: z.url() }) }),
      ),
      version_group: z.object({ name: z.string(), url: z.url() }),
    }),
  ),
  generation: GenerationSummary,
  meta: MoveMeta.and(z.unknown()),
  names: z.array(MoveName),
  past_values: z.array(MoveChange),
  stat_changes: z.array(
    z.object({ change: z.number().int(), stat: z.object({ name: z.string(), url: z.url() }) }),
  ),
  super_contest_effect: SuperContestEffectSummary,
  target: MoveTargetSummary,
  type: TypeSummary,
  machines: z.array(
    z.object({
      machine: z.object({ url: z.url() }),
      version_group: z.object({ name: z.string(), url: z.url() }),
    }),
  ),
  flavor_text_entries: z.array(MoveFlavorText),
  learned_by_pokemon: z.array(z.object({ name: z.string(), url: z.url() })),
});

export type MoveLearnMethodDescription = __TypedOpenapi.Schemas.MoveLearnMethodDescription;
export const MoveLearnMethodDescription = z.object({
  description: z.string().max(2000).optional(),
  language: LanguageSummary,
});

export type MoveLearnMethodName = __TypedOpenapi.Schemas.MoveLearnMethodName;
export const MoveLearnMethodName = z.object({
  name: z.string().max(200),
  language: LanguageSummary,
});

export type MoveLearnMethodDetail = __TypedOpenapi.Schemas.MoveLearnMethodDetail;
export const MoveLearnMethodDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  names: z.array(MoveLearnMethodName),
  descriptions: z.array(MoveLearnMethodDescription),
  version_groups: z.array(z.object({ name: z.string(), url: z.url() })),
});

export type MoveLearnMethodSummary = __TypedOpenapi.Schemas.MoveLearnMethodSummary;
export const MoveLearnMethodSummary = z.object({ name: z.string().max(200), url: z.url() });

export type MoveMetaAilmentName = __TypedOpenapi.Schemas.MoveMetaAilmentName;
export const MoveMetaAilmentName = z.object({
  name: z.string().max(200),
  language: LanguageSummary,
});

export type MoveMetaAilmentDetail = __TypedOpenapi.Schemas.MoveMetaAilmentDetail;
export const MoveMetaAilmentDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  moves: z.array(z.object({ name: z.string(), url: z.url() })),
  names: z.array(MoveMetaAilmentName),
});

export type MoveMetaCategoryDescription = __TypedOpenapi.Schemas.MoveMetaCategoryDescription;
export const MoveMetaCategoryDescription = z.object({
  description: z.string().max(2000).optional(),
  language: LanguageSummary,
});

export type MoveMetaCategoryDetail = __TypedOpenapi.Schemas.MoveMetaCategoryDetail;
export const MoveMetaCategoryDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  descriptions: z.array(MoveMetaCategoryDescription),
  moves: z.array(z.object({ name: z.string(), url: z.url() })),
});

export type MoveTargetDescription = __TypedOpenapi.Schemas.MoveTargetDescription;
export const MoveTargetDescription = z.object({
  description: z.string().max(2000).optional(),
  language: LanguageSummary,
});

export type MoveTargetName = __TypedOpenapi.Schemas.MoveTargetName;
export const MoveTargetName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type MoveTargetDetail = __TypedOpenapi.Schemas.MoveTargetDetail;
export const MoveTargetDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  descriptions: z.array(MoveTargetDescription),
  moves: z.array(MoveSummary),
  names: z.array(MoveTargetName),
});

export type NatureBattleStylePreference = __TypedOpenapi.Schemas.NatureBattleStylePreference;
export const NatureBattleStylePreference = z.object({
  low_hp_preference: z.number().int().min(-2147483648).max(2147483647),
  high_hp_preference: z.number().int().min(-2147483648).max(2147483647),
  move_battle_style: MoveBattleStyleSummary,
});

export type NatureName = __TypedOpenapi.Schemas.NatureName;
export const NatureName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type NatureDetail = __TypedOpenapi.Schemas.NatureDetail;
export const NatureDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  decreased_stat: StatSummary,
  increased_stat: StatSummary,
  likes_flavor: BerryFlavorSummary,
  hates_flavor: BerryFlavorSummary,
  berries: z.array(BerrySummary),
  pokeathlon_stat_changes: z.array(
    z.object({
      max_change: z.number().int(),
      pokeathlon_stat: z.object({ name: z.string(), url: z.url() }),
    }),
  ),
  move_battle_style_preferences: z.array(NatureBattleStylePreference),
  names: z.array(NatureName),
});

export type NatureSummary = __TypedOpenapi.Schemas.NatureSummary;
export const NatureSummary = z.object({ name: z.string().max(200), url: z.url() });

export type PaginatedAbilitySummaryList = __TypedOpenapi.Schemas.PaginatedAbilitySummaryList;
export const PaginatedAbilitySummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(AbilitySummary),
});

export type PaginatedBerryFirmnessSummaryList =
  __TypedOpenapi.Schemas.PaginatedBerryFirmnessSummaryList;
export const PaginatedBerryFirmnessSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(BerryFirmnessSummary),
});

export type PaginatedBerryFlavorSummaryList =
  __TypedOpenapi.Schemas.PaginatedBerryFlavorSummaryList;
export const PaginatedBerryFlavorSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(BerryFlavorSummary),
});

export type PaginatedBerrySummaryList = __TypedOpenapi.Schemas.PaginatedBerrySummaryList;
export const PaginatedBerrySummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(BerrySummary),
});

export type PaginatedCharacteristicSummaryList =
  __TypedOpenapi.Schemas.PaginatedCharacteristicSummaryList;
export const PaginatedCharacteristicSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(CharacteristicSummary),
});

export type PaginatedContestEffectSummaryList =
  __TypedOpenapi.Schemas.PaginatedContestEffectSummaryList;
export const PaginatedContestEffectSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(ContestEffectSummary),
});

export type PaginatedContestTypeSummaryList =
  __TypedOpenapi.Schemas.PaginatedContestTypeSummaryList;
export const PaginatedContestTypeSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(ContestTypeSummary),
});

export type PaginatedEggGroupSummaryList = __TypedOpenapi.Schemas.PaginatedEggGroupSummaryList;
export const PaginatedEggGroupSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(EggGroupSummary),
});

export type PaginatedEncounterConditionSummaryList =
  __TypedOpenapi.Schemas.PaginatedEncounterConditionSummaryList;
export const PaginatedEncounterConditionSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(EncounterConditionSummary),
});

export type PaginatedEncounterConditionValueSummaryList =
  __TypedOpenapi.Schemas.PaginatedEncounterConditionValueSummaryList;
export const PaginatedEncounterConditionValueSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(EncounterConditionValueSummary),
});

export type PaginatedEncounterMethodSummaryList =
  __TypedOpenapi.Schemas.PaginatedEncounterMethodSummaryList;
export const PaginatedEncounterMethodSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(EncounterMethodSummary),
});

export type PaginatedEvolutionChainSummaryList =
  __TypedOpenapi.Schemas.PaginatedEvolutionChainSummaryList;
export const PaginatedEvolutionChainSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(EvolutionChainSummary),
});

export type PaginatedEvolutionTriggerSummaryList =
  __TypedOpenapi.Schemas.PaginatedEvolutionTriggerSummaryList;
export const PaginatedEvolutionTriggerSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(EvolutionTriggerSummary),
});

export type PaginatedGenderSummaryList = __TypedOpenapi.Schemas.PaginatedGenderSummaryList;
export const PaginatedGenderSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(GenderSummary),
});

export type PaginatedGenerationSummaryList = __TypedOpenapi.Schemas.PaginatedGenerationSummaryList;
export const PaginatedGenerationSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(GenerationSummary),
});

export type PaginatedGrowthRateSummaryList = __TypedOpenapi.Schemas.PaginatedGrowthRateSummaryList;
export const PaginatedGrowthRateSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(GrowthRateSummary),
});

export type PaginatedItemAttributeSummaryList =
  __TypedOpenapi.Schemas.PaginatedItemAttributeSummaryList;
export const PaginatedItemAttributeSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(ItemAttributeSummary),
});

export type PaginatedItemCategorySummaryList =
  __TypedOpenapi.Schemas.PaginatedItemCategorySummaryList;
export const PaginatedItemCategorySummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(ItemCategorySummary),
});

export type PaginatedItemFlingEffectSummaryList =
  __TypedOpenapi.Schemas.PaginatedItemFlingEffectSummaryList;
export const PaginatedItemFlingEffectSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(ItemFlingEffectSummary),
});

export type PaginatedItemPocketSummaryList = __TypedOpenapi.Schemas.PaginatedItemPocketSummaryList;
export const PaginatedItemPocketSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(ItemPocketSummary),
});

export type PaginatedItemSummaryList = __TypedOpenapi.Schemas.PaginatedItemSummaryList;
export const PaginatedItemSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(ItemSummary),
});

export type PaginatedLanguageSummaryList = __TypedOpenapi.Schemas.PaginatedLanguageSummaryList;
export const PaginatedLanguageSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(LanguageSummary),
});

export type PaginatedLocationAreaSummaryList =
  __TypedOpenapi.Schemas.PaginatedLocationAreaSummaryList;
export const PaginatedLocationAreaSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(LocationAreaSummary),
});

export type PaginatedLocationSummaryList = __TypedOpenapi.Schemas.PaginatedLocationSummaryList;
export const PaginatedLocationSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(LocationSummary),
});

export type PaginatedMachineSummaryList = __TypedOpenapi.Schemas.PaginatedMachineSummaryList;
export const PaginatedMachineSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(MachineSummary),
});

export type PaginatedMoveBattleStyleSummaryList =
  __TypedOpenapi.Schemas.PaginatedMoveBattleStyleSummaryList;
export const PaginatedMoveBattleStyleSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(MoveBattleStyleSummary),
});

export type PaginatedMoveDamageClassSummaryList =
  __TypedOpenapi.Schemas.PaginatedMoveDamageClassSummaryList;
export const PaginatedMoveDamageClassSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(MoveDamageClassSummary),
});

export type PaginatedMoveLearnMethodSummaryList =
  __TypedOpenapi.Schemas.PaginatedMoveLearnMethodSummaryList;
export const PaginatedMoveLearnMethodSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(MoveLearnMethodSummary),
});

export type PaginatedMoveMetaAilmentSummaryList =
  __TypedOpenapi.Schemas.PaginatedMoveMetaAilmentSummaryList;
export const PaginatedMoveMetaAilmentSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(MoveMetaAilmentSummary),
});

export type PaginatedMoveMetaCategorySummaryList =
  __TypedOpenapi.Schemas.PaginatedMoveMetaCategorySummaryList;
export const PaginatedMoveMetaCategorySummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(MoveMetaCategorySummary),
});

export type PaginatedMoveSummaryList = __TypedOpenapi.Schemas.PaginatedMoveSummaryList;
export const PaginatedMoveSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(MoveSummary),
});

export type PaginatedMoveTargetSummaryList = __TypedOpenapi.Schemas.PaginatedMoveTargetSummaryList;
export const PaginatedMoveTargetSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(MoveTargetSummary),
});

export type PaginatedNatureSummaryList = __TypedOpenapi.Schemas.PaginatedNatureSummaryList;
export const PaginatedNatureSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(NatureSummary),
});

export type PalParkAreaSummary = __TypedOpenapi.Schemas.PalParkAreaSummary;
export const PalParkAreaSummary = z.object({ name: z.string().max(200), url: z.url() });

export type PaginatedPalParkAreaSummaryList =
  __TypedOpenapi.Schemas.PaginatedPalParkAreaSummaryList;
export const PaginatedPalParkAreaSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(PalParkAreaSummary),
});

export type PokeathlonStatSummary = __TypedOpenapi.Schemas.PokeathlonStatSummary;
export const PokeathlonStatSummary = z.object({ name: z.string().max(200), url: z.url() });

export type PaginatedPokeathlonStatSummaryList =
  __TypedOpenapi.Schemas.PaginatedPokeathlonStatSummaryList;
export const PaginatedPokeathlonStatSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(PokeathlonStatSummary),
});

export type PokedexSummary = __TypedOpenapi.Schemas.PokedexSummary;
export const PokedexSummary = z.object({ name: z.string().max(200), url: z.url() });

export type PaginatedPokedexSummaryList = __TypedOpenapi.Schemas.PaginatedPokedexSummaryList;
export const PaginatedPokedexSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(PokedexSummary),
});

export type PokemonColorSummary = __TypedOpenapi.Schemas.PokemonColorSummary;
export const PokemonColorSummary = z.object({ name: z.string().max(200), url: z.url() });

export type PaginatedPokemonColorSummaryList =
  __TypedOpenapi.Schemas.PaginatedPokemonColorSummaryList;
export const PaginatedPokemonColorSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(PokemonColorSummary),
});

export type PokemonFormSummary = __TypedOpenapi.Schemas.PokemonFormSummary;
export const PokemonFormSummary = z.object({ name: z.string().max(200), url: z.url() });

export type PaginatedPokemonFormSummaryList =
  __TypedOpenapi.Schemas.PaginatedPokemonFormSummaryList;
export const PaginatedPokemonFormSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(PokemonFormSummary),
});

export type PokemonHabitatSummary = __TypedOpenapi.Schemas.PokemonHabitatSummary;
export const PokemonHabitatSummary = z.object({ name: z.string().max(200), url: z.url() });

export type PaginatedPokemonHabitatSummaryList =
  __TypedOpenapi.Schemas.PaginatedPokemonHabitatSummaryList;
export const PaginatedPokemonHabitatSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(PokemonHabitatSummary),
});

export type PokemonShapeSummary = __TypedOpenapi.Schemas.PokemonShapeSummary;
export const PokemonShapeSummary = z.object({ name: z.string().max(200), url: z.url() });

export type PaginatedPokemonShapeSummaryList =
  __TypedOpenapi.Schemas.PaginatedPokemonShapeSummaryList;
export const PaginatedPokemonShapeSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(PokemonShapeSummary),
});

export type PaginatedPokemonSpeciesSummaryList =
  __TypedOpenapi.Schemas.PaginatedPokemonSpeciesSummaryList;
export const PaginatedPokemonSpeciesSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(PokemonSpeciesSummary),
});

export type PokemonSummary = __TypedOpenapi.Schemas.PokemonSummary;
export const PokemonSummary = z.object({ name: z.string().max(200), url: z.url() });

export type PaginatedPokemonSummaryList = __TypedOpenapi.Schemas.PaginatedPokemonSummaryList;
export const PaginatedPokemonSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(PokemonSummary),
});

export type PaginatedRegionSummaryList = __TypedOpenapi.Schemas.PaginatedRegionSummaryList;
export const PaginatedRegionSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(RegionSummary),
});

export type PaginatedStatSummaryList = __TypedOpenapi.Schemas.PaginatedStatSummaryList;
export const PaginatedStatSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(StatSummary),
});

export type PaginatedSuperContestEffectSummaryList =
  __TypedOpenapi.Schemas.PaginatedSuperContestEffectSummaryList;
export const PaginatedSuperContestEffectSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(SuperContestEffectSummary),
});

export type PaginatedTypeSummaryList = __TypedOpenapi.Schemas.PaginatedTypeSummaryList;
export const PaginatedTypeSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(TypeSummary),
});

export type PaginatedVersionGroupSummaryList =
  __TypedOpenapi.Schemas.PaginatedVersionGroupSummaryList;
export const PaginatedVersionGroupSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(VersionGroupSummary),
});

export type VersionSummary = __TypedOpenapi.Schemas.VersionSummary;
export const VersionSummary = z.object({ name: z.string().max(200), url: z.url() });

export type PaginatedVersionSummaryList = __TypedOpenapi.Schemas.PaginatedVersionSummaryList;
export const PaginatedVersionSummaryList = z.object({
  count: z.number().int(),
  next: z.url().nullable().optional(),
  previous: z.url().nullable().optional(),
  results: z.array(VersionSummary),
});

export type PalParkAreaName = __TypedOpenapi.Schemas.PalParkAreaName;
export const PalParkAreaName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type PalParkAreaDetail = __TypedOpenapi.Schemas.PalParkAreaDetail;
export const PalParkAreaDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  names: z.array(PalParkAreaName),
  pokemon_encounters: z.array(
    z.object({
      base_score: z.number().int(),
      "pokemon-species": z.object({ name: z.string(), url: z.url() }),
      rate: z.number().int(),
    }),
  ),
});

export type PokeathlonStatName = __TypedOpenapi.Schemas.PokeathlonStatName;
export const PokeathlonStatName = z.object({
  name: z.string().max(200),
  language: LanguageSummary,
});

export type PokeathlonStatDetail = __TypedOpenapi.Schemas.PokeathlonStatDetail;
export const PokeathlonStatDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  affecting_natures: z.object({
    decrease: z.array(
      z.object({
        max_change: z.number().int().max(-1),
        nature: z.object({ name: z.string(), url: z.url() }),
      }),
    ),
    increase: z.array(
      z.object({
        max_change: z.number().int().min(1),
        nature: z.object({ name: z.string(), url: z.url() }),
      }),
    ),
  }),
  names: z.array(PokeathlonStatName),
});

export type PokedexDescription = __TypedOpenapi.Schemas.PokedexDescription;
export const PokedexDescription = z.object({
  description: z.string().max(2000).optional(),
  language: LanguageSummary,
});

export type PokedexName = __TypedOpenapi.Schemas.PokedexName;
export const PokedexName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type PokedexDetail = __TypedOpenapi.Schemas.PokedexDetail;
export const PokedexDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  is_main_series: z.boolean().optional(),
  descriptions: z.array(PokedexDescription),
  names: z.array(PokedexName),
  pokemon_entries: z.array(
    z.object({
      entry_number: z.number().int(),
      pokemon_species: z.object({ name: z.string(), url: z.url() }),
    }),
  ),
  region: RegionSummary,
  version_groups: z.array(z.object({ name: z.string(), url: z.url() })),
});

export type PokemonColorName = __TypedOpenapi.Schemas.PokemonColorName;
export const PokemonColorName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type PokemonColorDetail = __TypedOpenapi.Schemas.PokemonColorDetail;
export const PokemonColorDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  names: z.array(PokemonColorName),
  pokemon_species: z.array(PokemonSpeciesSummary),
});

export type PokemonGameIndex = __TypedOpenapi.Schemas.PokemonGameIndex;
export const PokemonGameIndex = z.object({
  game_index: z.number().int().min(-2147483648).max(2147483647),
  version: VersionSummary,
});

export type PokemonStat = __TypedOpenapi.Schemas.PokemonStat;
export const PokemonStat = z.object({
  base_stat: z.number().int().min(-2147483648).max(2147483647),
  effort: z.number().int().min(-2147483648).max(2147483647),
  stat: StatSummary,
});

export type PokemonDetail = __TypedOpenapi.Schemas.PokemonDetail;
export const PokemonDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  base_experience: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  height: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  is_default: z.boolean().optional(),
  order: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  weight: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  abilities: z.array(
    z.object({
      ability: z.object({ name: z.string(), url: z.url() }),
      is_hidden: z.boolean(),
      slot: z.number().int(),
    }),
  ),
  past_abilities: z.array(
    z.object({
      abilities: z.array(
        z.object({
          ability: z.object({ name: z.string(), url: z.url() }),
          is_hidden: z.boolean(),
          slot: z.number().int(),
        }),
      ),
      generation: z.object({ name: z.string(), url: z.url() }),
    }),
  ),
  forms: z.array(PokemonFormSummary),
  game_indices: z.array(PokemonGameIndex),
  held_items: z.array(
    z.object({
      item: z.object({ name: z.string(), url: z.url() }),
      version_details: z.array(
        z.object({
          rarity: z.number().int(),
          version: z.object({ name: z.string(), url: z.url() }),
        }),
      ),
    }),
  ),
  location_area_encounters: z.string(),
  moves: z.array(
    z.object({
      move: z.object({ name: z.string(), url: z.url() }),
      version_group_details: z.array(
        z.object({
          level_learned_at: z.number().int(),
          move_learn_method: z.object({ name: z.string(), url: z.url() }),
          version_group: z.object({ name: z.string(), url: z.url() }),
        }),
      ),
    }),
  ),
  species: PokemonSpeciesSummary,
  sprites: z
    .object({ front_default: z.url() })
    .partial()
    .and(z.record(z.string(), z.url().nullable())),
  cries: z.object({ latest: z.url(), legacy: z.url() }),
  stats: z.array(PokemonStat),
  past_stats: z.array(
    z.object({
      generation: z.object({ name: z.string(), url: z.url() }),
      stats: z.array(
        z.object({
          base_stat: z.number().int(),
          effort: z.number().int(),
          stat: z.object({ name: z.string(), url: z.url() }),
        }),
      ),
    }),
  ),
  types: z.array(
    z.object({ slot: z.number().int(), type: z.object({ name: z.string(), url: z.url() }) }),
  ),
  past_types: z.array(
    z.object({
      generation: z.object({ name: z.string(), url: z.url() }),
      types: z.array(
        z.object({ slot: z.number().int(), type: z.object({ name: z.string(), url: z.url() }) }),
      ),
    }),
  ),
});

export type PokemonDexEntry = __TypedOpenapi.Schemas.PokemonDexEntry;
export const PokemonDexEntry = z.object({
  entry_number: z.number().int(),
  pokedex: PokedexSummary,
});

export type PokemonFormDetail = __TypedOpenapi.Schemas.PokemonFormDetail;
export const PokemonFormDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  order: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  form_order: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  is_default: z.boolean().optional(),
  is_battle_only: z.boolean().optional(),
  is_mega: z.boolean().optional(),
  form_name: z.string().max(30),
  pokemon: PokemonSummary,
  sprites: z.object({ default: z.url() }).partial().and(z.record(z.string(), z.url().nullable())),
  version_group: VersionGroupSummary,
  form_names: z.array(
    z.object({ language: z.object({ name: z.string(), url: z.url() }), name: z.string() }),
  ),
  names: z.array(
    z.object({ language: z.object({ name: z.string(), url: z.url() }), name: z.string() }),
  ),
  types: z.array(
    z.object({ slot: z.number().int(), type: z.object({ name: z.string(), url: z.url() }) }),
  ),
  trigger_conditions: z.array(z.object({ trigger: z.string(), name: z.string(), url: z.url() })),
});

export type PokemonHabitatName = __TypedOpenapi.Schemas.PokemonHabitatName;
export const PokemonHabitatName = z.object({
  name: z.string().max(200),
  language: LanguageSummary,
});

export type PokemonHabitatDetail = __TypedOpenapi.Schemas.PokemonHabitatDetail;
export const PokemonHabitatDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  names: z.array(PokemonHabitatName),
  pokemon_species: z.array(PokemonSpeciesSummary),
});

export type PokemonShapeDetail = __TypedOpenapi.Schemas.PokemonShapeDetail;
export const PokemonShapeDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  awesome_names: z.array(
    z.object({ awesome_name: z.string(), language: z.object({ name: z.string(), url: z.url() }) }),
  ),
  names: z.array(z.object({ url: z.url(), name: z.string() })),
  pokemon_species: z.array(PokemonSpeciesSummary),
});

export type PokemonSpeciesDescription = __TypedOpenapi.Schemas.PokemonSpeciesDescription;
export const PokemonSpeciesDescription = z.object({
  description: z.string().max(2000).optional(),
  language: LanguageSummary,
});

export type PokemonSpeciesFlavorText = __TypedOpenapi.Schemas.PokemonSpeciesFlavorText;
export const PokemonSpeciesFlavorText = z.object({
  flavor_text: z.string(),
  language: LanguageSummary,
  version: VersionSummary,
});

export type PokemonSpeciesDetail = __TypedOpenapi.Schemas.PokemonSpeciesDetail;
export const PokemonSpeciesDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  order: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  gender_rate: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  capture_rate: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  base_happiness: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  is_baby: z.boolean().optional(),
  is_legendary: z.boolean().optional(),
  is_mythical: z.boolean().optional(),
  hatch_counter: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  has_gender_differences: z.boolean().optional(),
  forms_switchable: z.boolean().optional(),
  growth_rate: GrowthRateSummary,
  pokedex_numbers: z.array(PokemonDexEntry),
  egg_groups: z.array(z.object({ name: z.string(), url: z.url() })),
  color: PokemonColorSummary,
  shape: PokemonShapeSummary,
  evolves_from_species: PokemonSpeciesSummary,
  evolution_chain: EvolutionChainSummary,
  habitat: PokemonHabitatSummary,
  generation: GenerationSummary,
  names: z.array(
    z.object({ language: z.object({ name: z.string(), url: z.url() }), name: z.string() }),
  ),
  pal_park_encounters: z.array(
    z.object({
      area: z.object({ name: z.string(), url: z.url() }),
      base_score: z.number().int(),
      rate: z.number().int(),
    }),
  ),
  form_descriptions: z.array(PokemonSpeciesDescription),
  flavor_text_entries: z.array(PokemonSpeciesFlavorText),
  genera: z.array(
    z.object({ genus: z.string(), language: z.object({ name: z.string(), url: z.url() }) }),
  ),
  varieties: z.array(
    z.object({ is_default: z.boolean(), pokemon: z.object({ name: z.string(), url: z.url() }) }),
  ),
});

export type RegionName = __TypedOpenapi.Schemas.RegionName;
export const RegionName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type RegionDetail = __TypedOpenapi.Schemas.RegionDetail;
export const RegionDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  locations: z.array(LocationSummary),
  main_generation: GenerationSummary.nullable(),
  names: z.array(RegionName),
  pokedexes: z.array(PokedexSummary),
  version_groups: z.array(z.object({ name: z.string(), url: z.url() })),
});

export type StatName = __TypedOpenapi.Schemas.StatName;
export const StatName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type StatDetail = __TypedOpenapi.Schemas.StatDetail;
export const StatDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  game_index: z.number().int().min(-2147483648).max(2147483647),
  is_battle_only: z.boolean().optional(),
  affecting_moves: z.object({
    increase: z.array(
      z.object({ change: z.number().int(), move: z.object({ name: z.string(), url: z.url() }) }),
    ),
    decrease: z.array(
      z.object({ change: z.number().int(), move: z.object({ name: z.string(), url: z.url() }) }),
    ),
  }),
  affecting_natures: z.object({
    increase: z.array(z.object({ name: z.string(), url: z.url() })),
    decrease: z.array(z.object({ name: z.string(), url: z.url() })),
  }),
  affecting_items: z.array(z.object({ name: z.string(), url: z.url() })),
  characteristics: z.array(CharacteristicSummary),
  move_damage_class: MoveDamageClassSummary,
  names: z.array(StatName),
});

export type SuperContestEffectFlavorText = __TypedOpenapi.Schemas.SuperContestEffectFlavorText;
export const SuperContestEffectFlavorText = z.object({
  flavor_text: z.string().max(500),
  language: LanguageSummary,
});

export type SuperContestEffectDetail = __TypedOpenapi.Schemas.SuperContestEffectDetail;
export const SuperContestEffectDetail = z.object({
  id: z.number().int(),
  appeal: z.number().int().min(-2147483648).max(2147483647),
  flavor_text_entries: z.array(SuperContestEffectFlavorText),
  moves: z.array(MoveSummary),
});

export type TypeGameIndex = __TypedOpenapi.Schemas.TypeGameIndex;
export const TypeGameIndex = z.object({
  game_index: z.number().int().min(-2147483648).max(2147483647),
  generation: GenerationSummary,
});

export type TypeDetail = __TypedOpenapi.Schemas.TypeDetail;
export const TypeDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  damage_relations: z.object({
    no_damage_to: z.array(z.object({ name: z.string(), url: z.url() })),
    half_damage_to: z.array(z.object({ name: z.string(), url: z.url() })),
    double_damage_to: z.array(z.object({ name: z.string(), url: z.url() })),
    no_damage_from: z.array(z.object({ name: z.string(), url: z.url() })),
    half_damage_from: z.array(z.object({ name: z.string(), url: z.url() })),
    double_damage_from: z.array(z.object({ name: z.string(), url: z.url() })),
  }),
  past_damage_relations: z.array(
    z.object({
      generation: z.object({ name: z.string(), url: z.url() }),
      damage_relations: z.object({
        no_damage_to: z.array(z.object({ name: z.string(), url: z.url() })),
        half_damage_to: z.array(z.object({ name: z.string(), url: z.url() })),
        double_damage_to: z.array(z.object({ name: z.string(), url: z.url() })),
        no_damage_from: z.array(z.object({ name: z.string(), url: z.url() })),
        half_damage_from: z.array(z.object({ name: z.string(), url: z.url() })),
        double_damage_from: z.array(z.object({ name: z.string(), url: z.url() })),
      }),
    }),
  ),
  game_indices: z.array(TypeGameIndex),
  generation: GenerationSummary,
  move_damage_class: MoveDamageClassSummary,
  names: z.array(AbilityName),
  pokemon: z.array(
    z.object({
      slot: z.number().int().optional(),
      pokemon: z.object({ name: z.string(), url: z.url() }).partial().optional(),
    }),
  ),
  moves: z.array(MoveSummary),
  sprites: z.record(z.string(), z.record(z.string(), z.object({ "name-icon": z.url() }).partial())),
});

export type VersionName = __TypedOpenapi.Schemas.VersionName;
export const VersionName = z.object({ name: z.string().max(200), language: LanguageSummary });

export type VersionDetail = __TypedOpenapi.Schemas.VersionDetail;
export const VersionDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  names: z.array(VersionName),
  version_group: VersionGroupSummary,
});

export type VersionGroupDetail = __TypedOpenapi.Schemas.VersionGroupDetail;
export const VersionGroupDetail = z.object({
  id: z.number().int(),
  name: z.string().max(200),
  order: z.number().int().min(-2147483648).max(2147483647).nullable().optional(),
  generation: GenerationSummary,
  move_learn_methods: z.array(z.object({ name: z.string(), url: z.url() })),
  pokedexes: z.array(z.object({ name: z.string(), url: z.url() })),
  regions: z.array(z.object({ name: z.string(), url: z.url() })),
  versions: z.array(VersionSummary),
});

// </Schemas>

// <Endpoints>
export type get_Meta_retrieve = __TypedOpenapi.Endpoints.get_Meta_retrieve;
export const get_Meta_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/meta/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: z.never(),
  responses: {
    200: z
      .object({
        deploy_date: z.string().nullable(),
        hash: z.string().nullable(),
        tag: z.string().nullable(),
      })
      .partial(),
  },
};

export type get_Ability_list = __TypedOpenapi.Endpoints.get_Ability_list;
export const get_Ability_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/ability/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedAbilitySummaryList },
};

export type get_Ability_retrieve = __TypedOpenapi.Endpoints.get_Ability_retrieve;
export const get_Ability_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/ability/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: AbilityDetail },
};

export type get_Berry_list = __TypedOpenapi.Endpoints.get_Berry_list;
export const get_Berry_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/berry/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedBerrySummaryList },
};

export type get_Berry_retrieve = __TypedOpenapi.Endpoints.get_Berry_retrieve;
export const get_Berry_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/berry/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: BerryDetail },
};

export type get_Berry_firmness_list = __TypedOpenapi.Endpoints.get_Berry_firmness_list;
export const get_Berry_firmness_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/berry-firmness/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedBerryFirmnessSummaryList },
};

export type get_Berry_firmness_retrieve = __TypedOpenapi.Endpoints.get_Berry_firmness_retrieve;
export const get_Berry_firmness_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/berry-firmness/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: BerryFirmnessDetail },
};

export type get_Berry_flavor_list = __TypedOpenapi.Endpoints.get_Berry_flavor_list;
export const get_Berry_flavor_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/berry-flavor/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedBerryFlavorSummaryList },
};

export type get_Berry_flavor_retrieve = __TypedOpenapi.Endpoints.get_Berry_flavor_retrieve;
export const get_Berry_flavor_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/berry-flavor/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: BerryFlavorDetail },
};

export type get_Characteristic_list = __TypedOpenapi.Endpoints.get_Characteristic_list;
export const get_Characteristic_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/characteristic/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedCharacteristicSummaryList },
};

export type get_Characteristic_retrieve = __TypedOpenapi.Endpoints.get_Characteristic_retrieve;
export const get_Characteristic_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/characteristic/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: CharacteristicDetail },
};

export type get_Contest_type_list = __TypedOpenapi.Endpoints.get_Contest_type_list;
export const get_Contest_type_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/contest-type/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedContestTypeSummaryList },
};

export type get_Contest_type_retrieve = __TypedOpenapi.Endpoints.get_Contest_type_retrieve;
export const get_Contest_type_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/contest-type/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: ContestTypeDetail },
};

export type get_Contest_effect_list = __TypedOpenapi.Endpoints.get_Contest_effect_list;
export const get_Contest_effect_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/contest-effect/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedContestEffectSummaryList },
};

export type get_Contest_effect_retrieve = __TypedOpenapi.Endpoints.get_Contest_effect_retrieve;
export const get_Contest_effect_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/contest-effect/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: ContestEffectDetail },
};

export type get_Egg_group_list = __TypedOpenapi.Endpoints.get_Egg_group_list;
export const get_Egg_group_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/egg-group/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedEggGroupSummaryList },
};

export type get_Egg_group_retrieve = __TypedOpenapi.Endpoints.get_Egg_group_retrieve;
export const get_Egg_group_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/egg-group/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: EggGroupDetail },
};

export type get_Encounter_method_list = __TypedOpenapi.Endpoints.get_Encounter_method_list;
export const get_Encounter_method_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/encounter-method/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedEncounterMethodSummaryList },
};

export type get_Encounter_method_retrieve = __TypedOpenapi.Endpoints.get_Encounter_method_retrieve;
export const get_Encounter_method_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/encounter-method/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: EncounterMethodDetail },
};

export type get_Encounter_condition_list = __TypedOpenapi.Endpoints.get_Encounter_condition_list;
export const get_Encounter_condition_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/encounter-condition/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedEncounterConditionSummaryList },
};

export type get_Encounter_condition_retrieve =
  __TypedOpenapi.Endpoints.get_Encounter_condition_retrieve;
export const get_Encounter_condition_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/encounter-condition/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: EncounterConditionDetail },
};

export type get_Encounter_condition_value_list =
  __TypedOpenapi.Endpoints.get_Encounter_condition_value_list;
export const get_Encounter_condition_value_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/encounter-condition-value/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedEncounterConditionValueSummaryList },
};

export type get_Encounter_condition_value_retrieve =
  __TypedOpenapi.Endpoints.get_Encounter_condition_value_retrieve;
export const get_Encounter_condition_value_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/encounter-condition-value/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: EncounterConditionValueDetail },
};

export type get_Evolution_chain_list = __TypedOpenapi.Endpoints.get_Evolution_chain_list;
export const get_Evolution_chain_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/evolution-chain/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedEvolutionChainSummaryList },
};

export type get_Evolution_chain_retrieve = __TypedOpenapi.Endpoints.get_Evolution_chain_retrieve;
export const get_Evolution_chain_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/evolution-chain/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: EvolutionChainDetail },
};

export type get_Evolution_trigger_list = __TypedOpenapi.Endpoints.get_Evolution_trigger_list;
export const get_Evolution_trigger_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/evolution-trigger/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedEvolutionTriggerSummaryList },
};

export type get_Evolution_trigger_retrieve =
  __TypedOpenapi.Endpoints.get_Evolution_trigger_retrieve;
export const get_Evolution_trigger_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/evolution-trigger/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: EvolutionTriggerDetail },
};

export type get_Generation_list = __TypedOpenapi.Endpoints.get_Generation_list;
export const get_Generation_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/generation/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedGenerationSummaryList },
};

export type get_Generation_retrieve = __TypedOpenapi.Endpoints.get_Generation_retrieve;
export const get_Generation_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/generation/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: GenerationDetail },
};

export type get_Gender_list = __TypedOpenapi.Endpoints.get_Gender_list;
export const get_Gender_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/gender/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedGenderSummaryList },
};

export type get_Gender_retrieve = __TypedOpenapi.Endpoints.get_Gender_retrieve;
export const get_Gender_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/gender/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: GenderDetail },
};

export type get_Growth_rate_list = __TypedOpenapi.Endpoints.get_Growth_rate_list;
export const get_Growth_rate_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/growth-rate/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedGrowthRateSummaryList },
};

export type get_Growth_rate_retrieve = __TypedOpenapi.Endpoints.get_Growth_rate_retrieve;
export const get_Growth_rate_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/growth-rate/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: GrowthRateDetail },
};

export type get_Item_list = __TypedOpenapi.Endpoints.get_Item_list;
export const get_Item_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/item/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedItemSummaryList },
};

export type get_Item_retrieve = __TypedOpenapi.Endpoints.get_Item_retrieve;
export const get_Item_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/item/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: ItemDetail },
};

export type get_Item_category_list = __TypedOpenapi.Endpoints.get_Item_category_list;
export const get_Item_category_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/item-category/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedItemCategorySummaryList },
};

export type get_Item_category_retrieve = __TypedOpenapi.Endpoints.get_Item_category_retrieve;
export const get_Item_category_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/item-category/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: ItemCategoryDetail },
};

export type get_Item_attribute_list = __TypedOpenapi.Endpoints.get_Item_attribute_list;
export const get_Item_attribute_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/item-attribute/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedItemAttributeSummaryList },
};

export type get_Item_attribute_retrieve = __TypedOpenapi.Endpoints.get_Item_attribute_retrieve;
export const get_Item_attribute_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/item-attribute/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: ItemAttributeDetail },
};

export type get_Item_fling_effect_list = __TypedOpenapi.Endpoints.get_Item_fling_effect_list;
export const get_Item_fling_effect_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/item-fling-effect/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedItemFlingEffectSummaryList },
};

export type get_Item_fling_effect_retrieve =
  __TypedOpenapi.Endpoints.get_Item_fling_effect_retrieve;
export const get_Item_fling_effect_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/item-fling-effect/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: ItemFlingEffectDetail },
};

export type get_Item_pocket_list = __TypedOpenapi.Endpoints.get_Item_pocket_list;
export const get_Item_pocket_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/item-pocket/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedItemPocketSummaryList },
};

export type get_Item_pocket_retrieve = __TypedOpenapi.Endpoints.get_Item_pocket_retrieve;
export const get_Item_pocket_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/item-pocket/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: ItemPocketDetail },
};

export type get_Language_list = __TypedOpenapi.Endpoints.get_Language_list;
export const get_Language_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/language/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedLanguageSummaryList },
};

export type get_Language_retrieve = __TypedOpenapi.Endpoints.get_Language_retrieve;
export const get_Language_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/language/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: LanguageDetail },
};

export type get_Location_list = __TypedOpenapi.Endpoints.get_Location_list;
export const get_Location_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/location/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedLocationSummaryList },
};

export type get_Location_retrieve = __TypedOpenapi.Endpoints.get_Location_retrieve;
export const get_Location_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/location/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: LocationDetail },
};

export type get_Location_area_list = __TypedOpenapi.Endpoints.get_Location_area_list;
export const get_Location_area_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/location-area/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedLocationAreaSummaryList },
};

export type get_Location_area_retrieve = __TypedOpenapi.Endpoints.get_Location_area_retrieve;
export const get_Location_area_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/location-area/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.coerce.number().int() }) },
  responses: { 200: LocationAreaDetail },
};

export type get_Machine_list = __TypedOpenapi.Endpoints.get_Machine_list;
export const get_Machine_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/machine/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedMachineSummaryList },
};

export type get_Machine_retrieve = __TypedOpenapi.Endpoints.get_Machine_retrieve;
export const get_Machine_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/machine/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: MachineDetail },
};

export type get_Move_list = __TypedOpenapi.Endpoints.get_Move_list;
export const get_Move_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedMoveSummaryList },
};

export type get_Move_retrieve = __TypedOpenapi.Endpoints.get_Move_retrieve;
export const get_Move_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: MoveDetail },
};

export type get_Move_ailment_list = __TypedOpenapi.Endpoints.get_Move_ailment_list;
export const get_Move_ailment_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move-ailment/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedMoveMetaAilmentSummaryList },
};

export type get_Move_ailment_retrieve = __TypedOpenapi.Endpoints.get_Move_ailment_retrieve;
export const get_Move_ailment_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move-ailment/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: MoveMetaAilmentDetail },
};

export type get_Move_battle_style_list = __TypedOpenapi.Endpoints.get_Move_battle_style_list;
export const get_Move_battle_style_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move-battle-style/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedMoveBattleStyleSummaryList },
};

export type get_Move_battle_style_retrieve =
  __TypedOpenapi.Endpoints.get_Move_battle_style_retrieve;
export const get_Move_battle_style_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move-battle-style/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: MoveBattleStyleDetail },
};

export type get_Move_category_list = __TypedOpenapi.Endpoints.get_Move_category_list;
export const get_Move_category_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move-category/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedMoveMetaCategorySummaryList },
};

export type get_Move_category_retrieve = __TypedOpenapi.Endpoints.get_Move_category_retrieve;
export const get_Move_category_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move-category/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: MoveMetaCategoryDetail },
};

export type get_Move_damage_class_list = __TypedOpenapi.Endpoints.get_Move_damage_class_list;
export const get_Move_damage_class_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move-damage-class/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedMoveDamageClassSummaryList },
};

export type get_Move_damage_class_retrieve =
  __TypedOpenapi.Endpoints.get_Move_damage_class_retrieve;
export const get_Move_damage_class_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move-damage-class/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: MoveDamageClassDetail },
};

export type get_Move_learn_method_list = __TypedOpenapi.Endpoints.get_Move_learn_method_list;
export const get_Move_learn_method_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move-learn-method/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedMoveLearnMethodSummaryList },
};

export type get_Move_learn_method_retrieve =
  __TypedOpenapi.Endpoints.get_Move_learn_method_retrieve;
export const get_Move_learn_method_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move-learn-method/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: MoveLearnMethodDetail },
};

export type get_Move_target_list = __TypedOpenapi.Endpoints.get_Move_target_list;
export const get_Move_target_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move-target/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedMoveTargetSummaryList },
};

export type get_Move_target_retrieve = __TypedOpenapi.Endpoints.get_Move_target_retrieve;
export const get_Move_target_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/move-target/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: MoveTargetDetail },
};

export type get_Nature_list = __TypedOpenapi.Endpoints.get_Nature_list;
export const get_Nature_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/nature/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedNatureSummaryList },
};

export type get_Nature_retrieve = __TypedOpenapi.Endpoints.get_Nature_retrieve;
export const get_Nature_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/nature/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: NatureDetail },
};

export type get_Pal_park_area_list = __TypedOpenapi.Endpoints.get_Pal_park_area_list;
export const get_Pal_park_area_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pal-park-area/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedPalParkAreaSummaryList },
};

export type get_Pal_park_area_retrieve = __TypedOpenapi.Endpoints.get_Pal_park_area_retrieve;
export const get_Pal_park_area_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pal-park-area/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: PalParkAreaDetail },
};

export type get_Pokedex_list = __TypedOpenapi.Endpoints.get_Pokedex_list;
export const get_Pokedex_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokedex/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedPokedexSummaryList },
};

export type get_Pokedex_retrieve = __TypedOpenapi.Endpoints.get_Pokedex_retrieve;
export const get_Pokedex_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokedex/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: PokedexDetail },
};

export type get_Pokemon_list = __TypedOpenapi.Endpoints.get_Pokemon_list;
export const get_Pokemon_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokemon/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedPokemonSummaryList },
};

export type get_Pokemon_retrieve = __TypedOpenapi.Endpoints.get_Pokemon_retrieve;
export const get_Pokemon_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokemon/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: PokemonDetail },
};

export type get_Pokemon_color_list = __TypedOpenapi.Endpoints.get_Pokemon_color_list;
export const get_Pokemon_color_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokemon-color/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedPokemonColorSummaryList },
};

export type get_Pokemon_color_retrieve = __TypedOpenapi.Endpoints.get_Pokemon_color_retrieve;
export const get_Pokemon_color_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokemon-color/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: PokemonColorDetail },
};

export type get_Pokemon_form_list = __TypedOpenapi.Endpoints.get_Pokemon_form_list;
export const get_Pokemon_form_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokemon-form/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedPokemonFormSummaryList },
};

export type get_Pokemon_form_retrieve = __TypedOpenapi.Endpoints.get_Pokemon_form_retrieve;
export const get_Pokemon_form_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokemon-form/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: PokemonFormDetail },
};

export type get_Pokemon_habitat_list = __TypedOpenapi.Endpoints.get_Pokemon_habitat_list;
export const get_Pokemon_habitat_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokemon-habitat/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedPokemonHabitatSummaryList },
};

export type get_Pokemon_habitat_retrieve = __TypedOpenapi.Endpoints.get_Pokemon_habitat_retrieve;
export const get_Pokemon_habitat_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokemon-habitat/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: PokemonHabitatDetail },
};

export type get_Pokemon_shape_list = __TypedOpenapi.Endpoints.get_Pokemon_shape_list;
export const get_Pokemon_shape_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokemon-shape/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedPokemonShapeSummaryList },
};

export type get_Pokemon_shape_retrieve = __TypedOpenapi.Endpoints.get_Pokemon_shape_retrieve;
export const get_Pokemon_shape_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokemon-shape/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: PokemonShapeDetail },
};

export type get_Pokemon_species_list = __TypedOpenapi.Endpoints.get_Pokemon_species_list;
export const get_Pokemon_species_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokemon-species/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedPokemonSpeciesSummaryList },
};

export type get_Pokemon_species_retrieve = __TypedOpenapi.Endpoints.get_Pokemon_species_retrieve;
export const get_Pokemon_species_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokemon-species/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: PokemonSpeciesDetail },
};

export type get_Pokeathlon_stat_list = __TypedOpenapi.Endpoints.get_Pokeathlon_stat_list;
export const get_Pokeathlon_stat_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokeathlon-stat/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedPokeathlonStatSummaryList },
};

export type get_Pokeathlon_stat_retrieve = __TypedOpenapi.Endpoints.get_Pokeathlon_stat_retrieve;
export const get_Pokeathlon_stat_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokeathlon-stat/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: PokeathlonStatDetail },
};

export type get_Region_list = __TypedOpenapi.Endpoints.get_Region_list;
export const get_Region_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/region/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedRegionSummaryList },
};

export type get_Region_retrieve = __TypedOpenapi.Endpoints.get_Region_retrieve;
export const get_Region_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/region/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: RegionDetail },
};

export type get_Stat_list = __TypedOpenapi.Endpoints.get_Stat_list;
export const get_Stat_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/stat/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedStatSummaryList },
};

export type get_Stat_retrieve = __TypedOpenapi.Endpoints.get_Stat_retrieve;
export const get_Stat_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/stat/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: StatDetail },
};

export type get_Super_contest_effect_list = __TypedOpenapi.Endpoints.get_Super_contest_effect_list;
export const get_Super_contest_effect_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/super-contest-effect/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedSuperContestEffectSummaryList },
};

export type get_Super_contest_effect_retrieve =
  __TypedOpenapi.Endpoints.get_Super_contest_effect_retrieve;
export const get_Super_contest_effect_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/super-contest-effect/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: SuperContestEffectDetail },
};

export type get_Type_list = __TypedOpenapi.Endpoints.get_Type_list;
export const get_Type_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/type/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedTypeSummaryList },
};

export type get_Type_retrieve = __TypedOpenapi.Endpoints.get_Type_retrieve;
export const get_Type_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/type/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: TypeDetail },
};

export type get_Version_list = __TypedOpenapi.Endpoints.get_Version_list;
export const get_Version_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/version/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedVersionSummaryList },
};

export type get_Version_retrieve = __TypedOpenapi.Endpoints.get_Version_retrieve;
export const get_Version_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/version/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: VersionDetail },
};

export type get_Version_group_list = __TypedOpenapi.Endpoints.get_Version_group_list;
export const get_Version_group_list = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/version-group/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: {
    query: z
      .object({ limit: z.coerce.number().int(), offset: z.coerce.number().int(), q: z.string() })
      .partial()
      .optional(),
  },
  responses: { 200: PaginatedVersionGroupSummaryList },
};

export type get_Version_group_retrieve = __TypedOpenapi.Endpoints.get_Version_group_retrieve;
export const get_Version_group_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/version-group/{id}/"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ id: z.string() }) },
  responses: { 200: VersionGroupDetail },
};

export type get_Pokemon_encounters_retrieve =
  __TypedOpenapi.Endpoints.get_Pokemon_encounters_retrieve;
export const get_Pokemon_encounters_retrieve = {
  method: z.literal("GET"),
  path: z.literal("/api/v2/pokemon/{pokemon_id}/encounters"),
  requestFormat: z.literal("json"),
  responseFormat: z.literal("json"),
  parameters: { path: z.object({ pokemon_id: z.string().regex(new RegExp("^\\d+$")) }) },
  responses: {
    200: z.array(
      z.object({
        location_area: z.object({ name: z.string(), url: z.url() }),
        version_details: z.array(
          z.object({
            encounter_details: z.array(
              z.object({
                chance: z.number(),
                condition_values: z.array(z.object({ name: z.string(), url: z.url() })),
                max_level: z.number(),
                method: z.object({ name: z.string(), url: z.url() }),
                min_level: z.number(),
              }),
            ),
            max_chance: z.number(),
            version: z.object({ name: z.string(), url: z.url() }),
          }),
        ),
      }),
    ),
  },
};

// </Endpoints>

// <EndpointByMethod>
export const EndpointByMethod: __TypedOpenapi.EndpointByMethod = {
  get: {
    "/api/v2/meta/": get_Meta_retrieve as any,
    "/api/v2/ability/": get_Ability_list as any,
    "/api/v2/ability/{id}/": get_Ability_retrieve as any,
    "/api/v2/berry/": get_Berry_list as any,
    "/api/v2/berry/{id}/": get_Berry_retrieve as any,
    "/api/v2/berry-firmness/": get_Berry_firmness_list as any,
    "/api/v2/berry-firmness/{id}/": get_Berry_firmness_retrieve as any,
    "/api/v2/berry-flavor/": get_Berry_flavor_list as any,
    "/api/v2/berry-flavor/{id}/": get_Berry_flavor_retrieve as any,
    "/api/v2/characteristic/": get_Characteristic_list as any,
    "/api/v2/characteristic/{id}/": get_Characteristic_retrieve as any,
    "/api/v2/contest-type/": get_Contest_type_list as any,
    "/api/v2/contest-type/{id}/": get_Contest_type_retrieve as any,
    "/api/v2/contest-effect/": get_Contest_effect_list as any,
    "/api/v2/contest-effect/{id}/": get_Contest_effect_retrieve as any,
    "/api/v2/egg-group/": get_Egg_group_list as any,
    "/api/v2/egg-group/{id}/": get_Egg_group_retrieve as any,
    "/api/v2/encounter-method/": get_Encounter_method_list as any,
    "/api/v2/encounter-method/{id}/": get_Encounter_method_retrieve as any,
    "/api/v2/encounter-condition/": get_Encounter_condition_list as any,
    "/api/v2/encounter-condition/{id}/": get_Encounter_condition_retrieve as any,
    "/api/v2/encounter-condition-value/": get_Encounter_condition_value_list as any,
    "/api/v2/encounter-condition-value/{id}/": get_Encounter_condition_value_retrieve as any,
    "/api/v2/evolution-chain/": get_Evolution_chain_list as any,
    "/api/v2/evolution-chain/{id}/": get_Evolution_chain_retrieve as any,
    "/api/v2/evolution-trigger/": get_Evolution_trigger_list as any,
    "/api/v2/evolution-trigger/{id}/": get_Evolution_trigger_retrieve as any,
    "/api/v2/generation/": get_Generation_list as any,
    "/api/v2/generation/{id}/": get_Generation_retrieve as any,
    "/api/v2/gender/": get_Gender_list as any,
    "/api/v2/gender/{id}/": get_Gender_retrieve as any,
    "/api/v2/growth-rate/": get_Growth_rate_list as any,
    "/api/v2/growth-rate/{id}/": get_Growth_rate_retrieve as any,
    "/api/v2/item/": get_Item_list as any,
    "/api/v2/item/{id}/": get_Item_retrieve as any,
    "/api/v2/item-category/": get_Item_category_list as any,
    "/api/v2/item-category/{id}/": get_Item_category_retrieve as any,
    "/api/v2/item-attribute/": get_Item_attribute_list as any,
    "/api/v2/item-attribute/{id}/": get_Item_attribute_retrieve as any,
    "/api/v2/item-fling-effect/": get_Item_fling_effect_list as any,
    "/api/v2/item-fling-effect/{id}/": get_Item_fling_effect_retrieve as any,
    "/api/v2/item-pocket/": get_Item_pocket_list as any,
    "/api/v2/item-pocket/{id}/": get_Item_pocket_retrieve as any,
    "/api/v2/language/": get_Language_list as any,
    "/api/v2/language/{id}/": get_Language_retrieve as any,
    "/api/v2/location/": get_Location_list as any,
    "/api/v2/location/{id}/": get_Location_retrieve as any,
    "/api/v2/location-area/": get_Location_area_list as any,
    "/api/v2/location-area/{id}/": get_Location_area_retrieve as any,
    "/api/v2/machine/": get_Machine_list as any,
    "/api/v2/machine/{id}/": get_Machine_retrieve as any,
    "/api/v2/move/": get_Move_list as any,
    "/api/v2/move/{id}/": get_Move_retrieve as any,
    "/api/v2/move-ailment/": get_Move_ailment_list as any,
    "/api/v2/move-ailment/{id}/": get_Move_ailment_retrieve as any,
    "/api/v2/move-battle-style/": get_Move_battle_style_list as any,
    "/api/v2/move-battle-style/{id}/": get_Move_battle_style_retrieve as any,
    "/api/v2/move-category/": get_Move_category_list as any,
    "/api/v2/move-category/{id}/": get_Move_category_retrieve as any,
    "/api/v2/move-damage-class/": get_Move_damage_class_list as any,
    "/api/v2/move-damage-class/{id}/": get_Move_damage_class_retrieve as any,
    "/api/v2/move-learn-method/": get_Move_learn_method_list as any,
    "/api/v2/move-learn-method/{id}/": get_Move_learn_method_retrieve as any,
    "/api/v2/move-target/": get_Move_target_list as any,
    "/api/v2/move-target/{id}/": get_Move_target_retrieve as any,
    "/api/v2/nature/": get_Nature_list as any,
    "/api/v2/nature/{id}/": get_Nature_retrieve as any,
    "/api/v2/pal-park-area/": get_Pal_park_area_list as any,
    "/api/v2/pal-park-area/{id}/": get_Pal_park_area_retrieve as any,
    "/api/v2/pokedex/": get_Pokedex_list as any,
    "/api/v2/pokedex/{id}/": get_Pokedex_retrieve as any,
    "/api/v2/pokemon/": get_Pokemon_list as any,
    "/api/v2/pokemon/{id}/": get_Pokemon_retrieve as any,
    "/api/v2/pokemon-color/": get_Pokemon_color_list as any,
    "/api/v2/pokemon-color/{id}/": get_Pokemon_color_retrieve as any,
    "/api/v2/pokemon-form/": get_Pokemon_form_list as any,
    "/api/v2/pokemon-form/{id}/": get_Pokemon_form_retrieve as any,
    "/api/v2/pokemon-habitat/": get_Pokemon_habitat_list as any,
    "/api/v2/pokemon-habitat/{id}/": get_Pokemon_habitat_retrieve as any,
    "/api/v2/pokemon-shape/": get_Pokemon_shape_list as any,
    "/api/v2/pokemon-shape/{id}/": get_Pokemon_shape_retrieve as any,
    "/api/v2/pokemon-species/": get_Pokemon_species_list as any,
    "/api/v2/pokemon-species/{id}/": get_Pokemon_species_retrieve as any,
    "/api/v2/pokeathlon-stat/": get_Pokeathlon_stat_list as any,
    "/api/v2/pokeathlon-stat/{id}/": get_Pokeathlon_stat_retrieve as any,
    "/api/v2/region/": get_Region_list as any,
    "/api/v2/region/{id}/": get_Region_retrieve as any,
    "/api/v2/stat/": get_Stat_list as any,
    "/api/v2/stat/{id}/": get_Stat_retrieve as any,
    "/api/v2/super-contest-effect/": get_Super_contest_effect_list as any,
    "/api/v2/super-contest-effect/{id}/": get_Super_contest_effect_retrieve as any,
    "/api/v2/type/": get_Type_list as any,
    "/api/v2/type/{id}/": get_Type_retrieve as any,
    "/api/v2/version/": get_Version_list as any,
    "/api/v2/version/{id}/": get_Version_retrieve as any,
    "/api/v2/version-group/": get_Version_group_list as any,
    "/api/v2/version-group/{id}/": get_Version_group_retrieve as any,
    "/api/v2/pokemon/{pokemon_id}/encounters": get_Pokemon_encounters_retrieve as any,
  },
};
export type EndpointByMethod = __TypedOpenapi.EndpointByMethod;
// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type GetEndpoints = EndpointByMethod["get"];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export type EndpointParameters = {
  body?: unknown;
  query?: unknown;
  header?: unknown;
  path?: unknown;
  cookie?: unknown;
};

export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | "head" | "options" | MutationMethod;

export type RequestFormat = "json" | "form-data" | "form-url" | "binary" | "text";
export type ResponseFormat = "json" | "sse";
export type SecurityRequirements = readonly (readonly string[])[];

// <EndpointRequestFormats>
/** Non-json request body encodings; missing entries default to `"json"`. */
export const endpointRequestFormats = {} as Partial<{
  [M in keyof EndpointByMethod]: Partial<{ [P in keyof EndpointByMethod[M]]: RequestFormat }>;
}>;
// </EndpointRequestFormats>

// <EndpointResponseFormats>
/** Non-json response body modes; missing entries default to `"json"`. SSE skips JSON parse + output validation. */
export const endpointResponseFormats = {} as Partial<{
  [M in keyof EndpointByMethod]: Partial<{ [P in keyof EndpointByMethod[M]]: ResponseFormat }>;
}>;
// </EndpointResponseFormats>

// <EndpointSecurityRequirements>
/** OpenAPI security requirements applied when an endpoint has no explicit entry. */
export const defaultSecurityRequirements = [[]] as SecurityRequirements;
/** Endpoint-specific security requirements that differ from the default. */
export const endpointSecurityRequirements = {} as Partial<{
  [M in keyof EndpointByMethod]: Partial<{
    [P in keyof EndpointByMethod[M]]: SecurityRequirements;
  }>;
}>;
// </EndpointSecurityRequirements>

export type DefaultEndpoint = {
  parameters?: EndpointParameters | undefined;
  responses?: Record<string, unknown>;
  responseHeaders?: Record<string, unknown>;
};

export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
  operationId: string;
  method: Method;
  path: string;
  requestFormat: RequestFormat;
  responseFormat: ResponseFormat;
  parameters?: TConfig["parameters"];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  responses?: TConfig["responses"];
  responseHeaders?: TConfig["responseHeaders"];
};

/**
 * Minimal response surface used by ApiClient — avoids depending on the DOM `Response`
 * global (helpful for Node without DOM lib). Structural typing accepts fetch Response.
 */
export interface FetcherResponse {
  ok: boolean;
  status: number;
  statusText: string;
  headers: {
    get(name: string): string | null;
    getSetCookie?: () => string[];
  };
  /** Present on fetch Response; used for SSE / streaming bodies. */
  body?: ReadableStream<Uint8Array> | null;
  json(): Promise<unknown>;
  text(): Promise<string>;
  arrayBuffer(): Promise<ArrayBuffer>;
  clone(): FetcherResponse;
}

export interface Fetcher {
  decodePathParams?: (path: string, pathParams: unknown) => string;
  encodeSearchParams?: (searchParams: unknown) => URLSearchParams | undefined;
  /** Merge cookie params into request headers (default: Cookie header). */
  encodeCookies?: (cookies: unknown, headers: Headers) => void;
  //
  fetch: (input: {
    method: Method;
    url: URL;
    urlSearchParams?: URLSearchParams | undefined;
    parameters?: EndpointParameters | undefined;
    path: string;
    /** How to encode `parameters.body` (from OpenAPI requestBody content type). */
    requestFormat: RequestFormat;
    /** OpenAPI security requirements for this operation. Empty means no credentials are required. */
    security?: SecurityRequirements;
    overrides?: RequestInit;
    throwOnStatusError?: boolean;
  }) => Promise<FetcherResponse>;
  parseResponseData?: (response: FetcherResponse) => Promise<unknown>;
}

export const successStatusCodes = [
  200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308,
] as const;
export type SuccessStatusCode = (typeof successStatusCodes)[number];

export const errorStatusCodes = [
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
  421, 422, 423, 424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508,
  510, 511,
] as const;
export type ErrorStatusCode = (typeof errorStatusCodes)[number];

// Taken from https://github.com/unjs/fetchdts/blob/ec4eaeab5d287116171fc1efd61f4a1ad34e4609/src/fetch.ts#L3
export interface TypedHeaders<
  TypedHeaderValues extends Record<string, string> | unknown,
> extends Omit<Headers, "append" | "delete" | "get" | "getSetCookie" | "has" | "set" | "forEach"> {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/append) */
  append: <Name extends Extract<keyof TypedHeaderValues, string> | (string & {})>(
    name: Name,
    value: Lowercase<Name> extends keyof TypedHeaderValues
      ? TypedHeaderValues[Lowercase<Name>]
      : string,
  ) => void;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/delete) */
  delete: <Name extends Extract<keyof TypedHeaderValues, string> | (string & {})>(
    name: Name,
  ) => void;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/get) */
  get: <Name extends Extract<keyof TypedHeaderValues, string> | (string & {})>(
    name: Name,
  ) =>
    | (Lowercase<Name> extends keyof TypedHeaderValues
        ? TypedHeaderValues[Lowercase<Name>]
        : string)
    | null;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/getSetCookie) */
  getSetCookie: () => string[];
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/has) */
  has: <Name extends Extract<keyof TypedHeaderValues, string> | (string & {})>(
    name: Name,
  ) => boolean;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/set) */
  set: <Name extends Extract<keyof TypedHeaderValues, string> | (string & {})>(
    name: Name,
    value: Lowercase<Name> extends keyof TypedHeaderValues
      ? TypedHeaderValues[Lowercase<Name>]
      : string,
  ) => void;
  forEach: (
    callbackfn: (
      value: TypedHeaderValues[keyof TypedHeaderValues] | (string & {}),
      key: Extract<keyof TypedHeaderValues, string> | (string & {}),
      parent: TypedHeaders<TypedHeaderValues>,
    ) => void,
    thisArg?: any,
  ) => void;
}

/** @see https://developer.mozilla.org/en-US/docs/Web/API/Response */
export interface TypedSuccessResponse<TSuccess, TStatusCode, THeaders> extends Omit<
  FetcherResponse,
  "ok" | "status" | "json" | "headers"
> {
  ok: true;
  status: TStatusCode;
  headers: never extends THeaders ? FetcherResponse["headers"] : TypedHeaders<THeaders>;
  data: TSuccess;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) */
  json: () => Promise<TSuccess>;
}

/** @see https://developer.mozilla.org/en-US/docs/Web/API/Response */
export interface TypedErrorResponse<TData, TStatusCode, THeaders> extends Omit<
  FetcherResponse,
  "ok" | "status" | "json" | "headers"
> {
  ok: false;
  status: TStatusCode;
  headers: never extends THeaders ? FetcherResponse["headers"] : TypedHeaders<THeaders>;
  data: TData;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) */
  json: () => Promise<TData>;
}

export type TypedApiResponse<TAllResponses = {}, THeaders = {}> = {
  [K in keyof TAllResponses]: K extends string
    ? K extends `${infer TStatusCode extends number}`
      ? TStatusCode extends SuccessStatusCode
        ? TypedSuccessResponse<
            TAllResponses[K],
            TStatusCode,
            K extends keyof THeaders ? THeaders[K] : never
          >
        : TypedErrorResponse<
            TAllResponses[K],
            TStatusCode,
            K extends keyof THeaders ? THeaders[K] : never
          >
      : never
    : K extends number
      ? K extends SuccessStatusCode
        ? TypedSuccessResponse<TAllResponses[K], K, K extends keyof THeaders ? THeaders[K] : never>
        : TypedErrorResponse<TAllResponses[K], K, K extends keyof THeaders ? THeaders[K] : never>
      : never;
}[keyof TAllResponses];

type __TypedOpenapiSchema<TOutput, TInput = TOutput> = {
  readonly __typedOpenapiOutput?: TOutput;
  readonly __typedOpenapiInput?: TInput;
};
type OptionalUndefinedKeys<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
} & {
  [K in keyof T as undefined extends T[K] ? K : never]?: Exclude<T[K], undefined>;
};
type InferSchemaValue<T> =
  T extends __TypedOpenapiSchema<infer O>
    ? O
    : T extends z.ZodType
      ? z.infer<T>
      : T extends object
        ? { [K in keyof T]: InferSchemaValue<T[K]> }
        : T;
type InferSchemaInputRaw<T> =
  T extends __TypedOpenapiSchema<infer _O, infer I>
    ? I
    : T extends z.ZodType
      ? z.input<T>
      : T extends object
        ? { [K in keyof T]: InferSchemaInputRaw<T[K]> }
        : T;
type InferSchemaInput<T> = OptionalUndefinedKeys<InferSchemaInputRaw<T>>;

export type SafeApiResponse<TEndpoint> = TEndpoint extends { responses: infer TResponses }
  ? TResponses extends Record<string, unknown>
    ? TypedApiResponse<
        InferSchemaValue<TResponses>,
        TEndpoint extends { responseHeaders: infer THeaders } ? InferSchemaValue<THeaders> : never
      >
    : never
  : never;

export type InferResponseByStatus<TEndpoint, TStatusCode> = Extract<
  SafeApiResponse<TEndpoint>,
  { status: TStatusCode }
>;

/**
 * Success-body payload — InferSchemaValue only on success statuses.
 * Filter with extends {} like the old Extract { data: {} } so unknown bodies (e.g. 304) drop out.
 */
export type InferSuccessData<TEndpoint> = TEndpoint extends { responses: infer TResponses }
  ? {
      [K in keyof TResponses]: K extends string
        ? K extends `${infer TStatusCode extends number}`
          ? TStatusCode extends SuccessStatusCode
            ? InferSchemaValue<TResponses[K]> extends infer D
              ? D extends {}
                ? D
                : never
              : never
            : never
          : never
        : K extends number
          ? K extends SuccessStatusCode
            ? InferSchemaValue<TResponses[K]> extends infer D
              ? D extends {}
                ? D
                : never
              : never
            : never
          : never;
    }[keyof TResponses]
  : never;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never ? [config?: T] : [config: T];
type NotNever<T> = [T] extends [never] ? false : true;

/** Call options merged onto inferred endpoint parameters. */
type ApiRequestOptions = {
  overrides?: RequestInit;
  withResponse?: boolean;
  throwOnStatusError?: boolean;
  validate?: ValidateSide;
};

/** Parameter bag for an endpoint + request options. */
export type ApiCallParams<TEndpoint> = TEndpoint extends { parameters: infer UParams }
  ? NotNever<UParams> extends true
    ? InferSchemaInput<UParams> & ApiRequestOptions
    : ApiRequestOptions
  : ApiRequestOptions;

/** Resolve response type from withResponse flag on the call config. */
export type ApiCallResult<TEndpoint, TParams> = TParams extends { withResponse: true }
  ? SafeApiResponse<TEndpoint>
  : InferSuccessData<TEndpoint>;

export type ValidateSide = "none" | "input" | "output" | "both";
export type OnValidate = (ctx: {
  side: "input" | "output";
  method: string;
  path: string;
  schema: unknown;
  value: unknown;
}) => unknown | Promise<unknown>;

// </ApiClientTypes>

// <TypedStatusError>
export class TypedStatusError<TData = unknown> extends Error {
  response: TypedErrorResponse<TData, ErrorStatusCode, unknown>;
  status: number;
  constructor(response: TypedErrorResponse<TData, ErrorStatusCode, unknown>) {
    super(`HTTP ${response.status}: ${response.statusText}`);
    this.name = "TypedStatusError";
    this.response = response;
    this.status = response.status;
  }
}
// </TypedStatusError>

// <ValidateHelpers>
const defaultParse = (schema: unknown, value: unknown): unknown => {
  return (schema as { parse: (v: unknown) => unknown }).parse(value);
};

const runValidate = async (ctx: {
  side: "input" | "output";
  method: string;
  path: string;
  schema: unknown;
  value: unknown;
  onValidate?: OnValidate;
}): Promise<unknown> => {
  if (ctx.onValidate) return ctx.onValidate(ctx);
  return defaultParse(ctx.schema, ctx.value);
};
// </ValidateHelpers>

// <ApiClient>
export class ApiClient {
  baseUrl: string = "";
  successStatusCodes = successStatusCodes;
  errorStatusCodes = errorStatusCodes;
  validate: ValidateSide = "both";
  onValidate?: OnValidate;

  constructor(
    public fetcher: Fetcher,
    options?: { validate?: ValidateSide; onValidate?: OnValidate },
  ) {
    if (options?.validate !== undefined) this.validate = options.validate;
    if (options?.onValidate) this.onValidate = options.onValidate;
  }

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  setValidate(validate: ValidateSide) {
    this.validate = validate;
    return this;
  }

  setOnValidate(onValidate: OnValidate | undefined) {
    if (onValidate === undefined) {
      delete this.onValidate;
    } else {
      this.onValidate = onValidate;
    }
    return this;
  }

  /**
   * Replace path parameters in URL
   * Supports both OpenAPI format {param} and Express format :param
   */
  defaultDecodePathParams = (url: string, params: unknown): string => {
    const record = (params ?? {}) as Record<string, unknown>;
    return url
      .replace(/{(\w+)}/g, (_, key: string) =>
        record[key] != null ? String(record[key]) : `{${key}}`,
      )
      .replace(/:([a-zA-Z0-9_]+)/g, (_, key: string) =>
        record[key] != null ? String(record[key]) : `:${key}`,
      );
  };

  /** Uses URLSearchParams, skips null/undefined values */
  defaultEncodeSearchParams = (queryParams: unknown): URLSearchParams | undefined => {
    if (!queryParams || typeof queryParams !== "object") return;

    const searchParams = new URLSearchParams();
    Object.entries(queryParams as Record<string, unknown>).forEach(([key, value]) => {
      if (value != null) {
        // Skip null/undefined values
        if (Array.isArray(value)) {
          value.forEach((val) => val != null && searchParams.append(key, String(val)));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    return searchParams;
  };

  /** Append cookie params as a Cookie header (or merge into existing). */
  defaultEncodeCookies = (cookies: unknown, headers: Headers): void => {
    if (!cookies || typeof cookies !== "object") return;
    const parts = Object.entries(cookies as Record<string, unknown>)
      .filter(([, value]) => value != null)
      .map(([key, value]) => `${key}=${String(value)}`);
    if (!parts.length) return;
    const existing = headers.get("cookie");
    headers.set("cookie", existing ? `${existing}; ${parts.join("; ")}` : parts.join("; "));
  };

  defaultParseResponseData = async (response: FetcherResponse): Promise<unknown> => {
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("text/event-stream")) {
      return response.body ?? null;
    }
    if (contentType.startsWith("text/")) {
      return await response.text();
    }

    if (contentType.toLowerCase().startsWith("application/octet-stream")) {
      return new Blob([await response.arrayBuffer()]);
    }

    if (
      contentType.includes("application/json") ||
      (contentType.includes("application/") && contentType.includes("json")) ||
      contentType === "*/*"
    ) {
      try {
        return await response.json();
      } catch {
        return undefined;
      }
    }

    return;
  };

  // <ApiClient.get>
  get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<
      TEndpoint extends { parameters: infer UParams }
        ? NotNever<UParams> extends true
          ? InferSchemaInput<UParams> & {
              overrides?: RequestInit;
              withResponse: true;
              throwOnStatusError?: boolean;
              validate?: ValidateSide;
            }
          : {
              overrides?: RequestInit;
              withResponse: true;
              throwOnStatusError?: boolean;
              validate?: ValidateSide;
            }
        : {
            overrides?: RequestInit;
            withResponse: true;
            throwOnStatusError?: boolean;
            validate?: ValidateSide;
          }
    >
  ): Promise<SafeApiResponse<TEndpoint>>;

  get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<
      TEndpoint extends { parameters: infer UParams }
        ? NotNever<UParams> extends true
          ? InferSchemaInput<UParams> & {
              overrides?: RequestInit;
              withResponse?: false;
              throwOnStatusError?: boolean;
              validate?: ValidateSide;
            }
          : {
              overrides?: RequestInit;
              withResponse?: false;
              throwOnStatusError?: boolean;
              validate?: ValidateSide;
            }
        : {
            overrides?: RequestInit;
            withResponse?: false;
            throwOnStatusError?: boolean;
            validate?: ValidateSide;
          }
    >
  ): Promise<InferSuccessData<TEndpoint>>;

  get<Path extends keyof GetEndpoints, _TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<any>
  ): Promise<any> {
    return this.request("get", path, ...params);
  }
  // </ApiClient.get>

  // <ApiClient.request>
  /**
   * Generic request method with full type-safety for any endpoint
   */
  request<
    TMethod extends keyof EndpointByMethod,
    TPath extends keyof EndpointByMethod[TMethod],
    TEndpoint extends EndpointByMethod[TMethod][TPath],
  >(
    method: TMethod,
    path: TPath,
    ...params: MaybeOptionalArg<
      TEndpoint extends { parameters: infer UParams }
        ? NotNever<UParams> extends true
          ? InferSchemaInput<UParams> & {
              overrides?: RequestInit;
              withResponse: true;
              throwOnStatusError?: boolean;
              validate?: ValidateSide;
            }
          : {
              overrides?: RequestInit;
              withResponse: true;
              throwOnStatusError?: boolean;
              validate?: ValidateSide;
            }
        : {
            overrides?: RequestInit;
            withResponse: true;
            throwOnStatusError?: boolean;
            validate?: ValidateSide;
          }
    >
  ): Promise<SafeApiResponse<TEndpoint>>;

  request<
    TMethod extends keyof EndpointByMethod,
    TPath extends keyof EndpointByMethod[TMethod],
    TEndpoint extends EndpointByMethod[TMethod][TPath],
  >(
    method: TMethod,
    path: TPath,
    ...params: MaybeOptionalArg<
      TEndpoint extends { parameters: infer UParams }
        ? NotNever<UParams> extends true
          ? InferSchemaInput<UParams> & {
              overrides?: RequestInit;
              withResponse?: false;
              throwOnStatusError?: boolean;
              validate?: ValidateSide;
            }
          : {
              overrides?: RequestInit;
              withResponse?: false;
              throwOnStatusError?: boolean;
              validate?: ValidateSide;
            }
        : {
            overrides?: RequestInit;
            withResponse?: false;
            throwOnStatusError?: boolean;
            validate?: ValidateSide;
          }
    >
  ): Promise<InferSuccessData<TEndpoint>>;

  request<
    TMethod extends keyof EndpointByMethod,
    TPath extends keyof EndpointByMethod[TMethod],
    TEndpoint extends EndpointByMethod[TMethod][TPath],
  >(method: TMethod, path: TPath, ...params: MaybeOptionalArg<any>): Promise<any> {
    return (async () => {
      const requestParams = params[0];
      const withResponse = requestParams?.withResponse;
      const throwOnStatusError = requestParams?.throwOnStatusError ?? (withResponse ? false : true);
      let overrides = requestParams?.overrides;
      const validateSide: ValidateSide = requestParams?.validate ?? this.validate;

      const parametersToSend: EndpointParameters = {};
      if (requestParams?.body !== undefined) parametersToSend.body = requestParams.body;
      if (requestParams?.query !== undefined) parametersToSend.query = requestParams.query;
      if (requestParams?.header !== undefined) parametersToSend.header = requestParams.header;
      if (requestParams?.path !== undefined) parametersToSend.path = requestParams.path;
      if (requestParams?.cookie !== undefined) parametersToSend.cookie = requestParams.cookie;

      type RuntimeEndpoint = {
        parameters?: Partial<Record<"body" | "query" | "header" | "path" | "cookie", unknown>>;
        responses?: Record<string, unknown>;
      };
      const endpointSchema = EndpointByMethod[method][path] as RuntimeEndpoint;
      const shouldValidateInput = validateSide === "input" || validateSide === "both";
      if (shouldValidateInput && endpointSchema.parameters) {
        const paramSchema = endpointSchema.parameters;
        for (const key of ["body", "query", "header", "path", "cookie"] as const) {
          const schema = paramSchema[key];
          const value = parametersToSend[key];
          if (schema !== undefined && value !== undefined) {
            parametersToSend[key] = await runValidate({
              side: "input",
              method: String(method),
              path: String(path),
              schema,
              value,
              ...(this.onValidate ? { onValidate: this.onValidate } : {}),
            });
          }
        }
      }

      const resolvedPath = (this.fetcher.decodePathParams ?? this.defaultDecodePathParams)(
        this.baseUrl + (path as string),
        parametersToSend.path ?? {},
      );
      const url = new URL(resolvedPath);
      const urlSearchParams = (this.fetcher.encodeSearchParams ?? this.defaultEncodeSearchParams)(
        parametersToSend.query,
      );

      if (parametersToSend.cookie) {
        const headers = new Headers((overrides as RequestInit | undefined)?.headers);
        (this.fetcher.encodeCookies ?? this.defaultEncodeCookies)(parametersToSend.cookie, headers);
        overrides = { ...overrides, headers };
      }

      const response = await this.fetcher.fetch({
        method: method,
        path: path as string,
        url,
        ...(urlSearchParams ? { urlSearchParams } : {}),
        ...(Object.keys(parametersToSend).length ? { parameters: parametersToSend } : {}),
        requestFormat: endpointRequestFormats[method]?.[path] ?? "json",
        security: endpointSecurityRequirements[method]?.[path] ?? defaultSecurityRequirements,
        ...(overrides ? { overrides } : {}),
        throwOnStatusError,
      });
      const responseFormat = endpointResponseFormats[method]?.[path] ?? "json";
      let data =
        responseFormat === "sse"
          ? (response.body ?? null)
          : await (this.fetcher.parseResponseData ?? this.defaultParseResponseData)(response);
      const shouldValidateOutput = validateSide === "output" || validateSide === "both";
      if (
        shouldValidateOutput &&
        responseFormat !== "sse" &&
        response.ok &&
        endpointSchema?.responses
      ) {
        const responseSchema =
          endpointSchema.responses[String(response.status)] ?? endpointSchema.responses["default"];
        if (responseSchema) {
          data = await runValidate({
            side: "output",
            method: String(method),
            path: String(path),
            schema: responseSchema,
            value: data,
            ...(this.onValidate ? { onValidate: this.onValidate } : {}),
          });
        }
      }
      const typedResponse = Object.assign(response, {
        data: data,
        json: () => Promise.resolve(data),
      }) as SafeApiResponse<TEndpoint>;

      if (throwOnStatusError && (errorStatusCodes as readonly number[]).includes(response.status)) {
        throw new TypedStatusError(
          typedResponse as TypedErrorResponse<unknown, ErrorStatusCode, unknown>,
        );
      }

      return withResponse ? typedResponse : data;
    })() as Promise<any>;
  }
  // </ApiClient.request>
}

export function createApiClient(
  fetcher: Fetcher,
  baseUrl?: string,
  options?: { validate?: ValidateSide; onValidate?: OnValidate },
) {
  return new ApiClient(fetcher, options).setBaseUrl(baseUrl ?? "");
}

/**
 Example usage:
 const api = createApiClient((method, url, params) =>
   fetch(url, { method, body: JSON.stringify(params) }).then((res) => res.json()),
 );
 api.get("/users").then((users) => console.log(users));
 api.post("/users", { body: { name: "John" } }).then((user) => console.log(user));
 api.put("/users/:id", { path: { id: 1 }, body: { name: "John" } }).then((user) => console.log(user));

 // With error handling
 const result = await api.get("/users/{id}", { path: { id: "123" }, withResponse: true });
 if (result.ok) {
   // Access data directly
   const user = result.data;
   console.log(user);

   // Or use the json() method for compatibility
   const userFromJson = await result.json();
   console.log(userFromJson);
 } else {
   const error = result.data;
   console.error(`Error ${result.status}:`, error);
 }
*/

// </ApiClient>
