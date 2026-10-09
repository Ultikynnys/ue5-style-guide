import type { NodeKind, StyleGuide, StyleRule } from "../types";
import {
  githubSlug,
  htmlToText,
  renderMarkdown,
  stripInlineMarkdown,
} from "./markdown";

const HEADING_RE = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
// Digits, optionally dotted, optionally with a trailing letter variant (1.1e1, 2e1, 00.1).
const LEADING_NUMBER_RE = /^([0-9][0-9a-z]*(?:\.[0-9a-z]+)*)/i;

interface MutableNode {
  id: string;
  number: string | null;
  title: string;
  heading: string;
  level: number;
  kind: NodeKind;
  anchors: string[];
  parentId: string | null;
  childIds: string[];
  bodyLines: string[];
  order: number;
}

function classify(level: number, number: string | null): NodeKind {
  if (number) return level <= 2 ? "section" : "rule";
  return "meta";
}

function anchorHtml(anchors: string[]): string {
  return anchors.map((a) => `<a name="${a}"></a>`).join("\n");
}

// A line is an anchor line when it holds nothing but <a name="...">, </a> and
// <a> tokens. The permissive token set covers the README's malformed
// `<a name="x"><a>` typos, which a strict pattern would miss.
function parseAnchorLine(line: string): string[] | null {
  const names: string[] = [];
  let rest = line.replace(
    /<a\s+name="([^"]+)"\s*>/gi,
    (_match, name: string) => {
      names.push(name);
      return "";
    },
  );
  rest = rest.replace(/<\/a>|<a\s*>/gi, "");
  return names.length > 0 && rest.trim() === "" ? names : null;
}

export function parseStyleGuide(markdown: string): StyleGuide {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");

  const nodes: MutableNode[] = [];
  const usedIds = new Set<string>();
  const roots: string[] = [];
  const stack: MutableNode[] = [];

  let pendingAnchors: string[] = [];
  let body: string[] = [];
  let order = 0;

  const current = (): MutableNode | null =>
    stack.length ? stack[stack.length - 1] : null;

  const flushBody = (): void => {
    const node = current();
    if (node && body.length) node.bodyLines.push(...body);
    body = [];
  };

  const uniqueId = (base: string): string => {
    const root = base || "rule";
    let id = root;
    let n = 2;
    while (usedIds.has(id)) id = `${root}-${n++}`;
    usedIds.add(id);
    return id;
  };

  const openHeading = (level: number, rawHeading: string): void => {
    const heading = stripInlineMarkdown(rawHeading);
    const numMatch = rawHeading.match(LEADING_NUMBER_RE);
    const number = numMatch ? numMatch[1].replace(/\.+$/, "") : null;
    const title = number
      ? stripInlineMarkdown(
          rawHeading.slice(numMatch![0].length).replace(/^[\s.:\-–—]+/, ""),
        )
      : heading;

    const anchors = pendingAnchors;
    pendingAnchors = [];

    const idBase =
      anchors[0] ?? (number ? `rule-${number}` : githubSlug(title || heading));

    while (stack.length && stack[stack.length - 1].level >= level) stack.pop();

    const parent = current();
    const node: MutableNode = {
      id: uniqueId(idBase),
      number,
      title: title || heading,
      heading,
      level,
      kind: classify(level, number),
      anchors,
      parentId: parent ? parent.id : null,
      childIds: [],
      bodyLines: [],
      order: order++,
    };

    if (parent) parent.childIds.push(node.id);
    else roots.push(node.id);

    nodes.push(node);
    stack.push(node);
  };

  for (const rawLine of lines) {
    const anchorNames = parseAnchorLine(rawLine);
    if (anchorNames) {
      flushBody();
      pendingAnchors.push(...anchorNames);
      continue;
    }

    const headingMatch = rawLine.match(HEADING_RE);
    if (headingMatch) {
      flushBody();
      openHeading(headingMatch[1].length, headingMatch[2]);
      continue;
    }

    if (rawLine.trim() === "") {
      // A blank between an anchor and its heading is structural, not content.
      if (pendingAnchors.length) continue;
      body.push(rawLine);
      continue;
    }

    if (pendingAnchors.length) {
      // Anchors that were not followed by a heading stay as inline HTML content.
      body.push(anchorHtml(pendingAnchors));
      pendingAnchors = [];
    }
    body.push(rawLine);
  }

  flushBody();
  if (pendingAnchors.length) {
    const node = current();
    if (node) node.bodyLines.push(anchorHtml(pendingAnchors));
    pendingAnchors = [];
  }

  const rules: StyleRule[] = nodes.map((n) => {
    const html = renderMarkdown(n.bodyLines.join("\n"));
    return {
      id: n.id,
      number: n.number,
      title: n.title,
      heading: n.heading,
      level: n.level,
      kind: n.kind,
      anchors: n.anchors,
      parentId: n.parentId,
      childIds: n.childIds,
      html,
      text: `${n.number ? n.number + " " : ""}${n.title} ${htmlToText(html)}`.trim(),
      order: n.order,
    };
  });

  const aliases: Record<string, string> = {};
  const addAlias = (alias: string, id: string): void => {
    if (alias && !(alias in aliases)) aliases[alias] = id;
  };
  for (const n of nodes) {
    addAlias(n.id, n.id);
    for (const a of n.anchors) addAlias(a, n.id);
    addAlias(githubSlug(n.heading), n.id);
    addAlias(githubSlug(n.title), n.id);
    if (n.number) addAlias(n.number, n.id);
  }

  const stats = { total: rules.length, rules: 0, sections: 0, meta: 0 };
  for (const r of rules) {
    if (r.kind === "rule") stats.rules += 1;
    else if (r.kind === "section") stats.sections += 1;
    else stats.meta += 1;
  }

  return { title: "Unreal Engine Style Guide", introHtml: "", rules, roots, aliases, stats };
}
