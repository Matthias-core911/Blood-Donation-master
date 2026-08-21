import { Link } from "@tanstack/react-router";
import { MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BloodTypeBadge } from "./BloodTypeBadge";
import { VerifiedTag } from "./VerifiedTag";
import { StatusDot } from "@/components/common/StatusDot";
import type { Donor } from "@/lib/blood";

export function DonorCard({ donor }: { donor: Donor }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <BloodTypeBadge type={donor.bloodType} tone="soft" />
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold">{donor.displayName}</h3>
            <VerifiedTag verified={donor.verified} />
          </div>
        </div>
        <StatusDot
          tone={donor.available ? "success" : "muted"}
          label={donor.available ? "Available" : "Unavailable"}
        />
      </div>

      <dl className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 shrink-0" aria-hidden />
          <dt className="sr-only">Approximate area</dt>
          <dd className="truncate">
            {donor.city} · about {donor.distanceKm} km away
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="size-4 shrink-0" aria-hidden />
          <dt className="sr-only">Donations</dt>
          <dd>
            {donor.donations} {donor.donations === 1 ? "donation" : "donations"} · last verified{" "}
            {donor.lastVerified.toLowerCase()}
          </dd>
        </div>
      </dl>

      <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
        <span className="text-xs text-muted-foreground">Contact shared after a match</span>
        <Button asChild size="sm" variant="outline" className="rounded-full">
          <Link
            to="/schedule-donation"
            search={{ donorName: donor.displayName, bloodType: donor.bloodType, requestId: "" }}
          >
            Request contact
          </Link>
        </Button>
      </div>
    </article>
  );
}
