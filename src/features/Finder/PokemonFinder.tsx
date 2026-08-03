import type { PokemonDetail, PokemonSummary } from "#/api/client";
import Badge, { type BadgeItem } from "#/components/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/motion/context-menu";
import {
  FileSystem,
  type FileSystemFileItem,
  type FileSystemItem,
  type FileSystemView,
} from "@/components/ui/file-system";
import { Progress } from "@/components/ui/progress";
import { pokemonCollectionFilters } from "@/data/data";
import { PokemonActiveFilters } from "@/features/Finder/PokemonActiveFilters";
import { PokemonCommandPalette } from "@/features/Finder/PokemonCommandPalette";
import {
  pokemonAbilityListQueryOptions,
  pokemonAbilityQueryOptions,
  pokemonDetailQueryOptions,
  pokemonListQueryOptions,
  pokemonSpeciesQueryOptions,
  pokemonTypeQueryOptions,
} from "@/features/pokemon/pokemon.queries";
import type { PokemonFilterState } from "@/features/Finder/pokemon-finder.types";
import { keepPreviousData, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "#/lib/auth-client";
import { playCue } from "#/lib/sounds";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Dna,
  Folder,
  Library,
  Ruler,
  Sparkles,
  Star,
  Weight,
} from "lucide-react";
import * as React from "react";

const DEFAULT_PAGE_SIZE = 30;
const MAX_PAGE_SIZE = 96;
const CATALOG_LIMIT = 2000;
const SPRITE_BASE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

type PokemonFinderItem = {
  bst: number;
  generation: number;
  hiddenAbilityNames: string[];
  id: number;
  name: string;
  speciesUrl: string;
  types: string[];
  visibleAbilityNames: string[];
};

function formatName(name: string) {
  return name.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function usePokemonFavorites() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const userId = session?.user.id;
  const [favoriteIds, setFavoriteIds] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (isSessionPending) return;
    if (!userId) {
      setFavoriteIds([]);
      return;
    }

    let cancelled = false;
    setFavoriteIds([]);
    void fetch("/api/favorites", { credentials: "same-origin" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load favorites");
        return (await response.json()) as { pokemonIds: number[] };
      })
      .then(({ pokemonIds }) => {
        if (!cancelled) setFavoriteIds(pokemonIds);
      })
      .catch(() => {
        if (!cancelled) setFavoriteIds([]);
      });

    return () => {
      cancelled = true;
    };
  }, [isSessionPending, userId]);

  const favoriteIdSet = React.useMemo(() => new Set(favoriteIds), [favoriteIds]);
  const setFavoriteStatus = React.useCallback(
    (files: ReadonlyArray<FileSystemFileItem>, isFavorite: boolean) => {
      if (!userId) return;

      setFavoriteIds((previous) => {
        const next = new Set(previous);

        files.forEach((file) => {
          const id = Number(file.key);
          if (!Number.isInteger(id) || id <= 0) return;
          if (isFavorite) next.add(id);
          else next.delete(id);
        });

        return [...next].sort((left, right) => left - right);
      });

      void Promise.all(
        files.map(async (file) => {
          const pokemonId = Number(file.key);
          if (!Number.isInteger(pokemonId) || pokemonId <= 0) return;
          await fetch("/api/favorites", {
            body: JSON.stringify({ pokemonId, isFavorite }),
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            method: "PUT",
          });
        }),
      );
    },
    [userId],
  );

  return { favoriteIdSet, setFavoriteStatus };
}

function getPokemonId(url: string) {
  const id = Number(url.split("/").filter(Boolean).at(-1));
  return Number.isFinite(id) ? id : 0;
}

function generationForId(id: number) {
  const generationLimits = [151, 251, 386, 493, 649, 721, 809, 905, Number.POSITIVE_INFINITY];
  return generationLimits.findIndex((limit) => id <= limit) + 1;
}

