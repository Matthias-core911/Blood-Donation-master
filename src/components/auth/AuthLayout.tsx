import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Droplet, ShieldCheck } from "lucide-react";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-14 sm:px-6">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer ? <div className="mt-6 text-sm text-muted-foreground">{footer}</div> : null}
        </div>
      </div>
      <aside className="hidden border-l bg-surface lg:flex lg:items-center">
        <div className="mx-auto max-w-md px-10 py-16">
          <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Droplet className="size-5" aria-hidden />
            </span>
            Lifeline
          </Link>
          <p className="mt-8 text-balance font-display text-2xl font-semibold leading-snug">
            Every registered donor shortens the search for someone who is waiting.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
            {[
              "Your contact details stay private until you accept a match.",
              "You choose your radius, availability and how often we contact you.",
              "Requests are checked with the facility before they go live.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
