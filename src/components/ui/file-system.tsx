"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Columns3,
  GalleryHorizontalEnd,
  Grid2X2,
  List,
  Search,
} from "lucide-react";
import { useHotkey, useKeyHold } from "@tanstack/react-hotkeys";
import * as React from "react";

export type FileSystemView = "icons" | "list" | "columns" | "gallery";

export type FileSystemFolderItem = {
  kind: "folder";
  path: string;
  name?: string;
  parentPath?: string;
  hasChildren?: boolean;
};

export type FileSystemFileItem = {
  kind: "file";
  path: string;
  key?: string;
  name?: string;
  parentPath?: string;
  contentType?: string;
  previewImageUrl?: string | null;
  metadata?: Record<string, string>;
};

export type FileSystemItem = FileSystemFolderItem | FileSystemFileItem;

type FileSystemProps = {
  items: FileSystemItem[];
  title?: string;
  className?: string;
  view?: FileSystemView;
  defaultView?: FileSystemView;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onViewChange?: (view: FileSystemView) => void;
  onIconGridCapacityChange?: (capacity: number) => void;
  onSelectionChange?: (item: FileSystemItem | null) => void;
  onSelectedItemsChange?: (items: FileSystemFileItem[]) => void;
  onFileOpen?: (file: FileSystemFileItem) => void;
  renderFilePreview?: (file: FileSystemFileItem, large?: boolean) => React.ReactNode;
  renderFileContextMenu?: (
    file: FileSystemFileItem,
    trigger: React.ReactElement<
      React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
    >,
  ) => React.ReactNode;
  renderFileDetails?: (file: FileSystemFileItem) => React.ReactNode;
  renderListTypes?: (file: FileSystemFileItem) => React.ReactNode;
  renderListAbilities?: (file: FileSystemFileItem) => React.ReactNode;
  renderListPower?: (file: FileSystemFileItem) => React.ReactNode;
  toolbarLeading?: React.ReactNode;
  toolbarTrailing?: React.ReactNode;
  filterBar?: React.ReactNode;
  footer?: React.ReactNode;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
};

const viewOptions: Array<{
  value: FileSystemView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { value: "icons", label: "Icons", icon: Grid2X2 },
  { value: "list", label: "List", icon: List },
  { value: "columns", label: "Columns", icon: Columns3 },
  { value: "gallery", label: "Gallery", icon: GalleryHorizontalEnd },
];

function displayName(item: FileSystemItem) {
  return item.name ?? item.path.split("/").filter(Boolean).at(-1) ?? item.path;
}

function FilePreview({
  file,
  large = false,
  render,
}: {
  file: FileSystemFileItem;
  large?: boolean;
  render?: FileSystemProps["renderFilePreview"];
}) {
  if (render) return render(file, large);
  return file.previewImageUrl ? (
    <img
      src={file.previewImageUrl}
      alt=""
      className="h-full w-full object-contain"
      draggable={false}
    />
  ) : null;
}

