import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as Plus, v as Inbox } from "../_libs/lucide-react.mjs";
import { a as Button, o as cn } from "./router-C_PTmrjT.mjs";
import { t as PageHero } from "./PageHero-CN14yFqn.mjs";
import { c as fetchRequests } from "./blood-C0gI68U2.mjs";
import { t as RequestCard } from "./RequestCard-BlaHFSs-.mjs";
import { t as ErrorState } from "./ErrorState-DOLwhl_B.mjs";
import { t as CardSkeletonGrid } from "./CardSkeleton-jTOeRgx1.mjs";
import { t as EmptyState } from "./EmptyState-nqinGrtv.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/requests.index-CaxIXEtI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function RequestsPage() {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const { data, isPending, isError, refetch } = useQuery({
		queryKey: ["requests"],
		queryFn: fetchRequests
	});
	const results = (0, import_react.useMemo)(() => {
		if (!data) return [];
		if (filter === "all") return data;
		return data.filter((r) => r.urgency === filter);
	}, [data, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "The wall",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Open requests." }),
		description: "Every request is posted with a facility, a timeframe and a verification status.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "xl",
			className: "rounded-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/requests/new",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "aria-hidden": true }), "Create request"]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-12 md:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
			value: filter,
			onValueChange: setFilter,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "h-11",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "all",
						children: "All"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "urgent",
						children: "Urgent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "soon",
						children: "Needed soon"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "routine",
						children: "Planned"
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			"aria-live": "polite",
			children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardSkeletonGrid, { count: 6 }) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				description: "We couldn't load requests right now.",
				onRetry: () => refetch()
			}) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Inbox,
				title: "No requests in this category",
				description: "Nothing matches this filter at the moment. That's usually good news - try another filter."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestCard, { request: r }, r.id))
			})
		})]
	})] });
}
//#endregion
export { RequestsPage as component };
