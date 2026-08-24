import { i as createServerFn } from "./server-C9_bbqfV.mjs";
import { a as payments, n as createServerRpc, o as schedules, r as db } from "./client-DxttxtoS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payments-C7dZTxbi.js
function normalizeKenyanPhone(raw) {
	const digits = raw.replace(/\D/g, "");
	if (digits.startsWith("254") && digits.length === 12) return digits;
	if (digits.startsWith("0") && digits.length === 10) return `254${digits.slice(1)}`;
	if (digits.startsWith("7") && digits.length === 9) return `254${digits}`;
	return null;
}
var makeMpesaPaymentFn_createServerFn_handler = createServerRpc({
	id: "5bfaabf60d9b16eb36ffb75c1287e143d5490220d09dff400ddb4dcb1326d440",
	name: "makeMpesaPaymentFn",
	filename: "src/rpc/payments.ts"
}, (opts) => makeMpesaPaymentFn.__executeServer(opts));
var makeMpesaPaymentFn = createServerFn({ method: "POST" }).validator((input) => input).handler(makeMpesaPaymentFn_createServerFn_handler, async ({ data }) => {
	if (data.amount < 100) return { error: "Minimum payment amount is KSh 100." };
	const normalizedPhone = normalizeKenyanPhone(data.phone);
	if (!normalizedPhone) return { error: "Enter a valid Safaricom number, e.g. 07XXXXXXXX or 2547XXXXXXXX." };
	try {
		const formData = new FormData();
		formData.append("amount", String(data.amount));
		formData.append("phone", normalizedPhone);
		const result = await (await fetch("https://matthiashiggs.alwaysdata.net/api/mpesa_payment", {
			method: "POST",
			body: formData
		})).json().catch(() => ({}));
		const reference = result.reference || result.CheckoutRequestID || `MPESA-${Date.now().toString().slice(-6)}`;
		db.insert(payments).values({
			id: `pay-${Date.now()}`,
			context: data.context || "Lifeline service fee",
			amount: data.amount,
			phone: normalizedPhone,
			reference,
			status: "Pending confirmation",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		}).run();
		return {
			success: true,
			message: result.message || "M-Pesa payment request sent. Check your phone to complete it.",
			reference
		};
	} catch {
		return { error: "Something went wrong reaching M-Pesa. Please try again." };
	}
});
var recordScheduleFn_createServerFn_handler = createServerRpc({
	id: "4cdb332b8e0dac54e2ee56f8df8cb3284d80ff1557288df0ca0d708c04756468",
	name: "recordScheduleFn",
	filename: "src/rpc/payments.ts"
}, (opts) => recordScheduleFn.__executeServer(opts));
var recordScheduleFn = createServerFn({ method: "POST" }).validator((input) => input).handler(recordScheduleFn_createServerFn_handler, async ({ data }) => {
	db.insert(schedules).values({
		id: `sched-${Date.now()}`,
		context: data.context,
		center: data.center,
		date: data.date,
		time: data.time,
		amount: data.amount,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}).run();
	return { ok: true };
});
//#endregion
export { makeMpesaPaymentFn_createServerFn_handler, recordScheduleFn_createServerFn_handler };
