import { defineConfig } from "vite";
import inspect from "vite-plugin-inspect";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    inspect()
  ]
});

