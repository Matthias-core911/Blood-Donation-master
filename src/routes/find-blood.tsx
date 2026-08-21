import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, UserSearch, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHero } from "@/components/layout/PageHero";
import { DonorCard } from "@/components/blood/DonorCard";
import { CardSkeletonGrid } from "@/components/common/CardSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { BLOOD_TYPES, COMPATIBILITY, KENYAN_COUNTIES, fetchDonors, type BloodType } from "@/lib/blood";

export const Route = createFileRoute("/find-blood")({
  head: () => ({
    meta: [
      { title: "Find blood donors near you - Lifeline" },
      {
        name: "description",
        content:
          "Search verified blood donors by blood type, county, distance and availability across Kenya.",
      },
      { property: "og:title", content: "Find blood donors near you - Lifeline" },
      {
        property: "og:description",
        content: "Search verified donors by blood type, county, distance and availability.",
      },
    ],
  }),
  component: FindBloodPage,
});

function FindBloodPage() {
  const [bloodType, setBloodType] = useState<BloodType>("O+");
  const [county, setCounty] = useState("Nairobi County");
  const [distance, setDistance] = useState("10");
  const [availability, setAvailability] = useState("available");

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["donors"],
    queryFn: fetchDonors,
  });

  const compatible = COMPATIBILITY[bloodType].receivesFrom;

  const results = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (d) =>
        compatible.includes(d.bloodType) &&
        d.county === county &&
        d.distanceKm <= Number(distance) &&
        (availability === "all" || d.available),
    );
  }, [data, compatible, county, distance, availability]);

  return (
    <>
      <PageHero
        eyebrow="Search"
        title={<>Find blood.</>}
        description="Search donors whose blood type is compatible with the patient. We show an approximate area only - contact details are shared after both sides accept a match."
      />
      <div className="container-page py-12 md:py-16">

      <form
        className="mt-8 rounded-xl border bg-card p-5 shadow-card sm:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Donor search"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="space-y-2">
            <Label htmlFor="bt">Patient blood type</Label>
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
            <Label htmlFor="distance">Distance</Label>
            <Select value={distance} onValueChange={setDistance}>
              <SelectTrigger id="distance" className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["5", "10", "25", "50"].map((d) => (
                  <SelectItem key={d} value={d}>
                    Within {d} km
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger id="availability" className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available now</SelectItem>
                <SelectItem value="all">Any status</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button type="submit" size="lg" className="w-full">
              <Search aria-hidden />
              Find donors
            </Button>
          </div>
        </div>
        <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          Showing donors compatible with {bloodType}: {compatible.join(", ")}. The hospital confirms
          final matching.
        </p>
      </form>

      <section className="mt-10" aria-live="polite">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-lg font-semibold">
            {isPending ? "Searching…" : `${results.length} matching donors`}
          </h2>
        </div>
        <div className="mt-6">
          {isPending ? (
            <CardSkeletonGrid />
          ) : isError ? (
            <ErrorState
              description="We couldn't load donors right now."
              onRetry={() => refetch()}
            />
          ) : results.length === 0 ? (
            <EmptyState
              icon={UserSearch}
              title="No matching donors yet"
              description="Try widening the distance or choosing a different county. You can also publish a request so compatible donors are alerted."
              action={
                <Button asChild>
                  <Link to="/requests/new">Create a request</Link>
                </Button>
              }
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {results.map((d) => (
                <DonorCard key={d.id} donor={d} />
              ))}
            </div>
          )}
        </div>
      </section>
      </div>
    </>
  );
}
