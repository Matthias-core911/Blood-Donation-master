import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { c as ShieldCheck, g as Lock, n as Users, y as Hospital } from "../_libs/lucide-react.mjs";
import { a as Button } from "./router-C_PTmrjT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-HINVySkP.js
var import_jsx_runtime = require_jsx_runtime();
var PRINCIPLES = [
	{
		icon: ShieldCheck,
		title: "Verification before visibility",
		body: "Requests are checked against the requesting facility, and donors confirm eligibility before appearing in search results."
	},
	{
		icon: Lock,
		title: "Privacy by default",
		body: "We show a first name, an approximate area and blood type. Exact locations and phone numbers are only shared when both sides agree to a match."
	},
	{
		icon: Hospital,
		title: "Facilities stay in charge",
		body: "Lifeline coordinates people. Screening, collection and transfusion always happen at a licensed hospital or blood bank."
	},
	{
		icon: Users,
		title: "Built for how Kenya donates",
		body: "Mobile-first, low-bandwidth friendly, and organised around counties, referral hospitals and community drives."
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative -mt-20 overflow-hidden bg-ink text-ink-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 grad-ember",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute -left-24 top-0 size-[28rem] rounded-full bg-primary/20 blur-3xl",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page relative max-w-3xl pb-16 pt-32 md:pb-20 md:pt-40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-primary",
						children: "About"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "display-xl mt-5 text-white",
						children: "A calmer way to find blood."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-white/65",
						children: "Most blood searches in Kenya still happen through group chats and phone trees. Lifeline turns that scramble into a clear, verified list of people who can actually help - without exposing anyone's private details."
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-page section-y",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: PRINCIPLES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border bg-card p-6 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, {
								className: "size-5",
								"aria-hidden": true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-lg font-semibold",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: p.body
						})
					]
				}, p.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 rounded-xl border bg-surface p-6 text-sm leading-relaxed text-muted-foreground sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-semibold text-foreground",
					children: "What Lifeline does not do"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 list-disc space-y-2 pl-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "We do not give medical advice or determine transfusion suitability." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "We cannot guarantee that a matching donor will be found in time." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "We never sell or share personal data with advertisers." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						children: "Become a donor"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/requests",
						children: "See open requests"
					})
				})]
			})
		]
	})] });
}
//#endregion
export { AboutPage as component };
