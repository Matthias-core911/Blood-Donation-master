export type BloodType = "O-" | "O+" | "A-" | "A+" | "B-" | "B+" | "AB-" | "AB+";

export const BLOOD_TYPES: BloodType[] = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

export type Urgency = "routine" | "soon" | "urgent";

export interface BloodRequest {
  id: string;
  patientAlias: string;
  bloodType: BloodType;
  units: number;
  unitsPledged: number;
  facility: string;
  city: string;
  county: string;
  distanceKm: number;
  urgency: Urgency;
  neededBy: string;
  postedAgo: string;
  verified: boolean;
  note?: string;
}

export interface Donor {
  id: string;
  displayName: string;
  bloodType: BloodType;
  city: string;
  county: string;
  distanceKm: number;
  available: boolean;
  verified: boolean;
  lastVerified: string;
  donations: number;
}

import { setCurrentUser } from "./storage";
import {
  registerDonorFn,
  signInFn,
  fetchStoredDonorsFn,
  type RegisterDonorInput as ServerRegisterDonorInput,
  type StoredDonorView,
} from "@/rpc/auth";
import {
  publishRequestFn,
  fetchStoredRequestsFn,
  pledgeToRequestFn,
  fetchNetworkStatsFn,
  type PublishRequestInput as ServerPublishRequestInput,
  type StoredRequestView,
} from "@/rpc/requests";
import { makeMpesaPaymentFn, recordScheduleFn } from "@/rpc/payments";

export type RegisterDonorInput = ServerRegisterDonorInput;

/** Registers a new donor against the real database (hashed password, unique
 * phone check), then signs them in client-side. Mirrors the original
 * Blood-Donation-master registration flow. */
export async function registerDonor(input: RegisterDonorInput) {
  const result = await registerDonorFn({ data: input });
  if ("error" in result) return result;
  setCurrentUser({ name: result.donor.name, phone: result.donor.phone });
  return result;
}

/** Checks phone + password against the database (bcrypt-hashed), mirroring
 * the original Signin.jsx check but backed by a real store. */
export async function verifyCredentials(phone: string, password: string) {
  const result = await signInFn({ data: { phone, password } });
  if ("error" in result) return null;
  return result.user;
}

function storedDonorToDonor(d: StoredDonorView): Donor {
  const parts = d.name.trim().split(/\s+/);
  const displayName = parts.length > 1 ? `${parts[0]} ${parts[1]![0]}.` : (parts[0] ?? "Donor");
  return {
    id: d.id,
    displayName,
    bloodType: d.bloodType as BloodType,
    city: d.area || d.county.replace(" County", ""),
    county: d.county,
    distanceKm: 1.5,
    available: d.availableNow,
    verified: d.verified,
    lastVerified: d.verified ? "Recently" : "Not yet verified",
    donations: d.donations,
  };
}

export type PublishRequestInput = ServerPublishRequestInput;

/** Persists a new blood request to the database, mirroring the original
 * Adddonors.jsx flow. */
export async function publishRequest(input: PublishRequestInput) {
  return publishRequestFn({ data: input });
}

/** Records that a donor pledged a unit to a request. */
export async function pledgeToRequest(requestId: string) {
  return pledgeToRequestFn({ data: { requestId } });
}

export interface MakePaymentInput {
  amount: number;
  phone: string;
  context: string;
}

/** Makes a real M-Pesa payment request (server-side) and records it. */
export async function makePayment(input: MakePaymentInput) {
  return makeMpesaPaymentFn({ data: input });
}

export interface RecordScheduleInput {
  context: string;
  center: string;
  date: string;
  time: string;
  amount: number;
}

/** Books a donation appointment in the database. */
export async function recordSchedule(input: RecordScheduleInput) {
  return recordScheduleFn({ data: input });
}

/** Real network totals from the database, for the homepage impact section. */
export async function fetchNetworkStats() {
  return fetchNetworkStatsFn();
}

/**
 * Sample content used while the backend is not connected.
 * Every consumer reads through the async helpers below so swapping in a real
 * API only means changing these two functions.
 */
const SAMPLE_REQUESTS: BloodRequest[] = [
  {
    id: "req-1042",
    patientAlias: "Patient M.",
    bloodType: "O-",
    units: 2,
    unitsPledged: 1,
    facility: "Kenyatta National Hospital",
    city: "Nairobi",
    county: "Nairobi County",
    distanceKm: 3.2,
    urgency: "urgent",
    neededBy: "Within 4 hours",
    postedAgo: "18 minutes ago",
    verified: true,
    note: "Post-surgical transfusion. Hospital blood bank coordinating collection.",
  },
  {
    id: "req-1041",
    patientAlias: "Patient A.",
    bloodType: "A+",
    units: 3,
    unitsPledged: 0,
    facility: "Aga Khan University Hospital",
    city: "Nairobi",
    county: "Nairobi County",
    distanceKm: 6.4,
    urgency: "soon",
    neededBy: "Today, before 18:00",
    postedAgo: "1 hour ago",
    verified: true,
  },
  {
    id: "req-1039",
    patientAlias: "Patient W.",
    bloodType: "B+",
    units: 1,
    unitsPledged: 1,
    facility: "Coast General Teaching Hospital",
    city: "Mombasa",
    county: "Mombasa County",
    distanceKm: 12.1,
    urgency: "routine",
    neededBy: "Within 3 days",
    postedAgo: "4 hours ago",
    verified: false,
  },
  {
    id: "req-1036",
    patientAlias: "Patient K.",
    bloodType: "O+",
    units: 4,
    unitsPledged: 2,
    facility: "Moi Teaching & Referral Hospital",
    city: "Eldoret",
    county: "Uasin Gishu County",
    distanceKm: 8.7,
    urgency: "urgent",
    neededBy: "Within 8 hours",
    postedAgo: "2 hours ago",
    verified: true,
    note: "Maternity emergency. Two units already pledged.",
  },
  {
    id: "req-1034",
    patientAlias: "Patient N.",
    bloodType: "AB-",
    units: 1,
    unitsPledged: 0,
    facility: "Kisumu County Referral Hospital",
    city: "Kisumu",
    county: "Kisumu County",
    distanceKm: 15.3,
    urgency: "soon",
    neededBy: "Tomorrow morning",
    postedAgo: "6 hours ago",
    verified: true,
  },
  {
    id: "req-1030",
    patientAlias: "Patient J.",
    bloodType: "A-",
    units: 2,
    unitsPledged: 2,
    facility: "Nakuru Level 5 Hospital",
    city: "Nakuru",
    county: "Nakuru County",
    distanceKm: 21.8,
    urgency: "routine",
    neededBy: "This week",
    postedAgo: "Yesterday",
    verified: true,
  },
];

