/**@type{import("vite").UserConfig} */
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({

  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    port: 3000,
    hmr: true,
    proxy: {
      '/api': {
        target: "http://localhost:5000",
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true
      }
    }
  }
});
