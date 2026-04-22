import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// Dedicated library build — does NOT bundle peer dependencies.
// Run with: npm run build:lib
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: { Buffer: true, global: true, process: true },
      protocolImports: true,
    }),
    dts({
      include: ["src/sdk"],
      outDir: "dist/types",
      tsconfigPath: "./tsconfig.lib.json",
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "src/sdk/index.ts"),
      name: "LaceWeave",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
    },
    rollupOptions: {
      // All peer deps must be external — consumers install them
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@meshsdk/core",
        "@meshsdk/react",
        "framer-motion",
        "lucide-react",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@meshsdk/core": "MeshCore",
          "@meshsdk/react": "MeshReact",
        },
      },
    },
  },
});
