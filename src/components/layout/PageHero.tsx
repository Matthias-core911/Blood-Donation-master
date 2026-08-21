import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared editorial page band - dark, typographic, sits under the floating nav. */
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("relative -mt-20 overflow-hidden bg-ink text-ink-foreground", className)}
    >
      <div className="pointer-events-none absolute inset-0 grad-ember" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 top-0 size-[28rem] rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative grid gap-6 pb-14 pt-32 sm:pb-16 md:grid-cols-[1.2fr_auto] md:items-end md:pt-36">
        <div className="reveal-up max-w-2xl">
          {eyebrow ? <p className="eyebrow text-primary">{eyebrow}</p> : null}
          <h1 className="display-lg mt-4 text-white">{title}</h1>
          {description ? (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}
