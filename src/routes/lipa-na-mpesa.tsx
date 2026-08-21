import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Smartphone, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/layout/PageHero";
import { makePayment } from "@/lib/blood";

export const Route = createFileRoute("/lipa-na-mpesa")({
  validateSearch: (search: Record<string, unknown>) => ({
    amount: typeof search["amount"] === "string" ? search["amount"] : "1400",
    context: typeof search["context"] === "string" ? search["context"] : "",
  }),
  head: () => ({
    meta: [{ title: "Lipa na M-Pesa - Lifeline" }],
  }),
  component: MpesaPaymentPage,
});

function MpesaPaymentPage() {
  const { amount: initialAmount, context } = Route.useSearch();
  const [amount, setAmount] = useState(initialAmount || "1400");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setReference("");
    setLoading(true);

    const result = await makePayment({
      amount: Number(amount),
      phone,
      context: context || "Lifeline service fee",
    }).catch(() => ({ error: "Something went wrong reaching M-Pesa. Please try again." as const }));

    if ("error" in result) {
      setError(result.error);
    } else {
      setSuccess(result.message);
      setReference(result.reference);
      setPhone("");
    }
    setLoading(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Payment"
        title={<>Lipa na M-Pesa.</>}
        description={
          context
            ? `Complete your payment for ${context}.`
            : "Complete your Lifeline service fee payment securely via M-Pesa."
        }
      />

      <div className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-lg rounded-xl border bg-card p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-success-soft text-success">
              <Smartphone className="size-5" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold">M-Pesa Payment</h2>
              <p className="text-sm text-muted-foreground">
                Ensure your phone is on to receive the STK prompt.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {success ? (
              <p className="rounded-lg border border-success/30 bg-success-soft px-4 py-3 text-sm text-success">
                {success}
              </p>
            ) : null}
            {reference ? (
              <p className="text-xs text-muted-foreground">Reference: {reference}</p>
            ) : null}
            {error ? (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (KSh)</Label>
              <Input
                id="amount"
                type="number"
                min={100}
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                type="tel"
                required
                placeholder="07XXXXXXXX or 2547XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Processing…" : "Make payment"}
            </Button>
          </form>

          {reference ? (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={async () => {
                await navigator.clipboard.writeText(reference);
                setCopied(true);
              }}
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Reference copied" : "Copy reference"}
            </Button>
          ) : null}

          <p className="mt-6 text-xs text-muted-foreground">
            Having trouble?{" "}
            <Link to="/about" className="font-medium text-primary hover:underline">
              Contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
