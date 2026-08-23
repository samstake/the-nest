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
        hub: resolve(__dirname, "index.html"),
        nest: resolve(__dirname, "nest/index.html"),
        sixers: resolve(__dirname, "sixers/index.html"),
        flyers: resolve(__dirname, "flyers/index.html"),
        phillies: resolve(__dirname, "phillies/index.html"),
      },
    },
  },
});
