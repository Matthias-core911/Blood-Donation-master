import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & privacy settings - Lifeline" },
      {
        name: "description",
        content: "Update your contact details, donation availability, notification radius and privacy controls.",
      },
      { property: "og:title", content: "Profile & privacy settings - Lifeline" },
      { property: "og:description", content: "Control availability, notifications and what donors see." },
    ],
  }),
  component: ProfilePage,
});

const TOGGLES = [
  { id: "avail", label: "Available to donate", hint: "Turn off to pause all match notifications." },
  { id: "sms", label: "SMS alerts", hint: "Urgent requests within your radius only." },
  { id: "listed", label: "Show me in donor search", hint: "First name and approximate area only." },
];

function ProfilePage() {
  return (
    <div className="container-page section-y max-w-2xl">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Profile & privacy</h1>
      <p className="mt-2 text-muted-foreground">
        You decide how reachable you are. Contact details are never public.
      </p>

      <form
        className="mt-10 space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Settings saved");
        }}
      >
        <section className="space-y-5" aria-labelledby="details">
          <h2 id="details" className="font-display text-lg font-semibold">
            Your details
          </h2>
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" defaultValue="Sarah Wanjiru" autoComplete="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" defaultValue="+254 712 000 000" autoComplete="tel" inputMode="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">Area</Label>
            <Input id="area" defaultValue="Kilimani, Nairobi County" />
          </div>
        </section>

        <Separator />

        <section className="space-y-4" aria-labelledby="privacy">
          <h2 id="privacy" className="font-display text-lg font-semibold">
            Availability & privacy
          </h2>
          {TOGGLES.map((t) => (
            <div key={t.id} className="flex items-start justify-between gap-6 rounded-lg border p-4">
              <div>
                <Label htmlFor={t.id} className="font-medium">
                  {t.label}
                </Label>
                <p className="mt-1 text-sm text-muted-foreground">{t.hint}</p>
              </div>
              <Switch id={t.id} defaultChecked />
            </div>
          ))}
        </section>

        <Button type="submit" size="lg">
          Save changes
        </Button>
      </form>
    </div>
  );
}
