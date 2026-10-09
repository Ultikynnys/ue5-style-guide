export type NodeKind = "section" | "rule" | "meta";

export interface StyleRule {
  /** Stable DOM id / permalink target, e.g. "base-asset-name" or "rule-3.2.1.2". */
  id: string;
  /** Numeric rule number derived from the heading, e.g. "3.2.1.2", or null for unnumbered headings. */
  number: string | null;
  /** Heading text with the leading number and inline markdown stripped. */
  title: string;
  /** Exact heading source text (number included). */
  heading: string;
  /** Heading depth, 1-6. */
  level: number;
  kind: NodeKind;
  /** Explicit `<a name="...">` anchors that preceded this heading. */
  anchors: string[];
  parentId: string | null;
  childIds: string[];
  /** Rendered HTML of this heading's own body (child sections excluded). */
  html: string;
  /** Plain-text of the body + title, for client-side search. */
  text: string;
  /** Depth-first order index. */
  order: number;
}

export interface StyleGuideStats {
  total: number;
  rules: number;
  sections: number;
  meta: number;
}

export interface StyleGuide {
  /** Guide title taken from the leading level-1 heading. */
  title: string;
  /** HTML of everything between the title heading and the first child section. */
  introHtml: string;
  /** Flat list of every navigable node in document order. */
  rules: StyleRule[];
  /** Ids of the top-level nodes, in document order. */
  roots: string[];
  /** Alias (anchor name, number, or slug) -> rule id, for deep links. */
  aliases: Record<string, string>;
  stats: StyleGuideStats;
}
