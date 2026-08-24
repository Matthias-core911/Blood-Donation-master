import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as Info, b as Heart, m as MapPin, r as UserSearch, u as Search } from "../_libs/lucide-react.mjs";
import { a as Button } from "./router-C_PTmrjT.mjs";
import { t as PageHero } from "./PageHero-CN14yFqn.mjs";
import { n as VerifiedTag, t as BloodTypeBadge } from "./VerifiedTag-CUmBNYgJ.mjs";
import { t as StatusDot } from "./StatusDot-CgI10QF4.mjs";
import { a as fetchDonors, n as COMPATIBILITY, r as KENYAN_COUNTIES, t as BLOOD_TYPES } from "./blood-C0gI68U2.mjs";
import { t as ErrorState } from "./ErrorState-DOLwhl_B.mjs";
import { t as CardSkeletonGrid } from "./CardSkeleton-jTOeRgx1.mjs";
import { t as EmptyState } from "./EmptyState-nqinGrtv.mjs";
import { t as Label } from "./label-D43TCrm7.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-D9vB1kNF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/find-blood-F7PxqSL8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DonorCard({ donor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex h-full flex-col gap-4 rounded-2xl border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BloodTypeBadge, {
						type: donor.bloodType,
						tone: "soft"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate font-display text-base font-semibold",
							children: donor.displayName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedTag, { verified: donor.verified })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, {
					tone: donor.available ? "success" : "muted",
					label: donor.available ? "Available" : "Unavailable"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "space-y-2 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							className: "size-4 shrink-0",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "sr-only",
							children: "Approximate area"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "truncate",
							children: [
								donor.city,
								" · about ",
								donor.distanceKm,
								" km away"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
							className: "size-4 shrink-0",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "sr-only",
							children: "Donations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
							donor.donations,
							" ",
							donor.donations === 1 ? "donation" : "donations",
							" · last verified",
							" ",
							donor.lastVerified.toLowerCase()
						] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex items-center justify-between gap-3 border-t pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: "Contact shared after a match"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					variant: "outline",
					className: "rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/schedule-donation",
						search: {
							donorName: donor.displayName,
							bloodType: donor.bloodType,
							requestId: ""
						},
						children: "Request contact"
					})
				})]
			})
		]
	});
}
function FindBloodPage() {
	const [bloodType, setBloodType] = (0, import_react.useState)("O+");
	const [county, setCounty] = (0, import_react.useState)("Nairobi County");
	const [distance, setDistance] = (0, import_react.useState)("10");
	const [availability, setAvailability] = (0, import_react.useState)("available");
	const { data, isPending, isError, refetch } = useQuery({
		queryKey: ["donors"],
		queryFn: fetchDonors
	});
	const compatible = COMPATIBILITY[bloodType].receivesFrom;
	const results = (0, import_react.useMemo)(() => {
		if (!data) return [];
		return data.filter((d) => compatible.includes(d.bloodType) && d.county === county && d.distanceKm <= Number(distance) && (availability === "all" || d.available));
	}, [
		data,
		compatible,
		county,
		distance,
		availability
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Search",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Find blood." }),
		description: "Search donors whose blood type is compatible with the patient. We show an approximate area only - contact details are shared after both sides accept a match."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-12 md:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-8 rounded-xl border bg-card p-5 shadow-card sm:p-6",
			onSubmit: (e) => e.preventDefault(),
			"aria-label": "Donor search",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "bt",
							children: "Patient blood type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
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
						})]
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
							htmlFor: "distance",
							children: "Distance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: distance,
							onValueChange: setDistance,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "distance",
								className: "h-11",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
								"5",
								"10",
								"25",
								"50"
							].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: d,
								children: [
									"Within ",
									d,
									" km"
								]
							}, d)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "availability",
							children: "Availability"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: availability,
							onValueChange: setAvailability,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "availability",
								className: "h-11",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "available",
								children: "Available now"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "Any status"
							})] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							size: "lg",
							className: "w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { "aria-hidden": true }), "Find donors"]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 flex items-start gap-2 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						className: "mt-0.5 size-4 shrink-0",
						"aria-hidden": true
					}),
					"Showing donors compatible with ",
					bloodType,
					": ",
					compatible.join(", "),
					". The hospital confirms final matching."
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			"aria-live": "polite",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: isPending ? "Searching…" : `${results.length} matching donors`
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardSkeletonGrid, {}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					description: "We couldn't load donors right now.",
					onRetry: () => refetch()
				}) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: UserSearch,
					title: "No matching donors yet",
					description: "Try widening the distance or choosing a different county. You can also publish a request so compatible donors are alerted.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/requests/new",
							children: "Create a request"
						})
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
					children: results.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonorCard, { donor: d }, d.id))
				})
			})]
		})]
	})] });
}
//#endregion
export { FindBloodPage as component };
