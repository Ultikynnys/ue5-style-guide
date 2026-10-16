import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const filename = process.argv[2] ?? "README.md";
const source = filename === "-"
  ? readFileSync(0, "utf8")
  : filename === "--worktree"
    ? readFileSync(resolve(repoRoot, "README.md"), "utf8")
    : filename === "README.md"
      ? execFileSync("git", ["show", ":README.md"], { cwd: repoRoot, encoding: "utf8" })
      : readFileSync(filename, "utf8");

// Mirrors web/src/styleguide/markdown.ts and GitHub's heading anchors: headings
// are the anchors, so a reference resolves against a heading slug (or, still,
// an explicit <a name>), and a link may only point at content below it.
function githubSlug(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\w\s-]/gu, "")
    .replace(/\s/g, "-")
    .replace(/^-+|-+$/g, "");
}

const lines = source.split(/\r?\n/);
const targetLine = new Map();
const refs = [];

let inFence = false;
let fenceChar = "";
let fenceLength = 0;

const addTarget = (name, line) => {
  if (name && !targetLine.has(name)) targetLine.set(name, line);
};

for (let index = 0; index < lines.length; index++) {
  const line = lines[index];
  const fence = line.match(/^\s*(`{3,}|~{3,})/);
  if (fence) {
    const marker = fence[1];
    if (!inFence) {
      inFence = true;
      fenceChar = marker[0];
      fenceLength = marker.length;
    } else if (marker[0] === fenceChar && marker.length >= fenceLength) {
      inFence = false;
    }
    continue;
  }
  if (inFence) continue;

  const lineNo = index + 1;
  for (const match of line.matchAll(/<a\s+name="([^"]+)"/g)) {
    addTarget(match[1], lineNo);
  }
  const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
  if (heading) {
    const base = githubSlug(heading[2]);
    let name = base;
    let n = 0;
    while (targetLine.has(name)) name = `${base}-${++n}`;
    addTarget(name, lineNo);
  }
  // A figure caption anchors the image as `figure-<n>`, so a
  // `[Figure <n>](#figure-<n>)` reference resolves like a heading link.
  const figure = line.match(/^\*\*Figure\s+(\d+)\.\*\*/);
  if (figure) addTarget(`figure-${figure[1]}`, lineNo);
  for (const match of line.matchAll(/\]\(#([^)]+)\)/g)) {
    refs.push({ target: match[1], line: lineNo });
  }
  for (const match of line.matchAll(/href="#([^"]+)"/g)) {
    refs.push({ target: match[1], line: lineNo });
  }
}

// Router-level targets that are not document anchors.
const alwaysTop = new Set(["top", "table-of-contents"]);
const errors = [];
for (const ref of refs) {
  if (alwaysTop.has(ref.target)) continue;
  const target = targetLine.get(ref.target);
  if (target === undefined) {
    errors.push(`README.md:${ref.line}: reference "#${ref.target}" has no matching heading or anchor.`);
    continue;
  }
  if (target <= ref.line) {
    errors.push(`README.md:${ref.line}: reference "#${ref.target}" points up to line ${target}; references may only point down.`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Reference rules passed (${refs.length} references checked).`);
