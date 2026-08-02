"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#/lib/utils.ts";
import { useShape } from "#/lib/shape-context.tsx";

const badgeColors = {
  gray: "#6B7280",
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
} as const;

type BadgeColor = keyof typeof badgeColors;

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        solid: "",
        dot: "",
      },
      size: {
        sm: "h-5 px-2 text-[11px] gap-1",
        md: "h-6 px-2.5 text-[12px] gap-1.5",
        lg: "h-7 px-3 text-[13px] gap-1.5",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  },
);

interface BadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color">, VariantProps<typeof badgeVariants> {
  color?: BadgeColor;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant = "solid", size = "md", color = "gray", children, style, ...props },
    ref,
  ) => {
    const shape = useShape();
    const colorValue = badgeColors[color];
    const isSolid = variant === "solid";
    const dotSize = size === "sm" ? 6 : size === "lg" ? 8 : 7;

    const colorStyle = {
      color: `color-mix(in oklab, ${colorValue} 72%, var(--foreground))`,
      backgroundColor: isSolid
        ? `color-mix(in oklab, ${colorValue} 16%, var(--background))`
        : `color-mix(in oklab, ${colorValue} 7%, var(--background))`,
      boxShadow: [
        `inset 0 0 0 1px color-mix(in oklab, ${colorValue} 58%, transparent)`,
        "0 1px 1px color-mix(in srgb, var(--foreground) 4%, transparent)",
      ].join(", "),
    };

    const dotColor = color === "gray" ? "var(--muted-foreground)" : colorValue;

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), shape.item, className)}
        style={{ ...colorStyle, ...style }}
        {...props}
      >
        {!isSolid && (
          <span
            className="shrink-0 rounded-md"
            style={{
              width: dotSize,
              height: dotSize,
              backgroundColor: dotColor,
              boxShadow: `0 0 0 2px color-mix(in oklab, ${dotColor} 16%, transparent)`,
            }}
          />
        )}
        {/* text-box needs a block container — the badge root is a flex
            container, so the label gets its own span. Height is fixed (h-*),
            so trimming only recenters the letterforms. */}
        <span className="capitalize py-2 px-1">{children}</span>
      </span>
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badgeVariants, badgeColors };
export type { BadgeProps, BadgeColor };
