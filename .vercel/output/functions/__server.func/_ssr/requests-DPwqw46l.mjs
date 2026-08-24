import { i as createServerFn } from "./server-C9_bbqfV.mjs";
import { a as desc, o as eq, s as sql } from "../_libs/drizzle-orm.mjs";
import { n as createServerRpc, r as db, t as bloodRequests } from "./client-DxttxtoS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/requests-DPwqw46l.js
var publishRequestFn_createServerFn_handler = createServerRpc({
	id: "8aea6cc01eb368ba2cd729a27d0afb09be70873f396e717be5594bd6ecb6e72e",
	name: "publishRequestFn",
	filename: "src/rpc/requests.ts"
}, (opts) => publishRequestFn.__executeServer(opts));
var publishRequestFn = createServerFn({ method: "POST" }).validator((input) => input).handler(publishRequestFn_createServerFn_handler, async ({ data }) => {
	const id = `req-${Date.now()}`;
	const createdAt = (/* @__PURE__ */ new Date()).toISOString();
	db.insert(bloodRequests).values({
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
		createdAt
	}).run();
	return { id };
});
var fetchStoredRequestsFn_createServerFn_handler = createServerRpc({
	id: "154fb035f1b8fee4d8f5f90241402b4bf932043dbedc723ac555ba13ee5fd44e",
	name: "fetchStoredRequestsFn",
	filename: "src/rpc/requests.ts"
}, (opts) => fetchStoredRequestsFn.__executeServer(opts));
var fetchStoredRequestsFn = createServerFn({ method: "GET" }).handler(fetchStoredRequestsFn_createServerFn_handler, async () => {
	return db.select().from(bloodRequests).orderBy(desc(bloodRequests.createdAt)).all().map((r) => ({
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
		...r.note ? { note: r.note } : {}
	}));
});
var pledgeToRequestFn_createServerFn_handler = createServerRpc({
	id: "f7525309aa1f2e8d8c3a4aa6422da43391a97a6e6dbfe02ed2107755898bf9de",
	name: "pledgeToRequestFn",
	filename: "src/rpc/requests.ts"
}, (opts) => pledgeToRequestFn.__executeServer(opts));
var pledgeToRequestFn = createServerFn({ method: "POST" }).validator((input) => input).handler(pledgeToRequestFn_createServerFn_handler, async ({ data }) => {
	const row = db.select().from(bloodRequests).where(eq(bloodRequests.id, data.requestId)).get();
	if (!row) return { ok: false };
	const nextPledged = Math.min(row.units, row.unitsPledged + 1);
	db.update(bloodRequests).set({ unitsPledged: nextPledged }).where(eq(bloodRequests.id, data.requestId)).run();
	return { ok: true };
});
var fetchNetworkStatsFn_createServerFn_handler = createServerRpc({
	id: "33f6efa97bb886d83bd3df05be5c724650e13806074e61f7d09fe90af1351de3",
	name: "fetchNetworkStatsFn",
	filename: "src/rpc/requests.ts"
}, (opts) => fetchNetworkStatsFn.__executeServer(opts));
var fetchNetworkStatsFn = createServerFn({ method: "GET" }).handler(fetchNetworkStatsFn_createServerFn_handler, async () => {
	const donorCountRow = db.get(sql`SELECT COUNT(*) as count FROM donors`);
	const requestRow = db.get(sql`SELECT COUNT(*) as requests, COALESCE(SUM(units_pledged), 0) as pledged FROM blood_requests`);
	return {
		donorsRegistered: donorCountRow?.count ?? 0,
		connectionsMade: requestRow?.requests ?? 0,
		unitsDonated: requestRow?.pledged ?? 0
	};
});
//#endregion
export { fetchNetworkStatsFn_createServerFn_handler, fetchStoredRequestsFn_createServerFn_handler, pledgeToRequestFn_createServerFn_handler, publishRequestFn_createServerFn_handler };
