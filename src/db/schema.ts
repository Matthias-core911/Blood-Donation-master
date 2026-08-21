import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const donors = sqliteTable("donors", {
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
  createdAt: text("created_at").notNull(),
});

export const bloodRequests = sqliteTable("blood_requests", {
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
  createdAt: text("created_at").notNull(),
});

export const payments = sqliteTable("payments", {
  id: text("id").primaryKey(),
  context: text("context").notNull(),
  amount: integer("amount").notNull(),
  phone: text("phone").notNull(),
  reference: text("reference").notNull(),
  status: text("status").notNull(),
  createdAt: text("created_at").notNull(),
});

export const schedules = sqliteTable("schedules", {
  id: text("id").primaryKey(),
  context: text("context").notNull(),
  center: text("center").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  amount: integer("amount").notNull(),
  createdAt: text("created_at").notNull(),
});
