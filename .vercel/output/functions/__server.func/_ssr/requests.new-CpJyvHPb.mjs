import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { E as Circle, R as ArrowRight, j as Check, z as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, o as cn } from "./router-C_PTmrjT.mjs";
import { d as publishRequest, i as URGENCY_LABEL, r as KENYAN_COUNTIES, t as BLOOD_TYPES } from "./blood-C0gI68U2.mjs";
import { t as Label } from "./label-D43TCrm7.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-D9vB1kNF.mjs";
import { t as Input } from "./input-DvWcyHbj.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/@radix-ui/react-radio-group+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/requests.new-CpJyvHPb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
var STEPS = [
	"Patient",
	"Requirement",
	"Location",
	"Urgency",
	"Review"
];
function NewRequestPage() {
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [form, setForm] = (0, import_react.useState)({
		alias: "",
		relationship: "",
		bloodType: "O+",
		units: "2",
		facility: "",
		county: "Nairobi County",
		area: "",
		urgency: "soon",
		neededBy: "",
		note: ""
	});
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const submit = () => {
		setSubmitting(true);
		publishRequest({
			alias: form.alias,
			relationship: form.relationship,
			bloodType: form.bloodType,
			units: Number(form.units) || 1,
			facility: form.facility,
			county: form.county,
			area: form.area,
			urgency: form.urgency,
			neededBy: form.neededBy,
			...form.note ? { note: form.note } : {}
		}).then(() => {
			toast.success("Request published", { description: "Compatible donors nearby are being notified now." });
			navigate({ to: "/requests" });
		}).finally(() => setSubmitting(false));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page section-y max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/requests",
				className: "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					className: "size-4",
					"aria-hidden": true
				}), "Cancel"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow mt-8 text-primary",
				children: "New request"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display-lg mt-4",
				children: "Create a blood request."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted-foreground",
				children: "Five short steps. Only the patient's initial is shown publicly."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 flex flex-wrap gap-2",
				"aria-label": "Progress",
				children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex-1 min-w-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-1.5 rounded-full", i <= step ? "bg-primary" : "bg-muted"),
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("mt-2 block text-xs font-medium", i === step ? "text-foreground" : "text-muted-foreground"),
						children: [
							i + 1,
							". ",
							s,
							i === step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: " (current step)"
							}) : null
						]
					})]
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 rounded-xl border bg-card p-6 shadow-card sm:p-8",
				onSubmit: (e) => {
					e.preventDefault();
					if (step === STEPS.length - 1) submit();
					else setStep((s) => s + 1);
				},
				children: [
					step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "font-display text-lg font-semibold",
								children: "Patient information"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "alias",
										children: "Patient initial or alias"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "alias",
										required: true,
										maxLength: 40,
										placeholder: "e.g. Patient M.",
										value: form.alias,
										onChange: (e) => set("alias", e.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Please don't enter a full name - this is shown publicly."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "rel",
									children: "Your relationship to the patient"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "rel",
									maxLength: 60,
									placeholder: "Family member, hospital coordinator…",
									value: form.relationship,
									onChange: (e) => set("relationship", e.target.value)
								})]
							})
						]
					}) : null,
					step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "font-display text-lg font-semibold",
							children: "Blood requirement"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "bt",
									children: "Blood type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.bloodType,
									onValueChange: (v) => set("bloodType", v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										id: "bt",
										className: "h-11",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: BLOOD_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: t,
										children: t
									}, t)) })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "units",
									children: "Units needed"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "units",
									type: "number",
									min: 1,
									max: 20,
									required: true,
									value: form.units,
									onChange: (e) => set("units", e.target.value)
								})]
							})]
						})]
					}) : null,
					step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "font-display text-lg font-semibold",
								children: "Location"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "facility",
									children: "Hospital or blood bank"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "facility",
									required: true,
									placeholder: "e.g. Kenyatta National Hospital",
									value: form.facility,
									onChange: (e) => set("facility", e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "county",
										children: "County"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.county,
										onValueChange: (v) => set("county", v),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "county",
											className: "h-11",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: KENYAN_COUNTIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: c,
											children: c
										}, c)) })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "area",
										children: "Area or ward"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "area",
										placeholder: "e.g. Upper Hill",
										value: form.area,
										onChange: (e) => set("area", e.target.value)
									})]
								})]
							})
						]
					}) : null,
					step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "font-display text-lg font-semibold",
								children: "Urgency"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
								value: form.urgency,
								onValueChange: (v) => set("urgency", v),
								className: "gap-3",
								children: [
									"urgent",
									"soon",
									"routine"
								].map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: `u-${u}`,
									className: "flex cursor-pointer items-start gap-3 rounded-lg border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary-soft/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
										id: `u-${u}`,
										value: u,
										className: "mt-0.5"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-medium",
										children: URGENCY_LABEL[u]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-normal text-muted-foreground",
										children: u === "urgent" ? "Needed within hours. Donors nearby are alerted immediately." : u === "soon" ? "Needed within a day or two." : "Scheduled procedure or ongoing treatment."
									})] })]
								}, u))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "by",
									children: "Needed by"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "by",
									placeholder: "e.g. Today before 18:00",
									value: form.neededBy,
									onChange: (e) => set("neededBy", e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "note",
									children: "Note for donors (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "note",
									rows: 3,
									maxLength: 300,
									value: form.note,
									onChange: (e) => set("note", e.target.value)
								})]
							})
						]
					}) : null,
					step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Review"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
								className: "divide-y rounded-lg border",
								children: [
									["Patient", form.alias || "-"],
									["Blood type", form.bloodType],
									["Units", form.units],
									["Facility", form.facility || "-"],
									["Location", [form.area, form.county].filter(Boolean).join(", ")],
									["Urgency", URGENCY_LABEL[form.urgency]],
									["Needed by", form.neededBy || "-"]
								].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap justify-between gap-2 p-4 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: k
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-medium",
										children: v
									})]
								}, k))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "By publishing you confirm the details are accurate and that the facility is expecting donors."
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center justify-between gap-3 border-t pt-6",
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
							children: step === STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { "aria-hidden": true }), submitting ? "Publishing…" : "Publish request"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": true })] })
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { NewRequestPage as component };
