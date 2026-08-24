import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { h as MailCheck } from "../_libs/lucide-react.mjs";
import { a as Button } from "./router-C_PTmrjT.mjs";
import { t as Label } from "./label-D43TCrm7.mjs";
import { t as Input } from "./input-DvWcyHbj.mjs";
import { t as AuthLayout } from "./AuthLayout-Hg0C_Lit.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-CbR9Pz3O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPasswordPage() {
	const [sent, setSent] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, {
		title: sent ? "Check your inbox" : "Reset your password",
		subtitle: sent ? "If an account exists for that address, a reset link is on its way." : "Enter the email on your account and we'll send a reset link.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Remembered it?",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/signin",
				className: "font-medium text-primary hover:underline",
				children: "Back to sign in"
			})
		] }),
		children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3 rounded-xl border bg-success-soft p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, {
				className: "mt-0.5 size-5 text-success",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: "The link expires in 30 minutes. Didn't get it? Check spam, then try again."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-5",
			onSubmit: (e) => {
				e.preventDefault();
				setSent(true);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "email",
					children: "Email address"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "email",
					type: "email",
					required: true,
					autoComplete: "email"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "lg",
				className: "w-full",
				children: "Send reset link"
			})]
		})
	});
}
//#endregion
export { ForgotPasswordPage as component };
