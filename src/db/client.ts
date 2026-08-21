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

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || `file:${path.join(dataDir, "lifeline.db")}`;
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({ url, authToken });

export const db = drizzle(client, { schema });