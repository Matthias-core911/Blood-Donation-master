const WORDS = ["SHOW UP", "DONATE", "CONNECT", "TOGETHER", "ONE MORE TOMORROW"];

/** Typographic band - the brand voice as a moving rule between sections. */
export function WordMarquee() {
  const run = [...WORDS, ...WORDS];
  return (
    <div
      className="overflow-hidden border-y border-white/10 bg-ink py-5 text-ink-foreground"
      aria-hidden
    >
      <div className="marquee-track items-center gap-8">
        {run.map((w, i) => (
          <span key={`${w}-${i}`} className="flex items-center gap-8">
            <span className="font-display text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
              {w}
            </span>
            <span className="size-1.5 rounded-full bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
