import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, XCircle, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestCard } from "@/components/blood/RequestCard";
import { CardSkeletonGrid } from "@/components/common/CardSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { fetchRequests } from "@/lib/blood";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate blood in Kenya - eligibility and next steps | Lifeline" },
      {
        name: "description",
        content:
          "Check basic blood donation eligibility, see what happens on the day, and find requests near you that match your blood type.",
      },
      { property: "og:title", content: "Donate blood in Kenya - eligibility and next steps" },
      {
        property: "og:description",
        content: "Eligibility basics, what to expect on the day, and requests you can help with.",
      },
    ],
  }),
  component: DonatePage,
});

const CAN = [
  "You are between 16 and 65 years old",
  "You weigh at least 50 kg",
  "You are in good general health today",
  "It has been at least 3 months since your last donation",
];

const WAIT = [
  "You currently have an infection, fever or flu",
  "You are pregnant or gave birth in the last 6 months",
  "You had a tattoo or piercing in the last 3 months",
  "You are being treated for a condition that affects blood",
];

function DonatePage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  return (
    <>
      <section className="relative -mt-20 overflow-hidden bg-ink text-ink-foreground">
        <div className="pointer-events-none absolute inset-0 grad-ember" aria-hidden />
        <div className="pointer-events-none absolute -right-20 top-10 size-[30rem] rounded-full bg-primary/20 blur-3xl" aria-hidden />
        <div className="container-page relative max-w-3xl pb-16 pt-32 md:pb-20 md:pt-40">
          <p className="eyebrow text-primary">Donate</p>
          <h1 className="display-xl mt-5 text-white">
            Under an hour.
            <br />
            Years of difference.
          </h1>
          <p className="mt-6 text-lg text-white/65">
            Register once, tell us when you're available, and we'll only get in touch when someone
            nearby needs your blood type.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link to="/register">Register as a donor</Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link to="/requests">See who needs help</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page section-y" aria-labelledby="eligibility">
        <h2 id="eligibility" className="font-display text-2xl font-bold sm:text-3xl">
          Can you donate?
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A general guide only. Final eligibility is always confirmed by staff at the donation
          centre.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <CheckCircle2 className="size-5 text-success" aria-hidden />
              Usually yes, if
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {CAN.map((c) => (
                <li key={c} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <CalendarClock className="size-5 text-warning-foreground" aria-hidden />
              Please wait, if
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {WAIT.map((c) => (
                <li key={c} className="flex gap-2">
                  <XCircle className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t bg-surface" aria-labelledby="nearby">
        <div className="container-page section-y">
          <h2 id="nearby" className="font-display text-2xl font-bold sm:text-3xl">
            Requests you could help with
          </h2>
          <div className="mt-8">
            {isPending ? (
              <CardSkeletonGrid />
            ) : isError ? (
              <ErrorState
                description="We couldn't load nearby requests."
                onRetry={() => refetch()}
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {(data ?? []).slice(0, 3).map((r) => (
                  <RequestCard key={r.id} request={r} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
