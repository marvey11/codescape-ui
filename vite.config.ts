import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: {
        index: resolve("src/index.ts"),
        styles: resolve("src/styles.ts"),
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: "style",
    },
    rollupOptions: { external: ["react", "react-dom", "react/jsx-runtime"] },
    cssCodeSplit: false,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/components/**/*.{ts,tsx}", "src/lib/**/*.ts"],
      exclude: ["src/**/*.stories.tsx"],
      reporter: ["text", "lcov"],
      thresholds: { lines: 80, functions: 80, branches: 75, statements: 80 },
    },
  },
});
