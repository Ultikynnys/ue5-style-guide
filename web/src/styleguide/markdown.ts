import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

/** Render a markdown chunk to HTML. Runs in the browser; synchronous only. */
export function renderMarkdown(md: string): string {
  const source = md.trim();
  if (!source) return "";
  // async: false guarantees a string (no async extensions are registered).
  return marked.parse(source, { async: false }) as string;
}

/** Strip tags and decode the handful of entities marked emits, for search text. */
export function htmlToText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Remove the inline markdown that shows up inside headings (code, links, emphasis). */
export function stripInlineMarkdown(text: string): string {
  return text
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * GitHub-style heading slug. Used as a deep-link alias so links like
 * `#table-of-contents` (which the README relies on GitHub to generate)
 * resolve in this site too.
 */
export function githubSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\w\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}
