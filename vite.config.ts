import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  base: "/",
  plugins: [
    vueDevTools(),
    vue(),
    eslintPlugin({
      failOnError: false,
      failOnWarning: false,
      cache: false,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
