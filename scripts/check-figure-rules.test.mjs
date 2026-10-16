import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const checker = fileURLToPath(new URL("./check-figure-rules.mjs", import.meta.url));
const cases = [
  {
    name: "accepts a figure referenced above its image",
    source: "[Figure 1](#figure-1)\n\n![alt](img.png)\n\n**Figure 1.** Caption.\n",
    expected: 0,
  },
  {
    name: "rejects a figure with no reference",
    source: "![alt](img.png)\n\n**Figure 1.** Caption.\n",
    expected: 1,
  },
  {
    name: "rejects a reference below the image",
    source: "![alt](img.png)\n\n[Figure 1](#figure-1)\n\n**Figure 1.** Caption.\n",
    expected: 1,
  },
  {
    name: "rejects a caption with no image above it",
    source: "**Figure 1.** Caption.\n",
    expected: 1,
  },
  {
    name: "rejects a reference to a different figure number",
    source: "[Figure 2](#figure-2)\n\n![alt](img.png)\n\n**Figure 1.** Caption.\n",
    expected: 1,
  },
  {
    name: "ignores captions inside fenced code",
    source: "```md\n![a](b.png)\n\n**Figure 1.** x\n```\n",
    expected: 0,
  },
];

let failed = false;
for (const test of cases) {
  const result = spawnSync(process.execPath, [checker, "-"], {
    input: test.source,
    encoding: "utf8",
  });
  const passed = result.status === test.expected;
  console.log(`${passed ? "PASS" : "FAIL"} ${test.name}`);
  if (!passed) {
    console.error(result.stderr || result.stdout);
    failed = true;
  }
}

if (failed) process.exit(1);
