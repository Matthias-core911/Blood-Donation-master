import { BadgeCheck, ShieldQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

export function VerifiedTag({ verified, className }: { verified: boolean; className?: string }) {
  const Icon = verified ? BadgeCheck : ShieldQuestion;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        verified ? "text-success" : "text-muted-foreground",
        className,
      )}
    >
      <Icon className="size-4" aria-hidden />
      {verified ? "Verified" : "Pending verification"}
    </span>
  );
}
