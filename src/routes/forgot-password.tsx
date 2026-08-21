import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth/AuthLayout";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password - Lifeline" },
      {
        name: "description",
        content: "Request a password reset link for your Lifeline donor account.",
      },
      { property: "og:title", content: "Reset your password - Lifeline" },
      { property: "og:description", content: "Request a reset link for your Lifeline account." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout
      title={sent ? "Check your inbox" : "Reset your password"}
      subtitle={
        sent
          ? "If an account exists for that address, a reset link is on its way."
          : "Enter the email on your account and we'll send a reset link."
      }
      footer={
        <>
          Remembered it?{" "}
          <Link to="/signin" className="font-medium text-primary hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="flex items-start gap-3 rounded-xl border bg-success-soft p-5">
          <MailCheck className="mt-0.5 size-5 text-success" aria-hidden />
          <p className="text-sm">
            The link expires in 30 minutes. Didn't get it? Check spam, then try again.
          </p>
        </div>
      ) : (
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" required autoComplete="email" />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Send reset link
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
