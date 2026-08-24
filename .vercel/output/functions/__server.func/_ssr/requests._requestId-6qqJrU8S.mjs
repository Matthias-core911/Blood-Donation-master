import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { S as Droplet } from "../_libs/lucide-react.mjs";
import { a as Button } from "./router-C_PTmrjT.mjs";
import { t as EmptyState } from "./EmptyState-nqinGrtv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/requests._requestId-6qqJrU8S.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "container-page section-y",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Droplet,
		title: "Request not found",
		description: "This request may have been fulfilled or withdrawn.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/requests",
				children: "Back to requests"
			})
		})
	})
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
