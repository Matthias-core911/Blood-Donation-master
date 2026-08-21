import { cn } from "@/lib/utils";

const tones = {
  success: "bg-success",
  warning: "bg-warning",
  urgent: "bg-urgent",
  muted: "bg-muted-foreground/50",
};

export function StatusDot({
  tone = "success",
  label,
  className,
}: {
  tone?: keyof typeof tones;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border bg-background px-2.5 py-1 text-xs font-medium",
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", tones[tone])} aria-hidden />
      {label}
    </span>
  );
}
