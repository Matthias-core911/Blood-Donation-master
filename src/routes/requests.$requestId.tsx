import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Timer, Building2, Droplet, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { BloodTypeBadge } from "@/components/blood/BloodTypeBadge";
import { UrgencyBadge } from "@/components/blood/UrgencyBadge";
import { VerifiedTag } from "@/components/blood/VerifiedTag";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { fetchRequest, pledgeToRequest } from "@/lib/blood";

export const Route = createFileRoute("/requests/$requestId")({
  head: () => ({
    meta: [
      { title: "Blood request details - Lifeline" },
      {
        name: "description",
        content:
          "Review a verified blood request: blood type, units needed, facility, timeframe and how to pledge a donation.",
      },
      { property: "og:title", content: "Blood request details - Lifeline" },
      {
        property: "og:description",
        content: "Blood type, units needed, facility and timeframe for this request.",
      },
    ],
  }),
  component: RequestDetail,
  notFoundComponent: () => (
    <div className="container-page section-y">
      <EmptyState
        icon={Droplet}
        title="Request not found"
        description="This request may have been fulfilled or withdrawn."
        action={
          <Button asChild>
            <Link to="/requests">Back to requests</Link>
          </Button>
        }
      />
    </div>
  ),
});

function RequestDetail() {
  const { requestId } = Route.useParams();
  const navigate = useNavigate();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["request", requestId],
    queryFn: async () => {
      const r = await fetchRequest(requestId);
      if (!r) throw notFound();
      return r;
    },
  });

  if (isPending) {
    return (
      <div className="container-page section-y max-w-4xl space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-56 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container-page section-y max-w-4xl">
        <ErrorState description="We couldn't load this request." onRetry={() => refetch()} />
      </div>
    );
  }

  const pct = Math.round((data.unitsPledged / data.units) * 100);

  return (
    <div className="container-page section-y max-w-4xl">
      <Link
        to="/requests"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All requests
      </Link>

      <div className="mt-6 rounded-xl border bg-card p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <BloodTypeBadge type={data.bloodType} size="lg" />
            <div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl">
                {data.units} {data.units === 1 ? "unit" : "units"} of {data.bloodType} needed
              </h1>
              <p className="mt-1 text-muted-foreground">
                {data.patientAlias} · posted {data.postedAgo}
              </p>
            </div>
          </div>
          <UrgencyBadge urgency={data.urgency} />
        </div>

        <div className="mt-8 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {data.unitsPledged} of {data.units} units pledged
            </span>
            <span className="text-muted-foreground">{pct}%</span>
          </div>
          <Progress value={pct} className="h-2" />
        </div>

        <dl className="mt-8 grid gap-5 sm:grid-cols-2">
          <Detail icon={Building2} label="Facility" value={data.facility} />
          <Detail
            icon={MapPin}
            label="Location"
            value={`${data.city}, ${data.county} · ${data.distanceKm} km away`}
          />
          <Detail icon={Timer} label="Needed by" value={data.neededBy} />
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 text-muted-foreground" aria-hidden />
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">Status</dt>
              <dd className="mt-1">
                <VerifiedTag verified={data.verified} />
              </dd>
            </div>
          </div>
        </dl>

        {data.note ? (
          <p className="mt-8 rounded-lg bg-surface p-4 text-sm leading-relaxed text-muted-foreground">
            {data.note}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row">
          <Button
            size="lg"
            onClick={() => {
              pledgeToRequest(data.id).then(() => {
                toast.success("Pledge recorded", {
                  description: "Next, pick a donation centre, date and time.",
                });
                navigate({
                  to: "/schedule-donation",
                  search: { donorName: "", bloodType: data.bloodType, requestId: data.id },
                });
              });
            }}
          >
            Pledge to donate
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => toast("Link copied to share with your network")}
          >
            Share this request
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Donation, screening and transfusion take place at the listed facility. Lifeline only
          coordinates the connection.
        </p>
      </div>
    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-5 text-muted-foreground" aria-hidden />
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="mt-1 text-sm font-medium">{value}</dd>
      </div>
    </div>
  );
}
