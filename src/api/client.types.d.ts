export namespace Schemas {
  // <Schemas>
  export type VersionGroupSummary = { name: string; url: string };
  export type LanguageSummary = { name: string; url: string };
  export type AbilityChangeEffectText = { effect: string; language: LanguageSummary };
  export type AbilityChange = {
    version_group: VersionGroupSummary;
    effect_entries: Array<AbilityChangeEffectText>;
  };
  export type GenerationSummary = { name: string; url: string };
  export type AbilityName = { name: string; language: LanguageSummary };
  export type AbilityEffectText = {
    effect: string;
    short_effect: string;
    language: LanguageSummary;
  };
  export type AbilityFlavorText = {
    flavor_text: string;
    language: LanguageSummary;
    version_group: VersionGroupSummary;
  };
  export type AbilityDetail = {
    id: number;
    name: string;
    is_main_series?: boolean;
    generation: GenerationSummary;
    names: Array<AbilityName>;
    effect_entries: Array<AbilityEffectText>;
    effect_changes: Array<AbilityChange>;
    flavor_text_entries: Array<AbilityFlavorText>;
    pokemon: Array<{ is_hidden: boolean; slot: number; pokemon: { name: string; url: string } }>;
  };
  export type AbilitySummary = { name: string; url: string };
  export type BerryFirmnessSummary = { name: string; url: string };
  export type ItemSummary = { name: string; url: string };
  export type TypeSummary = { name: string; url: string };
  export type BerryDetail = {
    id: number;
    name: string;
    growth_time: number;
    max_harvest: number;
    natural_gift_power: number;
    size: number;
    smoothness: number;
    soil_dryness: number;
    firmness: BerryFirmnessSummary;
    flavors: Array<{
      potency: number;
      flavor: Partial<{
        /**
         * The name of the flavor
         */
        name: string;
        /**
         * The URL to get more information about the flavor
         */
        url: string;
      }>;
    }>;
    item: ItemSummary;
    natural_gift_type: TypeSummary;
  };
  export type BerrySummary = { name: string; url: string };
  export type BerryFirmnessName = { name: string; language: LanguageSummary };
  export type BerryFirmnessDetail = {
    id: number;
    name: string;
    berries: Array<BerrySummary>;
    names: Array<BerryFirmnessName>;
  };
  export type ContestTypeSummary = { name: string; url: string };
  export type BerryFlavorName = { name: string; language: LanguageSummary };
  export type BerryFlavorDetail = {
    id: number;
    name: string;
    berries: Array<{
      potency: number;
      berry: Partial<{
        /**
         * The name of the berry
         */
        name: string;
        /**
         * The URL to get more information about the berry
         */
        url: string;
      }>;
    }>;
    contest_type: ContestTypeSummary;
    names: Array<BerryFlavorName>;
  };
  export type BerryFlavorSummary = { name: string; url: string };
  export type CharacteristicDescription = { description?: string; language: LanguageSummary };
  export type StatSummary = { name: string; url: string };
  export type CharacteristicDetail = {
    id: number;
    gene_modulo: number;
    possible_values: Array<number>;
    highest_stat: StatSummary;
    descriptions: Array<CharacteristicDescription>;
  };
  export type CharacteristicSummary = { url: string };
  export type ContestEffectEffectText = { effect: string; language: LanguageSummary };
  export type ContestEffectFlavorText = { flavor_text: string; language: LanguageSummary };
  export type ContestEffectDetail = {
    id: number;
    appeal: number;
    jam: number;
    effect_entries: Array<ContestEffectEffectText>;
    flavor_text_entries: Array<ContestEffectFlavorText>;
  };
  export type ContestEffectSummary = { url: string };
  export type ContestTypeName = { name: string; color: string; language: LanguageSummary };
  export type ContestTypeDetail = {
    id: number;
    name: string;
    berry_flavor: BerryFlavorSummary & unknown;
    names: Array<ContestTypeName>;
  };
  export type EggGroupName = { name: string; language: LanguageSummary };
  export type EggGroupDetail = {
    id: number;
    name: string;
    names: Array<EggGroupName>;
    pokemon_species: Array<{
      /**
       * Pokemon species name.
       */
      name?: string;
      /**
       * The URL to get more information about the species
       */
      url?: string;
    }>;
  };
  export type EggGroupSummary = { name: string; url: string };
  export type EncounterConditionValueSummary = { name: string; url: string };
  export type EncounterConditionName = { name: string; language: LanguageSummary };
  export type EncounterConditionDetail = {
    id: number;
    name: string;
    values: Array<EncounterConditionValueSummary>;
    names: Array<EncounterConditionName>;
  };
  export type EncounterConditionSummary = { name: string; url: string };
  export type EncounterConditionValueName = { name: string; language: LanguageSummary };
  export type EncounterConditionValueDetail = {
    id: number;
    name: string;
    condition: EncounterConditionSummary;
    names: Array<EncounterConditionValueName>;
  };
  export type EncounterMethodName = { name: string; language: LanguageSummary };
  export type EncounterMethodDetail = {
    id: number;
    name: string;
    order?: number | null;
    names: Array<EncounterMethodName>;
  };
  export type EncounterMethodSummary = { name: string; url: string };
  export type EvolutionChainDetail = {
    id: number;
    baby_trigger_item: ItemSummary;
    chain: {
      evolution_details: Array<unknown>;
      evolves_to: Array<{
        evolution_details: Array<{
          version_group: { name: string; url: string };
          is_default: boolean;
          gender: { name: string; url: string } | null;
          held_item: { name: string; url: string } | null;
          item: { name: string; url: string } | null;
          known_move: unknown | null;
          known_move_type: unknown | null;
          location: { name: string; url: string } | null;
          min_affection: number | null;
          min_beauty: number | null;
          min_damage_taken: number | null;
          min_happiness: number | null;
          min_level: number | null;
          min_move_count: number | null;
          min_steps: number | null;
          near_special_rock: boolean | null;
          needs_multiplayer: boolean | null;
          needs_overworld_rain: boolean | null;
          party_species: string | null;
          party_type: string | null;
          relative_physical_stats: string | null;
          time_of_day: string;
          trade_species: string | null;
          trigger: { name: string; url: string };
          turn_upside_down: boolean;
          used_move: unknown | null;
          region: { name: string; url: string } | null;
          base_form: { name: string; url: string } | null;
          evolved_form: { name: string; url: string } | null;
        }>;
        is_baby: boolean;
        species: { name: string; url: string };
      }>;
      is_baby: boolean;
      species: { name: string; url: string };
    };
  };
  export type EvolutionChainSummary = { url: string };
  export type EvolutionTriggerName = { name: string; language: LanguageSummary };
  export type EvolutionTriggerDetail = {
    id: number;
    name: string;
    names: Array<EvolutionTriggerName>;
    pokemon_species: Array<{ name: string; url: string }>;
  };
  export type EvolutionTriggerSummary = { name: string; url: string };
  export type Experience = { level: number; experience: number };
  export type GenderDetail = {
    id: number;
    name: string;
    pokemon_species_details: Array<{
      rate: number;
      pokemon_species: { name: string; url: string };
    }>;
    required_for_evolution: Array<{ name: string; url: string }>;
  };
  export type GenderSummary = { name: string; url: string };
  export type RegionSummary = { name: string; url: string };
  export type MoveSummary = { name: string; url: string };
  export type GenerationName = { name: string; language: LanguageSummary };
  export type PokemonSpeciesSummary = { name: string; url: string };
  export type GenerationDetail = {
    id: number;
    name: string;
    abilities: Array<AbilitySummary>;
    main_region: RegionSummary;
    moves: Array<MoveSummary>;
    names: Array<GenerationName>;
    pokemon_species: Array<PokemonSpeciesSummary>;
    types: Array<TypeSummary>;
    version_groups: Array<VersionGroupSummary>;
  };
  export type GrowthRateDescription = { description?: string; language: LanguageSummary };
  export type GrowthRateDetail = {
    id: number;
    name: string;
    formula: string;
    descriptions: Array<GrowthRateDescription>;
    levels: Array<Experience>;
    pokemon_species: Array<PokemonSpeciesSummary>;
  };
  export type GrowthRateSummary = { name: string; url: string };
  export type ItemAttributeDescription = { description?: string; language: LanguageSummary };
  export type ItemAttributeName = { name: string; language: LanguageSummary };
  export type ItemAttributeDetail = {
    id: number;
    name: string;
    descriptions: Array<ItemAttributeDescription>;
    items: Array<{ name: string; url: string }>;
    names: Array<ItemAttributeName>;
  };
  export type ItemAttributeSummary = { name: string; url: string };
  export type ItemCategoryName = { name: string; language: LanguageSummary };
  export type ItemPocketSummary = { name: string; url: string };
  export type ItemCategoryDetail = {
    id: number;
    name: string;
    items: Array<ItemSummary>;
    names: Array<ItemCategoryName>;
    pocket: ItemPocketSummary;
  };
  export type ItemCategorySummary = { name: string; url: string };
  export type ItemFlingEffectSummary = { name: string; url: string };
  export type ItemEffectText = { effect: string; short_effect: string; language: LanguageSummary };
  export type ItemFlavorText = {
    text: string;
    version_group: VersionGroupSummary;
    language: LanguageSummary;
  };
  export type ItemGameIndex = { game_index: number; generation: GenerationSummary };
  export type ItemName = { name: string; language: LanguageSummary };
  export type ItemDetail = {
    id: number;
    name: string;
    cost?: number | null;
    fling_power?: number | null;
    fling_effect: ItemFlingEffectSummary;
    attributes: Array<{ name: string; url: string }>;
    category: ItemCategorySummary;
    effect_entries: Array<ItemEffectText>;
    flavor_text_entries: Array<ItemFlavorText>;
    game_indices: Array<ItemGameIndex>;
    names: Array<ItemName>;
    held_by_pokemon: Array<{
      pokemon: { name: string; url: string };
      "version-details": Array<{ rarity: number; version: { name: string; url: string } }>;
    }>;
    sprites: { default: string };
    baby_trigger_for: { url: string };
    machines: Array<{ machine: string; version_group: { name: string; url: string } }>;
  };
  export type ItemFlingEffectEffectText = { effect: string; language: LanguageSummary };
  export type ItemFlingEffectDetail = {
    id: number;
    name: string;
    effect_entries: Array<ItemFlingEffectEffectText>;
    items: Array<ItemSummary>;
  };
  export type ItemPocketName = { name: string; language: LanguageSummary };
  export type ItemPocketDetail = {
    id: number;
    name: string;
    categories: Array<ItemCategorySummary>;
    names: Array<ItemPocketName>;
  };
  export type LanguageName = { name: string; language: LanguageSummary };
  export type LanguageDetail = {
    id: number;
    name: string;
    official?: boolean;
    iso639: string;
    iso3166: string;
    names: Array<LanguageName>;
  };
  export type LocationSummary = { name: string; url: string };
  export type LocationAreaName = { name: string; language: LanguageSummary };
  export type LocationAreaDetail = {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: Array<{
      encounter_method: { name: string; url: string };
      version_details: Array<{ rate: number; version: { name: string; url: string } }>;
    }>;
    location: LocationSummary;
    names: Array<LocationAreaName>;
    pokemon_encounters: Array<{
      pokemon: { name: string; url: string };
      version_details: Array<{
        version: { name: string; url: string };
        max_chance: number;
        encounter_details: {
          min_level: number;
          max_level: number;
          condition_values?: { name: string; url: string };
          chance: number;
          method: { name: string; url: string };
        };
      }>;
    }>;
  };
  export type LocationAreaSummary = { name: string; url: string };
  export type LocationName = { name: string; language: LanguageSummary };
  export type LocationGameIndex = { game_index: number; generation: GenerationSummary };
  export type LocationDetail = {
    id: number;
    name: string;
    region: RegionSummary;
    names: Array<LocationName>;
    game_indices: Array<LocationGameIndex>;
    areas: Array<LocationAreaSummary>;
  };
  export type MachineDetail = {
    id: number;
    item: ItemSummary;
    version_group: VersionGroupSummary;
    move: MoveSummary;
  };
  export type MachineSummary = { url: string };
  export type MoveBattleStyleName = { name: string; language: LanguageSummary };
  export type MoveBattleStyleDetail = {
    id: number;
    name: string;
    names: Array<MoveBattleStyleName>;
  };
  export type MoveBattleStyleSummary = { name: string; url: string };
  export type MoveChange = {
    accuracy?: number | null;
    power?: number | null;
    pp?: number | null;
    effect_chance: number;
    effect_entries: Array<{
      effect: string;
      short_effect: string;
      language: { name: string; url: string };
    }>;
    type: TypeSummary;
    version_group: VersionGroupSummary;
  };
  export type MoveDamageClassDescription = { description?: string; language: LanguageSummary };
  export type MoveDamageClassName = { name: string; language: LanguageSummary };
  export type MoveDamageClassDetail = {
    id: number;
    name: string;
    descriptions: Array<MoveDamageClassDescription>;
    moves: Array<MoveSummary>;
    names: Array<MoveDamageClassName>;
  };
  export type MoveDamageClassSummary = { name: string; url: string };
  export type MoveMetaAilmentSummary = { name: string; url: string };
  export type MoveMetaCategorySummary = { name: string; url: string };
  export type MoveMeta = {
    ailment: MoveMetaAilmentSummary;
    category: MoveMetaCategorySummary;
    min_hits?: number | null;
    max_hits?: number | null;
    min_turns?: number | null;
    max_turns?: number | null;
    drain?: number | null;
    healing?: number | null;
    crit_rate?: number | null;
    ailment_chance?: number | null;
    flinch_chance?: number | null;
    stat_chance?: number | null;
  };
  export type MoveName = { name: string; language: LanguageSummary };
  export type SuperContestEffectSummary = { url: string };
  export type MoveTargetSummary = { name: string; url: string };
  export type MoveFlavorText = {
    flavor_text: string;
    language: LanguageSummary;
    version_group: VersionGroupSummary;
  };
  export type MoveDetail = {
    id: number;
    name: string;
    accuracy?: number | null;
    effect_chance: number;
    pp?: number | null;
    priority?: number | null;
    power?: number | null;
    contest_combos: {
      normal: {
        use_before: Array<{ name: string; url: string }> | null;
        use_after: Array<{ name: string; url: string }> | null;
      };
      super: {
        use_before: Array<{ name: string; url: string }> | null;
        use_after: Array<{ name: string; url: string }> | null;
      };
    };
    contest_type: ContestTypeSummary;
    contest_effect: ContestEffectSummary;
    damage_class: MoveDamageClassSummary;
    effect_entries: Array<{
      effect: string;
      short_effect: string;
      language: { name: string; url: string };
    }>;
    effect_changes: Array<{
      effect_entries: Array<{ effect: string; language: { name: string; url: string } }>;
      version_group: { name: string; url: string };
    }>;
    generation: GenerationSummary;
    meta: MoveMeta & unknown;
    names: Array<MoveName>;
    past_values: Array<MoveChange>;
    stat_changes: Array<{ change: number; stat: { name: string; url: string } }>;
    super_contest_effect: SuperContestEffectSummary;
    target: MoveTargetSummary;
    type: TypeSummary;
    machines: Array<{ machine: { url: string }; version_group: { name: string; url: string } }>;
    flavor_text_entries: Array<MoveFlavorText>;
    learned_by_pokemon: Array<{ name: string; url: string }>;
  };
  export type MoveLearnMethodDescription = { description?: string; language: LanguageSummary };
  export type MoveLearnMethodName = { name: string; language: LanguageSummary };
  export type MoveLearnMethodDetail = {
    id: number;
    name: string;
    names: Array<MoveLearnMethodName>;
    descriptions: Array<MoveLearnMethodDescription>;
    version_groups: Array<{ name: string; url: string }>;
  };
  export type MoveLearnMethodSummary = { name: string; url: string };
  export type MoveMetaAilmentName = { name: string; language: LanguageSummary };
  export type MoveMetaAilmentDetail = {
    id: number;
    name: string;
    moves: Array<{ name: string; url: string }>;
    names: Array<MoveMetaAilmentName>;
  };
  export type MoveMetaCategoryDescription = { description?: string; language: LanguageSummary };
  export type MoveMetaCategoryDetail = {
    id: number;
    name: string;
    descriptions: Array<MoveMetaCategoryDescription>;
    moves: Array<{ name: string; url: string }>;
  };
  export type MoveTargetDescription = { description?: string; language: LanguageSummary };
  export type MoveTargetName = { name: string; language: LanguageSummary };
  export type MoveTargetDetail = {
    id: number;
    name: string;
    descriptions: Array<MoveTargetDescription>;
    moves: Array<MoveSummary>;
    names: Array<MoveTargetName>;
  };
  export type NatureBattleStylePreference = {
    low_hp_preference: number;
    high_hp_preference: number;
    move_battle_style: MoveBattleStyleSummary;
  };
  export type NatureName = { name: string; language: LanguageSummary };
  export type NatureDetail = {
    id: number;
    name: string;
    decreased_stat: StatSummary;
    increased_stat: StatSummary;
    likes_flavor: BerryFlavorSummary;
    hates_flavor: BerryFlavorSummary;
    berries: Array<BerrySummary>;
    pokeathlon_stat_changes: Array<{
      max_change: number;
      pokeathlon_stat: { name: string; url: string };
    }>;
    move_battle_style_preferences: Array<NatureBattleStylePreference>;
    names: Array<NatureName>;
  };
  export type NatureSummary = { name: string; url: string };
  export type PaginatedAbilitySummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<AbilitySummary>;
  };
  export type PaginatedBerryFirmnessSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<BerryFirmnessSummary>;
  };
  export type PaginatedBerryFlavorSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<BerryFlavorSummary>;
  };
  export type PaginatedBerrySummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<BerrySummary>;
  };
  export type PaginatedCharacteristicSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<CharacteristicSummary>;
  };
  export type PaginatedContestEffectSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<ContestEffectSummary>;
  };
  export type PaginatedContestTypeSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<ContestTypeSummary>;
  };
  export type PaginatedEggGroupSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<EggGroupSummary>;
  };
  export type PaginatedEncounterConditionSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<EncounterConditionSummary>;
  };
  export type PaginatedEncounterConditionValueSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<EncounterConditionValueSummary>;
  };
  export type PaginatedEncounterMethodSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<EncounterMethodSummary>;
  };
  export type PaginatedEvolutionChainSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<EvolutionChainSummary>;
  };
  export type PaginatedEvolutionTriggerSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<EvolutionTriggerSummary>;
  };
  export type PaginatedGenderSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<GenderSummary>;
  };
  export type PaginatedGenerationSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<GenerationSummary>;
  };
  export type PaginatedGrowthRateSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<GrowthRateSummary>;
  };
  export type PaginatedItemAttributeSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<ItemAttributeSummary>;
  };
  export type PaginatedItemCategorySummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<ItemCategorySummary>;
  };
  export type PaginatedItemFlingEffectSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<ItemFlingEffectSummary>;
  };
  export type PaginatedItemPocketSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<ItemPocketSummary>;
  };
  export type PaginatedItemSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<ItemSummary>;
  };
  export type PaginatedLanguageSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<LanguageSummary>;
  };
  export type PaginatedLocationAreaSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<LocationAreaSummary>;
  };
  export type PaginatedLocationSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<LocationSummary>;
  };
  export type PaginatedMachineSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<MachineSummary>;
  };
  export type PaginatedMoveBattleStyleSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<MoveBattleStyleSummary>;
  };
  export type PaginatedMoveDamageClassSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<MoveDamageClassSummary>;
  };
  export type PaginatedMoveLearnMethodSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<MoveLearnMethodSummary>;
  };
  export type PaginatedMoveMetaAilmentSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<MoveMetaAilmentSummary>;
  };
  export type PaginatedMoveMetaCategorySummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<MoveMetaCategorySummary>;
  };
  export type PaginatedMoveSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<MoveSummary>;
  };
  export type PaginatedMoveTargetSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<MoveTargetSummary>;
  };
  export type PaginatedNatureSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<NatureSummary>;
  };
  export type PalParkAreaSummary = { name: string; url: string };
  export type PaginatedPalParkAreaSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<PalParkAreaSummary>;
  };
  export type PokeathlonStatSummary = { name: string; url: string };
  export type PaginatedPokeathlonStatSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<PokeathlonStatSummary>;
  };
  export type PokedexSummary = { name: string; url: string };
  export type PaginatedPokedexSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<PokedexSummary>;
  };
  export type PokemonColorSummary = { name: string; url: string };
  export type PaginatedPokemonColorSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<PokemonColorSummary>;
  };
  export type PokemonFormSummary = { name: string; url: string };
  export type PaginatedPokemonFormSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<PokemonFormSummary>;
  };
  export type PokemonHabitatSummary = { name: string; url: string };
  export type PaginatedPokemonHabitatSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<PokemonHabitatSummary>;
  };
  export type PokemonShapeSummary = { name: string; url: string };
  export type PaginatedPokemonShapeSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<PokemonShapeSummary>;
  };
  export type PaginatedPokemonSpeciesSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<PokemonSpeciesSummary>;
  };
  export type PokemonSummary = { name: string; url: string };
  export type PaginatedPokemonSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<PokemonSummary>;
  };
  export type PaginatedRegionSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<RegionSummary>;
  };
  export type PaginatedStatSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<StatSummary>;
  };
  export type PaginatedSuperContestEffectSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<SuperContestEffectSummary>;
  };
  export type PaginatedTypeSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<TypeSummary>;
  };
  export type PaginatedVersionGroupSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<VersionGroupSummary>;
  };
  export type VersionSummary = { name: string; url: string };
  export type PaginatedVersionSummaryList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<VersionSummary>;
  };
  export type PalParkAreaName = { name: string; language: LanguageSummary };
  export type PalParkAreaDetail = {
    id: number;
    name: string;
    names: Array<PalParkAreaName>;
    pokemon_encounters: Array<{
      base_score: number;
      "pokemon-species": { name: string; url: string };
      rate: number;
    }>;
  };
  export type PokeathlonStatName = { name: string; language: LanguageSummary };
  export type PokeathlonStatDetail = {
    id: number;
    name: string;
    affecting_natures: {
      decrease: Array<{ max_change: number; nature: { name: string; url: string } }>;
      increase: Array<{ max_change: number; nature: { name: string; url: string } }>;
    };
    names: Array<PokeathlonStatName>;
  };
  export type PokedexDescription = { description?: string; language: LanguageSummary };
  export type PokedexName = { name: string; language: LanguageSummary };
  export type PokedexDetail = {
    id: number;
    name: string;
    is_main_series?: boolean;
    descriptions: Array<PokedexDescription>;
    names: Array<PokedexName>;
    pokemon_entries: Array<{
      entry_number: number;
      pokemon_species: { name: string; url: string };
    }>;
    region: RegionSummary;
    version_groups: Array<{ name: string; url: string }>;
  };
  export type PokemonColorName = { name: string; language: LanguageSummary };
  export type PokemonColorDetail = {
    id: number;
    name: string;
    names: Array<PokemonColorName>;
    pokemon_species: Array<PokemonSpeciesSummary>;
  };
  export type PokemonGameIndex = { game_index: number; version: VersionSummary };
  export type PokemonStat = { base_stat: number; effort: number; stat: StatSummary };
  export type PokemonDetail = {
    id: number;
    name: string;
    base_experience?: number | null;
    height?: number | null;
    is_default?: boolean;
    order?: number | null;
    weight?: number | null;
    abilities: Array<{ ability: { name: string; url: string }; is_hidden: boolean; slot: number }>;
    past_abilities: Array<{
      abilities: Array<{
        ability: { name: string; url: string };
        is_hidden: boolean;
        slot: number;
      }>;
      generation: { name: string; url: string };
    }>;
    forms: Array<PokemonFormSummary>;
    game_indices: Array<PokemonGameIndex>;
    held_items: Array<{
      item: { name: string; url: string };
      version_details: Array<{ rarity: number; version: { name: string; url: string } }>;
    }>;
    location_area_encounters: string;
    moves: Array<{
      move: { name: string; url: string };
      version_group_details: Array<{
        level_learned_at: number;
        move_learn_method: { name: string; url: string };
        version_group: { name: string; url: string };
      }>;
    }>;
    species: PokemonSpeciesSummary;
    sprites: Partial<{ front_default: string }> & Record<string, string | null>;
    cries: { latest: string; legacy: string };
    stats: Array<PokemonStat>;
    past_stats: Array<{
      generation: { name: string; url: string };
      stats: Array<{ base_stat: number; effort: number; stat: { name: string; url: string } }>;
    }>;
    types: Array<{ slot: number; type: { name: string; url: string } }>;
    past_types: Array<{
      generation: { name: string; url: string };
      types: Array<{ slot: number; type: { name: string; url: string } }>;
    }>;
  };
  export type PokemonDexEntry = { entry_number: number; pokedex: PokedexSummary };
  export type PokemonFormDetail = {
    id: number;
    name: string;
    order?: number | null;
    form_order?: number | null;
    is_default?: boolean;
    is_battle_only?: boolean;
    is_mega?: boolean;
    form_name: string;
    pokemon: PokemonSummary;
    sprites: Partial<{ default: string }> & Record<string, string | null>;
    version_group: VersionGroupSummary;
    form_names: Array<{ language: { name: string; url: string }; name: string }>;
    names: Array<{ language: { name: string; url: string }; name: string }>;
    types: Array<{ slot: number; type: { name: string; url: string } }>;
    trigger_conditions: Array<{ trigger: string; name: string; url: string }>;
  };
  export type PokemonHabitatName = { name: string; language: LanguageSummary };
  export type PokemonHabitatDetail = {
    id: number;
    name: string;
    names: Array<PokemonHabitatName>;
    pokemon_species: Array<PokemonSpeciesSummary>;
  };
  export type PokemonShapeDetail = {
    id: number;
    name: string;
    awesome_names: Array<{ awesome_name: string; language: { name: string; url: string } }>;
    names: Array<{ url: string; name: string }>;
    pokemon_species: Array<PokemonSpeciesSummary>;
  };
  export type PokemonSpeciesDescription = { description?: string; language: LanguageSummary };
  export type PokemonSpeciesFlavorText = {
    flavor_text: string;
    language: LanguageSummary;
    version: VersionSummary;
  };
  export type PokemonSpeciesDetail = {
    id: number;
    name: string;
    order?: number | null;
    gender_rate?: number | null;
    capture_rate?: number | null;
    base_happiness?: number | null;
    is_baby?: boolean;
    is_legendary?: boolean;
    is_mythical?: boolean;
    hatch_counter?: number | null;
    has_gender_differences?: boolean;
    forms_switchable?: boolean;
    growth_rate: GrowthRateSummary;
    pokedex_numbers: Array<PokemonDexEntry>;
    egg_groups: Array<{ name: string; url: string }>;
    color: PokemonColorSummary;
    shape: PokemonShapeSummary;
    evolves_from_species: PokemonSpeciesSummary;
    evolution_chain: EvolutionChainSummary;
    habitat: PokemonHabitatSummary;
    generation: GenerationSummary;
    names: Array<{ language: { name: string; url: string }; name: string }>;
    pal_park_encounters: Array<{
      area: { name: string; url: string };
      base_score: number;
      rate: number;
    }>;
    form_descriptions: Array<PokemonSpeciesDescription>;
    flavor_text_entries: Array<PokemonSpeciesFlavorText>;
    genera: Array<{ genus: string; language: { name: string; url: string } }>;
    varieties: Array<{ is_default: boolean; pokemon: { name: string; url: string } }>;
  };
  export type RegionName = { name: string; language: LanguageSummary };
  export type RegionDetail = {
    id: number;
    name: string;
    locations: Array<LocationSummary>;
    main_generation: GenerationSummary | null;
    names: Array<RegionName>;
    pokedexes: Array<PokedexSummary>;
    version_groups: Array<{ name: string; url: string }>;
  };
  export type StatName = { name: string; language: LanguageSummary };
  export type StatDetail = {
    id: number;
    name: string;
    game_index: number;
    is_battle_only?: boolean;
    affecting_moves: {
      increase: Array<{ change: number; move: { name: string; url: string } }>;
      decrease: Array<{ change: number; move: { name: string; url: string } }>;
    };
    affecting_natures: {
      increase: Array<{ name: string; url: string }>;
      decrease: Array<{ name: string; url: string }>;
    };
    affecting_items: Array<{ name: string; url: string }>;
    characteristics: Array<CharacteristicSummary>;
    move_damage_class: MoveDamageClassSummary;
    names: Array<StatName>;
  };
  export type SuperContestEffectFlavorText = { flavor_text: string; language: LanguageSummary };
  export type SuperContestEffectDetail = {
    id: number;
    appeal: number;
    flavor_text_entries: Array<SuperContestEffectFlavorText>;
    moves: Array<MoveSummary>;
  };
  export type TypeGameIndex = { game_index: number; generation: GenerationSummary };
  /**
   * Serializer for the Type resource
   */
  export type TypeDetail = {
    id: number;
    name: string;
    damage_relations: {
      no_damage_to: Array<{ name: string; url: string }>;
      half_damage_to: Array<{ name: string; url: string }>;
      double_damage_to: Array<{ name: string; url: string }>;
      no_damage_from: Array<{ name: string; url: string }>;
      half_damage_from: Array<{ name: string; url: string }>;
      double_damage_from: Array<{ name: string; url: string }>;
    };
    past_damage_relations: Array<{
      generation: { name: string; url: string };
      damage_relations: {
        no_damage_to: Array<{ name: string; url: string }>;
        half_damage_to: Array<{ name: string; url: string }>;
        double_damage_to: Array<{ name: string; url: string }>;
        no_damage_from: Array<{ name: string; url: string }>;
        half_damage_from: Array<{ name: string; url: string }>;
        double_damage_from: Array<{ name: string; url: string }>;
      };
    }>;
    game_indices: Array<TypeGameIndex>;
    generation: GenerationSummary;
    move_damage_class: MoveDamageClassSummary;
    names: Array<AbilityName>;
    pokemon: Array<{
      slot?: number;
      pokemon?: Partial<{
        /**
         * The name of the pokemon
         */
        name: string;
        /**
         * The URL to get more information about the pokemon
         */
        url: string;
      }>;
    }>;
    moves: Array<MoveSummary>;
    sprites: Record<string, Record<string, Partial<{ "name-icon": string }>>>;
  };
  export type VersionName = { name: string; language: LanguageSummary };
  /**
   * Should have a link to Version Group info but the Circular
   * dependency and compilation order fight eachother and I'm
   * not sure how to add anything other than a hyperlink
   */
  export type VersionDetail = {
    id: number;
    name: string;
    names: Array<VersionName>;
    version_group: VersionGroupSummary;
  };
  export type VersionGroupDetail = {
    id: number;
    name: string;
    order?: number | null;
    generation: GenerationSummary;
    move_learn_methods: Array<{ name: string; url: string }>;
    pokedexes: Array<{ name: string; url: string }>;
    regions: Array<{ name: string; url: string }>;
    versions: Array<VersionSummary>;
  };

  // </Schemas>
}

