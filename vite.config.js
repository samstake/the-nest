import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        nest: resolve(__dirname, "index.html"),
        sixers: resolve(__dirname, "sixers/index.html"),
        flyers: resolve(__dirname, "flyers/index.html"),
        phillies: resolve(__dirname, "phillies/index.html"),
      },
    },
  },
});
