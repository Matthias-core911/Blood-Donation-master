import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import fs from "node:fs";

export default defineConfig(async ({ command }) => {
  // Always delete the CRA leftover if it reappears
  try {
    if (fs.existsSync("public/index.html")) {
      fs.unlinkSync("public/index.html");
      console.log("Deleted stale public/index.html");
    }
  } catch {}

  const plugins = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
    }),
  ];

  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    const preset = process.env.VERCEL ? "vercel" : "node-server";
    plugins.push(nitro({ preset }));
  }

  plugins.push(viteReact());

  return { plugins };
});
