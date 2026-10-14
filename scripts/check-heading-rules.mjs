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

const headings = [];
let inFence = false;
let fenceChar = "";
let fenceLength = 0;
const lines = source.split(/\r?\n/);

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

  const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
  if (!match) continue;
  headings.push({ level: match[1].length, text: match[2], line: index + 1 });
}

console.log(`Heading rules passed (${headings.length} headings checked).`);
