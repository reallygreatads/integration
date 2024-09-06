import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "weary-wolverine": resolve(
          __dirname,
          "templates/weary-wolverine/index.html"
        ),
        "lazy-ladybird": resolve(
          __dirname,
          "templates/lazy-ladybird/index.html"
        ),
      },
      output: {
        entryFileNames: "assets/script.min.js",
        assetFileNames: "assets/[name].min[extname]",
      },
    },
  },
});