const SAMPLE_DONORS: Donor[] = [
  {
    id: "dnr-01",
    displayName: "John K.",
    bloodType: "O+",
    city: "Kilimani",
    county: "Nairobi County",
    distanceKm: 3.2,
    available: true,
    verified: true,
    lastVerified: "2 days ago",
    donations: 6,
  },
  {
    id: "dnr-02",
    displayName: "Amina S.",
    bloodType: "O-",
    city: "Westlands",
    county: "Nairobi County",
    distanceKm: 4.8,
    available: true,
    verified: true,
    lastVerified: "5 days ago",
    donations: 11,
  },
  {
    id: "dnr-03",
    displayName: "Brian O.",
    bloodType: "A+",
    city: "Kasarani",
    county: "Nairobi County",
    distanceKm: 9.1,
    available: false,
    verified: true,
    lastVerified: "3 weeks ago",
    donations: 2,
  },
  {
    id: "dnr-04",
    displayName: "Grace W.",
    bloodType: "B+",
    city: "Nyali",
    county: "Mombasa County",
    distanceKm: 6.7,
    available: true,
    verified: false,
    lastVerified: "1 month ago",
    donations: 1,
  },
  {
    id: "dnr-05",
    displayName: "Peter M.",
    bloodType: "AB+",
    city: "Langata",
    county: "Nairobi County",
    distanceKm: 11.4,
    available: true,
    verified: true,
    lastVerified: "Today",
    donations: 4,
  },
  {
    id: "dnr-06",
    displayName: "Faith C.",
    bloodType: "O+",
    city: "Eldoret CBD",
    county: "Uasin Gishu County",
    distanceKm: 2.1,
    available: true,
    verified: true,
    lastVerified: "Yesterday",
    donations: 8,
  },
];

export const KENYAN_COUNTIES = [
  "Nairobi County",
  "Mombasa County",
  "Kisumu County",
  "Nakuru County",
  "Uasin Gishu County",
  "Kiambu County",
  "Machakos County",
  "Kakamega County",
];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function toBloodRequest(r: StoredRequestView): BloodRequest {
  return {
    id: r.id,
    patientAlias: r.patientAlias,
    bloodType: r.bloodType as BloodType,
    units: r.units,
    unitsPledged: r.unitsPledged,
    facility: r.facility,
    city: r.city,
    county: r.county,
    distanceKm: r.distanceKm,
    urgency: r.urgency as Urgency,
    neededBy: r.neededBy,
    postedAgo: r.postedAgo,
    verified: r.verified,
    ...(r.note ? { note: r.note } : {}),
  };
}

export async function fetchRequests(): Promise<BloodRequest[]> {
  await delay(150);
  const stored = await fetchStoredRequestsFn();
  return [...stored.map(toBloodRequest), ...SAMPLE_REQUESTS];
}

export async function fetchRequest(id: string): Promise<BloodRequest | undefined> {
  await delay(100);
  const stored = await fetchStoredRequestsFn();
  return [...stored.map(toBloodRequest), ...SAMPLE_REQUESTS].find((r) => r.id === id);
}

export async function fetchDonors(): Promise<Donor[]> {
  await delay(150);
  const stored = await fetchStoredDonorsFn();
  return [...stored.map(storedDonorToDonor), ...SAMPLE_DONORS];
}

/** Who can receive from a given donor type, and who a patient can receive from. */
export const COMPATIBILITY: Record<
  BloodType,
  { donatesTo: BloodType[]; receivesFrom: BloodType[] }
> = {
  "O-": { donatesTo: [...BLOOD_TYPES], receivesFrom: ["O-"] },
  "O+": { donatesTo: ["O+", "A+", "B+", "AB+"], receivesFrom: ["O-", "O+"] },
  "A-": { donatesTo: ["A-", "A+", "AB-", "AB+"], receivesFrom: ["O-", "A-"] },
  "A+": { donatesTo: ["A+", "AB+"], receivesFrom: ["O-", "O+", "A-", "A+"] },
  "B-": { donatesTo: ["B-", "B+", "AB-", "AB+"], receivesFrom: ["O-", "B-"] },
  "B+": { donatesTo: ["B+", "AB+"], receivesFrom: ["O-", "O+", "B-", "B+"] },
  "AB-": { donatesTo: ["AB-", "AB+"], receivesFrom: ["O-", "A-", "B-", "AB-"] },
  "AB+": { donatesTo: ["AB+"], receivesFrom: [...BLOOD_TYPES] },
};

export const URGENCY_LABEL: Record<Urgency, string> = {
  routine: "Planned",
  soon: "Needed soon",
  urgent: "Urgent",
};
