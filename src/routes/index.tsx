import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSkeletonGrid } from "@/components/common/CardSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { StatCounter } from "@/components/common/StatCounter";
import { Reveal } from "@/components/common/Reveal";
import { RequestRow } from "@/components/blood/RequestRow";
import { ProximityMap } from "@/components/brand/ProximityMap";
import { WordMarquee } from "@/components/brand/WordMarquee";
import { BloodTypeExplorer } from "@/components/marketing/BloodTypeExplorer";
import { fetchRequests, fetchNetworkStats } from "@/lib/blood";
import heroDonor from "@/assets/hero-donor.jpg";
import community from "@/assets/community.jpg";
import storyDonor from "@/assets/story-donor.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lifeline - Someone nearby is waiting for your blood type" },
      {
        name: "description",
        content:
          "Lifeline connects verified blood donors with patients across Kenya. Post a request in minutes, or register to donate and help someone a few kilometres away.",
      },
      { property: "og:title", content: "Lifeline - Someone nearby is waiting" },
      {
        property: "og:description",
        content:
          "A Kenyan network of verified donors and blood requests. Show up for someone nearby.",
      },
    ],
  }),
  component: HomePage,
});

const ARC = [
  {
    n: "01",
    title: "Notice",
    body: "Requests near you appear with the blood type, the facility and how soon it is needed.",
  },
  {
    n: "02",
    title: "Understand",
    body: "Compatibility, distance and verification are shown plainly - no guesswork, no phone tree.",
  },
  {
    n: "03",
    title: "Participate",
    body: "Register as a donor in two minutes, or publish a request with the units you need.",
  },
  {
    n: "04",
    title: "Connect",
    body: "When both sides agree, contact details are shared and the hospital coordinates collection.",
  },
  {
    n: "05",
    title: "Impact",
    body: "One visit is separated into red cells, platelets and plasma - often more than one patient.",
  },
];

