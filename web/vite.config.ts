import { defineConfig } from "vite";

// The site lives in web/ but parses ../README.md (outside Vite's root), so the
// dev server must be allowed to read one level up. base "./" keeps every asset
// path relative so the build works under the /<repo>/ GitHub Pages subpath.
export default defineConfig({
  base: "./",
  server: {
    fs: { allow: [".."] },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2021",
  },
});
