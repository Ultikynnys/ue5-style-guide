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

// Every figure caption (`**Figure <n>.** ...`) must be introduced above its
// image by a `[Figure <n>](#figure-<n>)` link, mirroring how the guide refers
// to sections below the reference.
const CAPTION_RE = /^\*\*Figure\s+(\d+)\.\*\*/;
const IMAGE_RE = /!\[[^\]]*\]\(/;

const lines = source.split(/\r?\n/);
const errors = [];
let figures = 0;

let inFence = false;
let fenceChar = "";
let fenceLength = 0;

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

  const caption = line.match(CAPTION_RE);
  if (!caption) continue;
  figures += 1;
  const n = caption[1];
  const captionLine = index + 1;

  // The figure's image is the nearest non-blank line above the caption.
  let imageLine = 0;
  for (let j = index - 1; j >= 0; j--) {
    if (lines[j].trim() === "") continue;
    if (IMAGE_RE.test(lines[j])) imageLine = j + 1;
    break;
  }
  if (!imageLine) {
    errors.push(`README.md:${captionLine}: "Figure ${n}" has no image directly above its caption.`);
    continue;
  }

  const link = new RegExp(`\\[Figure\\s+${n}\\]\\(#figure-${n}\\)`);
  const referenced = lines.slice(0, imageLine - 1).some((text) => link.test(text));
  if (!referenced) {
    errors.push(
      `README.md:${captionLine}: "Figure ${n}" is not referenced by a "[Figure ${n}](#figure-${n})" link above its image.`,
    );
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Figure rules passed (${figures} figures checked).`);
