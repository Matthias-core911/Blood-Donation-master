import { createServerFn } from "@tanstack/react-start";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { bloodRequests } from "@/db/schema";

export interface PublishRequestInput {
  alias: string;
  relationship: string;
  bloodType: string;
  units: number;
  facility: string;
  county: string;
  area: string;
  urgency: string;
  neededBy: string;
  note?: string;
}

export interface StoredRequestView {
  id: string;
  patientAlias: string;
  bloodType: string;
  units: number;
  unitsPledged: number;
  facility: string;
  city: string;
  county: string;
  distanceKm: number;
  urgency: string;
  neededBy: string;
  postedAgo: string;
  verified: boolean;
  note?: string;
}

export const publishRequestFn = createServerFn({ method: "POST" })
  .validator((input: PublishRequestInput) => input)
  .handler(async ({ data }) => {
    const id = `req-${Date.now()}`;
    const createdAt = new Date().toISOString();

    db.insert(bloodRequests)
      .values({
        id,
        patientAlias: data.alias,
        relationship: data.relationship,
        bloodType: data.bloodType,
        units: data.units,
        unitsPledged: 0,
        facility: data.facility,
        county: data.county,
        area: data.area,
        urgency: data.urgency,
        neededBy: data.neededBy || "As soon as possible",
        note: data.note ?? null,
        verified: false,
        createdAt,
      })
      .run();

    return { id };
  });

export const fetchStoredRequestsFn = createServerFn({ method: "GET" }).handler(async () => {
  const rows = db.select().from(bloodRequests).orderBy(desc(bloodRequests.createdAt)).all();
  return rows.map((r): StoredRequestView => ({
    id: r.id,
    patientAlias: r.patientAlias,
    bloodType: r.bloodType,
    units: r.units,
    unitsPledged: r.unitsPledged,
    facility: r.facility,
    city: r.area || r.county.replace(" County", ""),
    county: r.county,
    distanceKm: 1.5,
    urgency: r.urgency,
    neededBy: r.neededBy,
    postedAgo: "Recently",
    verified: r.verified,
    ...(r.note ? { note: r.note } : {}),
  }));
});

export const pledgeToRequestFn = createServerFn({ method: "POST" })
  .validator((input: { requestId: string }) => input)
  .handler(async ({ data }) => {
    const row = db.select().from(bloodRequests).where(eq(bloodRequests.id, data.requestId)).get();
    if (!row) return { ok: false as const };

    const nextPledged = Math.min(row.units, row.unitsPledged + 1);
    db.update(bloodRequests)
      .set({ unitsPledged: nextPledged })
      .where(eq(bloodRequests.id, data.requestId))
      .run();

    return { ok: true as const };
  });

export const fetchNetworkStatsFn = createServerFn({ method: "GET" }).handler(async () => {
  const donorCountRow = db.get<{ count: number }>(sql`SELECT COUNT(*) as count FROM donors`);
  const requestRow = db.get<{ requests: number; pledged: number }>(
    sql`SELECT COUNT(*) as requests, COALESCE(SUM(units_pledged), 0) as pledged FROM blood_requests`,
  );

  return {
    donorsRegistered: donorCountRow?.count ?? 0,
    connectionsMade: requestRow?.requests ?? 0,
    unitsDonated: requestRow?.pledged ?? 0,
  };
});
