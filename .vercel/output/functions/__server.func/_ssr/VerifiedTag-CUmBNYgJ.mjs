import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { I as BadgeCheck, s as ShieldQuestionMark } from "../_libs/lucide-react.mjs";
import { o as cn } from "./router-C_PTmrjT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/VerifiedTag-CUmBNYgJ.js
var import_jsx_runtime = require_jsx_runtime();
var sizes = {
	sm: "h-8 min-w-8 px-1.5 text-xs",
	md: "h-11 min-w-11 px-2 text-sm",
	lg: "h-16 min-w-16 px-3 text-xl"
};
function BloodTypeBadge({ type, size = "md", tone = "solid", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center justify-center rounded-xl font-display font-extrabold tabular-nums tracking-[-0.04em]", tone === "solid" ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary-soft-foreground", sizes[size], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Blood type "
		}), type]
	});
}
function VerifiedTag({ verified, className }) {
	const Icon = verified ? BadgeCheck : ShieldQuestionMark;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 text-xs font-medium", verified ? "text-success" : "text-muted-foreground", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-4",
			"aria-hidden": true
		}), verified ? "Verified" : "Pending verification"]
	});
}
//#endregion
export { VerifiedTag as n, BloodTypeBadge as t };
