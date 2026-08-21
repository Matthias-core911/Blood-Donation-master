import { cn } from "@/lib/utils";

/**
 * Lifeline brand mark: a drop formed from a connecting line - the thread
 * between a donor and a patient.
 */
export function LifelineMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-full", className)}
      fill="none"
      aria-hidden
      focusable="false"
    >
      <path
        d="M16 3.5c4.6 5.2 8 9.4 8 13.6a8 8 0 1 1-16 0c0-4.2 3.4-8.4 8-13.6Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M16 3.5c4.6 5.2 8 9.4 8 13.6a8 8 0 1 1-16 0c0-4.2 3.4-8.4 8-13.6Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 18h3l2-3.4 2.6 6 1.8-2.6h3.6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LifelineWordmark({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-xl p-1.5",
          tone === "inverse"
            ? "bg-white/12 text-white ring-1 ring-white/25"
            : "grad-blood text-primary-foreground shadow-card",
        )}
      >
        <LifelineMark />
      </span>
      <span
        className={cn(
          "font-display text-[1.15rem] font-extrabold tracking-[-0.04em]",
          tone === "inverse" && "text-white",
        )}
      >
        Lifeline
      </span>
    </span>
  );
}
