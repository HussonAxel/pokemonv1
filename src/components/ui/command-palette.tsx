import {
  Fragment,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_ICON = [0.2, 0, 0, 1] as const;
const SLIDE = 28;

export interface CommandOption {
  value: string;
  hint?: string;
  dot?: string;
  key?: string;
}

export interface CommandSlot {
  name: string;
  prompt: string;
  kind: "person" | "dot" | "plain";
  options: CommandOption[];
}

export interface Command {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  danger?: boolean;
  slots: CommandSlot[];
  message: (values: CommandOption[]) => string;
}

export interface CommandPaletteState {
  mode: string;
  depth: number;
  staged: number;
  query: string;
  matches: number;
  chips: string[];
  height: number | null;
  lastRun: string | null;
}

function scan(query: string, hay: string, boundaryFirst: boolean) {
  const indexes: number[] = [];
  let position = 0;
  let score = 0;
  let previous = -2;

  for (const character of query) {
    let matchAt = -1;
    if (boundaryFirst) {
      for (let index = position; index < hay.length; index += 1) {
        if (hay[index] === character && (index === 0 || hay[index - 1] === " ")) {
          matchAt = index;
          break;
        }
      }
    }

    if (matchAt === -1) matchAt = hay.indexOf(character, position);
    if (matchAt === -1) return null;

    score += matchAt === 0 || hay[matchAt - 1] === " " ? 10 : 4;
    if (matchAt === previous + 1) score += 8;
    score -= Math.min(6, matchAt - position);
    indexes.push(matchAt);
    previous = matchAt;
    position = matchAt + 1;
  }

  return { score, idx: indexes };
}

function fuzzyMatch(query: string, text: string) {
  const normalizedQuery = query.toLowerCase().replace(/\s+/g, "");
  if (!normalizedQuery) return { score: 0, idx: [] };

  const haystack = text.toLowerCase();
  const boundaryMatch = scan(normalizedQuery, haystack, true);
  const looseMatch = scan(normalizedQuery, haystack, false);
  if (!boundaryMatch) return looseMatch;
  if (!looseMatch) return boundaryMatch;
  return boundaryMatch.score >= looseMatch.score ? boundaryMatch : looseMatch;
}

function substringMatch(query: string, text: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return { score: 0, idx: [] };

  const matchAt = text.toLowerCase().indexOf(normalizedQuery);
  if (matchAt === -1) return null;
  return {
    score: 100 - matchAt,
    idx: Array.from({ length: normalizedQuery.length }, (_, index) => matchAt + index),
  };
}

function Highlight({ text, idx }: { text: string; idx: number[] }) {
  if (!idx.length) return <>{text}</>;

  const indexes = new Set(idx);
  const output: ReactNode[] = [];
  let run = "";
  let marked = indexes.has(0);

  for (let index = 0; index <= text.length; index += 1) {
    const nowMarked = index < text.length && indexes.has(index);
    if (index === text.length || nowMarked !== marked) {
      if (run) {
        output.push(
          marked ? (
            <span
              key={`match-${index}`}
              className="text-foreground underline decoration-muted-foreground/70 decoration-1 underline-offset-[3px] group-data-[danger=true]:group-data-[active=true]:text-inherit"
            >
              {run}
            </span>
          ) : (
            <Fragment key={`text-${index}`}>{run}</Fragment>
          ),
        );
      }
      run = "";
      marked = nowMarked;
    }
    if (index < text.length) run += text[index];
  }

  return <>{output}</>;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface Clause {
  command: Command;
  values: CommandOption[];
}

interface Row {
  item: CommandOption | Command;
  idx: number[];
  score: number;
  order: number;
}

const labelOf = (item: CommandOption | Command) => ("label" in item ? item.label : item.value);

export default function CommandPalette({
  commands,
  matcher = "fuzzy",
  morph = true,
  onApply,
  inspect = false,
  autoFocus = false,
  onStateChange,
}: {
  commands: Command[];
  matcher?: "fuzzy" | "substring";
  morph?: boolean;
  onApply?: (clauses: { command: Command; values: CommandOption[] }[]) => void;
  inspect?: boolean;
  autoFocus?: boolean;
  onStateChange?: (state: CommandPaletteState) => void;
}) {
  const [query, setQuery] = useState("");
  const [command, setCommand] = useState<Command | null>(null);
  const [slotIndex, setSlotIndex] = useState(0);
  const [values, setValues] = useState<CommandOption[]>([]);
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [active, setActive] = useState(0);
  const [bodyHeight, setBodyHeight] = useState<number | null>(null);
  const [leaving, setLeaving] = useState<{
    rows: Row[];
    context: { command: Command | null; slotIndex: number };
    direction: number;
  } | null>(null);
  const [ran, setRan] = useState<{ message: string } | null>(null);
  const [lastRun, setLastRun] = useState<string | null>(null);
  const [hoveredChip, setHoveredChip] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const leaveTimerRef = useRef<number>(0);
  const ranTimerRef = useRef<number>(0);
  const firstBodyRef = useRef(true);
  const listboxId = useId();
  const reduced = useReducedMotion();

  const slot = command?.slots[slotIndex] ?? null;
  const stagedIds = useMemo(() => new Set(clauses.map((clause) => clause.command.id)), [clauses]);
  const items = useMemo<(CommandOption | Command)[]>(
    () => (slot ? slot.options : commands.filter((candidate) => !stagedIds.has(candidate.id))),
    [commands, slot, stagedIds],
  );
  const viewKey = command ? `${command.id}:${slotIndex}` : "root";

  const matches = useMemo<Row[]>(() => {
    const match = matcher === "fuzzy" ? fuzzyMatch : substringMatch;
    const rows: Row[] = [];
    items.forEach((item, order) => {
      const hit = match(query, labelOf(item));
      if (hit) rows.push({ item, idx: hit.idx, score: hit.score, order });
    });
    rows.sort((a, b) => b.score - a.score || a.order - b.order);
    return rows;
  }, [items, matcher, query]);

  const activeSafe = Math.min(active, Math.max(0, matches.length - 1));
  const chipGroups = [
    ...clauses.map((clause, index) => ({
      key: `clause-${index}`,
      chips: [
        { key: "command", label: clause.command.label, kind: "command" as const, dot: undefined },
        ...clause.values.map((value, valueIndex) => ({
          key: `value-${valueIndex}`,
          label: value.value,
          kind: "value" as const,
          dot: value.dot,
        })),
      ],
    })),
    ...(command
      ? [
          {
            key: "live",
            chips: [
              { key: "command", label: command.label, kind: "command" as const, dot: undefined },
              ...values.map((value, valueIndex) => ({
                key: `value-${valueIndex}`,
                label: value.value,
                kind: "value" as const,
                dot: value.dot,
              })),
            ],
          },
        ]
      : []),
  ];
  const chips = chipGroups.flatMap((group) => group.chips.map((chip) => chip.label));

  function shift(direction: number, mutate: () => void) {
    if (morph && !reduced) {
      setLeaving({ rows: matches, context: { command, slotIndex }, direction });
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = window.setTimeout(() => setLeaving(null), 320);
    }
    mutate();
    setQuery("");
    setActive(0);
  }

  function stageClause(nextCommand: Command, nextValues: CommandOption[]) {
    shift(1, () => {
      setClauses((list) => [...list, { command: nextCommand, values: nextValues }]);
      setCommand(null);
      setSlotIndex(0);
      setValues([]);
    });
  }

  function applyAll() {
    if (clauses.length === 0 || command) return;

    const message = clauses.map((clause) => clause.command.message(clause.values)).join(" · ");
    onApply?.(clauses.map((clause) => ({ command: clause.command, values: clause.values })));
    setRan({ message });
    setLastRun(message);
    window.clearTimeout(ranTimerRef.current);
    ranTimerRef.current = window.setTimeout(() => setRan(null), 1600);
    setClauses([]);
    setQuery("");
    setActive(0);
  }

  function clearAll() {
    if (command) {
      shift(-1, () => {
        setCommand(null);
        setSlotIndex(0);
        setValues([]);
        setClauses([]);
      });
    } else {
      setClauses([]);
      setQuery("");
      setActive(0);
    }
  }

  function pick(item: CommandOption | Command) {
    if (!command) {
      const nextCommand = item as Command;
      if (nextCommand.slots.length === 0) {
        stageClause(nextCommand, []);
        return;
      }
      shift(1, () => {
        setCommand(nextCommand);
        setSlotIndex(0);
        setValues([]);
      });
      return;
    }

    if (slotIndex + 1 < command.slots.length) {
      shift(1, () => {
        setValues((list) => [...list, item as CommandOption]);
        setSlotIndex(slotIndex + 1);
      });
    } else {
      stageClause(command, [...values, item as CommandOption]);
    }
  }

  function popChip() {
    if (command) {
      if (slotIndex > 0) {
        shift(-1, () => {
          setValues((list) => list.slice(0, -1));
          setSlotIndex(slotIndex - 1);
        });
      } else {
        shift(-1, () => {
          setCommand(null);
          setValues([]);
        });
      }
      return;
    }

    if (clauses.length > 0) {
      const last = clauses[clauses.length - 1];
      if (last.command.slots.length === 0) {
        setClauses((list) => list.slice(0, -1));
        setActive(0);
      } else {
        shift(-1, () => {
          setClauses((list) => list.slice(0, -1));
          setCommand(last.command);
          setSlotIndex(last.command.slots.length - 1);
          setValues(last.values.slice(0, -1));
        });
      }
    }
  }

  function editChip(groupIndex: number, chipIndex: number) {
    const keep = clauses.slice(0, groupIndex);
    const isLive = command && groupIndex === clauses.length;
    const selectedCommand = isLive ? command : clauses[groupIndex].command;
    const selectedValues = isLive ? values : clauses[groupIndex].values;
    if (chipIndex === 0) {
      if (!command) {
        setClauses(keep);
        setQuery("");
        setActive(0);
      } else {
        shift(-1, () => {
          setClauses(keep);
          setCommand(null);
          setSlotIndex(0);
          setValues([]);
        });
      }
    } else {
      shift(-1, () => {
        setClauses(keep);
        setCommand(selectedCommand);
        setSlotIndex(chipIndex - 1);
        setValues(selectedValues.slice(0, chipIndex - 1));
      });
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (matches.length)
        setActive((index) => (Math.min(index, matches.length - 1) + 1) % matches.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (matches.length) {
        setActive(
          (index) => (Math.min(index, matches.length - 1) - 1 + matches.length) % matches.length,
        );
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (event.metaKey || event.ctrlKey) {
        applyAll();
      } else {
        const hit = matches[activeSafe];
        if (hit) pick(hit.item);
      }
    } else if (event.key === "Backspace" && query === "" && (command || clauses.length > 0)) {
      event.preventDefault();
      popChip();
    } else if (event.key === "Escape") {
      if (query !== "") {
        event.preventDefault();
        setQuery("");
        setActive(0);
      } else if (command || clauses.length > 0) {
        event.preventDefault();
        popChip();
      }
    }
  }

  useLayoutEffect(() => {
    const view = viewRef.current;
    if (!view) return undefined;

    const measure = () => setBodyHeight(view.offsetHeight);
    measure();
    requestAnimationFrame(() => {
      firstBodyRef.current = false;
    });

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(view);
    return () => observer?.disconnect();
  }, [matches.length, viewKey]);

  useEffect(() => {
    const list = listRef.current;
    const node = list?.children[activeSafe] as HTMLElement | undefined;
    if (!list || !node) return;
    if (node.offsetTop < list.scrollTop) list.scrollTop = node.offsetTop;
    else if (node.offsetTop + node.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = node.offsetTop + node.offsetHeight - list.clientHeight;
    }
  }, [activeSafe, viewKey]);

  useEffect(
    () => () => {
      window.clearTimeout(leaveTimerRef.current);
      window.clearTimeout(ranTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    onStateChange?.({
      mode: command ? `${command.label} → ${command.slots[slotIndex].name}` : "commands",
      depth: chips.length,
      staged: clauses.length,
      query,
      matches: matches.length,
      chips,
      height: bodyHeight == null ? null : Math.round(bodyHeight),
      lastRun,
    });
    // State is intentionally reported as a snapshot for consumers such as devtools.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyHeight, clauses, command, lastRun, matches.length, query, slotIndex, values]);

  function renderRows(
    rows: Row[],
    context: { command: Command | null; slotIndex: number },
    live: boolean,
  ) {
    if (rows.length === 0) {
      return query === "" ? (
        <div className="flex flex-col items-center gap-1 px-3 py-[1.125rem] text-center text-[0.8125rem] text-muted-foreground/70">
          All filters staged
          <span className="text-[0.6875rem]">Apply runs them · Backspace removes a chip</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 px-3 py-[1.125rem] text-center text-[0.8125rem] text-muted-foreground/70">
          No matches for <span className="text-muted-foreground">“{query}”</span>
          <span className="text-[0.6875rem]">
            Esc clears{context.command || clauses.length > 0 ? " · Backspace removes a chip" : ""}
          </span>
        </div>
      );
    }

    const kind = context.command ? context.command.slots[context.slotIndex].kind : "command";
    return (
      <ul
        ref={live ? listRef : undefined}
        id={live ? listboxId : undefined}
        role={live ? "listbox" : undefined}
        aria-label={
          live
            ? context.command
              ? context.command.slots[context.slotIndex].prompt
              : "Filters"
            : undefined
        }
        className="m-0 flex max-h-[13.5rem] list-none flex-col gap-px overflow-y-auto p-0"
      >
        {rows.map((row, index) => {
          const isCommand = "label" in row.item;
          const item = row.item;
          return (
            <li
              key={`${labelOf(item)}-${row.order}`}
              id={live ? `${listboxId}-${index}` : undefined}
              role={live ? "option" : undefined}
              aria-selected={live ? index === activeSafe : undefined}
              data-active={live && index === activeSafe ? "true" : undefined}
              data-danger={isCommand && (item as Command).danger ? "true" : undefined}
              className="group/option flex cursor-pointer items-center gap-2 rounded-lg px-2 py-[0.4375rem] text-[0.8125rem] text-foreground/80 data-[active=true]:bg-accent data-[active=true]:text-foreground data-[danger=true]:data-[active=true]:bg-destructive/10 data-[danger=true]:data-[active=true]:text-destructive"
              onMouseDown={
                live
                  ? (event) => {
                      event.preventDefault();
                      pick(item);
                    }
                  : undefined
              }
              onMouseMove={live ? () => setActive(index) : undefined}
            >
              {kind === "command" && (
                <span className="inline-flex flex-none text-muted-foreground/70 group-data-[active=true]/option:text-muted-foreground group-data-[danger=true]:group-data-[active=true]/option:text-destructive">
                  {(item as Command).icon}
                </span>
              )}
              {kind === "person" && (
                <span
                  className="inline-flex size-[1.375rem] flex-none items-center justify-center rounded-full bg-foreground/10 text-[0.5625rem] font-semibold tracking-[0.02em] text-foreground/70"
                  aria-hidden="true"
                >
                  {initials((item as CommandOption).value)}
                </span>
              )}
              {kind === "dot" && (
                <span
                  className="inline-block size-2 flex-none rounded-full"
                  style={{ background: (item as CommandOption).dot ?? "var(--muted-foreground)" }}
                  aria-hidden="true"
                />
              )}
              {kind === "plain" && (
                <span className="inline-flex flex-none text-muted-foreground/70 group-data-[active=true]/option:text-muted-foreground">
                  {context.command?.icon}
                </span>
              )}
              <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                <Highlight text={labelOf(item)} idx={row.idx} />
              </span>
              {"hint" in item && item.hint ? (
                <span className="flex-none text-[0.6875rem] text-muted-foreground/70">
                  {item.hint}
                </span>
              ) : null}
              {isCommand && (item as Command).shortcut ? (
                <kbd className="inline-flex min-w-4 items-center justify-center rounded px-1 font-mono text-[0.625rem] leading-normal text-muted-foreground ring-1 ring-inset ring-foreground/10 group-data-[active=true]/option:bg-background group-data-[active=true]/option:ring-0">
                  {(item as Command).shortcut}
                </kbd>
              ) : (
                <kbd className="inline-flex min-w-4 items-center justify-center rounded bg-muted px-1 font-mono text-[0.625rem] leading-normal text-muted-foreground opacity-0 group-data-[active=true]/option:opacity-100">
                  ↵
                </kbd>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  let flatChipIndex = -1;

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative w-full" data-inspect={inspect ? "true" : "false"}>
        <div className="overflow-hidden rounded-xl border border-border/80 bg-popover text-popover-foreground shadow-sm">
          <div
            className={`flex min-h-11 flex-wrap items-center gap-1.5 border-b border-border px-3 py-2.5${
              inspect
                ? " outline outline-[1.5px] outline-dashed outline-destructive -outline-offset-[3px]"
                : ""
            }`}
            onClick={() => inputRef.current?.focus()}
          >
            <span className="inline-flex flex-none text-muted-foreground/70" aria-hidden="true">
              <SearchIcon />
            </span>
            {chipGroups.map((group, groupIndex) => (
              <Fragment key={group.key}>
                {groupIndex > 0 && (
                  <span
                    className="flex-none text-[0.6875rem] font-medium text-muted-foreground/70 transition-opacity duration-[240ms]"
                    style={{
                      opacity: hoveredChip != null && flatChipIndex + 1 > hoveredChip ? 0.35 : 1,
                    }}
                  >
                    and
                  </span>
                )}
                {group.chips.map((chip) => {
                  flatChipIndex += 1;
                  const chipIndex = flatChipIndex;
                  const isLast =
                    groupIndex === chipGroups.length - 1 &&
                    chip === group.chips[group.chips.length - 1];
                  return (
                    <span
                      key={`${group.key}-${chip.key}`}
                      className="inline-flex transition-opacity duration-[240ms]"
                      style={{ opacity: hoveredChip != null && chipIndex > hoveredChip ? 0.35 : 1 }}
                    >
                      <motion.button
                        type="button"
                        tabIndex={-1}
                        initial={
                          morph && !reduced
                            ? { opacity: 0, scale: 0.85, filter: "blur(2px)" }
                            : false
                        }
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.24, ease: EASE }}
                        className={`inline-flex min-w-0 cursor-pointer items-center gap-[0.3125rem] overflow-hidden whitespace-nowrap rounded-md px-[0.4375rem] py-[0.1875rem] text-xs font-medium active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                          chip.kind === "command"
                            ? "bg-primary text-primary-foreground hover:bg-primary/85"
                            : "bg-muted text-foreground hover:bg-foreground/10"
                        }`}
                        aria-label={`${chip.kind === "command" ? "Remove" : "Change"} ${chip.label}${isLast ? "" : ", also removes later chips"}`}
                        onMouseDown={(event) => event.preventDefault()}
                        onMouseEnter={() => setHoveredChip(chipIndex)}
                        onMouseLeave={() => setHoveredChip(null)}
                        onClick={() => editChip(groupIndex, group.chips.indexOf(chip))}
                      >
                        {chip.dot ? (
                          <span
                            className="inline-block size-2 flex-none rounded-full"
                            style={{ background: chip.dot }}
                            aria-hidden="true"
                          />
                        ) : null}
                        {chip.label}
                      </motion.button>
                    </span>
                  );
                })}
              </Fragment>
            ))}
            <input
              ref={inputRef}
              className="min-w-[5rem] flex-1 border-0 bg-transparent py-0.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
              type="text"
              value={query}
              placeholder={slot ? slot.prompt : "Type a filter"}
              aria-label={slot ? slot.prompt : "Type a filter"}
              role="combobox"
              aria-expanded="true"
              aria-controls={listboxId}
              aria-activedescendant={matches.length ? `${listboxId}-${activeSafe}` : undefined}
              aria-autocomplete="list"
              aria-describedby={chips.length > 0 ? `${listboxId}-trail` : undefined}
              spellCheck={false}
              autoComplete="off"
              autoFocus={autoFocus}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={handleKeyDown}
            />
            <span id={`${listboxId}-trail`} className="sr-only">
              {chips.length > 0
                ? `Building: ${chipGroups.map((group) => group.chips.map((chip) => chip.label).join(" ")).join(", and ")}. Backspace removes the last chip.`
                : ""}
            </span>
          </div>

          <motion.div
            className={`relative overflow-hidden${
              inspect
                ? " outline outline-[1.5px] outline-dashed outline-primary -outline-offset-[3px]"
                : ""
            }`}
            animate={{ height: reduced ? "auto" : (bodyHeight ?? "auto") }}
            transition={
              !morph || reduced || firstBodyRef.current
                ? { duration: 0 }
                : { duration: 0.3, ease: EASE }
            }
          >
            {leaving && morph && !reduced ? (
              <motion.div
                className="pointer-events-none absolute left-0 top-0 w-full p-1"
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: -leaving.direction * SLIDE, opacity: 0 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                aria-hidden="true"
              >
                {renderRows(leaving.rows, leaving.context, false)}
              </motion.div>
            ) : null}
            <motion.div
              ref={viewRef}
              key={viewKey}
              className="p-1"
              initial={
                leaving && morph && !reduced
                  ? { x: leaving.direction * SLIDE, opacity: 0, filter: "blur(2px)" }
                  : false
              }
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {renderRows(matches, { command, slotIndex }, true)}
            </motion.div>
          </motion.div>

          <div className="relative flex min-h-8 items-center justify-between gap-2 border-t border-border px-3 py-[0.4375rem] text-[0.6875rem] text-muted-foreground/70">
            <motion.span
              className="inline-flex items-center gap-[0.3125rem]"
              animate={
                ran
                  ? { opacity: 0, y: -4, filter: "blur(2px)" }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              transition={{ duration: 0.25, ease: EASE_ICON }}
              style={{ pointerEvents: ran ? "none" : undefined }}
            >
              {command ? (
                <>
                  {command.label} · {command.slots[slotIndex].name} {slotIndex + 1} of{" "}
                  {command.slots.length}
                </>
              ) : clauses.length > 0 ? (
                <>
                  <span className="tabular-nums">{clauses.length}</span> staged · add another or
                  apply
                </>
              ) : (
                <>{commands.length} filters</>
              )}
            </motion.span>
            <motion.span
              className="inline-flex items-center gap-3"
              animate={
                ran
                  ? { opacity: 0, y: -4, filter: "blur(2px)" }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              transition={{ duration: 0.25, ease: EASE_ICON }}
              style={{ pointerEvents: ran ? "none" : undefined }}
            >
              <button
                type="button"
                className="relative inline-flex size-7 items-center justify-center rounded-md text-muted-foreground/70 transition-[background-color,color,opacity,scale] duration-150 hover:enabled:bg-accent hover:enabled:text-foreground active:enabled:scale-[0.96] disabled:cursor-default disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                disabled={clauses.length === 0 && !command && query === ""}
                aria-label="Clear staged filters"
                onMouseDown={(event) => event.preventDefault()}
                onClick={clearAll}
              >
                <XIcon />
              </button>
              <button
                type="button"
                className="relative inline-flex h-7 items-center gap-[0.3125rem] rounded-[0.4375rem] bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-[background-color,color,scale] duration-150 active:enabled:scale-[0.96] disabled:cursor-default disabled:bg-muted disabled:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                disabled={clauses.length === 0 || !!command}
                aria-label={`Apply ${clauses.length} staged ${clauses.length === 1 ? "filter" : "filters"}`}
                aria-keyshortcuts="Meta+Enter Control+Enter"
                title="⌘⏎"
                onMouseDown={(event) => event.preventDefault()}
                onClick={applyAll}
              >
                <CheckIcon />
                Apply
                {clauses.length > 0 ? (
                  <span className="inline-flex min-w-4 items-center justify-center rounded-[0.3125rem] bg-primary-foreground/[0.18] px-1 text-[0.625rem] leading-normal tabular-nums">
                    {clauses.length}
                  </span>
                ) : null}
              </button>
            </motion.span>
            <motion.span
              className="absolute inset-0 flex items-center gap-1.5 px-3 font-medium text-foreground"
              aria-hidden={!ran}
              initial={false}
              animate={
                ran
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 4, filter: "blur(2px)" }
              }
              transition={{ duration: 0.25, ease: EASE_ICON }}
              style={{ pointerEvents: "none" }}
            >
              <span className="inline-flex flex-none text-chart-3">
                <CheckIcon />
              </span>
              <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                {ran?.message ?? lastRun}
              </span>
            </motion.span>
          </div>
        </div>

        <span className="sr-only" aria-live="polite">
          {ran
            ? `Applied: ${ran.message}`
            : `${slot ? `${slot.prompt}: ` : ""}${matches.length} ${matches.length === 1 ? "result" : "results"}${clauses.length > 0 ? `, ${clauses.length} staged` : ""}`}
        </span>
      </div>
    </MotionConfig>
  );
}

function Svg({ children, size = 15 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function SearchIcon() {
  return (
    <Svg size={16}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </Svg>
  );
}

function CheckIcon() {
  return (
    <Svg size={13}>
      <path d="M20 6 9 17l-5-5" strokeWidth="2.5" />
    </Svg>
  );
}

function XIcon() {
  return (
    <Svg size={13}>
      <path d="M18 6 6 18M6 6l12 12" strokeWidth="2.5" />
    </Svg>
  );
}
