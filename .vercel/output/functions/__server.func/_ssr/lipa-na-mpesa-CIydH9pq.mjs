import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { C as Copy, j as Check, o as Smartphone } from "../_libs/lucide-react.mjs";
import { a as Button, i as Route$7 } from "./router-C_PTmrjT.mjs";
import { t as PageHero } from "./PageHero-CN14yFqn.mjs";
import { l as makePayment } from "./blood-C0gI68U2.mjs";
import { t as Label } from "./label-D43TCrm7.mjs";
import { t as Input } from "./input-DvWcyHbj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lipa-na-mpesa-CIydH9pq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MpesaPaymentPage() {
	const { amount: initialAmount, context } = Route$7.useSearch();
	const [amount, setAmount] = (0, import_react.useState)(initialAmount || "1400");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [reference, setReference] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setReference("");
		setLoading(true);
		const result = await makePayment({
			amount: Number(amount),
			phone,
			context: context || "Lifeline service fee"
		}).catch(() => ({ error: "Something went wrong reaching M-Pesa. Please try again." }));
		if ("error" in result) setError(result.error);
		else {
			setSuccess(result.message);
			setReference(result.reference);
			setPhone("");
		}
		setLoading(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Payment",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Lipa na M-Pesa." }),
		description: context ? `Complete your payment for ${context}.` : "Complete your Lifeline service fee payment securely via M-Pesa."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-page py-12 md:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-lg rounded-xl border bg-card p-6 shadow-card sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-11 items-center justify-center rounded-xl bg-success-soft text-success",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {
							className: "size-5",
							"aria-hidden": true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "M-Pesa Payment"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Ensure your phone is on to receive the STK prompt."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-3",
					children: [
						success ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-lg border border-success/30 bg-success-soft px-4 py-3 text-sm text-success",
							children: success
						}) : null,
						reference ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["Reference: ", reference]
						}) : null,
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
							children: error
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "mt-6 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "amount",
								children: "Amount (KSh)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "amount",
								type: "number",
								min: 100,
								required: true,
								value: amount,
								onChange: (e) => setAmount(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "phone",
								children: "Phone number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "phone",
								type: "tel",
								required: true,
								placeholder: "07XXXXXXXX or 2547XXXXXXXX",
								value: phone,
								onChange: (e) => setPhone(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "lg",
							className: "w-full",
							disabled: loading,
							children: loading ? "Processing…" : "Make payment"
						})
					]
				}),
				reference ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "mt-4",
					onClick: async () => {
						await navigator.clipboard.writeText(reference);
						setCopied(true);
					},
					children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? "Reference copied" : "Copy reference"]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-xs text-muted-foreground",
					children: [
						"Having trouble?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "font-medium text-primary hover:underline",
							children: "Contact support"
						}),
						"."
					]
				})
			]
		})
	})] });
}
//#endregion
export { MpesaPaymentPage as component };
