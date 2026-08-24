import { a as TSS_SERVER_FUNCTION, i as createServerFn, o as getServerFnById } from "./server-C9_bbqfV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blood-C0gI68U2.js
/**
* Client-side session marker only. Real credentials and all persisted data
* (donors, requests, payments, schedules) now live in the database - see
* src/db and src/rpc. This just remembers who's using this browser, the
* same way the original app's "current user" concept worked, but without
* ever storing a password client-side.
*/
var SESSION_KEY = "lifeline_session";
function isBrowser() {
	return typeof window !== "undefined";
}
function setCurrentUser(user, remember = true) {
	if (!isBrowser()) return;
	window.localStorage.removeItem(SESSION_KEY);
	window.sessionStorage.removeItem(SESSION_KEY);
	(remember ? window.localStorage : window.sessionStorage).setItem(SESSION_KEY, JSON.stringify(user));
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/** Normalizes Kenyan phone input (07XX…, 7XX…, 2547XX…, +254 7XX…) to 2547XXXXXXXX. */
var registerDonorFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("70e1e3f8ac4540e611f546cde6c1c020ce00ec011a895175e31148684c63e558"));
var signInFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("1c8dbdf7f5cc761075fc8f722c4e665daf13730bc25976325927176561f698d5"));
var fetchStoredDonorsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("3005b7b7010308b75f4e51de06e5cbea34ce5d5da228aad04caf7ad909af86b3"));
var publishRequestFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("8aea6cc01eb368ba2cd729a27d0afb09be70873f396e717be5594bd6ecb6e72e"));
var fetchStoredRequestsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("154fb035f1b8fee4d8f5f90241402b4bf932043dbedc723ac555ba13ee5fd44e"));
var pledgeToRequestFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("f7525309aa1f2e8d8c3a4aa6422da43391a97a6e6dbfe02ed2107755898bf9de"));
var fetchNetworkStatsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("33f6efa97bb886d83bd3df05be5c724650e13806074e61f7d09fe90af1351de3"));
/** Makes the actual M-Pesa STK push request server-side (avoids exposing the
* payment endpoint to the browser and lets us record the result reliably),
* then persists the payment to the database. */
var makeMpesaPaymentFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("5bfaabf60d9b16eb36ffb75c1287e143d5490220d09dff400ddb4dcb1326d440"));
var recordScheduleFn = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("4cdb332b8e0dac54e2ee56f8df8cb3284d80ff1557288df0ca0d708c04756468"));
var BLOOD_TYPES = [
	"O-",
	"O+",
	"A-",
	"A+",
	"B-",
	"B+",
	"AB-",
	"AB+"
];
/** Registers a new donor against the real database (hashed password, unique
* phone check), then signs them in client-side. Mirrors the original
* Blood-Donation-master registration flow. */
async function registerDonor(input) {
	const result = await registerDonorFn({ data: input });
	if ("error" in result) return result;
	setCurrentUser({
		name: result.donor.name,
		phone: result.donor.phone
	});
	return result;
}
/** Checks phone + password against the database (bcrypt-hashed), mirroring
* the original Signin.jsx check but backed by a real store. */
async function verifyCredentials(phone, password) {
	const result = await signInFn({ data: {
		phone,
		password
	} });
	if ("error" in result) return null;
	return result.user;
}
function storedDonorToDonor(d) {
	const parts = d.name.trim().split(/\s+/);
	const displayName = parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : parts[0] ?? "Donor";
	return {
		id: d.id,
		displayName,
		bloodType: d.bloodType,
		city: d.area || d.county.replace(" County", ""),
		county: d.county,
		distanceKm: 1.5,
		available: d.availableNow,
		verified: d.verified,
		lastVerified: d.verified ? "Recently" : "Not yet verified",
		donations: d.donations
	};
}
/** Persists a new blood request to the database, mirroring the original
* Adddonors.jsx flow. */
async function publishRequest(input) {
	return publishRequestFn({ data: input });
}
/** Records that a donor pledged a unit to a request. */
async function pledgeToRequest(requestId) {
	return pledgeToRequestFn({ data: { requestId } });
}
/** Makes a real M-Pesa payment request (server-side) and records it. */
async function makePayment(input) {
	return makeMpesaPaymentFn({ data: input });
}
/** Books a donation appointment in the database. */
async function recordSchedule(input) {
	return recordScheduleFn({ data: input });
}
/** Real network totals from the database, for the homepage impact section. */
async function fetchNetworkStats() {
	return fetchNetworkStatsFn();
}
/**
* Sample content used while the backend is not connected.
* Every consumer reads through the async helpers below so swapping in a real
* API only means changing these two functions.
*/
var SAMPLE_REQUESTS = [
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
		note: "Post-surgical transfusion. Hospital blood bank coordinating collection."
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
		verified: true
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
		verified: false
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
		note: "Maternity emergency. Two units already pledged."
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
		verified: true
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
		verified: true
	}
];
var SAMPLE_DONORS = [
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
		donations: 6
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
		donations: 11
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
		donations: 2
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
		donations: 1
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
		donations: 4
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
		donations: 8
	}
];
var KENYAN_COUNTIES = [
	"Nairobi County",
	"Mombasa County",
	"Kisumu County",
	"Nakuru County",
	"Uasin Gishu County",
	"Kiambu County",
	"Machakos County",
	"Kakamega County"
];
var delay = (ms) => new Promise((r) => setTimeout(r, ms));
function toBloodRequest(r) {
	return {
		id: r.id,
		patientAlias: r.patientAlias,
		bloodType: r.bloodType,
		units: r.units,
		unitsPledged: r.unitsPledged,
		facility: r.facility,
		city: r.city,
		county: r.county,
		distanceKm: r.distanceKm,
		urgency: r.urgency,
		neededBy: r.neededBy,
		postedAgo: r.postedAgo,
		verified: r.verified,
		...r.note ? { note: r.note } : {}
	};
}
async function fetchRequests() {
	await delay(150);
	return [...(await fetchStoredRequestsFn()).map(toBloodRequest), ...SAMPLE_REQUESTS];
}
async function fetchRequest(id) {
	await delay(100);
	return [...(await fetchStoredRequestsFn()).map(toBloodRequest), ...SAMPLE_REQUESTS].find((r) => r.id === id);
}
async function fetchDonors() {
	await delay(150);
	return [...(await fetchStoredDonorsFn()).map(storedDonorToDonor), ...SAMPLE_DONORS];
}
/** Who can receive from a given donor type, and who a patient can receive from. */
var COMPATIBILITY = {
	"O-": {
		donatesTo: [...BLOOD_TYPES],
		receivesFrom: ["O-"]
	},
	"O+": {
		donatesTo: [
			"O+",
			"A+",
			"B+",
			"AB+"
		],
		receivesFrom: ["O-", "O+"]
	},
	"A-": {
		donatesTo: [
			"A-",
			"A+",
			"AB-",
			"AB+"
		],
		receivesFrom: ["O-", "A-"]
	},
	"A+": {
		donatesTo: ["A+", "AB+"],
		receivesFrom: [
			"O-",
			"O+",
			"A-",
			"A+"
		]
	},
	"B-": {
		donatesTo: [
			"B-",
			"B+",
			"AB-",
			"AB+"
		],
		receivesFrom: ["O-", "B-"]
	},
	"B+": {
		donatesTo: ["B+", "AB+"],
		receivesFrom: [
			"O-",
			"O+",
			"B-",
			"B+"
		]
	},
	"AB-": {
		donatesTo: ["AB-", "AB+"],
		receivesFrom: [
			"O-",
			"A-",
			"B-",
			"AB-"
		]
	},
	"AB+": {
		donatesTo: ["AB+"],
		receivesFrom: [...BLOOD_TYPES]
	}
};
var URGENCY_LABEL = {
	routine: "Planned",
	soon: "Needed soon",
	urgent: "Urgent"
};
//#endregion
export { fetchDonors as a, fetchRequests as c, publishRequest as d, recordSchedule as f, verifyCredentials as h, URGENCY_LABEL as i, makePayment as l, setCurrentUser as m, COMPATIBILITY as n, fetchNetworkStats as o, registerDonor as p, KENYAN_COUNTIES as r, fetchRequest as s, BLOOD_TYPES as t, pledgeToRequest as u };
