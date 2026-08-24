import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { N as CalendarCheck, T as Clock, i as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { o as cn } from "./router-C_PTmrjT.mjs";
import { i as URGENCY_LABEL } from "./blood-C0gI68U2.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground",
		success: "border-transparent bg-success-soft text-success",
		warning: "border-transparent bg-warning-soft text-warning-foreground",
		urgent: "border-transparent bg-urgent text-urgent-foreground",
		soft: "border-transparent bg-primary-soft text-primary-soft-foreground",
		neutral: "border-transparent bg-muted text-muted-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function UrgencyBadge({ urgency }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		variant: urgency === "urgent" ? "urgent" : urgency === "soon" ? "warning" : "neutral",
		className: "gap-1.5 rounded-full px-2.5 py-1 uppercase tracking-wide",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(urgency === "urgent" ? TriangleAlert : urgency === "soon" ? Clock : CalendarCheck, {
			className: "size-3.5",
			"aria-hidden": true
		}), URGENCY_LABEL[urgency]]
	});
}
//#endregion
export { UrgencyBadge as t };
