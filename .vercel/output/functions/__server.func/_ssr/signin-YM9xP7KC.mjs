import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button } from "./router-C_PTmrjT.mjs";
import { h as verifyCredentials, m as setCurrentUser } from "./blood-C0gI68U2.mjs";
import { t as Label } from "./label-D43TCrm7.mjs";
import { t as Input } from "./input-DvWcyHbj.mjs";
import { t as AuthLayout } from "./AuthLayout-Hg0C_Lit.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signin-YM9xP7KC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SignInPage() {
	const navigate = useNavigate();
	const [phone, setPhone] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthLayout, {
		title: "Welcome back",
		subtitle: "Sign in to manage your availability and requests.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"New here?",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/register",
				className: "font-medium text-primary hover:underline",
				children: "Create an account"
			})
		] }),
		children: [error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
			children: error
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-5",
			onSubmit: (e) => {
				e.preventDefault();
				setSubmitting(true);
				verifyCredentials(phone, password).then((user) => {
					if (!user) {
						setError("We couldn't find an account with that phone and password. Register first, or try again.");
						return;
					}
					setCurrentUser(user);
					toast.success("Signed in");
					navigate({ to: "/dashboard" });
				}).finally(() => setSubmitting(false));
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "phone",
						children: "Phone number"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "phone",
						required: true,
						autoComplete: "username",
						placeholder: "+254 7XX XXX XXX",
						value: phone,
						onChange: (e) => setPhone(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "password",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/forgot-password",
							className: "text-sm font-medium text-primary hover:underline",
							children: "Forgot password?"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "password",
						type: "password",
						required: true,
						autoComplete: "current-password",
						value: password,
						onChange: (e) => setPassword(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "lg",
					className: "w-full",
					disabled: submitting,
					children: submitting ? "Signing in…" : "Sign in"
				})
			]
		})]
	});
}
//#endregion
export { SignInPage as component };
