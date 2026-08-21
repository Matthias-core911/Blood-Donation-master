import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BLOOD_TYPES, COMPATIBILITY, type BloodType } from "@/lib/blood";
import { cn } from "@/lib/utils";

export function BloodTypeExplorer() {
  const [selected, setSelected] = useState<BloodType>("O+");
  const { donatesTo, receivesFrom } = COMPATIBILITY[selected];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr]">
      <div>
        <h3 className="font-display text-base font-semibold">Pick a blood type</h3>
        <div
          role="radiogroup"
          aria-label="Blood type"
          className="mt-4 grid grid-cols-4 gap-2 sm:max-w-xs"
        >
          {BLOOD_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={selected === t}
              onClick={() => setSelected(t)}
              className={cn(
                "h-12 rounded-lg border font-display text-sm font-bold transition-colors",
                selected === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Compatibility here is a general guide. The hospital always confirms matching before any
          transfusion.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <CompatPanel
          title={`${selected} can donate to`}
          icon={<ArrowRight className="size-4" aria-hidden />}
          types={donatesTo}
          tone="primary"
        />
        <CompatPanel
          title={`${selected} can receive from`}
          icon={<ArrowLeft className="size-4" aria-hidden />}
          types={receivesFrom}
          tone="success"
        />
      </div>
    </div>
  );
}

function CompatPanel({
  title,
  icon,
  types,
  tone,
}: {
  title: string;
  icon: React.ReactNode;
  types: BloodType[];
  tone: "primary" | "success";
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-card">
      <h4 className="flex items-center gap-2 font-display text-sm font-semibold">
        {icon}
        {title}
      </h4>
      <ul className="mt-4 flex flex-wrap gap-2">
        {types.map((t) => (
          <li
            key={t}
            className={cn(
              "rounded-md px-2.5 py-1.5 font-display text-sm font-semibold",
              tone === "primary"
                ? "bg-primary-soft text-primary-soft-foreground"
                : "bg-success-soft text-success",
            )}
          >
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">{types.length} of 8 blood types</p>
    </div>
  );
}
