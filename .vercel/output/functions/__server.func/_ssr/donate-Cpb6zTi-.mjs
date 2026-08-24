import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { D as CircleX, M as CalendarClock, O as CircleCheck } from "../_libs/lucide-react.mjs";
import { a as Button } from "./router-C_PTmrjT.mjs";
import { c as fetchRequests } from "./blood-C0gI68U2.mjs";
import { t as RequestCard } from "./RequestCard-BlaHFSs-.mjs";
import { t as ErrorState } from "./ErrorState-DOLwhl_B.mjs";
import { t as CardSkeletonGrid } from "./CardSkeleton-jTOeRgx1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/donate-Cpb6zTi-.js
var import_jsx_runtime = require_jsx_runtime();
var CAN = [
	"You are between 16 and 65 years old",
	"You weigh at least 50 kg",
	"You are in good general health today",
	"It has been at least 3 months since your last donation"
];
var WAIT = [
	"You currently have an infection, fever or flu",
	"You are pregnant or gave birth in the last 6 months",
	"You had a tattoo or piercing in the last 3 months",
	"You are being treated for a condition that affects blood"
];
function DonatePage() {
	const { data, isPending, isError, refetch } = useQuery({
		queryKey: ["requests"],
		queryFn: fetchRequests
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative -mt-20 overflow-hidden bg-ink text-ink-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 grad-ember",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute -right-20 top-10 size-[30rem] rounded-full bg-primary/20 blur-3xl",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page relative max-w-3xl pb-16 pt-32 md:pb-20 md:pt-40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-primary",
							children: "Donate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "display-xl mt-5 text-white",
							children: [
								"Under an hour.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Years of difference."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-lg text-white/65",
							children: "Register once, tell us when you're available, and we'll only get in touch when someone nearby needs your blood type."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/register",
									children: "Register as a donor"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "xl",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/requests",
									children: "See who needs help"
								})
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-page section-y",
			"aria-labelledby": "eligibility",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "eligibility",
					className: "font-display text-2xl font-bold sm:text-3xl",
					children: "Can you donate?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted-foreground",
					children: "A general guide only. Final eligibility is always confirmed by staff at the donation centre."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border bg-card p-6 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "flex items-center gap-2 font-display text-lg font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								className: "size-5 text-success",
								"aria-hidden": true
							}), "Usually yes, if"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3 text-sm text-muted-foreground",
							children: CAN.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									className: "mt-0.5 size-4 shrink-0 text-success",
									"aria-hidden": true
								}), c]
							}, c))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border bg-card p-6 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "flex items-center gap-2 font-display text-lg font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {
								className: "size-5 text-warning-foreground",
								"aria-hidden": true
							}), "Please wait, if"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3 text-sm text-muted-foreground",
							children: WAIT.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
									className: "mt-0.5 size-4 shrink-0 text-muted-foreground",
									"aria-hidden": true
								}), c]
							}, c))
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t bg-surface",
			"aria-labelledby": "nearby",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page section-y",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "nearby",
					className: "font-display text-2xl font-bold sm:text-3xl",
					children: "Requests you could help with"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardSkeletonGrid, {}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
						description: "We couldn't load nearby requests.",
						onRetry: () => refetch()
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
						children: (data ?? []).slice(0, 3).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestCard, { request: r }, r.id))
					})
				})]
			})
		})
	] });
}
//#endregion
export { DonatePage as component };
