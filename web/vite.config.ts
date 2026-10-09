import { execSync } from "node:child_process";
import { defineConfig } from "vite";

// The versioning is implicit in the commit count: 30 commits -> 0.3.0,
// 100 commits -> 1.0.0, 137 commits -> 1.3.7.
function appVersion(): { version: string; commits: number } {
  let commits = 0;
  try {
    commits = parseInt(execSync("git rev-list --count HEAD").toString().trim(), 10) || 0;
  } catch {
    commits = 0;
  }
  const version = `${Math.floor(commits / 100)}.${Math.floor((commits % 100) / 10)}.${commits % 10}`;
  return { version, commits };
}

const app = appVersion();

// The site lives in web/ but parses ../README.md (outside Vite's root), so the
// dev server must be allowed to read one level up. base "./" keeps every asset
// path relative so the build works under the /<repo>/ GitHub Pages subpath.
export default defineConfig({
  base: "./",
  define: {
    __APP_VERSION__: JSON.stringify(app.version),
    __APP_COMMITS__: JSON.stringify(app.commits),
  },
  server: {
    fs: { allow: [".."] },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2021",
  },
});
