import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// Served from https://garretthead00.github.io/garretthead-portfolio/
export default defineConfig({
  base: "/garretthead-portfolio/",
  plugins: [react(), tailwindcss()],
});
