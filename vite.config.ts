import path from "path";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  base: "/",
  define: {
    global: "window",
  },
  plugins: [
    vueDevTools(),
    vue(),
    eslintPlugin({
      failOnError: false,
      failOnWarning: false,
      cache: false,
    }),
  ],
  optimizeDeps: {
    exclude: ["crypto"],
  },
  assetsInclude: [
    "**/*.eot",
    "**/*.woff",
    "**/*.woff2",
    "**/*.ttf",
    "**/*.svg",
  ],
  resolve: {
    alias: {
      "@fonts": path.resolve(__dirname, "src/assets/fonts"),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
