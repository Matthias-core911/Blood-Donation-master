import { cn } from "@/lib/utils";
import type { BloodType } from "@/lib/blood";

const sizes = {
  sm: "h-8 min-w-8 px-1.5 text-xs",
  md: "h-11 min-w-11 px-2 text-sm",
  lg: "h-16 min-w-16 px-3 text-xl",
};

export function BloodTypeBadge({
  type,
  size = "md",
  tone = "solid",
  className,
}: {
  type: BloodType;
  size?: keyof typeof sizes;
  tone?: "solid" | "soft";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-display font-extrabold tabular-nums tracking-[-0.04em]",
        tone === "solid"
          ? "bg-primary text-primary-foreground"
          : "bg-primary-soft text-primary-soft-foreground",
        sizes[size],
        className,
      )}
    >
      <span className="sr-only">Blood type </span>
      {type}
    </span>
  );
}
