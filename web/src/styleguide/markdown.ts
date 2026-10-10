import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

// A paragraph whose last element is an image, followed by a bold-led paragraph, is a
// figure and its caption. The image is often preceded by prose in the same
// paragraph (no blank line before it in the markdown), so that prose is split
// back out: only the image belongs in the figure, otherwise its own text would
// widen the figure and the caption would stop matching the image.
const FIGURE_PATTERN =
  /<p>\s*((?:(?!<img\b)[\s\S])*?)\s*(<img\b[^>]*>)\s*<\/p>\s*<p>\s*(<strong>[\s\S]*?<\/strong>[\s\S]*?)\s*<\/p>/g;

/** Render a markdown chunk to HTML. Runs in the browser; synchronous only. */
export function renderMarkdown(md: string): string {
  const source = md.trim();
  if (!source) return "";
  // async: false guarantees a string (no async extensions are registered).
  const html = marked.parse(source, { async: false }) as string;
  return html.replace(
    FIGURE_PATTERN,
    (_match, lead: string, img: string, caption: string) => {
      const prose = lead.trim();
      return `${prose ? `<p>${prose}</p>` : ""}<figure>${img}<figcaption>${caption}</figcaption></figure>`;
    },
  );
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
