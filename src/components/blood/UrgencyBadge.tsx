import { AlertTriangle, Clock, CalendarCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { URGENCY_LABEL, type Urgency } from "@/lib/blood";

export function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const Icon = urgency === "urgent" ? AlertTriangle : urgency === "soon" ? Clock : CalendarCheck;
  const variant = urgency === "urgent" ? "urgent" : urgency === "soon" ? "warning" : "neutral";
  return (
    <Badge variant={variant} className="gap-1.5 rounded-full px-2.5 py-1 uppercase tracking-wide">
      <Icon className="size-3.5" aria-hidden />
      {URGENCY_LABEL[urgency]}
    </Badge>
  );
}
