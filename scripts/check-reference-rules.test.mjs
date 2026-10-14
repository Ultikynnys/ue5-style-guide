import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const checker = fileURLToPath(new URL("./check-reference-rules.mjs", import.meta.url));
const cases = [
  {
    name: "accepts a reference that points down to a later heading",
    source: "[a](#later-heading)\n\n## Later Heading\n",
    expected: 0,
  },
  {
    name: "rejects a reference that points up to an earlier heading",
    source: "## Earlier Heading\n\n[a](#earlier-heading)\n",
    expected: 1,
  },
  {
    name: "rejects a reference with no heading at all",
    source: "[a](#missing)\n",
    expected: 1,
  },
  {
    name: "accepts an html href that points down to a later heading",
    source: '<a href="#later-heading">x</a>\n\n## Later Heading\n',
    expected: 0,
  },
  {
    name: "rejects an html href that points up to an earlier heading",
    source: '## Earlier Heading\n\n<a href="#earlier-heading">x</a>\n',
    expected: 1,
  },
  {
    name: "accepts the suffixed slug of a duplicate heading",
    source: "[a](#dup-1)\n\n## Dup\n\n## Dup\n",
    expected: 0,
  },
  {
    name: "still accepts an explicit anchor below the reference",
    source: '[a](#x)\n\n<a name="x"></a>\n',
    expected: 0,
  },
  {
    name: "ignores references inside fenced code",
    source: "```md\n[a](#missing)\n```\n",
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
