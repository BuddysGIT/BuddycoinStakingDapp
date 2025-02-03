import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias @ pour éviter les chemins relatifs
    },
  },
  root: ".", // Définit la racine du projet
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"), // Définit explicitement le point d’entrée
    },
    outDir: "dist", // Définit le dossier de sortie
  },
});
