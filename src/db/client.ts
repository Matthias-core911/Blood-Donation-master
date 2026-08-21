import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

// Works locally as a file, works on Vercel with Turso
// For local dev: uses file:data/lifeline.db
// For Vercel production: set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in Vercel env vars
const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || "file:data/lifeline.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({ url, authToken });

// Create tables if not exists (for local file DB)
// This runs async but won't block - tables will be created on first query
client.executeMultiple(`
  CREATE TABLE IF NOT EXISTS donors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    blood_type TEXT NOT NULL,
    county TEXT NOT NULL,
    area TEXT NOT NULL DEFAULT '',
    radius_km TEXT NOT NULL DEFAULT '15',
    available_now INTEGER NOT NULL DEFAULT 1,
    donations INTEGER NOT NULL DEFAULT 0,
    verified INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS blood_requests (
    id TEXT PRIMARY KEY,
    patient_alias TEXT NOT NULL,
    relationship TEXT NOT NULL DEFAULT '',
    blood_type TEXT NOT NULL,
    units INTEGER NOT NULL,
    units_pledged INTEGER NOT NULL DEFAULT 0,
    facility TEXT NOT NULL,
    county TEXT NOT NULL,
    area TEXT NOT NULL DEFAULT '',
    urgency TEXT NOT NULL,
    needed_by TEXT NOT NULL DEFAULT '',
    note TEXT,
    verified INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    context TEXT NOT NULL,
    amount INTEGER NOT NULL,
    phone TEXT NOT NULL,
    reference TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS schedules (
    id TEXT PRIMARY KEY,
    context TEXT NOT NULL,
    center TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    amount INTEGER NOT NULL,
    created_at TEXT NOT NULL
  );
`).catch(() => {}); // ignore error if already exists on Turso

export const db = drizzle(client, { schema });