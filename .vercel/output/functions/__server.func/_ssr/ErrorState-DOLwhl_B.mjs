import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { w as CloudOff } from "../_libs/lucide-react.mjs";
import { a as Button, o as cn } from "./router-C_PTmrjT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ErrorState-DOLwhl_B.js
var import_jsx_runtime = require_jsx_runtime();
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
function ErrorState({ title = "Something went wrong", description = "We couldn't load this right now. Check your connection and try again.", onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "alert",
		className: "flex flex-col items-center justify-center gap-4 rounded-3xl border bg-card px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-12 items-center justify-center rounded-full bg-warning-soft text-warning-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudOff, {
					className: "size-5",
					"aria-hidden": true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-sm space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: description
				})]
			}),
			onRetry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: onRetry,
				children: "Try again"
			}) : null
		]
	});
}
//#endregion
export { Skeleton as n, ErrorState as t };
