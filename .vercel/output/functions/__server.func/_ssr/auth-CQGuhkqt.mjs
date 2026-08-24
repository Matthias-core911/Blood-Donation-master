import { i as createServerFn } from "./server-C9_bbqfV.mjs";
import { o as eq } from "../_libs/drizzle-orm.mjs";
import { i as donors, n as createServerRpc, r as db } from "./client-DxttxtoS.mjs";
import { t as bcryptjs_default } from "../_libs/bcryptjs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CQGuhkqt.js
/** Normalizes Kenyan phone input (07XX…, 7XX…, 2547XX…, +254 7XX…) to 2547XXXXXXXX. */
function normalizeKenyanPhone(raw) {
	const digits = raw.replace(/\D/g, "");
	if (digits.startsWith("254") && digits.length === 12) return digits;
	if (digits.startsWith("0") && digits.length === 10) return `254${digits.slice(1)}`;
	if (digits.startsWith("7") && digits.length === 9) return `254${digits}`;
	return null;
}
var registerDonorFn_createServerFn_handler = createServerRpc({
	id: "70e1e3f8ac4540e611f546cde6c1c020ce00ec011a895175e31148684c63e558",
	name: "registerDonorFn",
	filename: "src/rpc/auth.ts"
}, (opts) => registerDonorFn.__executeServer(opts));
var registerDonorFn = createServerFn({ method: "POST" }).validator((input) => input).handler(registerDonorFn_createServerFn_handler, async ({ data }) => {
	const normalizedPhone = normalizeKenyanPhone(data.phone);
	if (!normalizedPhone) return { error: "Enter a valid Kenyan phone number, e.g. 07XX XXX XXX." };
	if (data.password.length < 8) return { error: "Password should be at least 8 characters." };
	if (db.select().from(donors).where(eq(donors.phone, normalizedPhone)).get()) return { error: "A donor with this phone number is already registered." };
	const passwordHash = await bcryptjs_default.hash(data.password, 10);
	const id = `donor-${Date.now()}`;
	const createdAt = (/* @__PURE__ */ new Date()).toISOString();
	db.insert(donors).values({
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
		createdAt
	}).run();
	return { donor: {
		id,
		name: data.name,
		phone: normalizedPhone
	} };
});
var signInFn_createServerFn_handler = createServerRpc({
	id: "1c8dbdf7f5cc761075fc8f722c4e665daf13730bc25976325927176561f698d5",
	name: "signInFn",
	filename: "src/rpc/auth.ts"
}, (opts) => signInFn.__executeServer(opts));
var signInFn = createServerFn({ method: "POST" }).validator((input) => input).handler(signInFn_createServerFn_handler, async ({ data }) => {
	const normalizedPhone = normalizeKenyanPhone(data.phone);
	if (!normalizedPhone) return { error: "Enter a valid Kenyan phone number." };
	const donor = db.select().from(donors).where(eq(donors.phone, normalizedPhone)).get();
	if (!donor) return { error: "We couldn't find an account with that phone number." };
	if (!await bcryptjs_default.compare(data.password, donor.passwordHash)) return { error: "Incorrect password. Try again." };
	return { user: {
		name: donor.name,
		phone: donor.phone
	} };
});
var fetchStoredDonorsFn_createServerFn_handler = createServerRpc({
	id: "3005b7b7010308b75f4e51de06e5cbea34ce5d5da228aad04caf7ad909af86b3",
	name: "fetchStoredDonorsFn",
	filename: "src/rpc/auth.ts"
}, (opts) => fetchStoredDonorsFn.__executeServer(opts));
var fetchStoredDonorsFn = createServerFn({ method: "GET" }).handler(fetchStoredDonorsFn_createServerFn_handler, async () => {
	return db.select().from(donors).all().map((d) => ({
		id: d.id,
		name: d.name,
		bloodType: d.bloodType,
		county: d.county,
		area: d.area,
		availableNow: d.availableNow,
		verified: d.verified,
		donations: d.donations
	}));
});
//#endregion
export { fetchStoredDonorsFn_createServerFn_handler, registerDonorFn_createServerFn_handler, signInFn_createServerFn_handler };
