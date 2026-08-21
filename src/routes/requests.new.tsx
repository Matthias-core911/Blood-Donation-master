import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  BLOOD_TYPES,
  KENYAN_COUNTIES,
  URGENCY_LABEL,
  publishRequest,
  type BloodType,
  type Urgency,
} from "@/lib/blood";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/requests/new")({
  head: () => ({
    meta: [
      { title: "Create a blood request - Lifeline" },
      {
        name: "description",
        content:
          "Publish a blood request in a few steps: patient details, blood requirements, location, urgency and review.",
      },
      { property: "og:title", content: "Create a blood request - Lifeline" },
      {
        property: "og:description",
        content: "Publish a request in five short steps and reach compatible donors nearby.",
      },
    ],
  }),
  component: NewRequestPage,
});

const STEPS = ["Patient", "Requirement", "Location", "Urgency", "Review"];

function NewRequestPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    alias: "",
    relationship: "",
    bloodType: "O+" as BloodType,
    units: "2",
    facility: "",
    county: "Nairobi County",
    area: "",
    urgency: "soon" as Urgency,
    neededBy: "",
    note: "",
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const [submitting, setSubmitting] = useState(false);

  const submit = () => {
    setSubmitting(true);
    publishRequest({
      alias: form.alias,
      relationship: form.relationship,
      bloodType: form.bloodType,
      units: Number(form.units) || 1,
      facility: form.facility,
      county: form.county,
      area: form.area,
      urgency: form.urgency,
      neededBy: form.neededBy,
      ...(form.note ? { note: form.note } : {}),
    })
      .then(() => {
        toast.success("Request published", {
          description: "Compatible donors nearby are being notified now.",
        });
        navigate({ to: "/requests" });
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="container-page section-y max-w-3xl">
      <Link
        to="/requests"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Cancel
      </Link>

      <p className="eyebrow mt-8 text-primary">New request</p>
      <h1 className="display-lg mt-4">Create a blood request.</h1>
      <p className="mt-4 text-muted-foreground">
        Five short steps. Only the patient's initial is shown publicly.
      </p>

      <ol className="mt-8 flex flex-wrap gap-2" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex-1 min-w-24">
            <div
              className={cn("h-1.5 rounded-full", i <= step ? "bg-primary" : "bg-muted")}
              aria-hidden
            />
            <span
              className={cn(
                "mt-2 block text-xs font-medium",
                i === step ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {i + 1}. {s}
              {i === step ? <span className="sr-only"> (current step)</span> : null}
            </span>
          </li>
        ))}
      </ol>

      <form
        className="mt-8 rounded-xl border bg-card p-6 shadow-card sm:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (step === STEPS.length - 1) submit();
          else setStep((s) => s + 1);
        }}
      >
        {step === 0 ? (
          <fieldset className="space-y-5">
            <legend className="font-display text-lg font-semibold">Patient information</legend>
            <div className="space-y-2">
              <Label htmlFor="alias">Patient initial or alias</Label>
              <Input
                id="alias"
                required
                maxLength={40}
                placeholder="e.g. Patient M."
                value={form.alias}
                onChange={(e) => set("alias", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Please don't enter a full name - this is shown publicly.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rel">Your relationship to the patient</Label>
              <Input
                id="rel"
                maxLength={60}
                placeholder="Family member, hospital coordinator…"
                value={form.relationship}
                onChange={(e) => set("relationship", e.target.value)}
              />
            </div>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset className="space-y-5">
            <legend className="font-display text-lg font-semibold">Blood requirement</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bt">Blood type</Label>
                <Select
                  value={form.bloodType}
                  onValueChange={(v) => set("bloodType", v as BloodType)}
                >
                  <SelectTrigger id="bt" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOOD_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="units">Units needed</Label>
                <Input
                  id="units"
                  type="number"
                  min={1}
                  max={20}
                  required
                  value={form.units}
                  onChange={(e) => set("units", e.target.value)}
                />
              </div>
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset className="space-y-5">
            <legend className="font-display text-lg font-semibold">Location</legend>
            <div className="space-y-2">
              <Label htmlFor="facility">Hospital or blood bank</Label>
              <Input
                id="facility"
                required
                placeholder="e.g. Kenyatta National Hospital"
                value={form.facility}
                onChange={(e) => set("facility", e.target.value)}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="county">County</Label>
                <Select value={form.county} onValueChange={(v) => set("county", v)}>
                  <SelectTrigger id="county" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {KENYAN_COUNTIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area or ward</Label>
                <Input
                  id="area"
                  placeholder="e.g. Upper Hill"
                  value={form.area}
                  onChange={(e) => set("area", e.target.value)}
                />
              </div>
            </div>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <fieldset className="space-y-5">
            <legend className="font-display text-lg font-semibold">Urgency</legend>
            <RadioGroup
              value={form.urgency}
              onValueChange={(v) => set("urgency", v as Urgency)}
              className="gap-3"
            >
              {(["urgent", "soon", "routine"] as Urgency[]).map((u) => (
                <Label
                  key={u}
                  htmlFor={`u-${u}`}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary-soft/50"
                >
                  <RadioGroupItem id={`u-${u}`} value={u} className="mt-0.5" />
                  <span>
                    <span className="block font-medium">{URGENCY_LABEL[u]}</span>
                    <span className="block text-sm font-normal text-muted-foreground">
                      {u === "urgent"
                        ? "Needed within hours. Donors nearby are alerted immediately."
                        : u === "soon"
                          ? "Needed within a day or two."
                          : "Scheduled procedure or ongoing treatment."}
                    </span>
                  </span>
                </Label>
              ))}
            </RadioGroup>
            <div className="space-y-2">
              <Label htmlFor="by">Needed by</Label>
              <Input
                id="by"
                placeholder="e.g. Today before 18:00"
                value={form.neededBy}
                onChange={(e) => set("neededBy", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Note for donors (optional)</Label>
              <Textarea
                id="note"
                rows={3}
                maxLength={300}
                value={form.note}
                onChange={(e) => set("note", e.target.value)}
              />
            </div>
          </fieldset>
        ) : null}

        {step === 4 ? (
          <div className="space-y-5">
            <h2 className="font-display text-lg font-semibold">Review</h2>
            <dl className="divide-y rounded-lg border">
              {[
                ["Patient", form.alias || "-"],
                ["Blood type", form.bloodType],
                ["Units", form.units],
                ["Facility", form.facility || "-"],
                ["Location", [form.area, form.county].filter(Boolean).join(", ")],
                ["Urgency", URGENCY_LABEL[form.urgency]],
                ["Needed by", form.neededBy || "-"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-wrap justify-between gap-2 p-4 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-muted-foreground">
              By publishing you confirm the details are accurate and that the facility is expecting
              donors.
            </p>
          </div>
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-3 border-t pt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ArrowLeft aria-hidden />
            Back
          </Button>
          <Button type="submit" size="lg" disabled={submitting}>
            {step === STEPS.length - 1 ? (
              <>
                <Check aria-hidden />
                {submitting ? "Publishing…" : "Publish request"}
              </>
            ) : (
              <>
                Continue
                <ArrowRight aria-hidden />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
