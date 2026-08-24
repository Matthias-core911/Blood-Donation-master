import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { L as ArrowUpRight, R as ArrowRight, c as ShieldCheck, m as MapPin, z as ArrowLeft } from "../_libs/lucide-react.mjs";
import { a as Button, o as cn } from "./router-C_PTmrjT.mjs";
import { c as fetchRequests, i as URGENCY_LABEL, n as COMPATIBILITY, o as fetchNetworkStats, t as BLOOD_TYPES } from "./blood-C0gI68U2.mjs";
import { t as ErrorState } from "./ErrorState-DOLwhl_B.mjs";
import { t as CardSkeletonGrid } from "./CardSkeleton-jTOeRgx1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DwOyKZml.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StatCounter({ value, suffix = "", label }) {
	const ref = (0, import_react.useRef)(null);
	const [display, setDisplay] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const node = ref.current;
		if (!node) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setDisplay(value);
			return;
		}
		let frame = 0;
		const observer = new IntersectionObserver((entries) => {
			if (!entries[0]?.isIntersecting) return;
			observer.disconnect();
			const start = performance.now();
			const duration = 1200;
			const tick = (now) => {
				const p = Math.min(1, (now - start) / duration);
				const eased = 1 - Math.pow(1 - p, 3);
				setDisplay(Math.round(value * eased));
				if (p < 1) frame = requestAnimationFrame(tick);
			};
			frame = requestAnimationFrame(tick);
		}, { threshold: .3 });
		observer.observe(node);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "border-t border-current/15 pt-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "numeric-xl",
			children: [display.toLocaleString("en-KE"), suffix]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "eyebrow mt-4 opacity-60",
			children: label
		})]
	});
}
/** Lightweight scroll reveal - CSS animation triggered by IntersectionObserver. */
function Reveal({ children, delay = 0, className, as: Tag = "div" }) {
	const ref = (0, import_react.useRef)(null);
	const [shown, setShown] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver((entries) => {
			for (const e of entries) if (e.isIntersecting) {
				setShown(true);
				io.disconnect();
			}
		}, {
			rootMargin: "0px 0px -12% 0px",
			threshold: .1
		});
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		style: shown ? { animationDelay: `${delay}ms` } : void 0,
		className: cn(shown ? "reveal-up" : "opacity-0", className),
		children
	});
}
/**
* Request wall row - blood type leads, urgency pulses, the whole row is the link.
* Used on dark, immersive sections.
*/
function RequestRow({ request }) {
	const urgent = request.urgency === "urgent";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/requests/$requestId",
		params: { requestId: request.id },
		className: "group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-t border-white/10 py-5 transition-colors hover:bg-white/[0.04] sm:gap-6 sm:py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("relative grid h-14 w-16 shrink-0 place-items-center rounded-xl font-display text-xl font-extrabold tracking-tight sm:h-16 sm:w-20 sm:text-2xl", urgent ? "bg-primary text-primary-foreground pulse-ring" : "bg-white/10 text-white"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Blood type "
				}), request.bloodType]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex flex-wrap items-center gap-x-3 gap-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "truncate font-display text-lg font-bold text-white sm:text-xl",
						children: [
							request.units,
							" ",
							request.units === 1 ? "unit" : "units",
							" · ",
							request.city
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("eyebrow rounded-full px-2 py-1", urgent ? "bg-primary/25 text-white" : request.urgency === "soon" ? "bg-white/10 text-white/80" : "bg-white/5 text-white/60"),
						children: URGENCY_LABEL[request.urgency]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 flex items-center gap-1.5 truncate text-sm text-white/55",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							className: "size-3.5 shrink-0",
							"aria-hidden": true
						}),
						request.facility,
						" · ",
						request.neededBy.toLowerCase()
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-10 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
					className: "size-4",
					"aria-hidden": true
				})
			})
		]
	});
}
var CITIES = [
	{
		name: "Eldoret",
		x: 22,
		y: 30
	},
	{
		name: "Kisumu",
		x: 14,
		y: 47
	},
	{
		name: "Nakuru",
		x: 38,
		y: 43
	},
	{
		name: "Nairobi",
		x: 55,
		y: 58
	},
	{
		name: "Nyeri",
		x: 52,
		y: 40
	},
	{
		name: "Mombasa",
		x: 84,
		y: 84
	},
	{
		name: "Machakos",
		x: 64,
		y: 66
	},
	{
		name: "Garissa",
		x: 82,
		y: 47
	}
];
var LINKS = [
	[3, 2],
	[2, 1],
	[3, 6],
	[6, 5],
	[3, 4],
	[2, 0],
	[3, 7]
];
/**
* Stylised proximity graph: donors and requests connected by the lifeline.
* Decorative - the accessible summary lives beside it in the section copy.
*/
function ProximityMap() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 100 100",
		className: "h-auto w-full",
		role: "img",
		"aria-label": "Stylised map of Kenya showing donor and request connections between Eldoret, Kisumu, Nakuru, Nairobi, Nyeri, Machakos, Garissa and Mombasa.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "lifeline-link",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "currentColor",
						stopOpacity: "0.1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "50%",
						stopColor: "currentColor",
						stopOpacity: "0.9"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "currentColor",
						stopOpacity: "0.1"
					})
				]
			}) }),
			LINKS.map(([a, b], i) => {
				const from = CITIES[a];
				const to = CITIES[b];
				const mx = (from.x + to.x) / 2;
				const my = (from.y + to.y) / 2 - 9;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`,
					fill: "none",
					stroke: "url(#lifeline-link)",
					strokeWidth: "0.6",
					strokeLinecap: "round",
					className: "trace-draw text-primary",
					style: { animationDelay: `${i * 220}ms` }
				}, `${a}-${b}`);
			}),
			CITIES.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: c.x,
					cy: c.y,
					r: i === 3 ? 2.1 : 1.2,
					className: "fill-primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: c.x,
					cy: c.y,
					r: i === 3 ? 4.6 : 3,
					className: "fill-primary/15",
					style: { transformOrigin: `${c.x}px ${c.y}px` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: c.x + 3.4,
					y: c.y + 1.2,
					className: "fill-current text-[2.6px] font-medium opacity-70",
					children: c.name
				})
			] }, c.name))
		]
	});
}
var WORDS = [
	"SHOW UP",
	"DONATE",
	"CONNECT",
	"TOGETHER",
	"ONE MORE TOMORROW"
];
/** Typographic band - the brand voice as a moving rule between sections. */
function WordMarquee() {
	const run = [...WORDS, ...WORDS];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden border-y border-white/10 bg-ink py-5 text-ink-foreground",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "marquee-track items-center gap-8",
			children: run.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl",
					children: w
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-primary" })]
			}, `${w}-${i}`))
		})
	});
}
function BloodTypeExplorer() {
	const [selected, setSelected] = (0, import_react.useState)("O+");
	const { donatesTo, receivesFrom } = COMPATIBILITY[selected];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-base font-semibold",
				children: "Pick a blood type"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "radiogroup",
				"aria-label": "Blood type",
				className: "mt-4 grid grid-cols-4 gap-2 sm:max-w-xs",
				children: BLOOD_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "radio",
					"aria-checked": selected === t,
					onClick: () => setSelected(t),
					className: cn("h-12 rounded-lg border font-display text-sm font-bold transition-colors", selected === t ? "border-primary bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-muted"),
					children: t
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: "Compatibility here is a general guide. The hospital always confirms matching before any transfusion."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompatPanel, {
				title: `${selected} can donate to`,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
					className: "size-4",
					"aria-hidden": true
				}),
				types: donatesTo,
				tone: "primary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompatPanel, {
				title: `${selected} can receive from`,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					className: "size-4",
					"aria-hidden": true
				}),
				types: receivesFrom,
				tone: "success"
			})]
		})]
	});
}
function CompatPanel({ title, icon, types, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-5 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
				className: "flex items-center gap-2 font-display text-sm font-semibold",
				children: [icon, title]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 flex flex-wrap gap-2",
				children: types.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: cn("rounded-md px-2.5 py-1.5 font-display text-sm font-semibold", tone === "primary" ? "bg-primary-soft text-primary-soft-foreground" : "bg-success-soft text-success"),
					children: t
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: [types.length, " of 8 blood types"]
			})
		]
	});
}
var hero_donor_default = "/assets/hero-donor-CSh6p8sk.jpg";
var community_default = "/assets/community-Du0InmJU.jpg";
var story_donor_default = "/assets/story-donor-QeMWHtji.jpg";
var ARC = [
	{
		n: "01",
		title: "Notice",
		body: "Requests near you appear with the blood type, the facility and how soon it is needed."
	},
	{
		n: "02",
		title: "Understand",
		body: "Compatibility, distance and verification are shown plainly - no guesswork, no phone tree."
	},
	{
		n: "03",
		title: "Participate",
		body: "Register as a donor in two minutes, or publish a request with the units you need."
	},
	{
		n: "04",
		title: "Connect",
		body: "When both sides agree, contact details are shared and the hospital coordinates collection."
	},
	{
		n: "05",
		title: "Impact",
		body: "One visit is separated into red cells, platelets and plasma - often more than one patient."
	}
];
function HomePage() {
	const { data, isPending, isError, refetch } = useQuery({
		queryKey: ["requests"],
		queryFn: fetchRequests
	});
	const { data: stats } = useQuery({
		queryKey: ["network-stats"],
		queryFn: fetchNetworkStats
	});
	const wall = data?.slice(0, 5) ?? [];
	const urgentCount = data?.filter((r) => r.urgency === "urgent").length ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative -mt-20 overflow-hidden bg-ink text-ink-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 grad-ember",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute -left-40 top-1/3 size-[36rem] rounded-full bg-primary/25 blur-3xl",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page relative grid gap-10 pb-16 pt-32 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:pb-24 lg:pt-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reveal-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "eyebrow inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-white/75",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative flex size-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-primary" })]
								}), "Live across Kenya"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "display-xl mt-6 text-white",
								children: [
									"Someone nearby",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"is ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: "waiting"
									}),
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-7 max-w-lg text-lg leading-relaxed text-white/70",
								children: "Lifeline is a network of people who show up for one another. Verified donors, verified requests, matched in minutes instead of a night of phone calls."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-9 flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "xl",
									className: "group rounded-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/find-blood",
										children: ["I need blood", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
											className: "transition-transform duration-300 group-hover:translate-x-1",
											"aria-hidden": true
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "xl",
									variant: "outline",
									className: "rounded-full border-white/30 bg-white/5 text-white hover:bg-white hover:text-ink",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/donate",
										children: "I want to donate"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-7 flex items-center gap-2 text-sm text-white/55",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									className: "size-4 text-primary",
									"aria-hidden": true
								}), "Contact details stay private until both sides agree to a match."]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] lg:max-w-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: hero_donor_default,
									alt: "A young Kenyan donor standing calmly after giving blood",
									width: 1280,
									height: 1600,
									fetchPriority: "high",
									className: "size-full object-cover object-top"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent",
									"aria-hidden": true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute -left-2 top-8 rounded-2xl glass-dark px-4 py-3 sm:left-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl font-extrabold tracking-tight",
									children: "O+"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow mt-1 opacity-65",
									children: "Available today"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute -bottom-6 right-0 w-[15.5rem] rounded-2xl glass-dark p-4 sm:right-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "eyebrow flex items-center gap-1.5 opacity-65",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
											className: "size-3.5",
											"aria-hidden": true
										}), " Nairobi"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm leading-snug",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: [urgentCount || 3, " urgent requests"]
										}), " within about 10 km of you right now."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center gap-2 text-xs opacity-70",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "lifeline-rule w-10",
											"aria-hidden": true
										}), "Donor → Patient"]
									})
								]
							})
						]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordMarquee, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grad-rose",
			"aria-labelledby": "proximity",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page section-y grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-primary",
						children: "02 - Understand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "proximity",
						className: "display-lg mt-4",
						children: "The need is closer than you think."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md text-lg leading-relaxed text-muted-foreground",
						children: "Most blood is needed within a few kilometres of someone who could give it. Lifeline draws that line - between a donor in Nairobi and a patient across town, between Kisumu and Nakuru, between you and someone you'll probably never meet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						className: "mt-8 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/find-blood",
							children: ["Search near me", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": true })]
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 120,
					className: "rounded-3xl border bg-card p-5 shadow-card sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProximityMap, {})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-ink text-ink-foreground",
			"aria-labelledby": "wall",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 cell-field opacity-25",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page section-y relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-primary",
						children: "03 - Participate"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "wall",
						className: "display-lg mt-4 text-white",
						children: "Blood needed now."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "rounded-full border-white/25 bg-transparent text-white hover:bg-white hover:text-ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/requests",
							children: ["All requests", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": true })]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					"aria-live": "polite",
					children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardSkeletonGrid, { count: 3 }) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
						description: "We couldn't load nearby requests just now.",
						onRetry: () => refetch()
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-white/10",
						children: wall.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * 70,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestRow, { request: r })
						}, r.id))
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-background",
			"aria-labelledby": "arc",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page section-y",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-primary",
						children: "04 - Connect"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "arc",
						className: "display-lg mt-4 max-w-2xl",
						children: "One donation. One connection. One more tomorrow."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-14 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:grid-cols-5",
						children: ARC.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							as: "li",
							delay: i * 80,
							className: "bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-sm font-extrabold text-primary",
									children: s.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "lifeline-rule mt-4 block",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-display text-lg font-bold tracking-tight",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: s.body
								})
							]
						}, s.n))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y bg-surface",
			"aria-labelledby": "story",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page section-y grid gap-12 lg:grid-cols-2 lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: story_donor_default,
						alt: "A donor waiting in a bright, modern Kenyan clinic",
						width: 1200,
						height: 1200,
						loading: "lazy",
						className: "mask-organic aspect-square w-full object-cover shadow-lift"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-5 left-0 max-w-[16rem] rounded-2xl glass p-4 sm:left-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-snug",
							children: "“I gave blood on my lunch break and was back at my desk by two.”"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mt-3 text-muted-foreground",
							children: "Sample story · Nairobi · O−"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: 100,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-primary",
							children: "Human, first"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "story",
							className: "display-lg mt-4",
							children: "We are connected by showing up."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 leading-relaxed text-muted-foreground",
							children: "Donating takes under an hour. Most healthy adults can give every three to four months. Nothing about it is dramatic - it is simply one of the few things any of us can do that another person cannot do for themselves."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: "Stories shown on Lifeline are illustrative samples until consented donor stories are published."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "soft",
							className: "mt-8 rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/donate",
								children: "Check if you can donate"
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden grad-blood text-white",
			"aria-labelledby": "impact",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: community_default,
				alt: "",
				"aria-hidden": true,
				width: 1600,
				height: 1008,
				loading: "lazy",
				className: "absolute inset-0 size-full object-cover opacity-20 mix-blend-luminosity"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page section-y relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-white/70",
						children: "05 - Impact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "impact",
						className: "display-lg mt-4 max-w-xl",
						children: "A movement measured in people."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-14 grid gap-10 text-white sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCounter, {
								value: stats?.donorsRegistered ?? 0,
								label: "Donors registered"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCounter, {
								value: stats?.connectionsMade ?? 0,
								label: "Connections made"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCounter, {
								value: stats?.unitsDonated ?? 0,
								label: "Units donated"
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-background",
			"aria-labelledby": "explorer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page section-y",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-primary",
						children: "Know your type"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "explorer",
						className: "display-lg mt-4",
						children: "Who can you help?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-muted-foreground",
						children: "Select a blood type to see who can give to it, and who it can give to."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BloodTypeExplorer, {})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-ink text-ink-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 grad-ember opacity-90",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page section-y relative text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display-xl mx-auto max-w-4xl text-white",
						children: "Join the Lifeline."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-6 max-w-lg text-lg text-white/70",
						children: "Register today so you're reachable on the day it counts - or post a request if someone you love needs blood now."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-col justify-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "xl",
							className: "rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/register",
								children: "Become a donor"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "xl",
							variant: "outline",
							className: "rounded-full border-white/30 bg-white/5 text-white hover:bg-white hover:text-ink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/requests/new",
								children: "Request blood"
							})
						})]
					})
				]
			})]
		})
	] });
}
//#endregion
export { HomePage as component };
