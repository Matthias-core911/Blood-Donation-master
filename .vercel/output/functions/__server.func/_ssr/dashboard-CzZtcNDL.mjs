import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { F as Bell, M as CalendarClock, R as ArrowRight, S as Droplet, x as HeartHandshake } from "../_libs/lucide-react.mjs";
import { a as Button } from "./router-C_PTmrjT.mjs";
import { t as PageHero } from "./PageHero-CN14yFqn.mjs";
import { t as BloodTypeBadge } from "./VerifiedTag-CUmBNYgJ.mjs";
import { t as StatusDot } from "./StatusDot-CgI10QF4.mjs";
import { c as fetchRequests } from "./blood-C0gI68U2.mjs";
import { t as RequestCard } from "./RequestCard-BlaHFSs-.mjs";
import { t as ErrorState } from "./ErrorState-DOLwhl_B.mjs";
import { t as CardSkeletonGrid } from "./CardSkeleton-jTOeRgx1.mjs";
import { t as EmptyState } from "./EmptyState-nqinGrtv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CzZtcNDL.js
var import_jsx_runtime = require_jsx_runtime();
var ACTIVITY = [
	{
		when: "2 days ago",
		text: "You confirmed availability for the next 30 days."
	},
	{
		when: "12 June",
		text: "Donation completed at Kenyatta National Hospital."
	},
	{
		when: "9 June",
		text: "You pledged to request #1012 (O+, 1 unit)."
	}
];
function DashboardPage() {
	const { data, isPending, isError, refetch } = useQuery({
		queryKey: ["requests"],
		queryFn: fetchRequests
	});
	const nearby = (data ?? []).filter((r) => r.distanceKm <= 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Your Lifeline",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Good morning, Sarah." }),
		description: "You're visible to requests within 15 km of Nairobi County.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			className: "rounded-full border-white/30 bg-white/5 text-white hover:bg-white hover:text-ink",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/profile",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { "aria-hidden": true }), "Notification settings"]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-12 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border bg-card p-6 shadow-card lg:col-span-2",
					"aria-labelledby": "status",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "status",
						className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Your donor status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BloodTypeBadge, {
							type: "O+",
							size: "lg"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, {
								tone: "success",
								label: "Available to donate"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "Last donation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 font-medium",
									children: "12 June 2026"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "Next eligible date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 font-medium",
									children: "12 August 2026"
								})] })]
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border bg-card p-6 shadow-card",
					"aria-labelledby": "impact",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "impact",
						className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Your impact"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, {
									className: "size-5",
									"aria-hidden": true
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-bold",
								children: "3"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "donations recorded"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-lg bg-success-soft text-success",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, {
									className: "size-5",
									"aria-hidden": true
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-bold",
								children: "9"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "patients potentially supported"
							})] })]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				"aria-labelledby": "nearby-requests",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "nearby-requests",
						className: "font-display text-xl font-semibold",
						children: "Requests near you"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/requests",
							children: ["All requests", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": true })]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardSkeletonGrid, {}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
						description: "We couldn't load nearby requests.",
						onRetry: () => refetch()
					}) : nearby.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: CalendarClock,
						title: "No requests near you right now",
						description: "We'll notify you the moment a compatible request appears within your radius."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
						children: nearby.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestCard, { request: r }, r.id))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				"aria-labelledby": "activity",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "activity",
					className: "font-display text-xl font-semibold",
					children: "Recent activity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 divide-y rounded-xl border bg-card",
					children: ACTIVITY.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-2 p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: a.when
						})]
					}, a.text))
				})]
			})
		]
	})] });
}
//#endregion
export { DashboardPage as component };
