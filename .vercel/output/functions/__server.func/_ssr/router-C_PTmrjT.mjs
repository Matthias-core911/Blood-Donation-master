import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime, u as Slot } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { f as MessageCircle, l as Send, p as Menu, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { s as __exportAll } from "./server-C9_bbqfV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C_PTmrjT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DVbgWdJv.css";
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
			soft: "bg-primary-soft text-primary-soft-foreground hover:bg-primary-soft/70",
			success: "bg-success text-success-foreground shadow-sm hover:bg-success/90",
			subtle: "bg-secondary/60 text-secondary-foreground hover:bg-secondary"
		},
		size: {
			default: "h-10 px-4 py-2",
			sm: "h-9 rounded-md px-3 text-xs",
			lg: "h-11 rounded-lg px-6 text-[0.95rem]",
			xl: "h-12 rounded-lg px-7 text-base",
			icon: "h-10 w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
/**
* Lifeline brand mark: a drop formed from a connecting line - the thread
* between a donor and a patient.
*/
function LifelineMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-full", className),
		fill: "none",
		"aria-hidden": true,
		focusable: "false",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 3.5c4.6 5.2 8 9.4 8 13.6a8 8 0 1 1-16 0c0-4.2 3.4-8.4 8-13.6Z",
				fill: "currentColor",
				opacity: "0.16"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 3.5c4.6 5.2 8 9.4 8 13.6a8 8 0 1 1-16 0c0-4.2 3.4-8.4 8-13.6Z",
				stroke: "currentColor",
				strokeWidth: "1.75",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9.5 18h3l2-3.4 2.6 6 1.8-2.6h3.6",
				stroke: "currentColor",
				strokeWidth: "1.75",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	});
}
function LifelineWordmark({ className, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("flex items-center gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("flex size-9 items-center justify-center rounded-xl p-1.5", tone === "inverse" ? "bg-white/12 text-white ring-1 ring-white/25" : "grad-blood text-primary-foreground shadow-card"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifelineMark, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-display text-[1.15rem] font-extrabold tracking-[-0.04em]", tone === "inverse" && "text-white"),
			children: "Lifeline"
		})]
	});
}
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/find-blood",
		label: "Find blood"
	},
	{
		to: "/donate",
		label: "Donate"
	},
	{
		to: "/requests",
		label: "Requests"
	},
	{
		to: "/about",
		label: "About"
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const onDark = !scrolled && [
		"/",
		"/find-blood",
		"/requests",
		"/donate",
		"/about",
		"/dashboard"
	].includes(pathname);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("pointer-events-auto mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-2xl px-3 transition-all duration-300 sm:px-4", scrolled ? "glass shadow-lift" : "border border-transparent bg-transparent"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "rounded-xl focus-visible:outline-none",
					"aria-label": "Lifeline home",
					onClick: () => setOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifelineWordmark, { tone: onDark ? "inverse" : "default" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Main",
					className: "hidden items-center gap-0.5 lg:flex",
					children: NAV.map((item) => {
						const active = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors", onDark ? active ? "text-white" : "text-white/65 hover:text-white" : active ? "text-foreground" : "text-muted-foreground hover:text-foreground"),
							children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-primary transition-transform duration-300", active ? "scale-x-100" : "scale-x-0"),
								"aria-hidden": true
							})]
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-2 lg:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						className: cn("rounded-full", onDark && "text-white hover:bg-white/10 hover:text-white"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signin",
							children: "Sign in"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/register",
							children: "Join Lifeline"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: cn("rounded-full lg:hidden", onDark && "text-white hover:bg-white/10 hover:text-white"),
					"aria-label": open ? "Close menu" : "Open menu",
					"aria-expanded": open,
					onClick: () => setOpen((v) => !v),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-auto mx-auto mt-2 max-w-6xl rounded-2xl glass p-3 lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Mobile",
				className: "flex flex-col gap-1",
				children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					onClick: () => setOpen(false),
					className: cn("rounded-xl px-4 py-3 font-display text-lg font-bold tracking-tight text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", pathname === item.to && "bg-primary-soft text-primary-soft-foreground"),
					children: item.label
				}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "lg",
						className: "rounded-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signin",
							onClick: () => setOpen(false),
							children: "Sign in"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						className: "rounded-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/register",
							onClick: () => setOpen(false),
							children: "Join"
						})
					})]
				})]
			})
		}) : null]
	});
}
var PLATFORM = [
	{
		to: "/find-blood",
		label: "Find blood"
	},
	{
		to: "/donate",
		label: "Become a donor"
	},
	{
		to: "/requests",
		label: "Open requests"
	},
	{
		to: "/requests/new",
		label: "Create a request"
	}
];
var ORG = [
	{
		to: "/about",
		label: "About Lifeline"
	},
	{
		to: "/dashboard",
		label: "Donor dashboard"
	},
	{
		to: "/profile",
		label: "Profile & privacy"
	}
];
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative overflow-hidden bg-ink text-ink-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 cell-field opacity-20",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page relative grid gap-10 py-16 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5 md:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								"aria-label": "Lifeline home",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifelineWordmark, { tone: "inverse" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-sm text-sm leading-relaxed text-white/60",
								children: "A Kenyan community network that connects verified donors with people who need blood. Lifeline coordinates connections - collection and transfusion always happen at a licensed facility."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-extrabold tracking-[-0.03em] text-white/90",
								children: "Show up for one another."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Platform",
						className: "space-y-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "eyebrow text-white/50",
							children: "Platform"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2.5 text-white/70",
							children: PLATFORM.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.to,
								className: "transition-colors hover:text-white",
								children: l.label
							}) }, l.to))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Organisation",
						className: "space-y-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "eyebrow text-white/50",
							children: "Organisation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2.5 text-white/70",
							children: ORG.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.to,
								className: "transition-colors hover:text-white",
								children: l.label
							}) }, l.to))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative border-t border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Lifeline. All rights reserved."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Lifeline does not provide medical advice or guarantee blood availability." })]
				})
			})
		]
	});
}
var QUICK_REPLIES = [
	"How do I register?",
	"When can I donate?",
	"Emergency contacts",
	"Where is M-Pesa payment?"
];
function getBotReply(text) {
	const t = text.toLowerCase();
	if (t.includes("register")) return "Go to Donate → Register as a donor, fill in your details, and you're set. We only reach out when someone nearby needs your blood type.";
	if (t.includes("when") || t.includes("donate")) return "Most healthy adults can donate every 3 months. Check Donate for full eligibility, then schedule a slot after choosing a request or donor.";
	if (t.includes("emergency") || t.includes("contact")) return "For urgent blood requests, browse Find Blood or Requests for the closest match, or reach our team through the About page.";
	if (t.includes("mpesa") || t.includes("payment")) return "The Lipa na M-Pesa page opens automatically after you schedule a donation appointment, to complete the service fee.";
	return "I can help with donor registration, scheduling, and finding blood. Try one of the quick options below.";
}
function Chatbot() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([{
		sender: "bot",
		text: "Hi! I'm your Lifeline assistant. Ask about registering, scheduling, or finding blood nearby."
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, open]);
	const sendMessage = (text) => {
		const clean = text.trim();
		if (!clean) return;
		setMessages((prev) => [
			...prev,
			{
				sender: "user",
				text: clean
			},
			{
				sender: "bot",
				text: getBotReply(clean)
			}
		]);
		setInput("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3",
		children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border bg-card shadow-lift",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between grad-blood px-4 py-3 text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Lifeline Assistant"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(false),
						"aria-label": "Close chat",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: scrollRef,
					className: "flex-1 space-y-2.5 overflow-y-auto px-3.5 py-4",
					children: messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug", m.sender === "user" ? "ml-auto rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-secondary text-secondary-foreground"),
						children: m.text
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5 border-t px-3.5 py-2.5",
					children: QUICK_REPLIES.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => sendMessage(q),
						className: "rounded-full border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary",
						children: q
					}, q))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-t p-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: input,
						onChange: (e) => setInput(e.target.value),
						onKeyDown: (e) => e.key === "Enter" && sendMessage(input),
						placeholder: "Type your question…",
						className: "h-9 flex-1 rounded-full border bg-background px-3.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => sendMessage(input),
						"aria-label": "Send",
						className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
					})]
				})
			]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((v) => !v),
			className: "flex items-center gap-2 rounded-full grad-blood px-5 py-3 text-sm font-semibold text-white shadow-lift transition-transform hover:scale-[1.03]",
			children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), open ? "Hide assistant" : "Need help?"]
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lifeline - Find blood donors in Kenya, fast" },
			{
				name: "description",
				content: "Lifeline connects verified blood requests with nearby compatible donors across Kenya."
			},
			{
				name: "author",
				content: "Lifeline"
			},
			{
				property: "og:title",
				content: "Lifeline - Find blood donors in Kenya, fast"
			},
			{
				property: "og:description",
				content: "Verified blood requests matched with nearby compatible donors."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-dvh flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chatbot, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		]
	});
}
var $$splitComponentImporter$13 = () => import("./routes-DwOyKZml.mjs");
var Route$13 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Lifeline - Someone nearby is waiting for your blood type" },
		{
			name: "description",
			content: "Lifeline connects verified blood donors with patients across Kenya. Post a request in minutes, or register to donate and help someone a few kilometres away."
		},
		{
			property: "og:title",
			content: "Lifeline - Someone nearby is waiting"
		},
		{
			property: "og:description",
			content: "A Kenyan network of verified donors and blood requests. Show up for someone nearby."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./about-HINVySkP.mjs");
var Route$12 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Lifeline - How the blood donor network works" },
		{
			name: "description",
			content: "Lifeline is a Kenyan blood donor network connecting verified donors with patients. Learn how verification, privacy and hospital coordination work."
		},
		{
			property: "og:title",
			content: "About Lifeline - How the blood donor network works"
		},
		{
			property: "og:description",
			content: "How Lifeline verifies donors and requests, protects privacy, and works with licensed facilities in Kenya."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./dashboard-CzZtcNDL.mjs");
var Route$11 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "Donor dashboard - Lifeline" },
		{
			name: "description",
			content: "Your donor status, eligibility dates, nearby blood requests, donation impact and recent activity."
		},
		{
			property: "og:title",
			content: "Donor dashboard - Lifeline"
		},
		{
			property: "og:description",
			content: "Donor status, eligibility, nearby requests and your donation impact."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./donate-Cpb6zTi-.mjs");
var Route$10 = createFileRoute("/donate")({
	head: () => ({ meta: [
		{ title: "Donate blood in Kenya - eligibility and next steps | Lifeline" },
		{
			name: "description",
			content: "Check basic blood donation eligibility, see what happens on the day, and find requests near you that match your blood type."
		},
		{
			property: "og:title",
			content: "Donate blood in Kenya - eligibility and next steps"
		},
		{
			property: "og:description",
			content: "Eligibility basics, what to expect on the day, and requests you can help with."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./find-blood-F7PxqSL8.mjs");
var Route$9 = createFileRoute("/find-blood")({
	head: () => ({ meta: [
		{ title: "Find blood donors near you - Lifeline" },
		{
			name: "description",
			content: "Search verified blood donors by blood type, county, distance and availability across Kenya."
		},
		{
			property: "og:title",
			content: "Find blood donors near you - Lifeline"
		},
		{
			property: "og:description",
			content: "Search verified donors by blood type, county, distance and availability."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./forgot-password-CbR9Pz3O.mjs");
var Route$8 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [
		{ title: "Reset your password - Lifeline" },
		{
			name: "description",
			content: "Request a password reset link for your Lifeline donor account."
		},
		{
			property: "og:title",
			content: "Reset your password - Lifeline"
		},
		{
			property: "og:description",
			content: "Request a reset link for your Lifeline account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./lipa-na-mpesa-CIydH9pq.mjs");
var Route$7 = createFileRoute("/lipa-na-mpesa")({
	validateSearch: (search) => ({
		amount: typeof search["amount"] === "string" ? search["amount"] : "1400",
		context: typeof search["context"] === "string" ? search["context"] : ""
	}),
	head: () => ({ meta: [{ title: "Lipa na M-Pesa - Lifeline" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./profile-B5aAYuzA.mjs");
var Route$6 = createFileRoute("/profile")({
	head: () => ({ meta: [
		{ title: "Profile & privacy settings - Lifeline" },
		{
			name: "description",
			content: "Update your contact details, donation availability, notification radius and privacy controls."
		},
		{
			property: "og:title",
			content: "Profile & privacy settings - Lifeline"
		},
		{
			property: "og:description",
			content: "Control availability, notifications and what donors see."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./register-CKQO5LR3.mjs");
var Route$5 = createFileRoute("/register")({
	head: () => ({ meta: [
		{ title: "Register as a blood donor - Lifeline" },
		{
			name: "description",
			content: "Create a Lifeline account in three short steps and become reachable when someone nearby needs your blood type."
		},
		{
			property: "og:title",
			content: "Register as a blood donor - Lifeline"
		},
		{
			property: "og:description",
			content: "Three short steps to join the donor network."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./schedule-donation-s5v1DTbR.mjs");
var Route$4 = createFileRoute("/schedule-donation")({
	validateSearch: (search) => ({
		donorName: typeof search["donorName"] === "string" ? search["donorName"] : "",
		bloodType: typeof search["bloodType"] === "string" ? search["bloodType"] : "",
		requestId: typeof search["requestId"] === "string" ? search["requestId"] : ""
	}),
	head: () => ({ meta: [{ title: "Schedule a donation - Lifeline" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./signin-YM9xP7KC.mjs");
var Route$3 = createFileRoute("/signin")({
	head: () => ({ meta: [
		{ title: "Sign in - Lifeline" },
		{
			name: "description",
			content: "Sign in to your Lifeline account to manage donor availability and blood requests."
		},
		{
			property: "og:title",
			content: "Sign in - Lifeline"
		},
		{
			property: "og:description",
			content: "Access your donor dashboard and requests."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./requests.index-CaxIXEtI.mjs");
var Route$2 = createFileRoute("/requests/")({
	head: () => ({ meta: [
		{ title: "Open blood requests in Kenya - Lifeline" },
		{
			name: "description",
			content: "Browse open blood requests by urgency and blood type, and pledge a donation to a patient near you."
		},
		{
			property: "og:title",
			content: "Open blood requests in Kenya - Lifeline"
		},
		{
			property: "og:description",
			content: "Browse verified blood requests by urgency and blood type and pledge to help."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitNotFoundComponentImporter = () => import("./requests._requestId-6qqJrU8S.mjs");
var $$splitComponentImporter$1 = () => import("./requests._requestId-E3n1TlJU.mjs");
var Route$1 = createFileRoute("/requests/$requestId")({
	head: () => ({ meta: [
		{ title: "Blood request details - Lifeline" },
		{
			name: "description",
			content: "Review a verified blood request: blood type, units needed, facility, timeframe and how to pledge a donation."
		},
		{
			property: "og:title",
			content: "Blood request details - Lifeline"
		},
		{
			property: "og:description",
			content: "Blood type, units needed, facility and timeframe for this request."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var $$splitComponentImporter = () => import("./requests.new-CpJyvHPb.mjs");
var Route = createFileRoute("/requests/new")({
	head: () => ({ meta: [
		{ title: "Create a blood request - Lifeline" },
		{
			name: "description",
			content: "Publish a blood request in a few steps: patient details, blood requirements, location, urgency and review."
		},
		{
			property: "og:title",
			content: "Create a blood request - Lifeline"
		},
		{
			property: "og:description",
			content: "Publish a request in five short steps and reach compatible donors nearby."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var AboutRoute = Route$12.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$14
});
var DashboardRoute = Route$11.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$14
});
var DonateRoute = Route$10.update({
	id: "/donate",
	path: "/donate",
	getParentRoute: () => Route$14
});
var FindBloodRoute = Route$9.update({
	id: "/find-blood",
	path: "/find-blood",
	getParentRoute: () => Route$14
});
var ForgotPasswordRoute = Route$8.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$14
});
var LipaNaMpesaRoute = Route$7.update({
	id: "/lipa-na-mpesa",
	path: "/lipa-na-mpesa",
	getParentRoute: () => Route$14
});
var ProfileRoute = Route$6.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$14
});
var RegisterRoute = Route$5.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$14
});
var ScheduleDonationRoute = Route$4.update({
	id: "/schedule-donation",
	path: "/schedule-donation",
	getParentRoute: () => Route$14
});
var SigninRoute = Route$3.update({
	id: "/signin",
	path: "/signin",
	getParentRoute: () => Route$14
});
var RequestsIndexRoute = Route$2.update({
	id: "/requests/",
	path: "/requests/",
	getParentRoute: () => Route$14
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	DashboardRoute,
	DonateRoute,
	FindBloodRoute,
	ForgotPasswordRoute,
	LipaNaMpesaRoute,
	ProfileRoute,
	RegisterRoute,
	ScheduleDonationRoute,
	SigninRoute,
	RequestsRequestIdRoute: Route$1.update({
		id: "/requests/$requestId",
		path: "/requests/$requestId",
		getParentRoute: () => Route$14
	}),
	RequestsNewRoute: Route.update({
		id: "/requests/new",
		path: "/requests/new",
		getParentRoute: () => Route$14
	}),
	RequestsIndexRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Button as a, Route$7 as i, Route$1 as n, cn as o, Route$4 as r, router_exports as t };