export namespace Endpoints {
  // <Endpoints>

  /**
   * Returns metadata about the current deployed version of the API, including the git commit hash, deploy date, and tag (if any).
   */
  export type get_Meta_retrieve = {
    method: "GET";
    path: "/api/v2/meta/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: never;
    responses: {
      200: Partial<{ deploy_date: string | null; hash: string | null; tag: string | null }>;
    };
  };
  /**
   * Abilities provide passive effects for Pokémon in battle or in the overworld. Pokémon have multiple possible abilities but can have only one ability at a time. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Ability) for greater detail.
   */
  export type get_Ability_list = {
    method: "GET";
    path: "/api/v2/ability/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedAbilitySummaryList };
  };
  /**
   * Abilities provide passive effects for Pokémon in battle or in the overworld. Pokémon have multiple possible abilities but can have only one ability at a time. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Ability) for greater detail.
   */
  export type get_Ability_retrieve = {
    method: "GET";
    path: "/api/v2/ability/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.AbilityDetail };
  };
  /**
   * Berries are small fruits that can provide HP and status condition restoration, stat enhancement, and even damage negation when eaten by Pokémon. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Berry) for greater detail.
   */
  export type get_Berry_list = {
    method: "GET";
    path: "/api/v2/berry/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedBerrySummaryList };
  };
  /**
   * Berries are small fruits that can provide HP and status condition restoration, stat enhancement, and even damage negation when eaten by Pokémon. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Berry) for greater detail.
   */
  export type get_Berry_retrieve = {
    method: "GET";
    path: "/api/v2/berry/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.BerryDetail };
  };
  /**
   * Berries can be soft or hard. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Category:Berries_by_firmness) for greater detail.
   */
  export type get_Berry_firmness_list = {
    method: "GET";
    path: "/api/v2/berry-firmness/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedBerryFirmnessSummaryList };
  };
  /**
   * Berries can be soft or hard. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Category:Berries_by_firmness) for greater detail.
   */
  export type get_Berry_firmness_retrieve = {
    method: "GET";
    path: "/api/v2/berry-firmness/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.BerryFirmnessDetail };
  };
  /**
   * Flavors determine whether a Pokémon will benefit or suffer from eating a berry based on their **nature**. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Flavor) for greater detail.
   */
  export type get_Berry_flavor_list = {
    method: "GET";
    path: "/api/v2/berry-flavor/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedBerryFlavorSummaryList };
  };
  /**
   * Flavors determine whether a Pokémon will benefit or suffer from eating a berry based on their **nature**. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Flavor) for greater detail.
   */
  export type get_Berry_flavor_retrieve = {
    method: "GET";
    path: "/api/v2/berry-flavor/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.BerryFlavorDetail };
  };
  /**
   * Characteristics indicate which stat contains a Pokémon's highest IV. A Pokémon's Characteristic is determined by the remainder of its highest IV divided by 5 (gene_modulo). Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Characteristic) for greater detail.
   */
  export type get_Characteristic_list = {
    method: "GET";
    path: "/api/v2/characteristic/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedCharacteristicSummaryList };
  };
  /**
   * Characteristics indicate which stat contains a Pokémon's highest IV. A Pokémon's Characteristic is determined by the remainder of its highest IV divided by 5 (gene_modulo). Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Characteristic) for greater detail.
   */
  export type get_Characteristic_retrieve = {
    method: "GET";
    path: "/api/v2/characteristic/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.CharacteristicDetail };
  };
  /**
   * Contest types are categories judges used to weigh a Pokémon's condition in Pokémon contests. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Contest_condition) for greater detail.
   */
  export type get_Contest_type_list = {
    method: "GET";
    path: "/api/v2/contest-type/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedContestTypeSummaryList };
  };
  /**
   * Contest types are categories judges used to weigh a Pokémon's condition in Pokémon contests. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Contest_condition) for greater detail.
   */
  export type get_Contest_type_retrieve = {
    method: "GET";
    path: "/api/v2/contest-type/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.ContestTypeDetail };
  };
  /**
   * Contest effects refer to the effects of moves when used in contests.
   */
  export type get_Contest_effect_list = {
    method: "GET";
    path: "/api/v2/contest-effect/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedContestEffectSummaryList };
  };
  /**
   * Contest effects refer to the effects of moves when used in contests.
   */
  export type get_Contest_effect_retrieve = {
    method: "GET";
    path: "/api/v2/contest-effect/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.ContestEffectDetail };
  };
  /**
   * Egg Groups are categories which determine which Pokémon are able to interbreed. Pokémon may belong to either one or two Egg Groups. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Egg_Group) for greater detail.
   */
  export type get_Egg_group_list = {
    method: "GET";
    path: "/api/v2/egg-group/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedEggGroupSummaryList };
  };
  /**
   * Egg Groups are categories which determine which Pokémon are able to interbreed. Pokémon may belong to either one or two Egg Groups. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Egg_Group) for greater detail.
   */
  export type get_Egg_group_retrieve = {
    method: "GET";
    path: "/api/v2/egg-group/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.EggGroupDetail };
  };
  /**
   * Methods by which the player might can encounter Pokémon in the wild, e.g., walking in tall grass. Check out Bulbapedia for greater detail.
   */
  export type get_Encounter_method_list = {
    method: "GET";
    path: "/api/v2/encounter-method/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedEncounterMethodSummaryList };
  };
  /**
   * Methods by which the player might can encounter Pokémon in the wild, e.g., walking in tall grass. Check out Bulbapedia for greater detail.
   */
  export type get_Encounter_method_retrieve = {
    method: "GET";
    path: "/api/v2/encounter-method/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.EncounterMethodDetail };
  };
  /**
   * Conditions which affect what pokemon might appear in the wild, e.g., day or night.
   */
  export type get_Encounter_condition_list = {
    method: "GET";
    path: "/api/v2/encounter-condition/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedEncounterConditionSummaryList };
  };
  /**
   * Conditions which affect what pokemon might appear in the wild, e.g., day or night.
   */
  export type get_Encounter_condition_retrieve = {
    method: "GET";
    path: "/api/v2/encounter-condition/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.EncounterConditionDetail };
  };
  /**
   * Encounter condition values are the various states that an encounter condition can have, i.e., time of day can be either day or night.
   */
  export type get_Encounter_condition_value_list = {
    method: "GET";
    path: "/api/v2/encounter-condition-value/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedEncounterConditionValueSummaryList };
  };
  /**
   * Encounter condition values are the various states that an encounter condition can have, i.e., time of day can be either day or night.
   */
  export type get_Encounter_condition_value_retrieve = {
    method: "GET";
    path: "/api/v2/encounter-condition-value/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.EncounterConditionValueDetail };
  };
  /**
   * Evolution chains are essentially family trees. They start with the lowest stage within a family and detail evolution conditions for each as well as Pokémon they can evolve into up through the hierarchy.
   */
  export type get_Evolution_chain_list = {
    method: "GET";
    path: "/api/v2/evolution-chain/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedEvolutionChainSummaryList };
  };
  /**
   * Evolution chains are essentially family trees. They start with the lowest stage within a family and detail evolution conditions for each as well as Pokémon they can evolve into up through the hierarchy.
   */
  export type get_Evolution_chain_retrieve = {
    method: "GET";
    path: "/api/v2/evolution-chain/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.EvolutionChainDetail };
  };
  /**
   * Evolution triggers are the events and conditions that cause a Pokémon to evolve. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Methods_of_evolution) for greater detail.
   */
  export type get_Evolution_trigger_list = {
    method: "GET";
    path: "/api/v2/evolution-trigger/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedEvolutionTriggerSummaryList };
  };
  /**
   * Evolution triggers are the events and conditions that cause a Pokémon to evolve. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Methods_of_evolution) for greater detail.
   */
  export type get_Evolution_trigger_retrieve = {
    method: "GET";
    path: "/api/v2/evolution-trigger/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.EvolutionTriggerDetail };
  };
  /**
   * A generation is a grouping of the Pokémon games that separates them based on the Pokémon they include. In each generation, a new set of Pokémon, Moves, Abilities and Types that did not exist in the previous generation are released.
   */
  export type get_Generation_list = {
    method: "GET";
    path: "/api/v2/generation/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedGenerationSummaryList };
  };
  /**
   * A generation is a grouping of the Pokémon games that separates them based on the Pokémon they include. In each generation, a new set of Pokémon, Moves, Abilities and Types that did not exist in the previous generation are released.
   */
  export type get_Generation_retrieve = {
    method: "GET";
    path: "/api/v2/generation/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.GenerationDetail };
  };
  /**
   * Genders were introduced in Generation II for the purposes of breeding Pokémon but can also result in visual differences or even different evolutionary lines. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Gender) for greater detail.
   */
  export type get_Gender_list = {
    method: "GET";
    path: "/api/v2/gender/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedGenderSummaryList };
  };
  /**
   * Genders were introduced in Generation II for the purposes of breeding Pokémon but can also result in visual differences or even different evolutionary lines. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Gender) for greater detail.
   */
  export type get_Gender_retrieve = {
    method: "GET";
    path: "/api/v2/gender/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.GenderDetail };
  };
  /**
   * Growth rates are the speed with which Pokémon gain levels through experience. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Experience) for greater detail.
   */
  export type get_Growth_rate_list = {
    method: "GET";
    path: "/api/v2/growth-rate/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedGrowthRateSummaryList };
  };
  /**
   * Growth rates are the speed with which Pokémon gain levels through experience. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Experience) for greater detail.
   */
  export type get_Growth_rate_retrieve = {
    method: "GET";
    path: "/api/v2/growth-rate/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.GrowthRateDetail };
  };
  /**
   * An item is an object in the games which the player can pick up, keep in their bag, and use in some manner. They have various uses, including healing, powering up, helping catch Pokémon, or to access a new area.
   */
  export type get_Item_list = {
    method: "GET";
    path: "/api/v2/item/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedItemSummaryList };
  };
  /**
   * An item is an object in the games which the player can pick up, keep in their bag, and use in some manner. They have various uses, including healing, powering up, helping catch Pokémon, or to access a new area.
   */
  export type get_Item_retrieve = {
    method: "GET";
    path: "/api/v2/item/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.ItemDetail };
  };
  /**
   * Item categories determine where items will be placed in the players bag.
   */
  export type get_Item_category_list = {
    method: "GET";
    path: "/api/v2/item-category/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedItemCategorySummaryList };
  };
  /**
   * Item categories determine where items will be placed in the players bag.
   */
  export type get_Item_category_retrieve = {
    method: "GET";
    path: "/api/v2/item-category/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.ItemCategoryDetail };
  };
  /**
   * Item attributes define particular aspects of items, e.g."usable in battle" or "consumable".
   */
  export type get_Item_attribute_list = {
    method: "GET";
    path: "/api/v2/item-attribute/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedItemAttributeSummaryList };
  };
  /**
   * Item attributes define particular aspects of items, e.g."usable in battle" or "consumable".
   */
  export type get_Item_attribute_retrieve = {
    method: "GET";
    path: "/api/v2/item-attribute/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.ItemAttributeDetail };
  };
  /**
   * The various effects of the move"Fling" when used with different items.
   */
  export type get_Item_fling_effect_list = {
    method: "GET";
    path: "/api/v2/item-fling-effect/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedItemFlingEffectSummaryList };
  };
  /**
   * The various effects of the move"Fling" when used with different items.
   */
  export type get_Item_fling_effect_retrieve = {
    method: "GET";
    path: "/api/v2/item-fling-effect/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.ItemFlingEffectDetail };
  };
  /**
   * Pockets within the players bag used for storing items by category.
   */
  export type get_Item_pocket_list = {
    method: "GET";
    path: "/api/v2/item-pocket/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedItemPocketSummaryList };
  };
  /**
   * Pockets within the players bag used for storing items by category.
   */
  export type get_Item_pocket_retrieve = {
    method: "GET";
    path: "/api/v2/item-pocket/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.ItemPocketDetail };
  };
  /**
   * Languages for translations of API resource information.
   */
  export type get_Language_list = {
    method: "GET";
    path: "/api/v2/language/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedLanguageSummaryList };
  };
  /**
   * Languages for translations of API resource information.
   */
  export type get_Language_retrieve = {
    method: "GET";
    path: "/api/v2/language/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.LanguageDetail };
  };
  /**
   * Locations that can be visited within the games. Locations make up sizable portions of regions, like cities or routes.
   */
  export type get_Location_list = {
    method: "GET";
    path: "/api/v2/location/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedLocationSummaryList };
  };
  /**
   * Locations that can be visited within the games. Locations make up sizable portions of regions, like cities or routes.
   */
  export type get_Location_retrieve = {
    method: "GET";
    path: "/api/v2/location/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.LocationDetail };
  };
  /**
   * Location areas are sections of areas, such as floors in a building or cave. Each area has its own set of possible Pokémon encounters.
   */
  export type get_Location_area_list = {
    method: "GET";
    path: "/api/v2/location-area/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number }>;
    };
    responses: { 200: Schemas.PaginatedLocationAreaSummaryList };
  };
  /**
   * Location areas are sections of areas, such as floors in a building or cave. Each area has its own set of possible Pokémon encounters.
   */
  export type get_Location_area_retrieve = {
    method: "GET";
    path: "/api/v2/location-area/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: number };
    };
    responses: { 200: Schemas.LocationAreaDetail };
  };
  /**
   * Machines are the representation of items that teach moves to Pokémon. They vary from version to version, so it is not certain that one specific TM or HM corresponds to a single Machine.
   */
  export type get_Machine_list = {
    method: "GET";
    path: "/api/v2/machine/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedMachineSummaryList };
  };
  /**
   * Machines are the representation of items that teach moves to Pokémon. They vary from version to version, so it is not certain that one specific TM or HM corresponds to a single Machine.
   */
  export type get_Machine_retrieve = {
    method: "GET";
    path: "/api/v2/machine/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.MachineDetail };
  };
  /**
   * Moves are the skills of Pokémon in battle. In battle, a Pokémon uses one move each turn. Some moves (including those learned by Hidden Machine) can be used outside of battle as well, usually for the purpose of removing obstacles or exploring new areas.
   */
  export type get_Move_list = {
    method: "GET";
    path: "/api/v2/move/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedMoveSummaryList };
  };
  /**
   * Moves are the skills of Pokémon in battle. In battle, a Pokémon uses one move each turn. Some moves (including those learned by Hidden Machine) can be used outside of battle as well, usually for the purpose of removing obstacles or exploring new areas.
   */
  export type get_Move_retrieve = {
    method: "GET";
    path: "/api/v2/move/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.MoveDetail };
  };
  /**
   * Move Ailments are status conditions caused by moves used during battle. See [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Status_condition) for greater detail.
   */
  export type get_Move_ailment_list = {
    method: "GET";
    path: "/api/v2/move-ailment/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedMoveMetaAilmentSummaryList };
  };
  /**
   * Move Ailments are status conditions caused by moves used during battle. See [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Status_condition) for greater detail.
   */
  export type get_Move_ailment_retrieve = {
    method: "GET";
    path: "/api/v2/move-ailment/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.MoveMetaAilmentDetail };
  };
  /**
   * Styles of moves when used in the Battle Palace. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Battle_Frontier_(Generation_III)) for greater detail.
   */
  export type get_Move_battle_style_list = {
    method: "GET";
    path: "/api/v2/move-battle-style/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedMoveBattleStyleSummaryList };
  };
  /**
   * Styles of moves when used in the Battle Palace. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Battle_Frontier_(Generation_III)) for greater detail.
   */
  export type get_Move_battle_style_retrieve = {
    method: "GET";
    path: "/api/v2/move-battle-style/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.MoveBattleStyleDetail };
  };
  /**
   * Very general categories that loosely group move effects.
   */
  export type get_Move_category_list = {
    method: "GET";
    path: "/api/v2/move-category/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedMoveMetaCategorySummaryList };
  };
  /**
   * Very general categories that loosely group move effects.
   */
  export type get_Move_category_retrieve = {
    method: "GET";
    path: "/api/v2/move-category/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.MoveMetaCategoryDetail };
  };
  /**
   * Damage classes moves can have, e.g. physical, special, or non-damaging.
   */
  export type get_Move_damage_class_list = {
    method: "GET";
    path: "/api/v2/move-damage-class/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedMoveDamageClassSummaryList };
  };
  /**
   * Damage classes moves can have, e.g. physical, special, or non-damaging.
   */
  export type get_Move_damage_class_retrieve = {
    method: "GET";
    path: "/api/v2/move-damage-class/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.MoveDamageClassDetail };
  };
  /**
   * Methods by which Pokémon can learn moves.
   */
  export type get_Move_learn_method_list = {
    method: "GET";
    path: "/api/v2/move-learn-method/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedMoveLearnMethodSummaryList };
  };
  /**
   * Methods by which Pokémon can learn moves.
   */
  export type get_Move_learn_method_retrieve = {
    method: "GET";
    path: "/api/v2/move-learn-method/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.MoveLearnMethodDetail };
  };
  /**
   * Targets moves can be directed at during battle. Targets can be Pokémon, environments or even other moves.
   */
  export type get_Move_target_list = {
    method: "GET";
    path: "/api/v2/move-target/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedMoveTargetSummaryList };
  };
  /**
   * Targets moves can be directed at during battle. Targets can be Pokémon, environments or even other moves.
   */
  export type get_Move_target_retrieve = {
    method: "GET";
    path: "/api/v2/move-target/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.MoveTargetDetail };
  };
  /**
   * Natures influence how a Pokémon's stats grow. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Nature) for greater detail.
   */
  export type get_Nature_list = {
    method: "GET";
    path: "/api/v2/nature/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedNatureSummaryList };
  };
  /**
   * Natures influence how a Pokémon's stats grow. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Nature) for greater detail.
   */
  export type get_Nature_retrieve = {
    method: "GET";
    path: "/api/v2/nature/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.NatureDetail };
  };
  /**
   * Areas used for grouping Pokémon encounters in Pal Park. They're like habitats that are specific to Pal Park.
   */
  export type get_Pal_park_area_list = {
    method: "GET";
    path: "/api/v2/pal-park-area/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedPalParkAreaSummaryList };
  };
  /**
   * Areas used for grouping Pokémon encounters in Pal Park. They're like habitats that are specific to Pal Park.
   */
  export type get_Pal_park_area_retrieve = {
    method: "GET";
    path: "/api/v2/pal-park-area/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.PalParkAreaDetail };
  };
  /**
   * A Pokédex is a handheld electronic encyclopedia device; one which is capable of recording and retaining information of the various Pokémon in a given region with the exception of the national dex and some smaller dexes related to portions of a region. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pokedex) for greater detail.
   */
  export type get_Pokedex_list = {
    method: "GET";
    path: "/api/v2/pokedex/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedPokedexSummaryList };
  };
  /**
   * A Pokédex is a handheld electronic encyclopedia device; one which is capable of recording and retaining information of the various Pokémon in a given region with the exception of the national dex and some smaller dexes related to portions of a region. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pokedex) for greater detail.
   */
  export type get_Pokedex_retrieve = {
    method: "GET";
    path: "/api/v2/pokedex/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.PokedexDetail };
  };
  /**
   * Pokémon are the creatures that inhabit the world of the Pokémon games. They can be caught using Pokéballs and trained by battling with other Pokémon. Each Pokémon belongs to a specific species but may take on a variant which makes it differ from other Pokémon of the same species, such as base stats, available abilities and typings. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(species)) for greater detail.
   */
  export type get_Pokemon_list = {
    method: "GET";
    path: "/api/v2/pokemon/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedPokemonSummaryList };
  };
  /**
   * Pokémon are the creatures that inhabit the world of the Pokémon games. They can be caught using Pokéballs and trained by battling with other Pokémon. Each Pokémon belongs to a specific species but may take on a variant which makes it differ from other Pokémon of the same species, such as base stats, available abilities and typings. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(species)) for greater detail.
   */
  export type get_Pokemon_retrieve = {
    method: "GET";
    path: "/api/v2/pokemon/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.PokemonDetail };
  };
  /**
   * Colors used for sorting Pokémon in a Pokédex. The color listed in the Pokédex is usually the color most apparent or covering each Pokémon's body. No orange category exists; Pokémon that are primarily orange are listed as red or brown.
   */
  export type get_Pokemon_color_list = {
    method: "GET";
    path: "/api/v2/pokemon-color/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedPokemonColorSummaryList };
  };
  /**
   * Colors used for sorting Pokémon in a Pokédex. The color listed in the Pokédex is usually the color most apparent or covering each Pokémon's body. No orange category exists; Pokémon that are primarily orange are listed as red or brown.
   */
  export type get_Pokemon_color_retrieve = {
    method: "GET";
    path: "/api/v2/pokemon-color/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.PokemonColorDetail };
  };
  /**
   * Some Pokémon may appear in one of multiple, visually different forms. These differences are purely cosmetic. For variations within a Pokémon species, which do differ in more than just visuals, the 'Pokémon' entity is used to represent such a variety.
   */
  export type get_Pokemon_form_list = {
    method: "GET";
    path: "/api/v2/pokemon-form/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedPokemonFormSummaryList };
  };
  /**
   * Some Pokémon may appear in one of multiple, visually different forms. These differences are purely cosmetic. For variations within a Pokémon species, which do differ in more than just visuals, the 'Pokémon' entity is used to represent such a variety.
   */
  export type get_Pokemon_form_retrieve = {
    method: "GET";
    path: "/api/v2/pokemon-form/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.PokemonFormDetail };
  };
  /**
   * Habitats are generally different terrain Pokémon can be found in but can also be areas designated for rare or legendary Pokémon.
   */
  export type get_Pokemon_habitat_list = {
    method: "GET";
    path: "/api/v2/pokemon-habitat/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedPokemonHabitatSummaryList };
  };
  /**
   * Habitats are generally different terrain Pokémon can be found in but can also be areas designated for rare or legendary Pokémon.
   */
  export type get_Pokemon_habitat_retrieve = {
    method: "GET";
    path: "/api/v2/pokemon-habitat/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.PokemonHabitatDetail };
  };
  /**
   * Shapes used for sorting Pokémon in a Pokédex.
   */
  export type get_Pokemon_shape_list = {
    method: "GET";
    path: "/api/v2/pokemon-shape/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedPokemonShapeSummaryList };
  };
  /**
   * Shapes used for sorting Pokémon in a Pokédex.
   */
  export type get_Pokemon_shape_retrieve = {
    method: "GET";
    path: "/api/v2/pokemon-shape/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.PokemonShapeDetail };
  };
  /**
   * A Pokémon Species forms the basis for at least one Pokémon. Attributes of a Pokémon species are shared across all varieties of Pokémon within the species. A good example is Wormadam; Wormadam is the species which can be found in three different varieties, Wormadam-Trash, Wormadam-Sandy and Wormadam-Plant.
   */
  export type get_Pokemon_species_list = {
    method: "GET";
    path: "/api/v2/pokemon-species/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedPokemonSpeciesSummaryList };
  };
  /**
   * A Pokémon Species forms the basis for at least one Pokémon. Attributes of a Pokémon species are shared across all varieties of Pokémon within the species. A good example is Wormadam; Wormadam is the species which can be found in three different varieties, Wormadam-Trash, Wormadam-Sandy and Wormadam-Plant.
   */
  export type get_Pokemon_species_retrieve = {
    method: "GET";
    path: "/api/v2/pokemon-species/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.PokemonSpeciesDetail };
  };
  /**
   * Pokeathlon Stats are different attributes of a Pokémon's performance in Pokéathlons. In Pokéathlons, competitions happen on different courses; one for each of the different Pokéathlon stats. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9athlon) for greater detail.
   */
  export type get_Pokeathlon_stat_list = {
    method: "GET";
    path: "/api/v2/pokeathlon-stat/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedPokeathlonStatSummaryList };
  };
  /**
   * Pokeathlon Stats are different attributes of a Pokémon's performance in Pokéathlons. In Pokéathlons, competitions happen on different courses; one for each of the different Pokéathlon stats. See [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9athlon) for greater detail.
   */
  export type get_Pokeathlon_stat_retrieve = {
    method: "GET";
    path: "/api/v2/pokeathlon-stat/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.PokeathlonStatDetail };
  };
  /**
   * A region is an organized area of the Pokémon world. Most often, the main difference between regions is the species of Pokémon that can be encountered within them.
   */
  export type get_Region_list = {
    method: "GET";
    path: "/api/v2/region/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedRegionSummaryList };
  };
  /**
   * A region is an organized area of the Pokémon world. Most often, the main difference between regions is the species of Pokémon that can be encountered within them.
   */
  export type get_Region_retrieve = {
    method: "GET";
    path: "/api/v2/region/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.RegionDetail };
  };
  /**
   * Stats determine certain aspects of battles. Each Pokémon has a value for each stat which grows as they gain levels and can be altered momentarily by effects in battles.
   */
  export type get_Stat_list = {
    method: "GET";
    path: "/api/v2/stat/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedStatSummaryList };
  };
  /**
   * Stats determine certain aspects of battles. Each Pokémon has a value for each stat which grows as they gain levels and can be altered momentarily by effects in battles.
   */
  export type get_Stat_retrieve = {
    method: "GET";
    path: "/api/v2/stat/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.StatDetail };
  };
  /**
   * Super contest effects refer to the effects of moves when used in super contests.
   */
  export type get_Super_contest_effect_list = {
    method: "GET";
    path: "/api/v2/super-contest-effect/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedSuperContestEffectSummaryList };
  };
  /**
   * Super contest effects refer to the effects of moves when used in super contests.
   */
  export type get_Super_contest_effect_retrieve = {
    method: "GET";
    path: "/api/v2/super-contest-effect/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.SuperContestEffectDetail };
  };
  /**
   * Types are properties for Pokémon and their moves. Each type has three properties: which types of Pokémon it is super effective against, which types of Pokémon it is not very effective against, and which types of Pokémon it is completely ineffective against.
   */
  export type get_Type_list = {
    method: "GET";
    path: "/api/v2/type/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedTypeSummaryList };
  };
  /**
   * Types are properties for Pokémon and their moves. Each type has three properties: which types of Pokémon it is super effective against, which types of Pokémon it is not very effective against, and which types of Pokémon it is completely ineffective against.
   */
  export type get_Type_retrieve = {
    method: "GET";
    path: "/api/v2/type/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.TypeDetail };
  };
  /**
   * Versions of the games, e.g., Red, Blue or Yellow.
   */
  export type get_Version_list = {
    method: "GET";
    path: "/api/v2/version/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedVersionSummaryList };
  };
  /**
   * Versions of the games, e.g., Red, Blue or Yellow.
   */
  export type get_Version_retrieve = {
    method: "GET";
    path: "/api/v2/version/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.VersionDetail };
  };
  /**
   * Version groups categorize highly similar versions of the games.
   */
  export type get_Version_group_list = {
    method: "GET";
    path: "/api/v2/version-group/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      query?: Partial<{ limit: number; offset: number; q: string }>;
    };
    responses: { 200: Schemas.PaginatedVersionGroupSummaryList };
  };
  /**
   * Version groups categorize highly similar versions of the games.
   */
  export type get_Version_group_retrieve = {
    method: "GET";
    path: "/api/v2/version-group/{id}/";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { id: string };
    };
    responses: { 200: Schemas.VersionGroupDetail };
  };
  /**
   * Handles Pokemon Encounters as a sub-resource.
   */
  export type get_Pokemon_encounters_retrieve = {
    method: "GET";
    path: "/api/v2/pokemon/{pokemon_id}/encounters";
    requestFormat: "json";
    responseFormat: "json";
    parameters: {
      path: { pokemon_id: string };
    };
    responses: {
      200: Array<{
        location_area: { name: string; url: string };
        version_details: Array<{
          encounter_details: Array<{
            chance: number;
            condition_values: Array<{ name: string; url: string }>;
            max_level: number;
            method: { name: string; url: string };
            min_level: number;
          }>;
          max_chance: number;
          version: { name: string; url: string };
        }>;
      }>;
    };
  };

  // </Endpoints>
}

