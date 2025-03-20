import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          injectScript: `<script src="./public/main.bc.js"></script>`,
        },
      },
    }),
  ],

  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