function HomePage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });
  const { data: stats } = useQuery({
    queryKey: ["network-stats"],
    queryFn: fetchNetworkStats,
  });
  const wall = data?.slice(0, 5) ?? [];
  const urgentCount = data?.filter((r) => r.urgency === "urgent").length ?? 0;

  return (
    <>
      {/* 01 - NOTICE: campaign hero */}
      <section className="relative -mt-20 overflow-hidden bg-ink text-ink-foreground">
        <div className="pointer-events-none absolute inset-0 grad-ember" aria-hidden />
        <div
          className="pointer-events-none absolute -left-40 top-1/3 size-[36rem] rounded-full bg-primary/25 blur-3xl"
          aria-hidden
        />

        <div className="container-page relative grid gap-10 pb-16 pt-32 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:pb-24 lg:pt-40">
          <div className="reveal-up">
            <h1 className="display-xl mt-6 text-white">
              Someone nearby
              <br />
              is <span className="text-primary">waiting</span>.
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/70">
              Lifeline is a network of people who show up for one another. Verified donors, verified
              requests, matched in minutes instead of a night of phone calls.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl" className="group rounded-full">
                <Link to="/find-blood">
                  I need blood
                  <ArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="rounded-full border-white/30 bg-white/5 text-white hover:bg-white hover:text-ink"
              >
                <Link to="/donate">I want to donate</Link>
              </Button>
            </div>

            <p className="mt-7 flex items-center gap-2 text-sm text-white/55">
              <ShieldCheck className="size-4 text-primary" aria-hidden />
              Contact details stay private until both sides agree to a match.
            </p>
          </div>

          {/* Photography + floating glass layer */}
          <div className="relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] lg:max-w-none">
              <img
                src={heroDonor}
                alt="A young Kenyan donor standing calmly after giving blood"
                width={1280}
                height={1600}
                fetchPriority="high"
                className="size-full object-cover object-top"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"
                aria-hidden
              />
            </div>

            <div className="absolute -left-2 top-8 rounded-2xl glass-dark px-4 py-3 sm:left-2">
              <p className="font-display text-3xl font-extrabold tracking-tight">O+</p>
              <p className="eyebrow mt-1 opacity-65">Available today</p>
            </div>

            <div className="absolute -bottom-6 right-0 w-[15.5rem] rounded-2xl glass-dark p-4 sm:right-2">
              <p className="eyebrow flex items-center gap-1.5 opacity-65">
                <MapPin className="size-3.5" aria-hidden /> Nairobi
              </p>
              <p className="mt-2 text-sm leading-snug">
                <span className="font-semibold">{urgentCount || 3} urgent requests</span> within
                about 10 km of you right now.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs opacity-70">
                <span className="lifeline-rule w-10" aria-hidden />
                Donor → Patient
              </div>
            </div>
          </div>
        </div>
      </section>

      <WordMarquee />

      {/* 02 - UNDERSTAND: proximity */}
      <section className="grad-rose" aria-labelledby="proximity">
        <div className="container-page section-y grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-primary">02 - Understand</p>
            <h2 id="proximity" className="display-lg mt-4">
              The need is closer than you think.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Most blood is needed within a few kilometres of someone who could give it. Lifeline
              draws that line - between a donor in Nairobi and a patient across town, between Kisumu
              and Nakuru, between you and someone you'll probably never meet.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full">
              <Link to="/find-blood">
                Search near me
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={120} className="rounded-3xl border bg-card p-5 shadow-card sm:p-8">
            <ProximityMap />
          </Reveal>
        </div>
      </section>

      {/* 03 - PARTICIPATE: the request wall */}
      <section
        className="relative overflow-hidden bg-ink text-ink-foreground"
        aria-labelledby="wall"
      >
        <div className="pointer-events-none absolute inset-0 cell-field opacity-25" aria-hidden />
        <div className="container-page section-y relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-primary">03 - Participate</p>
              <h2 id="wall" className="display-lg mt-4 text-white">
                Blood needed now.
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/25 bg-transparent text-white hover:bg-white hover:text-ink"
            >
              <Link to="/requests">
                All requests
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="mt-10" aria-live="polite">
            {isPending ? (
              <CardSkeletonGrid count={3} />
            ) : isError ? (
              <ErrorState
                description="We couldn't load nearby requests just now."
                onRetry={() => refetch()}
              />
            ) : (
              <div className="border-b border-white/10">
                {wall.map((r, i) => (
                  <Reveal key={r.id} delay={i * 70}>
                    <RequestRow request={r} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 04 - CONNECT: the arc */}
      <section className="bg-background" aria-labelledby="arc">
        <div className="container-page section-y">
          <p className="eyebrow text-primary">04 - Connect</p>
          <h2 id="arc" className="display-lg mt-4 max-w-2xl">
            One donation. One connection. One more tomorrow.
          </h2>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {ARC.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 80} className="bg-card p-6">
                <span className="font-display text-sm font-extrabold text-primary">{s.n}</span>
                <span className="lifeline-rule mt-4 block" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Human storytelling */}
      <section className="border-y bg-surface" aria-labelledby="story">
        <div className="container-page section-y grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative">
            <img
              src={storyDonor}
              alt="A donor waiting in a bright, modern Kenyan clinic"
              width={1200}
              height={1200}
              loading="lazy"
              className="mask-organic aspect-square w-full object-cover shadow-lift"
            />
            <div className="absolute bottom-5 left-0 max-w-[16rem] rounded-2xl glass p-4 sm:left-4">
              <p className="text-sm leading-snug">
                “I gave blood on my lunch break and was back at my desk by two.”
              </p>
              <p className="eyebrow mt-3 text-muted-foreground">Sample story · Nairobi · O−</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow text-primary">Human, first</p>
            <h2 id="story" className="display-lg mt-4">
              We are connected by showing up.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Donating takes under an hour. Most healthy adults can give every three to four months.
              Nothing about it is dramatic - it is simply one of the few things any of us can do
              that another person cannot do for themselves.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Stories shown on Lifeline are illustrative samples until consented donor stories are
              published.
            </p>
            <Button asChild size="lg" variant="soft" className="mt-8 rounded-full">
              <Link to="/donate">Check if you can donate</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* 05 - IMPACT */}
      <section className="relative overflow-hidden grad-blood text-white" aria-labelledby="impact">
        <img
          src={community}
          alt=""
          aria-hidden
          width={1600}
          height={1008}
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="container-page section-y relative">
          <p className="eyebrow text-white/70">05 - Impact</p>
          <h2 id="impact" className="display-lg mt-4 max-w-xl">
            A movement measured in people.
          </h2>
          <div className="mt-14 grid gap-10 text-white sm:grid-cols-3">
            <StatCounter value={stats?.donorsRegistered ?? 0} label="Donors registered" />
            <StatCounter value={stats?.connectionsMade ?? 0} label="Connections made" />
            <StatCounter value={stats?.unitsDonated ?? 0} label="Units donated" />
          </div>
        </div>
      </section>

      {/* Explorer */}
      <section className="bg-background" aria-labelledby="explorer">
        <div className="container-page section-y">
          <p className="eyebrow text-primary">Know your type</p>
          <h2 id="explorer" className="display-lg mt-4">
            Who can you help?
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Select a blood type to see who can give to it, and who it can give to.
          </p>
          <div className="mt-10">
            <BloodTypeExplorer />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="pointer-events-none absolute inset-0 grad-ember opacity-90" aria-hidden />
        <div className="container-page section-y relative text-center">
          <h2 className="display-xl mx-auto max-w-4xl text-white">Join the Lifeline.</h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-white/70">
            Register today so you're reachable on the day it counts - or post a request if someone
            you love needs blood now.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="xl" className="rounded-full">
              <Link to="/register">Become a donor</Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="rounded-full border-white/30 bg-white/5 text-white hover:bg-white hover:text-ink"
            >
              <Link to="/requests/new">Request blood</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}


