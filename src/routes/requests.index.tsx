import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Inbox, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero } from "@/components/layout/PageHero";
import { RequestCard } from "@/components/blood/RequestCard";
import { CardSkeletonGrid } from "@/components/common/CardSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { fetchRequests } from "@/lib/blood";

export const Route = createFileRoute("/requests/")({
  head: () => ({
    meta: [
      { title: "Open blood requests in Kenya - Lifeline" },
      {
        name: "description",
        content:
          "Browse open blood requests by urgency and blood type, and pledge a donation to a patient near you.",
      },
      { property: "og:title", content: "Open blood requests in Kenya - Lifeline" },
      {
        property: "og:description",
        content: "Browse verified blood requests by urgency and blood type and pledge to help.",
      },
    ],
  }),
  component: RequestsPage,
});

function RequestsPage() {
  const [filter, setFilter] = useState("all");
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  const results = useMemo(() => {
    if (!data) return [];
    if (filter === "all") return data;
    return data.filter((r) => r.urgency === filter);
  }, [data, filter]);

  return (
    <>
      <PageHero
        eyebrow="The wall"
        title={<>Open requests.</>}
        description="Every request is posted with a facility, a timeframe and a verification status."
        actions={
          <Button asChild size="xl" className="rounded-full">
            <Link to="/requests/new">
              <Plus aria-hidden />
              Create request
            </Link>
          </Button>
        }
      />
      <div className="container-page py-12 md:py-16">

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="h-11">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="soon">Needed soon</TabsTrigger>
          <TabsTrigger value="routine">Planned</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-8" aria-live="polite">
        {isPending ? (
          <CardSkeletonGrid count={6} />
        ) : isError ? (
          <ErrorState description="We couldn't load requests right now." onRetry={() => refetch()} />
        ) : results.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No requests in this category"
            description="Nothing matches this filter at the moment. That's usually good news - try another filter."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {results.map((r) => (
              <RequestCard key={r.id} request={r} />
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
}
