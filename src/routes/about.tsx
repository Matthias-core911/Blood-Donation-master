import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Users, Hospital, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Lifeline - How the blood donor network works" },
      {
        name: "description",
        content:
          "Lifeline is a Kenyan blood donor network connecting verified donors with patients. Learn how verification, privacy and hospital coordination work.",
      },
      { property: "og:title", content: "About Lifeline - How the blood donor network works" },
      {
        property: "og:description",
        content:
          "How Lifeline verifies donors and requests, protects privacy, and works with licensed facilities in Kenya.",
      },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Verification before visibility",
    body: "Requests are checked against the requesting facility, and donors confirm eligibility before appearing in search results.",
  },
  {
    icon: Lock,
    title: "Privacy by default",
    body: "We show a first name, an approximate area and blood type. Exact locations and phone numbers are only shared when both sides agree to a match.",
  },
  {
    icon: Hospital,
    title: "Facilities stay in charge",
    body: "Lifeline coordinates people. Screening, collection and transfusion always happen at a licensed hospital or blood bank.",
  },
  {
    icon: Users,
    title: "Built for how Kenya donates",
    body: "Mobile-first, low-bandwidth friendly, and organised around counties, referral hospitals and community drives.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="relative -mt-20 overflow-hidden bg-ink text-ink-foreground">
        <div className="pointer-events-none absolute inset-0 grad-ember" aria-hidden />
        <div className="pointer-events-none absolute -left-24 top-0 size-[28rem] rounded-full bg-primary/20 blur-3xl" aria-hidden />
        <div className="container-page relative max-w-3xl pb-16 pt-32 md:pb-20 md:pt-40">
          <p className="eyebrow text-primary">About</p>
          <h1 className="display-xl mt-5 text-white">
            A calmer way to find blood.
          </h1>
          <p className="mt-6 text-lg text-white/65">
            Most blood searches in Kenya still happen through group chats and phone trees. Lifeline
            turns that scramble into a clear, verified list of people who can actually help -
            without exposing anyone's private details.
          </p>
        </div>
      </section>

      <section className="container-page section-y">
        <div className="grid gap-6 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <article key={p.title} className="rounded-xl border bg-card p-6 shadow-card">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
                <p.icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-xl border bg-surface p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
          <h2 className="font-display text-base font-semibold text-foreground">
            What Lifeline does not do
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>We do not give medical advice or determine transfusion suitability.</li>
            <li>We cannot guarantee that a matching donor will be found in time.</li>
            <li>We never sell or share personal data with advertisers.</li>
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/register">Become a donor</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/requests">See open requests</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
