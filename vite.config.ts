import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

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

  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    // Use vercel preset when on Vercel, node-server locally
    const preset = process.env.VERCEL ? "vercel" : "node-server";
    plugins.push(nitro({ preset }));
  }

  plugins.push(viteReact());

  return { plugins };
});