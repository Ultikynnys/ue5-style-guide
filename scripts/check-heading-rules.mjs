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
  const text = match[2].replace(/\s+\{#[^}]+\}\s*$/, "").trim();
  const numericPrefix = text.match(/^(\d+(?:[.\da-zA-Z]*\d)?)(?=\s|$)/)?.[1] ?? null;
  const number = numericPrefix && /^\d+(?:\.\d+)*$/.test(numericPrefix)
    ? numericPrefix
    : null;
  const hasLetteredNumber = numericPrefix !== null && number === null;
  headings.push({ level: match[1].length, text, number, hasLetteredNumber, line: index + 1, children: [] });
}

const stack = [];
for (const heading of headings) {
  while (stack.length && stack.at(-1).level >= heading.level) stack.pop();
  if (stack.length) stack.at(-1).children.push(heading);
  stack.push(heading);
}

const errors = [];
for (const heading of headings) {
  if (heading.children.length === 1) {
    const child = heading.children[0];
    errors.push(`README.md:${child.line}: singleton subheading under "${heading.text}"; fold it into the parent or add a second sibling subheading.`);
  }
  if (heading.hasLetteredNumber) {
    errors.push(`README.md:${heading.line}: heading "${heading.text}" has letters embedded in its number; use digits and dots only.`);
  }
  if (heading.number && heading.number.split(".").length > 3) {
    errors.push(`README.md:${heading.line}: heading "${heading.text}" exceeds the maximum of three numeric components.`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Heading rules passed (${headings.length} headings checked).`);
