import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db/client";
import { donors } from "@/db/schema";

/** Normalizes Kenyan phone input (07XX…, 7XX…, 2547XX…, +254 7XX…) to 2547XXXXXXXX. */
function normalizeKenyanPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 10) return `254${digits.slice(1)}`;
  if (digits.startsWith("7") && digits.length === 9) return `254${digits}`;
  return null;
}

export interface RegisterDonorInput {
  name: string;
  phone: string;
  password: string;
  bloodType: string;
  county: string;
  area: string;
  radiusKm: string;
  availableNow: boolean;
}

export const registerDonorFn = createServerFn({ method: "POST" })
  .validator((input: RegisterDonorInput) => input)
  .handler(async ({ data }) => {
    const normalizedPhone = normalizeKenyanPhone(data.phone);
    if (!normalizedPhone) {
      return { error: "Enter a valid Kenyan phone number, e.g. 07XX XXX XXX." as const };
    }
    if (data.password.length < 8) {
      return { error: "Password should be at least 8 characters." as const };
    }

    const existing = db.select().from(donors).where(eq(donors.phone, normalizedPhone)).get();
    if (existing) {
      return { error: "A donor with this phone number is already registered." as const };
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const id = `donor-${Date.now()}`;
    const createdAt = new Date().toISOString();

    db.insert(donors)
      .values({
        id,
        name: data.name,
        phone: normalizedPhone,
        passwordHash,
        bloodType: data.bloodType,
        county: data.county,
        area: data.area,
        radiusKm: data.radiusKm,
        availableNow: data.availableNow,
        donations: 0,
        verified: false,
        createdAt,
      })
      .run();

    return {
      donor: { id, name: data.name, phone: normalizedPhone },
    };
  });

export interface SignInInput {
  phone: string;
  password: string;
}

export const signInFn = createServerFn({ method: "POST" })
  .validator((input: SignInInput) => input)
  .handler(async ({ data }) => {
    const normalizedPhone = normalizeKenyanPhone(data.phone);
    if (!normalizedPhone) {
      return { error: "Enter a valid Kenyan phone number." as const };
    }

    const donor = db.select().from(donors).where(eq(donors.phone, normalizedPhone)).get();
    if (!donor) {
      return { error: "We couldn't find an account with that phone number." as const };
    }

    const matches = await bcrypt.compare(data.password, donor.passwordHash);
    if (!matches) {
      return { error: "Incorrect password. Try again." as const };
    }

    return { user: { name: donor.name, phone: donor.phone } };
  });

export interface StoredDonorView {
  id: string;
  name: string;
  bloodType: string;
  county: string;
  area: string;
  availableNow: boolean;
  verified: boolean;
  donations: number;
}

export const fetchStoredDonorsFn = createServerFn({ method: "GET" }).handler(async () => {
  const rows = db.select().from(donors).all();
  return rows.map((d): StoredDonorView => ({
    id: d.id,
    name: d.name,
    bloodType: d.bloodType,
    county: d.county,
    area: d.area,
    availableNow: d.availableNow,
    verified: d.verified,
    donations: d.donations,
  }));
});
