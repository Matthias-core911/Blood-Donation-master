import { Link } from "@tanstack/react-router";
import { LifelineWordmark } from "@/components/brand/LifelineMark";

const PLATFORM = [
  { to: "/find-blood", label: "Find blood" },
  { to: "/donate", label: "Become a donor" },
  { to: "/requests", label: "Open requests" },
  { to: "/requests/new", label: "Create a request" },
] as const;

const ORG = [
  { to: "/about", label: "About Lifeline" },
  { to: "/dashboard", label: "Donor dashboard" },
  { to: "/profile", label: "Profile & privacy" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute inset-0 cell-field opacity-20" aria-hidden />
      <div className="container-page relative grid gap-10 py-16 md:grid-cols-4">
        <div className="space-y-5 md:col-span-2">
          <Link to="/" aria-label="Lifeline home">
            <LifelineWordmark tone="inverse" />
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            A Kenyan community network that connects verified donors with people who need blood.
            Lifeline coordinates connections - collection and transfusion always happen at a
            licensed facility.
          </p>
          <p className="font-display text-2xl font-extrabold tracking-[-0.03em] text-white/90">
            Show up for one another.
          </p>
        </div>
        <nav aria-label="Platform" className="space-y-4 text-sm">
          <h2 className="eyebrow text-white/50">Platform</h2>
          <ul className="space-y-2.5 text-white/70">
            {PLATFORM.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Organisation" className="space-y-4 text-sm">
          <h2 className="eyebrow text-white/50">Organisation</h2>
          <ul className="space-y-2.5 text-white/70">
            {ORG.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Lifeline. All rights reserved.</p>
          <p>Lifeline does not provide medical advice or guarantee blood availability.</p>
        </div>
      </div>
    </footer>
  );
}
