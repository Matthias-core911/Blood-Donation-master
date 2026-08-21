import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import * as schema from "./schema";

// A real, persistent SQLite database that lives in the repo (data/lifeline.db,
// gitignored - the schema is version-controlled, the data isn't). No external
// database service is required: this file is created automatically the first
// time the server starts.
const dataDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sqlite = new Database(path.join(dataDir, "lifeline.db"));
sqlite.pragma("journal_mode = WAL");

sqlite.exec(`
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
`);

export const db = drizzle(sqlite, { schema });
