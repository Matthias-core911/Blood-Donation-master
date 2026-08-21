import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { BLOOD_TYPES, KENYAN_COUNTIES, registerDonor, type BloodType } from "@/lib/blood";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register as a blood donor - Lifeline" },
      {
        name: "description",
        content:
          "Create a Lifeline account in three short steps and become reachable when someone nearby needs your blood type.",
      },
      { property: "og:title", content: "Register as a blood donor - Lifeline" },
      { property: "og:description", content: "Three short steps to join the donor network." },
    ],
  }),
  component: RegisterPage,
});

const STEPS = ["Your details", "Blood & location", "Availability"];

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [bloodType, setBloodType] = useState<BloodType>("O+");
  const [county, setCounty] = useState("Nairobi County");
  const [area, setArea] = useState("");
  const [radiusKm, setRadiusKm] = useState("15");
  const [availableNow, setAvailableNow] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <AuthLayout
      title="Join Lifeline"
      subtitle="Three short steps. You can change anything later."
      footer={
        <>
          Already registered?{" "}
          <Link to="/signin" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <ol className="mb-6 flex gap-2" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex-1">
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
              {s}
            </span>
          </li>
        ))}
      </ol>

      {error ? (
        <p className="mb-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          if (step < STEPS.length - 1) {
            setStep((s) => s + 1);
            return;
          }
          if (!agreed) {
            setError("Please agree to share your first name and approximate area with donors.");
            return;
          }
          setSubmitting(true);
          registerDonor({
            name,
            phone,
            password,
            bloodType,
            county,
            area,
            radiusKm,
            availableNow,
          })
            .then((result) => {
              if (result.error) {
                setError(result.error);
                return;
              }
              toast.success("You're registered as a donor", {
                description: "We'll only contact you when someone nearby needs your blood type.",
              });
              navigate({ to: "/dashboard" });
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {step === 0 ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                required
                autoComplete="name"
                placeholder="Sarah Wanjiru"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                required
                autoComplete="tel"
                inputMode="tel"
                placeholder="+254 7XX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Never shown publicly.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pw">Create a password</Label>
              <Input
                id="pw"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="bt">Blood type</Label>
              <Select value={bloodType} onValueChange={(v) => setBloodType(v as BloodType)}>
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
              <p className="text-xs text-muted-foreground">
                Not sure? Choose later - staff confirm your type at your first donation.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="county">County</Label>
              <Select value={county} onValueChange={setCounty}>
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
              <Label htmlFor="area">Area (optional)</Label>
              <Input
                id="area"
                placeholder="e.g. Kilimani"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="radius">Notify me about requests within</Label>
              <Select value={radiusKm} onValueChange={setRadiusKm}>
                <SelectTrigger id="radius" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["5", "15", "30", "50"].map((r) => (
                    <SelectItem key={r} value={r}>
                      {r} km
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3 rounded-lg border p-4">
              <Label htmlFor="avail" className="flex items-start gap-3 font-normal">
                <Checkbox
                  id="avail"
                  checked={availableNow}
                  onCheckedChange={(v) => setAvailableNow(v === true)}
                  className="mt-0.5"
                />
                <span>
                  <span className="block font-medium">I'm available to donate now</span>
                  <span className="block text-sm text-muted-foreground">
                    You can pause this any time from your dashboard.
                  </span>
                </span>
              </Label>
              <Label htmlFor="terms" className="flex items-start gap-3 font-normal">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(v) => setAgreed(v === true)}
                  required
                  className="mt-0.5"
                />
                <span className="text-sm">
                  I agree that Lifeline may share my first name and approximate area with people
                  searching for compatible donors.
                </span>
              </Label>
            </div>
          </>
        ) : null}

        <div className="flex items-center justify-between gap-3 pt-2">
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
                {submitting ? "Registering…" : "Finish"}
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
    </AuthLayout>
  );
}