function toPokemonFinderItem(summary: PokemonSummary, pokemon?: PokemonDetail): PokemonFinderItem {
  const id = getPokemonId(summary.url);
  const visibleAbilityNames =
    pokemon?.abilities
      .filter((ability) => !ability.is_hidden)
      .map((ability) => ability.ability.name) ?? [];
  const hiddenAbilityNames =
    pokemon?.abilities
      .filter((ability) => ability.is_hidden)
      .map((ability) => ability.ability.name) ?? [];

  return {
    bst: pokemon?.stats.reduce((total, stat) => total + stat.base_stat, 0) ?? 0,
    generation: generationForId(id),
    hiddenAbilityNames,
    id,
    name: pokemon?.name ?? summary.name,
    speciesUrl: pokemon?.species.url ?? `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
    types: pokemon?.types.map(({ type }) => type.name) ?? [],
    visibleAbilityNames,
  };
}

function matchesSelectedIdSets(
  id: number,
  selectedSets: ReadonlyArray<ReadonlySet<number>>,
  operator: PokemonFilterState["typeOperator"],
) {
  if (!selectedSets.length) return true;
  if (operator === "is_not_any_of") return selectedSets.every((set) => !set.has(id));
  if (operator === "is_any_of") return selectedSets.some((set) => set.has(id));
  return selectedSets.every((set) => set.has(id));
}

function matchesSummaryFilters(
  summary: PokemonSummary,
  filters: PokemonFilterState,
  search: string,
  favoriteIdSet: ReadonlySet<number>,
  typeIdSets: ReadonlyArray<ReadonlySet<number>>,
  abilityIdSets: ReadonlyArray<ReadonlySet<number>>,
) {
  const id = getPokemonId(summary.url);
  const normalizedSearch = search.trim().toLowerCase();
  if (
    normalizedSearch &&
    !summary.name.toLowerCase().includes(normalizedSearch) &&
    !String(id).includes(normalizedSearch)
  ) {
    return false;
  }

  if (filters.collection === "favorites" && !favoriteIdSet.has(id)) return false;

  const conditions: boolean[] = [];
  if (filters.type?.length) {
    conditions.push(matchesSelectedIdSets(id, typeIdSets, filters.typeOperator));
  }
  if (filters.ability?.length) {
    conditions.push(matchesSelectedIdSets(id, abilityIdSets, filters.abilityOperator));
  }

  if (filters.generation !== undefined) {
    const matchesGeneration = generationForId(id) === filters.generation;
    conditions.push(
      filters.generationOperator === "is_not" ? !matchesGeneration : matchesGeneration,
    );
  }

  if (!conditions.length) return true;
  return filters.filterJoin === "or" ? conditions.some(Boolean) : conditions.every(Boolean);
}

export function PokemonFinder() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { resolvedTheme, setTheme } = useFinderTheme();
  const { favoriteIdSet, setFavoriteStatus } = usePokemonFavorites();
  const [searchValue, setSearchValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);
  const [currentView, setCurrentView] = React.useState<FileSystemView>("icons");
  const [filters, setFilters] = React.useState<PokemonFilterState>({});
  const [selectedFiles, setSelectedFiles] = React.useState<FileSystemFileItem[]>([]);
  const deferredSearch = React.useDeferredValue(searchValue.trim());
  const activeTypes = filters.type ?? [];
  const activeAbilities = filters.ability ?? [];
  const listQuery = useQuery({
    ...pokemonListQueryOptions({ limit: CATALOG_LIMIT, offset: 0 }),
    placeholderData: keepPreviousData,
  });
  const abilityListQuery = useQuery(pokemonAbilityListQueryOptions());
  const typeFilterQueries = useQueries({
    queries: activeTypes.map((type) => pokemonTypeQueryOptions(type)),
  });
  const abilityFilterQueries = useQueries({
    queries: activeAbilities.map((ability) => pokemonAbilityQueryOptions(ability)),
  });
  const allSummaries = listQuery.data?.results ?? [];
  const typeIdSets = typeFilterQueries.every((query) => query.data)
    ? typeFilterQueries.map(
        (query) =>
          new Set(
            query.data?.pokemon.flatMap(({ pokemon }) =>
              pokemon?.url ? [getPokemonId(pokemon.url)] : [],
            ) ?? [],
          ),
      )
    : [];
  const abilityIdSets = abilityFilterQueries.every((query) => query.data)
    ? abilityFilterQueries.map(
        (query) =>
          new Set(query.data?.pokemon.map(({ pokemon }) => getPokemonId(pokemon.url)) ?? []),
      )
    : [];
  const matchingSummaries = allSummaries.filter((summary) =>
    matchesSummaryFilters(
      summary,
      filters,
      deferredSearch,
      favoriteIdSet,
      typeIdSets,
      abilityIdSets,
    ),
  );
  const pageSummaries = matchingSummaries.slice((page - 1) * pageSize, page * pageSize);
  const pageDetailQueries = useQueries({
    queries: pageSummaries.map((summary) => {
      const id = getPokemonId(summary.url);
      return {
        ...pokemonDetailQueryOptions(id),
        staleTime: 5 * 60 * 1000,
      };
    }),
  });
  const detailsById = new Map(
    pageSummaries.map((summary, index) => [
      getPokemonId(summary.url),
      pageDetailQueries[index]?.data,
    ]),
  );
  const catalogItems = pageSummaries.map((summary) =>
    toPokemonFinderItem(summary, detailsById.get(getPokemonId(summary.url))),
  );
  const total = matchingSummaries.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const isShiny = Boolean(filters.shinyView);
  const isCaughtView = Boolean(filters.catchedView);

  const items: FileSystemItem[] = catalogItems.map((pokemon) => ({
    kind: "file",
    key: String(pokemon.id),
    path: `pokemon/${pokemon.id}`,
    name: formatName(pokemon.name),
    contentType: "application/vnd.pokemondex.pokemon",
    previewImageUrl: `${SPRITE_BASE_URL}/${isShiny ? "shiny/" : ""}${pokemon.id}.png`,
    metadata: {
      number: `#${String(pokemon.id).padStart(4, "0")}`,
      types: pokemon.types.join(", "),
      abilities: [...pokemon.visibleAbilityNames, ...pokemon.hiddenAbilityNames].join(", "),
      visibleAbilities: pokemon.visibleAbilityNames.join(", "),
      hiddenAbilities: pokemon.hiddenAbilityNames.join(", "),
      bst: String(pokemon.bst),
      generation: pokemon.generation ? `Generation ${pokemon.generation}` : "Unknown",
      favorite: favoriteIdSet.has(pokemon.id) ? "true" : "false",
      speciesUrl: pokemon.speciesUrl ?? "",
    },
  }));

  const updateFilters = (next: Partial<PokemonFilterState>) => {
    setFilters((previous) => ({ ...previous, ...next }));
    setPage(1);
  };

  const changeView = (view: FileSystemView) => {
    setCurrentView(view);
  };

  const updateIconGridCapacity = React.useCallback((capacity: number) => {
    const nextPageSize = Math.min(Math.max(capacity, 1), MAX_PAGE_SIZE);
    setPageSize((previous) => (previous === nextPageSize ? previous : nextPageSize));
  }, []);

  React.useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, totalPages));
  }, [totalPages]);

  const prefetchPokemon = (file: FileSystemFileItem) => {
    const id = Number(file.key);
    if (!Number.isFinite(id)) return;
    void queryClient.prefetchQuery({
      ...pokemonDetailQueryOptions(id),
      staleTime: 5 * 60 * 1000,
    });
    void queryClient.prefetchQuery({
      ...pokemonSpeciesQueryOptions(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  const openPokemon = (file: FileSystemFileItem) => {
    prefetchPokemon(file);
    void navigate({
      to: "/explorer/pokemon/$id",
      params: { id: String(file.key) },
    });
  };

  const changePage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    setPage(nextPage);
    playCue("page", { volume: 0.45 });
  };

  const abilityOptions = (abilityListQuery.data?.results ?? [])
    .map((ability) => ability.name)
    .sort();

  const paginationFooter = (
    <div className="flex w-full items-center justify-between gap-3">
      <span>
        {total} Pokemon · Page {page} of {totalPages}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="finder-icon-button h-7 w-7"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => changePage(page - 1)}
        >
          <ChevronLeft />
        </button>
        <span className="min-w-14 text-center font-mono text-[10px]">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          className="finder-icon-button h-7 w-7"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => changePage(page + 1)}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );

  return (
    <main className="pokemon-finder-page min-h-0 bg-muted/25 p-2 sm:p-3">
      <div className="pokemon-finder-shell mx-auto grid h-full max-w-[1800px] grid-cols-1 overflow-hidden rounded-md border bg-background shadow-sm md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden min-h-0 flex-col border-r md:flex">
          <div className="flex h-14 items-center gap-3 border-b px-4">
            <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <Library className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Pokemon Explorer</p>
              <p className="text-[11px] text-muted-foreground">National Pokedex</p>
            </div>
          </div>
          <nav className="min-h-0 flex-1 overflow-auto px-2 py-3" aria-label="Pokemon collections">
            <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase text-muted-foreground">
              Locations
            </p>
            <button
              type="button"
              className="finder-source hover:bg-foreground/[0.04] aria-pressed:bg-foreground/[0.04] aria-pressed:text-foreground dark:hover:bg-muted dark:aria-pressed:bg-muted"
              aria-pressed={!filters.collection}
              onClick={() =>
                updateFilters({ collection: undefined, collectionOperator: undefined })
              }
            >
              <Library /> All Pokemon
              <span>{!filters.collection ? total : ""}</span>
            </button>
            <p className="mt-5 px-2 pb-1.5 text-[10px] font-semibold uppercase text-muted-foreground">
              Smart folders
            </p>
            {pokemonCollectionFilters.map((collection) => (
              <button
                key={collection.key}
                type="button"
                className="finder-source hover:bg-foreground/[0.04] aria-pressed:bg-foreground/[0.04] aria-pressed:text-foreground dark:hover:bg-muted dark:aria-pressed:bg-muted"
                aria-pressed={filters.collection === collection.key}
                onClick={() =>
                  updateFilters({ collection: collection.key, collectionOperator: undefined })
                }
              >
                <Folder />{" "}
                <span className="min-w-0 flex-1 truncate text-left">{collection.title}</span>
              </button>
            ))}
          </nav>
          <div className="border-t p-3 text-[10px] leading-4 text-muted-foreground">
            Double-click a Pokemon to open its profile.
          </div>
        </aside>

        <FileSystem
          items={items}
          className={
            isCaughtView ? "!h-full min-h-0 [&_[data-file-index]]:opacity-35" : "!h-full min-h-0"
          }
          title={
            pokemonCollectionFilters.find((item) => item.key === filters.collection)?.title ??
            "All Pokemon"
          }
          view={currentView}
          searchValue={searchValue}
          onSearchChange={(value) => {
            setSearchValue(value);
            setPage(1);
          }}
          onViewChange={changeView}
          onIconGridCapacityChange={updateIconGridCapacity}
          onSelectionChange={(item) => item?.kind === "file" && prefetchPokemon(item)}
          onSelectedItemsChange={setSelectedFiles}
          onFileOpen={openPokemon}
          renderFileContextMenu={(file, trigger) => (
            <PokemonContextMenu
              favoriteIds={favoriteIdSet}
              file={file}
              onFavoriteChange={setFavoriteStatus}
              onOpen={() => openPokemon(file)}
              selectedFiles={selectedFiles}
              trigger={trigger}
            />
          )}
          renderFilePreview={(file, large) => (
            <img
              src={file.previewImageUrl ?? undefined}
              alt=""
              aria-hidden="true"
              draggable={false}
              className={
                large
                  ? "h-full max-h-[430px] w-full object-contain pixelated"
                  : "h-full w-full object-contain pixelated"
              }
            />
          )}
          renderFileDetails={(file) => (
            <PokemonInspector
              activeAbilities={activeAbilities}
              activeTypes={activeTypes}
              file={file}
              onOpen={() => openPokemon(file)}
              onTypeClick={(type) => {
                const next = activeTypes.includes(type)
                  ? activeTypes.filter((item) => item !== type)
                  : [...activeTypes, type].slice(-2);
                updateFilters({ type: next.length ? next : undefined });
              }}
              onAbilityClick={(ability) => {
                const next = activeAbilities.includes(ability)
                  ? activeAbilities.filter((item) => item !== ability)
                  : [...activeAbilities, ability].slice(-3);
                updateFilters({ ability: next.length ? next : undefined });
              }}
            />
          )}
          renderListTypes={(file) => (
            <Badge
              className="flex-nowrap gap-1"
              itemClassName="px-2 py-1 text-[9px]"
              items={file.metadata?.types.split(", ").filter(Boolean) ?? []}
            />
          )}
          renderListAbilities={(file) => <PokemonListAbilities file={file} />}
          renderListPower={(file) => <PokemonListPower file={file} />}
          toolbarLeading={
            <MobileCollectionMenu
              active={filters.collection}
              onChange={(collection) =>
                updateFilters({ collection, collectionOperator: undefined })
              }
            />
          }
          toolbarTrailing={
            <div className="flex items-center gap-1">
              <PokemonCommandPalette
                abilityOptions={abilityOptions}
                filters={filters}
                onUpdate={updateFilters}
              />
              <button
                type="button"
                className="finder-icon-button"
                aria-label="Change theme"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              ></button>
            </div>
          }
          filterBar={<PokemonActiveFilters filters={filters} onUpdate={updateFilters} />}
          footer={paginationFooter}
        />
        {/*
              <span>
                {total} Pokemon · Page {page} of {totalPages}
                <span className="min-w-14 text-center font-mono text-[10px]">
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  className="finder-icon-button h-7 w-7"
                  aria-label="Next page"
                  disabled={page >= totalPages}
                  onClick={() => changePage(page + 1)}
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          */}
        {/*
                {total} Pokemon · Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="finder-icon-button h-7 w-7"
                  aria-label="Previous page"
                  disabled={page <= 1}
                  onClick={() => changePage(page - 1)}
                >
                  <ChevronLeft />
                </button>
            </div> */}
      </div>
    </main>
  );
}

