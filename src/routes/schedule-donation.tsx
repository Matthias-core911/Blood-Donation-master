import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/layout/PageHero";
import { recordSchedule } from "@/lib/blood";

export const Route = createFileRoute("/schedule-donation")({
  validateSearch: (search: Record<string, unknown>) => ({
    donorName: typeof search["donorName"] === "string" ? search["donorName"] : "",
    bloodType: typeof search["bloodType"] === "string" ? search["bloodType"] : "",
    requestId: typeof search["requestId"] === "string" ? search["requestId"] : "",
  }),
  head: () => ({
    meta: [{ title: "Schedule a donation - Lifeline" }],
  }),
  component: ScheduleDonationPage,
});

function ScheduleDonationPage() {
  const navigate = useNavigate();
  const { donorName, bloodType, requestId } = Route.useSearch();
  const context = donorName || (requestId ? `request ${requestId}` : "");

  const [center, setCenter] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState("100");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Schedule"
        title={<>Book a donation slot.</>}
        description={
          context
            ? `Scheduling in connection with ${context}${bloodType ? ` (${bloodType})` : ""}. Choose a centre, date and time that work for you.`
            : "Choose a donation centre, date and time that work for you."
        }
      />

      <div className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-xl rounded-xl border bg-card p-6 shadow-card sm:p-8">
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
              if (Number(amount) < 100) {
                setError("Minimum service fee is KSh 100.");
                return;
              }
              setSubmitting(true);
              recordSchedule({
                context: context || "General donation",
                center,
                date,
                time,
                amount: Number(amount),
              })
                .then(() => {
                  toast.success("Appointment booked", {
                    description: "Continue to complete your service fee payment.",
                  });
                  navigate({
                    to: "/lipa-na-mpesa",
                    search: { amount, context: context || "Donation service fee" },
                  });
                })
                .finally(() => setSubmitting(false));
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="center">Donation centre</Label>
              <Input
                id="center"
                required
                placeholder="e.g. Kenyatta National Hospital"
                value={center}
                onChange={(e) => setCenter(e.target.value)}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Service fee (KSh, minimum 100)</Label>
              <Input
                id="amount"
                type="number"
                min={100}
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              <CalendarClock aria-hidden />
              {submitting ? "Booking…" : "Confirm appointment"}
            </Button>
            <p className="text-xs text-muted-foreground">
              By scheduling, you confirm these details are correct and agree to the donation terms.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
