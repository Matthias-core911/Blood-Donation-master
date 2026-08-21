import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bell, Droplet, HeartHandshake, CalendarClock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/PageHero";
import { BloodTypeBadge } from "@/components/blood/BloodTypeBadge";
import { StatusDot } from "@/components/common/StatusDot";
import { RequestCard } from "@/components/blood/RequestCard";
import { CardSkeletonGrid } from "@/components/common/CardSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { fetchRequests } from "@/lib/blood";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Donor dashboard - Lifeline" },
      {
        name: "description",
        content:
          "Your donor status, eligibility dates, nearby blood requests, donation impact and recent activity.",
      },
      { property: "og:title", content: "Donor dashboard - Lifeline" },
      {
        property: "og:description",
        content: "Donor status, eligibility, nearby requests and your donation impact.",
      },
    ],
  }),
  component: DashboardPage,
});

const ACTIVITY = [
  { when: "2 days ago", text: "You confirmed availability for the next 30 days." },
  { when: "12 June", text: "Donation completed at Kenyatta National Hospital." },
  { when: "9 June", text: "You pledged to request #1012 (O+, 1 unit)." },
];

function DashboardPage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });
  const nearby = (data ?? []).filter((r) => r.distanceKm <= 10);

  return (
    <>
      <PageHero
        eyebrow="Your Lifeline"
        title={<>Good morning, Sarah.</>}
        description="You're visible to requests within 15 km of Nairobi County."
        actions={
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/30 bg-white/5 text-white hover:bg-white hover:text-ink"
          >
            <Link to="/profile">
              <Bell aria-hidden />
              Notification settings
            </Link>
          </Button>
        }
      />
      <div className="container-page py-12 md:py-16">

      <div className="grid gap-4 lg:grid-cols-3">
        <section
          className="rounded-xl border bg-card p-6 shadow-card lg:col-span-2"
          aria-labelledby="status"
        >
          <h2 id="status" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Your donor status
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-5">
            <BloodTypeBadge type="O+" size="lg" />
            <div className="flex-1">
              <StatusDot tone="success" label="Available to donate" />
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted-foreground">Last donation</dt>
                  <dd className="mt-1 font-medium">12 June 2026</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Next eligible date</dt>
                  <dd className="mt-1 font-medium">12 August 2026</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-card p-6 shadow-card" aria-labelledby="impact">
          <h2 id="impact" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Your impact
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
                <Droplet className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">donations recorded</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-success-soft text-success">
                <HeartHandshake className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-2xl font-bold">9</p>
                <p className="text-sm text-muted-foreground">patients potentially supported</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-10" aria-labelledby="nearby-requests">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="nearby-requests" className="font-display text-xl font-semibold">
            Requests near you
          </h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/requests">
              All requests
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        <div className="mt-6">
          {isPending ? (
            <CardSkeletonGrid />
          ) : isError ? (
            <ErrorState description="We couldn't load nearby requests." onRetry={() => refetch()} />
          ) : nearby.length === 0 ? (
            <EmptyState
              icon={CalendarClock}
              title="No requests near you right now"
              description="We'll notify you the moment a compatible request appears within your radius."
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {nearby.map((r) => (
                <RequestCard key={r.id} request={r} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="activity">
        <h2 id="activity" className="font-display text-xl font-semibold">
          Recent activity
        </h2>
        <ul className="mt-6 divide-y rounded-xl border bg-card">
          {ACTIVITY.map((a) => (
            <li key={a.text} className="flex flex-wrap items-center justify-between gap-2 p-4 text-sm">
              <span>{a.text}</span>
              <span className="text-xs text-muted-foreground">{a.when}</span>
            </li>
          ))}
        </ul>
      </section>
      </div>
    </>
  );
}
