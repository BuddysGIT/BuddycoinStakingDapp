import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias @ pour éviter les chemins relatifs
      buffer: "buffer",
      process: "process/browser"
    },
  },
  root: ".", // Définit la racine du projet
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"), // Définit explicitement le point d’entrée
      plugins: [nodePolyfills()],
    },
    outDir: "dist", // Définit le dossier de sortie
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    include: ["buffer"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
});