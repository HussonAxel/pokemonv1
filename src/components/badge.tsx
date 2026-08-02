import { cn } from "@/lib/utils";
import { getPokemonTypeStyle } from "@/lib/pokemon-type-styles";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

export type BadgeVariant = "type" | "outline" | "secondary";

export type BadgeItem = {
  ariaLabel?: string;
  className?: string;
  key?: string;
  label?: ReactNode;
  style?: CSSProperties;
  variant?: BadgeVariant;
  value: string;
};

type BadgeItemValue = string | BadgeItem;

interface BadgeProps {
  activeItems?: readonly string[];
  className?: string;
  getItemClassName?: (value: string) => string | undefined;
  getItemLabel?: (value: string) => ReactNode;
  getItemStyle?: (value: string) => CSSProperties | undefined;
  itemClassName?: string;
  items: readonly BadgeItemValue[];
  onItemClick?: (event: MouseEvent<HTMLButtonElement>, value: string) => void;
  size?: "xs" | "sm" | "md";
  tone?: "contextual" | "neutral";
  variant?: BadgeVariant;
}

const sizeClassNames = {
  xs: "px-2 py-1 text-[9px]",
  sm: "px-2.5 py-1 text-[10px]",
  md: "px-2.5 py-0.5 text-xs",
} as const;

const variantClassNames: Record<BadgeVariant, string> = {
  type: "uppercase text-secondary-foreground border-[rgb(var(--pokemon-type-color)/0.4)] bg-[rgb(var(--pokemon-type-color)/0.15)]",
  outline: "text-foreground",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
};

function normalizeItem(item: BadgeItemValue): BadgeItem {
  return typeof item === "string" ? { value: item } : item;
}

function Badge({
  activeItems,
  className,
  getItemClassName,
  getItemLabel,
  getItemStyle,
  itemClassName,
  items,
  onItemClick,
  size = "md",
  tone = "contextual",
  variant,
}: BadgeProps) {
  const defaultVariant = variant ?? (tone === "neutral" ? "outline" : "type");

  return (
    <span className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {items.map((rawItem, index) => {
        const item = normalizeItem(rawItem);
        const isActive = activeItems?.includes(item.value) ?? false;
        const itemVariant = item.variant ?? defaultVariant;
        const itemClassNames = cn(
          "inline-flex items-center whitespace-nowrap rounded-[4px] border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          sizeClassNames[size],
          variantClassNames[itemVariant],
          onItemClick &&
            "cursor-pointer appearance-none text-left active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          onItemClick && itemVariant === "type" && "hover:brightness-95",
          isActive && "ring-2 ring-primary/60 ring-offset-1",
          itemClassName,
          getItemClassName?.(item.value),
          item.className,
        );
        const itemStyle = {
          ...(itemVariant === "type" ? getPokemonTypeStyle(item.value) : {}),
          ...getItemStyle?.(item.value),
          ...item.style,
        } satisfies CSSProperties;
        const label = item.label ?? getItemLabel?.(item.value) ?? item.value;
        const key = item.key ?? `${item.value}-${index}`;

        return onItemClick ? (
          <button
            key={key}
            type="button"
            aria-pressed={activeItems ? isActive : undefined}
            aria-label={item.ariaLabel}
            className={itemClassNames}
            style={itemStyle}
            onClick={(event) => onItemClick(event, item.value)}
          >
            {label}
          </button>
        ) : (
          <span key={key} className={itemClassNames} style={itemStyle}>
            {label}
          </span>
        );
      })}
    </span>
  );
}

export default Badge;
export { Badge };
export type { BadgeProps };
