import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LifelineWordmark } from "@/components/brand/LifelineMark";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/find-blood", label: "Find blood" },
  { to: "/donate", label: "Donate" },
  { to: "/requests", label: "Requests" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const DARK_HERO = ["/", "/find-blood", "/requests", "/donate", "/about", "/dashboard"];
  const onDark = !scrolled && DARK_HERO.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "pointer-events-auto mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-2xl px-3 transition-all duration-300 sm:px-4",
          scrolled ? "glass shadow-lift" : "border border-transparent bg-transparent",
        )}
      >
        <Link
          to="/"
          className="rounded-xl focus-visible:outline-none"
          aria-label="Lifeline home"
          onClick={() => setOpen(false)}
        >
          <LifelineWordmark tone={onDark ? "inverse" : "default"} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  onDark
                    ? active
                      ? "text-white"
                      : "text-white/65 hover:text-white"
                    : active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-primary transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            asChild
            variant="ghost"
            className={cn("rounded-full", onDark && "text-white hover:bg-white/10 hover:text-white")}
          >
            <Link to="/signin">Sign in</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link to="/register">Join Lifeline</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full lg:hidden", onDark && "text-white hover:bg-white/10 hover:text-white")}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open ? (
        <div className="pointer-events-auto mx-auto mt-2 max-w-6xl rounded-2xl glass p-3 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 font-display text-lg font-bold tracking-tight text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  pathname === item.to && "bg-primary-soft text-primary-soft-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button asChild variant="outline" size="lg" className="rounded-xl">
                <Link to="/signin" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button asChild size="lg" className="rounded-xl">
                <Link to="/register" onClick={() => setOpen(false)}>
                  Join
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
