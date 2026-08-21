import { Link } from "@tanstack/react-router";
import { MapPin, Timer, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BloodTypeBadge } from "./BloodTypeBadge";
import { UrgencyBadge } from "./UrgencyBadge";
import { VerifiedTag } from "./VerifiedTag";
import { cn } from "@/lib/utils";
import type { BloodRequest } from "@/lib/blood";

export function RequestCard({ request }: { request: BloodRequest }) {
  const urgent = request.urgency === "urgent";
  return (
    <article
      className={cn(
        "group flex h-full flex-col gap-4 rounded-2xl border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        urgent && "border-urgent/40",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <BloodTypeBadge type={request.bloodType} size="lg" tone={urgent ? "solid" : "soft"} className={urgent ? "relative pulse-ring" : ""} />
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-bold tracking-tight">
              {request.units} {request.units === 1 ? "unit" : "units"} needed
            </h3>
            <p className="truncate text-sm text-muted-foreground">{request.facility}</p>
          </div>
        </div>
        <UrgencyBadge urgency={request.urgency} />
      </div>

      <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="size-4 shrink-0" aria-hidden />
          <dt className="sr-only">Location</dt>
          <dd className="truncate">
            {request.city} · {request.distanceKm} km away
          </dd>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Timer className="size-4 shrink-0" aria-hidden />
          <dt className="sr-only">Needed by</dt>
          <dd className="truncate">{request.neededBy}</dd>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Droplet className="size-4 shrink-0" aria-hidden />
          <dt className="sr-only">Pledges</dt>
          <dd>
            {request.unitsPledged} of {request.units} pledged
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <VerifiedTag verified={request.verified} />
        </div>
      </dl>

      <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
        <span className="text-xs text-muted-foreground">Posted {request.postedAgo}</span>
        <Button asChild size="sm" variant={urgent ? "default" : "soft"} className="rounded-full">
          <Link to="/requests/$requestId" params={{ requestId: request.id }}>
            View request
          </Link>
        </Button>
      </div>
    </article>
  );
}
