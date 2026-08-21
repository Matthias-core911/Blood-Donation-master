import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { URGENCY_LABEL, type BloodRequest } from "@/lib/blood";

/**
 * Request wall row - blood type leads, urgency pulses, the whole row is the link.
 * Used on dark, immersive sections.
 */
export function RequestRow({ request }: { request: BloodRequest }) {
  const urgent = request.urgency === "urgent";
  return (
    <Link
      to="/requests/$requestId"
      params={{ requestId: request.id }}
      className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-t border-white/10 py-5 transition-colors hover:bg-white/[0.04] sm:gap-6 sm:py-6"
    >
      <span
        className={cn(
          "relative grid h-14 w-16 shrink-0 place-items-center rounded-xl font-display text-xl font-extrabold tracking-tight sm:h-16 sm:w-20 sm:text-2xl",
          urgent ? "bg-primary text-primary-foreground pulse-ring" : "bg-white/10 text-white",
        )}
      >
        <span className="sr-only">Blood type </span>
        {request.bloodType}
      </span>

      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="truncate font-display text-lg font-bold text-white sm:text-xl">
            {request.units} {request.units === 1 ? "unit" : "units"} · {request.city}
          </span>
          <span
            className={cn(
              "eyebrow rounded-full px-2 py-1",
              urgent
                ? "bg-primary/25 text-white"
                : request.urgency === "soon"
                  ? "bg-white/10 text-white/80"
                  : "bg-white/5 text-white/60",
            )}
          >
            {URGENCY_LABEL[request.urgency]}
          </span>
        </span>
        <span className="mt-1 flex items-center gap-1.5 truncate text-sm text-white/55">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          {request.facility} · {request.neededBy.toLowerCase()}
        </span>
      </span>

      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-ink">
        <ArrowUpRight className="size-4" aria-hidden />
      </span>
    </Link>
  );
}
