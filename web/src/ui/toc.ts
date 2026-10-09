import type { StyleGuide, StyleRule } from "../types";
import { el } from "./dom";

/** Build the nested sidebar navigation from the rule tree. */
export function buildToc(
  guide: StyleGuide,
  byId: Map<string, StyleRule>,
): HTMLElement {
  const list = el("ul", { class: "toc-list" });

  const buildItem = (rule: StyleRule): HTMLElement => {
    const children = rule.childIds
      .map((id) => byId.get(id))
      .filter((r): r is StyleRule => Boolean(r));

    const link = el(
      "a",
      { class: "toc-link", href: `#${rule.id}`, "data-id": rule.id },
      [
        el("span", { class: "toc-num", text: rule.number ?? "" }),
        el("span", { class: "toc-text", text: rule.title }),
      ],
    );

    const row = el("div", { class: "toc-row" }, [link]);

    const itemProps = {
      "data-id": rule.id,
      "data-number": rule.number ?? "",
      "data-title": rule.title.toLowerCase(),
      "data-text": rule.text.toLowerCase(),
    };

    if (!children.length) {
      return el(
        "li",
        { class: `toc-item toc-item--${rule.kind} toc-item--leaf`, ...itemProps },
        [row],
      );
    }

    const chevron = el(
      "button",
      {
        class: "toc-toggle",
        type: "button",
        "aria-label": "Toggle subsection",
        "aria-expanded": "true",
        onclick: (event: Event) => {
          const btn = event.currentTarget as HTMLElement;
          const item = btn.closest(".toc-item");
          const collapsed = item?.classList.toggle("is-collapsed") ?? false;
          btn.setAttribute("aria-expanded", String(!collapsed));
        },
      },
      [el("span", { class: "chev" })],
    );
    row.prepend(chevron);

    const sub = el("ul", { class: "toc-list toc-sub" });
    for (const child of children) sub.append(buildItem(child));

    return el("li", { class: `toc-item toc-item--${rule.kind}`, ...itemProps }, [row, sub]);
  };

  for (const id of guide.roots) {
    const rule = byId.get(id);
    if (rule) list.append(buildItem(rule));
  }

  return list;
}
