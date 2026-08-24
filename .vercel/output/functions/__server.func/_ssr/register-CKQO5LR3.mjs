import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CheckboxIndicator, p as require_jsx_runtime, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { R as ArrowRight, j as Check, z as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, o as cn } from "./router-C_PTmrjT.mjs";
import { p as registerDonor, r as KENYAN_COUNTIES, t as BLOOD_TYPES } from "./blood-C0gI68U2.mjs";
import { t as Label } from "./label-D43TCrm7.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-D9vB1kNF.mjs";
import { t as Input } from "./input-DvWcyHbj.mjs";
import { t as AuthLayout } from "./AuthLayout-Hg0C_Lit.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-CKQO5LR3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var STEPS = [
	"Your details",
	"Blood & location",
	"Availability"
];
function RegisterPage() {
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [bloodType, setBloodType] = (0, import_react.useState)("O+");
	const [county, setCounty] = (0, import_react.useState)("Nairobi County");
	const [area, setArea] = (0, import_react.useState)("");
	const [radiusKm, setRadiusKm] = (0, import_react.useState)("15");
	const [availableNow, setAvailableNow] = (0, import_react.useState)(true);
	const [agreed, setAgreed] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthLayout, {
		title: "Join Lifeline",
		subtitle: "Three short steps. You can change anything later.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Already registered?",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/signin",
				className: "font-medium text-primary hover:underline",
				children: "Sign in"
			})
		] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mb-6 flex gap-2",
				"aria-label": "Progress",
				children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-1.5 rounded-full", i <= step ? "bg-primary" : "bg-muted"),
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("mt-2 block text-xs font-medium", i === step ? "text-foreground" : "text-muted-foreground"),
						children: s
					})]
				}, s))
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-5",
				onSubmit: (e) => {
					e.preventDefault();
					setError("");
					if (step < STEPS.length - 1) {
						setStep((s) => s + 1);
						return;
					}
					if (!agreed) {
						setError("Please agree to share your first name and approximate area with donors.");
						return;
					}
					setSubmitting(true);
					registerDonor({
						name,
						phone,
						password,
						bloodType,
						county,
						area,
						radiusKm,
						availableNow
					}).then((result) => {
						if (result.error) {
							setError(result.error);
							return;
						}
						toast.success("You're registered as a donor", { description: "We'll only contact you when someone nearby needs your blood type." });
						navigate({ to: "/dashboard" });
					}).finally(() => setSubmitting(false));
				},
				children: [
					step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								children: "Full name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								required: true,
								autoComplete: "name",
								placeholder: "Sarah Wanjiru",
								value: name,
								onChange: (e) => setName(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "phone",
									children: "Phone number"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "phone",
									required: true,
									autoComplete: "tel",
									inputMode: "tel",
									placeholder: "+254 7XX XXX XXX",
									value: phone,
									onChange: (e) => setPhone(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Never shown publicly."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "pw",
								children: "Create a password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "pw",
								type: "password",
								required: true,
								minLength: 8,
								autoComplete: "new-password",
								value: password,
								onChange: (e) => setPassword(e.target.value)
							})]
						})
					] }) : null,
					step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "bt",
									children: "Blood type"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: bloodType,
									onValueChange: (v) => setBloodType(v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										id: "bt",
										className: "h-11",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: BLOOD_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: t,
										children: t
									}, t)) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Not sure? Choose later - staff confirm your type at your first donation."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "county",
								children: "County"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: county,
								onValueChange: setCounty,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: "county",
									className: "h-11",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: KENYAN_COUNTIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c,
									children: c
								}, c)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "area",
								children: "Area (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "area",
								placeholder: "e.g. Kilimani",
								value: area,
								onChange: (e) => setArea(e.target.value)
							})]
						})
					] }) : null,
					step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "radius",
							children: "Notify me about requests within"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: radiusKm,
							onValueChange: setRadiusKm,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "radius",
								className: "h-11",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
								"5",
								"15",
								"30",
								"50"
							].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: r,
								children: [r, " km"]
							}, r)) })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-lg border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "avail",
							className: "flex items-start gap-3 font-normal",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								id: "avail",
								checked: availableNow,
								onCheckedChange: (v) => setAvailableNow(v === true),
								className: "mt-0.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-medium",
								children: "I'm available to donate now"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm text-muted-foreground",
								children: "You can pause this any time from your dashboard."
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "terms",
							className: "flex items-start gap-3 font-normal",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								id: "terms",
								checked: agreed,
								onCheckedChange: (v) => setAgreed(v === true),
								required: true,
								className: "mt-0.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "I agree that Lifeline may share my first name and approximate area with people searching for compatible donors."
							})]
						})]
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => setStep((s) => Math.max(0, s - 1)),
							disabled: step === 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { "aria-hidden": true }), "Back"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "lg",
							disabled: submitting,
							children: step === STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { "aria-hidden": true }), submitting ? "Registering…" : "Finish"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": true })] })
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { RegisterPage as component };
