import { a as TSS_SERVER_FUNCTION, s as __exportAll } from "./server-C9_bbqfV.mjs";
import { t as createClient } from "../_libs/@libsql/client.mjs";
import { i as integer, n as sqliteTable, r as text, t as drizzle } from "../_libs/drizzle-orm.mjs";
import fs from "node:fs";
import path from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/client-DxttxtoS.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var schema_exports = /* @__PURE__ */ __exportAll({
	bloodRequests: () => bloodRequests,
	donors: () => donors,
	payments: () => payments,
	schedules: () => schedules
});
var donors = sqliteTable("donors", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	phone: text("phone").notNull().unique(),
	passwordHash: text("password_hash").notNull(),
	bloodType: text("blood_type").notNull(),
	county: text("county").notNull(),
	area: text("area").notNull().default(""),
	radiusKm: text("radius_km").notNull().default("15"),
	availableNow: integer("available_now", { mode: "boolean" }).notNull().default(true),
	donations: integer("donations").notNull().default(0),
	verified: integer("verified", { mode: "boolean" }).notNull().default(false),
	createdAt: text("created_at").notNull()
});
var bloodRequests = sqliteTable("blood_requests", {
	id: text("id").primaryKey(),
	patientAlias: text("patient_alias").notNull(),
	relationship: text("relationship").notNull().default(""),
	bloodType: text("blood_type").notNull(),
	units: integer("units").notNull(),
	unitsPledged: integer("units_pledged").notNull().default(0),
	facility: text("facility").notNull(),
	county: text("county").notNull(),
	area: text("area").notNull().default(""),
	urgency: text("urgency").notNull(),
	neededBy: text("needed_by").notNull().default(""),
	note: text("note"),
	verified: integer("verified", { mode: "boolean" }).notNull().default(false),
	createdAt: text("created_at").notNull()
});
var payments = sqliteTable("payments", {
	id: text("id").primaryKey(),
	context: text("context").notNull(),
	amount: integer("amount").notNull(),
	phone: text("phone").notNull(),
	reference: text("reference").notNull(),
	status: text("status").notNull(),
	createdAt: text("created_at").notNull()
});
var schedules = sqliteTable("schedules", {
	id: text("id").primaryKey(),
	context: text("context").notNull(),
	center: text("center").notNull(),
	date: text("date").notNull(),
	time: text("time").notNull(),
	amount: integer("amount").notNull(),
	createdAt: text("created_at").notNull()
});
var dataDir = !!process.env.VERCEL ? "/tmp" : path.resolve(process.cwd(), "data");
try {
	if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
} catch {}
var dbPath = path.join(dataDir, "lifeline.db");
var url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || `file:${dbPath}`;
var authToken = process.env.TURSO_AUTH_TOKEN;
var client = createClient({
	url,
	authToken
});
var db = drizzle(client, { schema: schema_exports });
if (!process.env.TURSO_DATABASE_URL) {
	const initSql = [
		`CREATE TABLE IF NOT EXISTS donors (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, phone TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, blood_type TEXT NOT NULL, county TEXT NOT NULL, area TEXT NOT NULL DEFAULT '', radius_km TEXT NOT NULL DEFAULT '15', available_now INTEGER NOT NULL DEFAULT 1, donations INTEGER NOT NULL DEFAULT 0, verified INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)`,
		`CREATE TABLE IF NOT EXISTS blood_requests (id TEXT PRIMARY KEY NOT NULL, patient_alias TEXT NOT NULL, relationship TEXT NOT NULL DEFAULT '', blood_type TEXT NOT NULL, units INTEGER NOT NULL, units_pledged INTEGER NOT NULL DEFAULT 0, facility TEXT NOT NULL, county TEXT NOT NULL, area TEXT NOT NULL DEFAULT '', urgency TEXT NOT NULL, needed_by TEXT NOT NULL DEFAULT '', note TEXT, verified INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)`,
		`CREATE TABLE IF NOT EXISTS payments (id TEXT PRIMARY KEY NOT NULL, context TEXT NOT NULL, amount INTEGER NOT NULL, phone TEXT NOT NULL, reference TEXT NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL)`,
		`CREATE TABLE IF NOT EXISTS schedules (id TEXT PRIMARY KEY NOT NULL, context TEXT NOT NULL, center TEXT NOT NULL, date TEXT NOT NULL, time TEXT NOT NULL, amount INTEGER NOT NULL, created_at TEXT NOT NULL)`
	];
	(async () => {
		for (const sql of initSql) try {
			await client.execute(sql);
		} catch (e) {
			console.warn("init table failed", e);
		}
	})();
}
//#endregion
export { payments as a, donors as i, createServerRpc as n, schedules as o, db as r, bloodRequests as t };
