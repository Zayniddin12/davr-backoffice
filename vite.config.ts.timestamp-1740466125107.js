// vite.config.ts
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import vueDevTools from "vite-plugin-vue-devtools";
var vite_config_default = defineConfig({
  base: "/",
  plugins: [
    vueDevTools(),
    vue(),
    eslintPlugin({
      failOnError: false,
      failOnWarning: false,
      cache: false
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", "file:///C:/Users/user/Desktop/myprojects/davr-backoffice/vite.config.ts")),
      "~": fileURLToPath(new URL("./src", "file:///C:/Users/user/Desktop/myprojects/davr-backoffice/vite.config.ts"))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tIFwidXJsXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWVzbGludFwiO1xyXG5pbXBvcnQgdnVlRGV2VG9vbHMgZnJvbSBcInZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29sc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBiYXNlOiBcIi9cIixcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWVEZXZUb29scygpLFxyXG4gICAgdnVlKCksXHJcbiAgICBlc2xpbnRQbHVnaW4oe1xyXG4gICAgICBmYWlsT25FcnJvcjogZmFsc2UsXHJcbiAgICAgIGZhaWxPbldhcm5pbmc6IGZhbHNlLFxyXG4gICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBcImZpbGU6Ly8vQzovVXNlcnMvdXNlci9EZXNrdG9wL215cHJvamVjdHMvZGF2ci1iYWNrb2ZmaWNlL3ZpdGUuY29uZmlnLnRzXCIpKSxcclxuICAgICAgXCJ+XCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIFwiZmlsZTovLy9DOi9Vc2Vycy91c2VyL0Rlc2t0b3AvbXlwcm9qZWN0cy9kYXZyLWJhY2tvZmZpY2Uvdml0ZS5jb25maWcudHNcIikpLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWUsV0FBVztBQUNuQyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGlCQUFpQjtBQUV4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxZQUFZO0FBQUEsSUFDWixJQUFJO0FBQUEsSUFDSixhQUFhO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsTUFDZixPQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHlFQUF5RSxDQUFDO0FBQUEsTUFDOUcsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHlFQUF5RSxDQUFDO0FBQUEsSUFDaEg7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
