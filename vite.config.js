import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "simple-template": resolve(
          __dirname,
          "templates/simple-template/index.html"
        ),
        "template-card": resolve(
          __dirname,
          "templates/template-card/index.html"
        ),
      },
      output: {
        assetFileNames: "assets/[name].min[extname]",
      },
    },
  },
});