// <EndpointByMethod>
export type EndpointByMethod = {
  get: {
    "/api/v2/meta/": Endpoints.get_Meta_retrieve;
    "/api/v2/ability/": Endpoints.get_Ability_list;
    "/api/v2/ability/{id}/": Endpoints.get_Ability_retrieve;
    "/api/v2/berry/": Endpoints.get_Berry_list;
    "/api/v2/berry/{id}/": Endpoints.get_Berry_retrieve;
    "/api/v2/berry-firmness/": Endpoints.get_Berry_firmness_list;
    "/api/v2/berry-firmness/{id}/": Endpoints.get_Berry_firmness_retrieve;
    "/api/v2/berry-flavor/": Endpoints.get_Berry_flavor_list;
    "/api/v2/berry-flavor/{id}/": Endpoints.get_Berry_flavor_retrieve;
    "/api/v2/characteristic/": Endpoints.get_Characteristic_list;
    "/api/v2/characteristic/{id}/": Endpoints.get_Characteristic_retrieve;
    "/api/v2/contest-type/": Endpoints.get_Contest_type_list;
    "/api/v2/contest-type/{id}/": Endpoints.get_Contest_type_retrieve;
    "/api/v2/contest-effect/": Endpoints.get_Contest_effect_list;
    "/api/v2/contest-effect/{id}/": Endpoints.get_Contest_effect_retrieve;
    "/api/v2/egg-group/": Endpoints.get_Egg_group_list;
    "/api/v2/egg-group/{id}/": Endpoints.get_Egg_group_retrieve;
    "/api/v2/encounter-method/": Endpoints.get_Encounter_method_list;
    "/api/v2/encounter-method/{id}/": Endpoints.get_Encounter_method_retrieve;
    "/api/v2/encounter-condition/": Endpoints.get_Encounter_condition_list;
    "/api/v2/encounter-condition/{id}/": Endpoints.get_Encounter_condition_retrieve;
    "/api/v2/encounter-condition-value/": Endpoints.get_Encounter_condition_value_list;
    "/api/v2/encounter-condition-value/{id}/": Endpoints.get_Encounter_condition_value_retrieve;
    "/api/v2/evolution-chain/": Endpoints.get_Evolution_chain_list;
    "/api/v2/evolution-chain/{id}/": Endpoints.get_Evolution_chain_retrieve;
    "/api/v2/evolution-trigger/": Endpoints.get_Evolution_trigger_list;
    "/api/v2/evolution-trigger/{id}/": Endpoints.get_Evolution_trigger_retrieve;
    "/api/v2/generation/": Endpoints.get_Generation_list;
    "/api/v2/generation/{id}/": Endpoints.get_Generation_retrieve;
    "/api/v2/gender/": Endpoints.get_Gender_list;
    "/api/v2/gender/{id}/": Endpoints.get_Gender_retrieve;
    "/api/v2/growth-rate/": Endpoints.get_Growth_rate_list;
    "/api/v2/growth-rate/{id}/": Endpoints.get_Growth_rate_retrieve;
    "/api/v2/item/": Endpoints.get_Item_list;
    "/api/v2/item/{id}/": Endpoints.get_Item_retrieve;
    "/api/v2/item-category/": Endpoints.get_Item_category_list;
    "/api/v2/item-category/{id}/": Endpoints.get_Item_category_retrieve;
    "/api/v2/item-attribute/": Endpoints.get_Item_attribute_list;
    "/api/v2/item-attribute/{id}/": Endpoints.get_Item_attribute_retrieve;
    "/api/v2/item-fling-effect/": Endpoints.get_Item_fling_effect_list;
    "/api/v2/item-fling-effect/{id}/": Endpoints.get_Item_fling_effect_retrieve;
    "/api/v2/item-pocket/": Endpoints.get_Item_pocket_list;
    "/api/v2/item-pocket/{id}/": Endpoints.get_Item_pocket_retrieve;
    "/api/v2/language/": Endpoints.get_Language_list;
    "/api/v2/language/{id}/": Endpoints.get_Language_retrieve;
    "/api/v2/location/": Endpoints.get_Location_list;
    "/api/v2/location/{id}/": Endpoints.get_Location_retrieve;
    "/api/v2/location-area/": Endpoints.get_Location_area_list;
    "/api/v2/location-area/{id}/": Endpoints.get_Location_area_retrieve;
    "/api/v2/machine/": Endpoints.get_Machine_list;
    "/api/v2/machine/{id}/": Endpoints.get_Machine_retrieve;
    "/api/v2/move/": Endpoints.get_Move_list;
    "/api/v2/move/{id}/": Endpoints.get_Move_retrieve;
    "/api/v2/move-ailment/": Endpoints.get_Move_ailment_list;
    "/api/v2/move-ailment/{id}/": Endpoints.get_Move_ailment_retrieve;
    "/api/v2/move-battle-style/": Endpoints.get_Move_battle_style_list;
    "/api/v2/move-battle-style/{id}/": Endpoints.get_Move_battle_style_retrieve;
    "/api/v2/move-category/": Endpoints.get_Move_category_list;
    "/api/v2/move-category/{id}/": Endpoints.get_Move_category_retrieve;
    "/api/v2/move-damage-class/": Endpoints.get_Move_damage_class_list;
    "/api/v2/move-damage-class/{id}/": Endpoints.get_Move_damage_class_retrieve;
    "/api/v2/move-learn-method/": Endpoints.get_Move_learn_method_list;
    "/api/v2/move-learn-method/{id}/": Endpoints.get_Move_learn_method_retrieve;
    "/api/v2/move-target/": Endpoints.get_Move_target_list;
    "/api/v2/move-target/{id}/": Endpoints.get_Move_target_retrieve;
    "/api/v2/nature/": Endpoints.get_Nature_list;
    "/api/v2/nature/{id}/": Endpoints.get_Nature_retrieve;
    "/api/v2/pal-park-area/": Endpoints.get_Pal_park_area_list;
    "/api/v2/pal-park-area/{id}/": Endpoints.get_Pal_park_area_retrieve;
    "/api/v2/pokedex/": Endpoints.get_Pokedex_list;
    "/api/v2/pokedex/{id}/": Endpoints.get_Pokedex_retrieve;
    "/api/v2/pokemon/": Endpoints.get_Pokemon_list;
    "/api/v2/pokemon/{id}/": Endpoints.get_Pokemon_retrieve;
    "/api/v2/pokemon-color/": Endpoints.get_Pokemon_color_list;
    "/api/v2/pokemon-color/{id}/": Endpoints.get_Pokemon_color_retrieve;
    "/api/v2/pokemon-form/": Endpoints.get_Pokemon_form_list;
    "/api/v2/pokemon-form/{id}/": Endpoints.get_Pokemon_form_retrieve;
    "/api/v2/pokemon-habitat/": Endpoints.get_Pokemon_habitat_list;
    "/api/v2/pokemon-habitat/{id}/": Endpoints.get_Pokemon_habitat_retrieve;
    "/api/v2/pokemon-shape/": Endpoints.get_Pokemon_shape_list;
    "/api/v2/pokemon-shape/{id}/": Endpoints.get_Pokemon_shape_retrieve;
    "/api/v2/pokemon-species/": Endpoints.get_Pokemon_species_list;
    "/api/v2/pokemon-species/{id}/": Endpoints.get_Pokemon_species_retrieve;
    "/api/v2/pokeathlon-stat/": Endpoints.get_Pokeathlon_stat_list;
    "/api/v2/pokeathlon-stat/{id}/": Endpoints.get_Pokeathlon_stat_retrieve;
    "/api/v2/region/": Endpoints.get_Region_list;
    "/api/v2/region/{id}/": Endpoints.get_Region_retrieve;
    "/api/v2/stat/": Endpoints.get_Stat_list;
    "/api/v2/stat/{id}/": Endpoints.get_Stat_retrieve;
    "/api/v2/super-contest-effect/": Endpoints.get_Super_contest_effect_list;
    "/api/v2/super-contest-effect/{id}/": Endpoints.get_Super_contest_effect_retrieve;
    "/api/v2/type/": Endpoints.get_Type_list;
    "/api/v2/type/{id}/": Endpoints.get_Type_retrieve;
    "/api/v2/version/": Endpoints.get_Version_list;
    "/api/v2/version/{id}/": Endpoints.get_Version_retrieve;
    "/api/v2/version-group/": Endpoints.get_Version_group_list;
    "/api/v2/version-group/{id}/": Endpoints.get_Version_group_retrieve;
    "/api/v2/pokemon/{pokemon_id}/encounters": Endpoints.get_Pokemon_encounters_retrieve;
  };
};

// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type GetEndpoints = EndpointByMethod["get"];
// </EndpointByMethod.Shorthands>
