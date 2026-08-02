import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  value?: number;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, max = 100, value = 0, ...props }, ref) => {
    const safeMax = max > 0 ? max : 100;
    const percentage = Math.min(100, Math.max(0, (value / safeMax) * 100));

    return (
      <div
        {...props}
        ref={ref}
        role="progressbar"
        aria-valuemax={safeMax}
        aria-valuemin={0}
        aria-valuenow={value}
        className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}
      >
        <span
          className="block h-full rounded-full bg-primary transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  },
);

Progress.displayName = "Progress";

export { Progress };
export type { ProgressProps };
