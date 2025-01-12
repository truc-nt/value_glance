import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
