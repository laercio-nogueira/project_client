import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@templates": path.resolve(__dirname, "./src/templates"),
      "@organisms": path.resolve(__dirname, "./src/organisms"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