export function FileSystem({
  items,
  title = "Files",
  className,
  view: controlledView,
  defaultView = "icons",
  searchValue = "",
  onSearchChange,
  onViewChange,
  onIconGridCapacityChange,
  onSelectionChange,
  onSelectedItemsChange,
  onFileOpen,
  renderFilePreview,
  renderFileContextMenu,
  renderFileDetails,
  renderListTypes,
  renderListAbilities,
  renderListPower,
  toolbarLeading,
  toolbarTrailing,
  filterBar,
  footer,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: FileSystemProps) {
  const [internalView, setInternalView] = React.useState(defaultView);
  const [selectedPath, setSelectedPath] = React.useState<string | null>(null);
  const [selectedPaths, setSelectedPaths] = React.useState<string[]>([]);
  const [selectionAnchorPath, setSelectionAnchorPath] = React.useState<string | null>(null);
  const iconGridRef = React.useRef<HTMLDivElement>(null);
  const [iconGridCapacity, setIconGridCapacity] = React.useState(0);
  const isShiftHeld = useKeyHold("Shift");
  const view = controlledView ?? internalView;
  const files = items.filter((item): item is FileSystemFileItem => item.kind === "file");
  const selectedPathSet = React.useMemo(() => new Set(selectedPaths), [selectedPaths]);
  const selected = files.find((file) => file.path === selectedPath) ?? null;

  React.useEffect(() => {
    const grid = iconGridRef.current;
    if (view !== "icons" || !grid || !onIconGridCapacityChange) return;

    const measureCapacity = () => {
      const styles = window.getComputedStyle(grid);
      const columnCount = styles.gridTemplateColumns.split(" ").filter(Boolean).length;
      const rootFontSize = Number.parseFloat(
        window.getComputedStyle(document.documentElement).fontSize,
      );
      const rowGap = Number.parseFloat(styles.rowGap);
      const verticalPadding =
        Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom);
      const minimumRowHeight = rootFontSize * 10.25;
      const rowCount = Math.max(
        1,
        Math.floor((grid.clientHeight - verticalPadding + rowGap) / (minimumRowHeight + rowGap)),
      );
      const capacity = Math.max(1, columnCount * rowCount);

      setIconGridCapacity((previous) => (previous === capacity ? previous : capacity));
      onIconGridCapacityChange(capacity);
    };

    measureCapacity();
    const observer = new ResizeObserver(measureCapacity);
    observer.observe(grid);
    return () => observer.disconnect();
  }, [onIconGridCapacityChange, view]);

  React.useEffect(() => {
    const visiblePaths = new Set(files.map((file) => file.path));
    const nextSelectedPaths = selectedPaths.filter((path) => visiblePaths.has(path));
    const nextSelectedPath =
      selectedPath && visiblePaths.has(selectedPath)
        ? selectedPath
        : (nextSelectedPaths.at(-1) ?? null);
    const nextAnchorPath =
      selectionAnchorPath && visiblePaths.has(selectionAnchorPath)
        ? selectionAnchorPath
        : nextSelectedPath;

    if (
      nextSelectedPaths.length !== selectedPaths.length ||
      nextSelectedPath !== selectedPath ||
      nextAnchorPath !== selectionAnchorPath
    ) {
      setSelectedPaths(nextSelectedPaths);
      setSelectedPath(nextSelectedPath);
      setSelectionAnchorPath(nextAnchorPath);
      const nextSelectedItems = files.filter((file) => nextSelectedPaths.includes(file.path));
      onSelectionChange?.(
        nextSelectedPath ? (files.find((file) => file.path === nextSelectedPath) ?? null) : null,
      );
      onSelectedItemsChange?.(nextSelectedItems);
    }
  }, [
    files,
    onSelectedItemsChange,
    onSelectionChange,
    selectedPath,
    selectedPaths,
    selectionAnchorPath,
  ]);

  type SelectionModifierEvent = Pick<
    React.MouseEvent | React.KeyboardEvent,
    "ctrlKey" | "metaKey" | "shiftKey"
  >;

  const commitSelection = (
    nextSelectedPaths: string[],
    nextSelectedPath: string | null,
    nextAnchorPath: string | null,
  ) => {
    setSelectedPaths(nextSelectedPaths);
    setSelectedPath(nextSelectedPath);
    setSelectionAnchorPath(nextAnchorPath);
    const nextSelectedItems = files.filter((file) => nextSelectedPaths.includes(file.path));
    onSelectionChange?.(
      nextSelectedPath ? (files.find((file) => file.path === nextSelectedPath) ?? null) : null,
    );
    onSelectedItemsChange?.(nextSelectedItems);
  };

  const selectFile = (file: FileSystemFileItem, event?: SelectionModifierEvent) => {
    const fileIndex = files.findIndex((entry) => entry.path === file.path);
    const anchorIndex = selectionAnchorPath
      ? files.findIndex((entry) => entry.path === selectionAnchorPath)
      : -1;
    const isRangeSelection = Boolean(event?.shiftKey || isShiftHeld) && anchorIndex >= 0;
    const isToggleSelection = Boolean(event?.ctrlKey || event?.metaKey);

    if (isRangeSelection) {
      const start = Math.min(anchorIndex, fileIndex);
      const end = Math.max(anchorIndex, fileIndex);
      commitSelection(
        files.slice(start, end + 1).map((entry) => entry.path),
        file.path,
        selectionAnchorPath,
      );
      return;
    }

    if (isToggleSelection) {
      const nextSelectedPaths = selectedPathSet.has(file.path)
        ? selectedPaths.filter((path) => path !== file.path)
        : [...selectedPaths, file.path];
      const nextSelectedPath = nextSelectedPaths.includes(file.path)
        ? file.path
        : (nextSelectedPaths.at(-1) ?? null);
      commitSelection(nextSelectedPaths, nextSelectedPath, file.path);
      return;
    }

    commitSelection([file.path], file.path, file.path);
  };

  const openSelected = (file: FileSystemFileItem) => {
    selectFile(file);
    onFileOpen?.(file);
  };

  const handleViewChange = (nextView: FileSystemView) => {
    setInternalView(nextView);
    onViewChange?.(nextView);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const columns =
      view === "icons" && iconGridRef.current
        ? getComputedStyle(iconGridRef.current).gridTemplateColumns.split(" ").length
        : 1;
    const delta =
      event.key === "ArrowRight"
        ? 1
        : event.key === "ArrowLeft"
          ? -1
          : event.key === "ArrowDown"
            ? columns
            : event.key === "ArrowUp"
              ? -columns
              : 0;

    if (event.key === "Enter") {
      event.preventDefault();
      openSelected(files[index]);
      return;
    }
    if (!delta) return;
    event.preventDefault();
    const nextIndex = Math.max(0, Math.min(files.length - 1, index + delta));
    const next = files[nextIndex];
    selectFile(next, event);
    document.querySelector<HTMLElement>(`[data-file-index="${nextIndex}"]`)?.focus();
  };

  useHotkey(
    "Mod+A",
    (event) => {
      if (view !== "icons" || !files.length) return;
      event.preventDefault();
      const paths = files.map((file) => file.path);
      commitSelection(paths, files[0].path, files[0].path);
    },
    { enabled: view === "icons", ignoreInputs: true, target: iconGridRef },
  );

  useHotkey(
    "Escape",
    () => {
      if (view !== "icons" || !selectedPaths.length) return;
      commitSelection([], null, null);
    },
    { enabled: view === "icons", ignoreInputs: true, target: iconGridRef },
  );

  const itemProps = (file: FileSystemFileItem, index: number) => ({
    "aria-label": displayName(file),
    "aria-selected": selectedPathSet.has(file.path),
    "data-file-index": index,
    "data-cuelume-hover": "release",
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      selectFile(file, event);
      const usesInspector = view === "columns" || view === "gallery";
      if (!usesInspector && window.matchMedia("(pointer: coarse)").matches) {
        onFileOpen?.(file);
      }
    },
    onContextMenu: () => {
      if (!selectedPathSet.has(file.path)) selectFile(file);
    },
    onDoubleClick: () => openSelected(file),
    onKeyDown: (event: React.KeyboardEvent) => handleKeyDown(event, index),
    tabIndex: selectedPath === file.path || (!selectedPath && index === 0) ? 0 : -1,
  });

  const renderFileItem = (
    file: FileSystemFileItem,
    trigger: React.ReactElement<
      React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
    >,
  ) =>
    renderFileContextMenu ? (
      <React.Fragment key={file.path}>{renderFileContextMenu(file, trigger)}</React.Fragment>
    ) : (
      trigger
    );

  const loadMoreNearEnd = (
    event: React.UIEvent<HTMLDivElement>,
    direction: "horizontal" | "vertical",
  ) => {
    if (!hasMore || isLoadingMore || !onLoadMore) return;
    const element = event.currentTarget;
    const remaining =
      direction === "horizontal"
        ? element.scrollWidth - element.scrollLeft - element.clientWidth
        : element.scrollHeight - element.scrollTop - element.clientHeight;
    if (remaining < 240) onLoadMore();
  };

  return (
    <section
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden bg-background text-foreground",
        className,
      )}
      aria-label={title}
    >
      <header className="flex min-h-14 shrink-0 items-center gap-2 border-b bg-muted/15 px-3">
        <div className="flex items-center gap-0.5">
          <button className="finder-icon-button" type="button" aria-label="Back" disabled>
            <ChevronLeft />
          </button>
          <button className="finder-icon-button" type="button" aria-label="Forward" disabled>
            <ChevronRight />
          </button>
        </div>
        {toolbarLeading}
        <select
          value={view}
          onChange={(event) => handleViewChange(event.target.value as FileSystemView)}
          className="h-8 max-w-24 rounded-[4px] border bg-background px-2 text-xs sm:hidden"
          aria-label="View mode"
        >
          {viewOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <h1 className="hidden min-w-0 flex-1 truncate px-2 text-sm font-semibold xl:block">
          {title}
        </h1>
        {selectedPaths.length > 1 ? (
          <span
            className="hidden shrink-0 rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary xl:inline-flex"
            aria-live="polite"
          >
            {selectedPaths.length} selected
          </span>
        ) : null}
        <span className="flex-1 xl:hidden" aria-hidden="true" />
        <div
          className="hidden items-center rounded-md border bg-muted/30 p-0.5 sm:flex"
          aria-label="View"
        >
          {viewOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                "finder-icon-button h-7 w-8 rounded-[4px]",
                view === option.value &&
                  "bg-foreground/[0.04] text-foreground shadow-xs dark:bg-muted",
              )}
              aria-label={`${option.label} view`}
              aria-pressed={view === option.value}
              onClick={() => handleViewChange(option.value)}
            >
              <option.icon />
            </button>
          ))}
        </div>
        <label className="relative hidden w-[clamp(10rem,20vw,16rem)] md:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder="Search Pokemon"
            className="h-8 w-full rounded-md border bg-background pl-8 pr-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
          />
        </label>
        {toolbarTrailing}
      </header>

      {filterBar}

      <div className="border-b px-3 py-2 md:hidden">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder="Search Pokemon"
            className="h-9 w-full rounded-md border bg-background pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/30"
          />
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {files.length === 0 ? (
          <div className="grid h-full place-items-center text-sm text-muted-foreground">
            No Pokemon found
          </div>
        ) : view === "icons" ? (
          <div
            ref={iconGridRef}
            className={cn(
              "finder-grid h-full w-full p-2",
              iconGridCapacity > 0 && files.length >= iconGridCapacity && "finder-grid--fill",
            )}
            tabIndex={-1}
          >
            {files.map((file, index) =>
              renderFileItem(
                file,
                <button
                  key={file.path}
                  type="button"
                  {...itemProps(file, index)}
                  className="group grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_auto_auto] items-center gap-1 rounded-md bg-transparent p-0.5 outline-none transition-colors hover:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-ring/40 aria-selected:bg-foreground/[0.04] dark:hover:bg-muted dark:aria-selected:bg-muted lg:gap-1"
                >
                  <span className="relative h-full min-h-0 w-full place-self-center overflow-hidden rounded-md bg-foreground/[0.04] transition-colors dark:bg-sidebar/80">
                    <span className="absolute inset-0.5 grid min-h-0 min-w-0 place-items-center [&_img]:absolute [&_img]:inset-0 [&_img]:m-auto [&_img]:h-full [&_img]:max-h-28 [&_img]:w-full [&_img]:max-w-28 [&_img]:scale-110 [&_img]:object-contain">
                      <FilePreview file={file} render={renderFilePreview} />
                    </span>
                  </span>
                  <span className="max-w-full truncate text-center text-xs font-medium">
                    {displayName(file)}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {file.metadata?.number}
                  </span>
                </button>,
              ),
            )}
          </div>
        ) : view === "list" ? (
          <div className="h-full overflow-auto">
            <div className="sticky top-0 z-10 grid min-w-[780px] grid-cols-[minmax(220px,1.15fr)_minmax(130px,.65fr)_minmax(220px,1.1fr)_minmax(170px,.8fr)] border-b bg-background/95 px-4 py-2 text-[11px] font-medium uppercase text-muted-foreground backdrop-blur">
              <span>Pokemon</span>
              <span>Typing</span>
              <span>Abilities</span>
              <span>Base stats</span>
            </div>
            {files.map((file, index) =>
              renderFileItem(
                file,
                <button
                  key={file.path}
                  type="button"
                  {...itemProps(file, index)}
                  className="grid min-h-17 w-full min-w-[780px] grid-cols-[minmax(220px,1.15fr)_minmax(130px,.65fr)_minmax(220px,1.1fr)_minmax(170px,.8fr)] items-center border-b px-4 py-2.5 text-left text-sm outline-none transition-colors hover:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 aria-selected:bg-foreground/[0.04] dark:hover:bg-muted dark:aria-selected:bg-muted"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid size-12 shrink-0 place-items-center rounded-[4px] border bg-muted/25 p-1">
                      <FilePreview file={file} render={renderFilePreview} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{displayName(file)}</span>
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                        <span>{file.metadata?.number}</span>
                        <span aria-hidden="true">·</span>
                        <span>{file.metadata?.generation}</span>
                      </span>
                    </span>
                  </span>
                  <span className="min-w-0 overflow-hidden">
                    {renderListTypes?.(file) ?? (
                      <span className="truncate text-xs">{file.metadata?.types}</span>
                    )}
                  </span>
                  <span className="min-w-0">
                    {renderListAbilities?.(file) ?? (
                      <span className="truncate text-xs text-muted-foreground">
                        {file.metadata?.abilities}
                      </span>
                    )}
                  </span>
                  <span className="min-w-0">
                    {renderListPower?.(file) ?? (
                      <span className="font-mono text-xs">{file.metadata?.bst}</span>
                    )}
                  </span>
                </button>,
              ),
            )}
          </div>
        ) : view === "columns" ? (
          <div className="grid h-full grid-cols-[42%_58%] divide-x md:grid-cols-[minmax(220px,1fr)_minmax(280px,1.35fr)]">
            <div
              className="overflow-auto py-2"
              data-infinite-scroll="vertical"
              onScroll={(event) => loadMoreNearEnd(event, "vertical")}
            >
              {files.map((file, index) =>
                renderFileItem(
                  file,
                  <button
                    key={file.path}
                    type="button"
                    {...itemProps(file, index)}
                    className="flex h-10 w-full items-center gap-2 px-3 text-left text-sm outline-none hover:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-inset aria-selected:bg-foreground/[0.04] dark:hover:bg-muted dark:aria-selected:bg-muted"
                  >
                    <span className="size-8 shrink-0">
                      <FilePreview file={file} render={renderFilePreview} />
                    </span>
                    <span className="min-w-0 flex-1 truncate">{displayName(file)}</span>
                    <ChevronRight className="size-3.5 opacity-50" />
                  </button>,
                ),
              )}
              {hasMore ? (
                <div
                  className="flex h-10 items-center justify-center px-3 text-[10px] text-muted-foreground"
                  aria-live="polite"
                >
                  {isLoadingMore ? "Loading more Pokemon…" : "Scroll for more"}
                </div>
              ) : null}
            </div>
            <div className="overflow-auto bg-muted/10 p-3 md:p-5">
              {selected ? (
                <div className="mx-auto max-w-3/4">{renderFileDetails?.(selected)}</div>
              ) : (
                <EmptySelection />
              )}
            </div>
          </div>
        ) : (
          <div className="grid h-full grid-rows-[minmax(0,1fr)_7.5rem]">
            <div className="min-h-0 overflow-auto bg-muted/10 p-5">
              {selected ? (
                <div className="mx-auto grid h-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(220px,300px)]">
                  <div className="grid min-h-0 place-items-center overflow-hidden rounded-md border bg-background p-6">
                    <FilePreview file={selected} large render={renderFilePreview} />
                  </div>
                  <div className="overflow-auto">{renderFileDetails?.(selected)}</div>
                </div>
              ) : (
                <EmptySelection />
              )}
            </div>
            <div
              className="flex gap-2 overflow-x-auto border-t bg-background p-2"
              data-infinite-scroll="horizontal"
              onScroll={(event) => loadMoreNearEnd(event, "horizontal")}
            >
              {files.map((file, index) =>
                renderFileItem(
                  file,
                  <button
                    key={file.path}
                    type="button"
                    {...itemProps(file, index)}
                    className="flex w-24 shrink-0 flex-col items-center rounded-[4px] p-1 text-[10px] outline-none hover:bg-foreground/[0.04] focus-visible:ring-2 aria-selected:bg-foreground/[0.04] dark:hover:bg-muted dark:aria-selected:bg-muted"
                  >
                    <span className="h-16">
                      <FilePreview file={file} render={renderFilePreview} />
                    </span>
                    <span className="w-full truncate">{displayName(file)}</span>
                  </button>,
                ),
              )}
              {hasMore ? (
                <div
                  className="flex w-24 shrink-0 items-center justify-center px-2 text-center text-[10px] text-muted-foreground"
                  aria-live="polite"
                >
                  {isLoadingMore ? "Loading…" : "Scroll for more"}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
      <footer className="flex min-h-10 shrink-0 items-center border-t bg-muted/15 px-3 text-xs text-muted-foreground">
        {footer ?? `${files.length} items`}
      </footer>
    </section>
  );
}

function EmptySelection() {
  return (
    <div className="grid h-full place-items-center text-sm text-muted-foreground">
      Select a Pokemon to inspect it
    </div>
  );
}
