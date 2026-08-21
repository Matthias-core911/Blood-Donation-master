import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import fs from "node:fs";
import path from "node:path";
import * as schema from "./schema";

const isVercel = !!process.env.VERCEL;
const dataDir = isVercel ? "/tmp" : path.resolve(process.cwd(), "data");

try {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
} catch {}

const dbPath = path.join(dataDir, "lifeline.db");
const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || `file:${dbPath}`;
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({ url, authToken });
export const db = drizzle(client, { schema });

if (!process.env.TURSO_DATABASE_URL) {
  const initSql = [
    `CREATE TABLE IF NOT EXISTS donors (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, phone TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, blood_type TEXT NOT NULL, county TEXT NOT NULL, area TEXT NOT NULL DEFAULT '', radius_km TEXT NOT NULL DEFAULT '15', available_now INTEGER NOT NULL DEFAULT 1, donations INTEGER NOT NULL DEFAULT 0, verified INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS blood_requests (id TEXT PRIMARY KEY NOT NULL, patient_alias TEXT NOT NULL, relationship TEXT NOT NULL DEFAULT '', blood_type TEXT NOT NULL, units INTEGER NOT NULL, units_pledged INTEGER NOT NULL DEFAULT 0, facility TEXT NOT NULL, county TEXT NOT NULL, area TEXT NOT NULL DEFAULT '', urgency TEXT NOT NULL, needed_by TEXT NOT NULL DEFAULT '', note TEXT, verified INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS payments (id TEXT PRIMARY KEY NOT NULL, context TEXT NOT NULL, amount INTEGER NOT NULL, phone TEXT NOT NULL, reference TEXT NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS schedules (id TEXT PRIMARY KEY NOT NULL, context TEXT NOT NULL, center TEXT NOT NULL, date TEXT NOT NULL, time TEXT NOT NULL, amount INTEGER NOT NULL, created_at TEXT NOT NULL)`,
  ];
  (async () => {
    for (const sql of initSql) {
      try { await client.execute(sql); } catch (e) { console.warn("init table failed", e); }
    }
  })();
}
