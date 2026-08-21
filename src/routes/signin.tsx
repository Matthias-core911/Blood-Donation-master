import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { verifyCredentials } from "@/lib/blood";
import { setCurrentUser } from "@/lib/storage";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in - Lifeline" },
      {
        name: "description",
        content:
          "Sign in to your Lifeline account to manage donor availability and blood requests.",
      },
      { property: "og:title", content: "Sign in - Lifeline" },
      { property: "og:description", content: "Access your donor dashboard and requests." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your availability and requests."
      footer={
        <>
          New here?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      {error ? (
        <p className="mb-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
          verifyCredentials(phone, password)
            .then((user) => {
              if (!user) {
                setError(
                  "We couldn't find an account with that phone and password. Register first, or try again.",
                );
                return;
              }
              setCurrentUser(user);
              toast.success("Signed in");
              navigate({ to: "/dashboard" });
            })
            .finally(() => setSubmitting(false));
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            required
            autoComplete="username"
            placeholder="+254 7XX XXX XXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
}
