import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { M as CalendarClock } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, r as Route$4 } from "./router-C_PTmrjT.mjs";
import { t as PageHero } from "./PageHero-CN14yFqn.mjs";
import { f as recordSchedule } from "./blood-C0gI68U2.mjs";
import { t as Label } from "./label-D43TCrm7.mjs";
import { t as Input } from "./input-DvWcyHbj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schedule-donation-s5v1DTbR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ScheduleDonationPage() {
	const navigate = useNavigate();
	const { donorName, bloodType, requestId } = Route$4.useSearch();
	const context = donorName || (requestId ? `request ${requestId}` : "");
	const [center, setCenter] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [time, setTime] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("100");
	const [error, setError] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Schedule",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Book a donation slot." }),
		description: context ? `Scheduling in connection with ${context}${bloodType ? ` (${bloodType})` : ""}. Choose a centre, date and time that work for you.` : "Choose a donation centre, date and time that work for you."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-page py-12 md:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-xl rounded-xl border bg-card p-6 shadow-card sm:p-8",
			children: [error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
				children: error
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-5",
				onSubmit: (e) => {
					e.preventDefault();
					setError("");
					if (Number(amount) < 100) {
						setError("Minimum service fee is KSh 100.");
						return;
					}
					setSubmitting(true);
					recordSchedule({
						context: context || "General donation",
						center,
						date,
						time,
						amount: Number(amount)
					}).then(() => {
						toast.success("Appointment booked", { description: "Continue to complete your service fee payment." });
						navigate({
							to: "/lipa-na-mpesa",
							search: {
								amount,
								context: context || "Donation service fee"
							}
						});
					}).finally(() => setSubmitting(false));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "center",
							children: "Donation centre"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "center",
							required: true,
							placeholder: "e.g. Kenyatta National Hospital",
							value: center,
							onChange: (e) => setCenter(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "date",
								children: "Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "date",
								type: "date",
								required: true,
								value: date,
								onChange: (e) => setDate(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "time",
								children: "Time"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "time",
								type: "time",
								required: true,
								value: time,
								onChange: (e) => setTime(e.target.value)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "amount",
							children: "Service fee (KSh, minimum 100)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "amount",
							type: "number",
							min: 100,
							required: true,
							value: amount,
							onChange: (e) => setAmount(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						size: "lg",
						className: "w-full",
						disabled: submitting,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { "aria-hidden": true }), submitting ? "Booking…" : "Confirm appointment"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "By scheduling, you confirm these details are correct and agree to the donation terms."
					})
				]
			})]
		})
	})] });
}
//#endregion
export { ScheduleDonationPage as component };
