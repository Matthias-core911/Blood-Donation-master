import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { o as cn } from "./router-C_PTmrjT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusDot-CgI10QF4.js
var import_jsx_runtime = require_jsx_runtime();
var tones = {
	success: "bg-success",
	warning: "bg-warning",
	urgent: "bg-urgent",
	muted: "bg-muted-foreground/50"
};
function StatusDot({ tone = "success", label, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex shrink-0 items-center gap-2 rounded-full border bg-background px-2.5 py-1 text-xs font-medium", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("size-2 rounded-full", tones[tone]),
			"aria-hidden": true
		}), label]
	});
}
//#endregion
export { StatusDot as t };
