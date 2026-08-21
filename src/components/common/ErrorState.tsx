import { CloudOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this right now. Check your connection and try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-4 rounded-3xl border bg-card px-6 py-16 text-center"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-warning-soft text-warning-foreground">
        <CloudOff className="size-5" aria-hidden />
      </span>
      <div className="max-w-sm space-y-1.5">
        <h3 className="font-display text-base font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {onRetry ? (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