function PokemonContextMenu({
  favoriteIds,
  file,
  onFavoriteChange,
  onOpen,
  selectedFiles,
  trigger,
}: {
  favoriteIds: ReadonlySet<number>;
  file: FileSystemFileItem;
  onFavoriteChange: (files: ReadonlyArray<FileSystemFileItem>, isFavorite: boolean) => void;
  onOpen: () => void;
  selectedFiles: FileSystemFileItem[];
  trigger: React.ReactElement<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }>;
}) {
  const targets = selectedFiles.some((selected) => selected.path === file.path)
    ? selectedFiles
    : [file];
  const targetIds = targets
    .map((target) => Number(target.key))
    .filter((id) => Number.isInteger(id) && id > 0);
  const allFavorites = targetIds.length > 0 && targetIds.every((id) => favoriteIds.has(id));
  const favoriteLabel = allFavorites ? "Remove from favorites" : "Add to favorites";
  const selectionLabel =
    targets.length > 1 ? `${targets.length} Pokemon selected` : (file.name ?? "Pokemon");

  return (
    <ContextMenu
      onOpenChange={(open) => {
        if (open) playCue("bloom", { volume: 0.45 });
      }}
    >
      <ContextMenuTrigger>{trigger}</ContextMenuTrigger>
      <ContextMenuContent ariaLabel="Pokemon actions" className="w-64">
        <ContextMenuLabel>{selectionLabel}</ContextMenuLabel>
        <ContextMenuItem textValue="Open profile" onSelect={onOpen}>
          <ArrowUpRight aria-hidden="true" className="size-4" />
          Open profile
          <ContextMenuShortcut>Enter</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={allFavorites}
          textValue={favoriteLabel}
          onCheckedChange={(checked) => onFavoriteChange(targets, checked)}
        >
          <Star aria-hidden="true" className={allFavorites ? "size-4 fill-current" : "size-4"} />
          {favoriteLabel}
          {targets.length > 1 ? (
            <ContextMenuShortcut>{targets.length} items</ContextMenuShortcut>
          ) : null}
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function PokemonListAbilities({ file }: { file: FileSystemFileItem }) {
  const visibleAbilities =
    file.metadata?.visibleAbilities.split(", ").filter(Boolean).map(formatName) ?? [];
  const hiddenAbilities =
    file.metadata?.hiddenAbilities.split(", ").filter(Boolean).map(formatName) ?? [];
  const items: BadgeItem[] = [
    ...visibleAbilities.map((ability) => ({
      key: `standard-${ability}`,
      label: <span className="truncate">{ability}</span>,
      variant: "outline" as const,
      value: ability,
    })),
    ...hiddenAbilities.map((ability) => ({
      key: `hidden-${ability}`,
      label: <span className="truncate">{ability}</span>,
      variant: "secondary" as const,
      value: ability,
    })),
  ];

  return (
    <span className="flex min-w-0 flex-wrap gap-1">
      <Badge className="min-w-0 gap-1" itemClassName="max-w-full" items={items} size="md" />
      {!visibleAbilities.length && !hiddenAbilities.length ? (
        <span className="text-[10px] text-muted-foreground">No ability</span>
      ) : null}
    </span>
  );
}

function PokemonListPower({ file }: { file: FileSystemFileItem }) {
  const bst = Number(file.metadata?.bst ?? 0);

  return (
    <span className="flex min-w-0 flex-col gap-1.5 pr-1">
      <span className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-sm font-semibold tabular-nums">{bst}</span>
      </span>
      <Progress aria-hidden="true" value={Math.min(100, (bst / 720) * 100)} />
    </span>
  );
}

function PokemonInspector({
  activeAbilities,
  activeTypes,
  file,
  onOpen,
  onTypeClick,
  onAbilityClick,
}: {
  activeAbilities: string[];
  activeTypes: string[];
  file: FileSystemFileItem;
  onOpen: () => void;
  onTypeClick: (type: string) => void;
  onAbilityClick: (ability: string) => void;
}) {
  const pokemonId = Number(file.key);
  const pokemonQuery = useQuery({
    ...pokemonDetailQueryOptions(pokemonId),
    enabled: Number.isFinite(pokemonId),
    staleTime: 5 * 60 * 1000,
  });
  const speciesQuery = useQuery({
    ...pokemonSpeciesQueryOptions(pokemonId),
    enabled: Number.isFinite(pokemonId),
    staleTime: 5 * 60 * 1000,
  });

  const pokemon = pokemonQuery.data;
  const species = speciesQuery.data;
  const types = file.metadata?.types.split(", ").filter(Boolean) ?? [];
  const fallbackAbilities = file.metadata?.abilities.split(", ").filter(Boolean) ?? [];
  const abilities =
    pokemon?.abilities.map((entry) => ({
      hidden: entry.is_hidden,
      name: entry.ability.name,
    })) ?? fallbackAbilities.map((name) => ({ hidden: false, name }));
  const stats = pokemon?.stats ?? [];
  const flavorText = species?.flavor_text_entries
    ?.find((entry) => entry.language?.name === "en")
    ?.flavor_text?.replace(/\s+/g, " ")
    .trim();
  const genus =
    species?.genera?.find((entry) => entry.language?.name === "en")?.genus ??
    "Unknown classification";
  const captureRate = species?.capture_rate != null ? `${species.capture_rate} / 255` : "—";
  const baseFriendship = species?.base_happiness != null ? species.base_happiness.toString() : "—";
  const gender =
    species?.gender_rate === -1
      ? "Genderless"
      : species?.gender_rate != null
        ? `${formatPercentage((1 - species.gender_rate / 8) * 100)}% ♂ · ${formatPercentage((species.gender_rate / 8) * 100)}% ♀`
        : "Unknown";

  return (
    <div className="space-y-5 pb-2">
      <section className="relative overflow-hidden rounded-lg border bg-background">
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-[10px] font-medium tracking-wider text-muted-foreground">
              {file.metadata?.number}
            </p>
            <Badge
              items={[file.metadata?.generation ?? "—"]}
              size="xs"
              tone="neutral"
              itemClassName="uppercase tracking-wider"
            />
          </div>
          <h2 className="mt-1 truncate text-2xl font-bold tracking-tight">{file.name}</h2>
          <Badge
            className="mt-2 gap-1.5"
            activeItems={activeTypes}
            size="xs"
            items={types}
            onItemClick={(event, type) => {
              event.stopPropagation();
              onTypeClick(type);
            }}
          />
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-3">
            <div className="col-span-2 min-w-0">
              <dt className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                Classification
              </dt>
              <dd className="mt-0.5 truncate text-xs font-semibold">{genus}</dd>
            </div>
            <InspectorTextDatum label="Capture rate" value={captureRate} />
            <InspectorTextDatum label="Base friendship" value={baseFriendship} />
          </dl>
        </div>
      </section>

      {flavorText ? (
        <section className="border-l-2 border-primary pl-3">
          <div className="mb-1 flex items-center gap-1.5 text-primary">
            <BookOpen className="size-3.5" />
            <p className="finder-label mb-0 text-primary">Pokedex entry</p>
          </div>
          <p className="text-xs leading-5 text-muted-foreground">{flavorText}</p>
        </section>
      ) : null}

      <section>
        <p className="finder-label">Profile</p>
        <dl className="grid grid-cols-2 overflow-hidden rounded-md border bg-background">
          <InspectorDatum
            icon={Ruler}
            label="Height"
            value={pokemon?.height ? `${(pokemon.height / 10).toFixed(1)} m` : "—"}
          />
          <InspectorDatum
            icon={Weight}
            label="Weight"
            value={pokemon?.weight ? `${(pokemon.weight / 10).toFixed(1)} kg` : "—"}
            borderLeft
          />
          <InspectorDatum
            icon={Sparkles}
            label="Base experience"
            value={pokemon?.base_experience?.toString() ?? "—"}
            borderTop
          />
          <InspectorDatum icon={Dna} label="Gender" value={gender} borderLeft borderTop />
        </dl>
      </section>

      <section>
        <div className="mb-2 flex items-end justify-between gap-3">
          <p className="finder-label mb-0">Base stats</p>
          <p className="font-mono text-xs font-bold tabular-nums">
            <span className="mr-1 text-[9px] font-medium text-muted-foreground">TOTAL</span>
            {file.metadata?.bst}
          </p>
        </div>
        <div className="space-y-2.5 rounded-md border bg-background p-3">
          {stats.length ? (
            stats.map((stat) => (
              <div
                key={stat.stat.name}
                className="grid grid-cols-[4.75rem_2rem_minmax(0,1fr)] items-center gap-2"
              >
                <span className="truncate text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {formatStatLabel(stat.stat.name)}
                </span>
                <span className="text-right font-mono text-[11px] font-semibold tabular-nums">
                  {stat.base_stat}
                </span>
                <span className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full rounded-full bg-primary transition-[width] duration-300 motion-reduce:transition-none"
                    style={{ width: `${Math.min(100, stat.base_stat / 1.8)}%` }}
                  />
                </span>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-3 gap-2" aria-label="Loading base stats">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <span key={item} className="h-5 animate-pulse rounded bg-muted" />
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <p className="finder-label">Abilities</p>
        <Badge
          activeItems={activeAbilities}
          items={abilities.map((ability) => ({
            className: "max-w-full",
            key: `${ability.name}-${ability.hidden}`,
            label: <span className="truncate">{formatName(ability.name)}</span>,
            variant: ability.hidden ? "secondary" : "outline",
            value: ability.name,
          }))}
          onItemClick={(event, ability) => {
            event.stopPropagation();
            onAbilityClick(ability);
          }}
          size="md"
        />
      </section>

      <section>
        <p className="finder-label">Species</p>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-md border bg-background p-3">
          <InspectorTextDatum
            label="Habitat"
            value={species?.habitat?.name ? formatName(species.habitat.name) : "Unknown"}
          />
          <InspectorTextDatum
            label="Growth rate"
            value={species?.growth_rate?.name ? formatName(species.growth_rate.name) : "Unknown"}
          />
          <InspectorTextDatum
            label="Egg groups"
            value={
              species?.egg_groups?.length
                ? species.egg_groups.map((group) => formatName(group.name)).join(", ")
                : "Unknown"
            }
          />
          <InspectorTextDatum
            label="Hatch cycles"
            value={species?.hatch_counter?.toString() ?? "Unknown"}
          />
          <InspectorTextDatum
            label="Forms"
            value={pokemon?.forms.length ? pokemon.forms.length.toString() : "1"}
          />
          <InspectorTextDatum label="Pokédex order" value={pokemon?.order?.toString() ?? "—"} />
        </dl>
      </section>

      <button
        type="button"
        className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none"
        onClick={onOpen}
      >
        <Activity className="size-4" /> Open full profile
      </button>
    </div>
  );
}

function InspectorDatum({
  icon: Icon,
  label,
  value,
  borderLeft = false,
  borderTop = false,
}: {
  icon: typeof Ruler;
  label: string;
  value: string;
  borderLeft?: boolean;
  borderTop?: boolean;
}) {
  return (
    <div
      className={`${borderLeft ? "border-l" : ""} ${borderTop ? "border-t" : ""} flex min-w-0 items-center gap-2.5 p-3`}
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-[4px] bg-muted text-muted-foreground">
        <Icon className="size-3.5" />
      </span>
      <div className="min-w-0">
        <dt className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </dt>
        <dd className="truncate text-xs font-semibold tabular-nums">{value}</dd>
      </div>
    </div>
  );
}

function InspectorTextDatum({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 truncate text-xs font-semibold">{value}</dd>
    </div>
  );
}

function formatStatLabel(name: string) {
  const labels: Record<string, string> = {
    attack: "Attack",
    defense: "Defense",
    hp: "HP",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };
  return labels[name] ?? formatName(name);
}

function formatPercentage(value: number) {
  return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
}

type FinderTheme = "dark" | "light";

function applyFinderTheme(theme: FinderTheme) {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

function useFinderTheme() {
  const [resolvedTheme, setResolvedTheme] = React.useState<FinderTheme>(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.classList.contains("light") ? "light" : "dark";
  });

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const theme: FinderTheme = storedTheme === "light" ? "light" : "dark";
    applyFinderTheme(theme);
    setResolvedTheme(theme);
  }, []);

  const setTheme = React.useCallback((theme: FinderTheme) => {
    applyFinderTheme(theme);
    window.localStorage.setItem("theme", theme);
    setResolvedTheme(theme);
  }, []);

  return { resolvedTheme, setTheme };
}

function MobileCollectionMenu({
  active,
  onChange,
}: {
  active?: (typeof pokemonCollectionFilters)[number]["key"];
  onChange: (value: (typeof pokemonCollectionFilters)[number]["key"] | undefined) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="finder-icon-button md:hidden"
          aria-label="Choose collection"
        >
          <Folder />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-80 overflow-auto">
        <DropdownMenuCheckboxItem checked={!active} onCheckedChange={() => onChange(undefined)}>
          All Pokemon
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {pokemonCollectionFilters.map((collection) => (
          <DropdownMenuCheckboxItem
            key={collection.key}
            checked={active === collection.key}
            onCheckedChange={() => onChange(collection.key)}
          >
            {collection.title}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
