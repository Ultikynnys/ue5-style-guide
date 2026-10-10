import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const checker = fileURLToPath(new URL("./check-heading-rules.mjs", import.meta.url));
const cases = [
  {
    name: "rejects singleton subheadings",
    source: "# Parent\n## Only child\n",
    expected: 1,
  },
  {
    name: "accepts sibling subheadings",
    source: "# Parent\n## First\n## Second\n",
    expected: 0,
  },
  {
    name: "rejects more than three numeric components",
    source: "# 1.2.3.4 Too deep\n",
    expected: 1,
  },
  {
    name: "rejects letters embedded in heading numbers",
    source: "# 2.1e1 Example\n",
    expected: 1,
  },
  {
    name: "accepts letters in descriptive heading text",
    source: "# 2.1 Example\n",
    expected: 0,
  },
  {
    name: "ignores headings inside fenced code",
    source: "# Parent\n\n```md\n## Singleton\n#### 1.2.3.4 Example\n```\n",
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
