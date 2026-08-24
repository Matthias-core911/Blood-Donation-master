import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as notFound, _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as Building2, a as Timer, c as ShieldCheck, m as MapPin, z as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, n as Route$1, o as cn } from "./router-C_PTmrjT.mjs";
import { n as VerifiedTag, t as BloodTypeBadge } from "./VerifiedTag-CUmBNYgJ.mjs";
import { s as fetchRequest, u as pledgeToRequest } from "./blood-C0gI68U2.mjs";
import { t as UrgencyBadge } from "./UrgencyBadge-CdWlPoOD.mjs";
import { n as Skeleton, t as ErrorState } from "./ErrorState-DOLwhl_B.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/requests._requestId-E3n1TlJU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
function RequestDetail() {
	const { requestId } = Route$1.useParams();
	const navigate = useNavigate();
	const { data, isPending, isError, refetch } = useQuery({
		queryKey: ["request", requestId],
		queryFn: async () => {
			const r = await fetchRequest(requestId);
			if (!r) throw notFound();
			return r;
		}
	});
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page section-y max-w-4xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-48" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-56 w-full rounded-xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full rounded-xl" })
		]
	});
	if (isError || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-page section-y max-w-4xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
			description: "We couldn't load this request.",
			onRetry: () => refetch()
		})
	});
	const pct = Math.round(data.unitsPledged / data.units * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page section-y max-w-4xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/requests",
			className: "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
				className: "size-4",
				"aria-hidden": true
			}), "All requests"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-xl border bg-card p-6 shadow-card sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BloodTypeBadge, {
							type: data.bloodType,
							size: "lg"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-2xl font-bold sm:text-3xl",
							children: [
								data.units,
								" ",
								data.units === 1 ? "unit" : "units",
								" of ",
								data.bloodType,
								" needed"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-muted-foreground",
							children: [
								data.patientAlias,
								" · posted ",
								data.postedAgo
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrgencyBadge, { urgency: data.urgency })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium",
							children: [
								data.unitsPledged,
								" of ",
								data.units,
								" units pledged"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [pct, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: pct,
						className: "h-2"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 grid gap-5 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							icon: Building2,
							label: "Facility",
							value: data.facility
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							icon: MapPin,
							label: "Location",
							value: `${data.city}, ${data.county} · ${data.distanceKm} km away`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							icon: Timer,
							label: "Needed by",
							value: data.neededBy
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
								className: "mt-0.5 size-5 text-muted-foreground",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs uppercase tracking-wide text-muted-foreground",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedTag, { verified: data.verified })
							})] })]
						})
					]
				}),
				data.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 rounded-lg bg-surface p-4 text-sm leading-relaxed text-muted-foreground",
					children: data.note
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						onClick: () => {
							pledgeToRequest(data.id).then(() => {
								toast.success("Pledge recorded", { description: "Next, pick a donation centre, date and time." });
								navigate({
									to: "/schedule-donation",
									search: {
										donorName: "",
										bloodType: data.bloodType,
										requestId: data.id
									}
								});
							});
						},
						children: "Pledge to donate"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						variant: "outline",
						onClick: () => toast("Link copied to share with your network"),
						children: "Share this request"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted-foreground",
					children: "Donation, screening and transfusion take place at the listed facility. Lifeline only coordinates the connection."
				})
			]
		})]
	});
}
function Detail({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "mt-0.5 size-5 text-muted-foreground",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-xs uppercase tracking-wide text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-1 text-sm font-medium",
				children: value
			})]
		})]
	});
}
//#endregion
export { RequestDetail as component };
