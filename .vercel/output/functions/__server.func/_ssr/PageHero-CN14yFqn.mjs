import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { o as cn } from "./router-C_PTmrjT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PageHero-CN14yFqn.js
var import_jsx_runtime = require_jsx_runtime();
/** Shared editorial page band - dark, typographic, sits under the floating nav. */
function PageHero({ eyebrow, title, description, actions, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("relative -mt-20 overflow-hidden bg-ink text-ink-foreground", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 grad-ember",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute -right-24 top-0 size-[28rem] rounded-full bg-primary/20 blur-3xl",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page relative grid gap-6 pb-14 pt-32 sm:pb-16 md:grid-cols-[1.2fr_auto] md:items-end md:pt-36",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal-up max-w-2xl",
					children: [
						eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-primary",
							children: eyebrow
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "display-lg mt-4 text-white",
							children: title
						}),
						description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-lg leading-relaxed text-white/65",
							children: description
						}) : null
					]
				}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-3",
					children: actions
				}) : null]
			})
		]
	});
}
//#endregion
export { PageHero as t };
