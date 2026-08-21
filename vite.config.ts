import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// Standard Vite config for TanStack Start, using only public packages.
// (Originally scaffolded via Lovable's own `@lovable.dev/vite-tanstack-config`
// wrapper, which is Lovable-internal tooling and isn't resolvable outside
// their build environment - this replaces it with the equivalent plugins.)
export default defineConfig(async ({ command }) => {
  const plugins = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
  ];

  // Nitro (server build/deploy target) is only needed for production builds.
  // Using the standard Node.js server preset: the app now uses better-sqlite3
  // for the database, a native Node addon that can't run in edge runtimes
  // like Cloudflare Workers (no filesystem, no native bindings there).
  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    plugins.push(nitro({ preset: "node-server" }));
  }

  plugins.push(viteReact());

  return { plugins };
});
