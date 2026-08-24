import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { S as Droplet, a as Timer, m as MapPin } from "../_libs/lucide-react.mjs";
import { a as Button, o as cn } from "./router-C_PTmrjT.mjs";
import { n as VerifiedTag, t as BloodTypeBadge } from "./VerifiedTag-CUmBNYgJ.mjs";
import { t as UrgencyBadge } from "./UrgencyBadge-CdWlPoOD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RequestCard-BlaHFSs-.js
var import_jsx_runtime = require_jsx_runtime();
function RequestCard({ request }) {
	const urgent = request.urgency === "urgent";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("group flex h-full flex-col gap-4 rounded-2xl border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift", urgent && "border-urgent/40"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BloodTypeBadge, {
						type: request.bloodType,
						size: "lg",
						tone: urgent ? "solid" : "soft",
						className: urgent ? "relative pulse-ring" : ""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "truncate font-display text-lg font-bold tracking-tight",
							children: [
								request.units,
								" ",
								request.units === 1 ? "unit" : "units",
								" needed"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm text-muted-foreground",
							children: request.facility
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrgencyBadge, { urgency: request.urgency })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-1 gap-2 text-sm sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								className: "size-4 shrink-0",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "sr-only",
								children: "Location"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "truncate",
								children: [
									request.city,
									" · ",
									request.distanceKm,
									" km away"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, {
								className: "size-4 shrink-0",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "sr-only",
								children: "Needed by"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "truncate",
								children: request.neededBy
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, {
								className: "size-4 shrink-0",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "sr-only",
								children: "Pledges"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
								request.unitsPledged,
								" of ",
								request.units,
								" pledged"
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedTag, { verified: request.verified })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex items-center justify-between gap-3 border-t pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: ["Posted ", request.postedAgo]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					variant: urgent ? "default" : "soft",
					className: "rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/requests/$requestId",
						params: { requestId: request.id },
						children: "View request"
					})
				})]
			})
		]
	});
}
//#endregion
export { RequestCard as t };
