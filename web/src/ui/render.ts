import type { StyleGuide, StyleRule } from "../types";
import { el } from "./dom";
import { buildToc } from "./toc";

export interface AppRefs {
  guide: StyleGuide;
  byId: Map<string, StyleRule>;
  sidebar: HTMLElement;
  tocEl: HTMLElement;
  contentEl: HTMLElement;
  searchInput: HTMLInputElement;
  resultsEl: HTMLElement;
  progressBar: HTMLElement;
  toast: HTMLElement;
}

function headingTag(level: number): "h2" | "h3" | "h4" | "h5" | "h6" {
  const clamped = Math.min(Math.max(level, 2), 6);
  return (`h${clamped}` as "h2" | "h3" | "h4" | "h5" | "h6");
}

export function renderApp(root: HTMLElement, guide: StyleGuide): AppRefs {
  root.textContent = "";
  const byId = new Map(guide.rules.map((r) => [r.id, r] as const));

  const themeToggle = el("button", {
    id: "theme-toggle",
    class: "btn theme-toggle",
    type: "button",
    "aria-label": "Toggle dark mode",
  });

  const navToggle = el(
    "button",
    {
      class: "btn nav-toggle",
      type: "button",
      "aria-controls": "sidebar",
      "aria-expanded": "false",
      text: "Menu",
    },
  );

  const searchInput = el("input", {
    id: "search-input",
    class: "search-input",
    type: "search",
    placeholder: "Search rules: number, title, or text",
    "aria-label": "Search rules",
    autocomplete: "off",
    spellcheck: "false",
  }) as HTMLInputElement;

  const resultsEl = el("div", { id: "search-results", class: "results", hidden: "hidden" });

  const header = el("header", { class: "topbar" }, [
    navToggle,
    el("div", { class: "brand" }, [
      el("span", { class: "brand-mark", text: "SG" }),
      el("span", { class: "brand-text" }, [
        el("span", { class: "brand-title", text: guide.title }),
        el("span", {
          class: "brand-sub",
          text: `${guide.stats.rules} rules - ${guide.stats.sections} sections - parsed live from README.md`,
        }),
      ]),
    ]),
    el("div", { class: "search" }, [searchInput, resultsEl]),
    themeToggle,
  ]);

  const progressBar = el("span", { id: "progress-bar", class: "progress-bar" });
  const progress = el("div", { class: "progress", "aria-hidden": "true" }, [progressBar]);

  const tocEl = el("nav", { id: "toc", class: "toc", "aria-label": "Rule navigation" });
  const sidebar = el("aside", { id: "sidebar", class: "sidebar" }, [
    el("div", { class: "sidebar-head" }, [
      el("span", { class: "sidebar-title", text: "Contents" }),
      el("span", { class: "count", text: String(guide.stats.total) }),
    ]),
    tocEl,
  ]);

  const contentEl = el("main", { id: "content", class: "content" });

  if (guide.introHtml) {
    contentEl.append(
      el("section", { class: "intro" }, [el("div", { class: "prose", html: guide.introHtml })]),
    );
  }

  const renderRule = (rule: StyleRule): HTMLElement => {
    const section = el("section", {
      id: rule.id,
      class: `rule rule--${rule.kind}`,
      "data-kind": rule.kind,
      "data-id": rule.id,
      "data-number": rule.number ?? "",
    });

    const permalink = el(
      "button",
      {
        class: "permalink",
        type: "button",
        title: "Copy a link to this rule",
        "aria-label": `Copy a link to ${rule.title}`,
        "data-target": rule.id,
        text: "#",
      },
    );

    const head = el("div", { class: "rule-head" }, [
      rule.number ? el("span", { class: "rule-number", text: rule.number }) : null,
      el(headingTag(rule.level), { class: "rule-title", text: rule.title }),
      permalink,
    ].filter((node): node is HTMLElement => Boolean(node)));

    section.append(head);

    if (rule.html.trim()) {
      section.append(el("div", { class: "prose", html: rule.html }));
    }

    const children = rule.childIds
      .map((id) => byId.get(id))
      .filter((r): r is StyleRule => Boolean(r));
    if (children.length) {
      const wrap = el("div", { class: "rule-children" });
      for (const child of children) wrap.append(renderRule(child));
      section.append(wrap);
    }

    return section;
  };

  const rulesWrap = el("div", { class: "rules" });
  for (const id of guide.roots) {
    const rule = byId.get(id);
    if (rule) rulesWrap.append(renderRule(rule));
  }
  contentEl.append(rulesWrap);
  contentEl.append(
    el("footer", { class: "footer" }, [
      el("span", { text: "Gamemakin UE5 Style Guide - rules rendered from " }),
      el("a", {
        href: "https://github.com/Allar/ue5-style-guide",
        target: "_blank",
        rel: "noopener",
        text: "README.md",
      }),
    ]),
  );

  const toTop = el("button", {
    id: "to-top",
    class: "to-top",
    type: "button",
    "aria-label": "Scroll to top",
    text: "Top",
  });

  const toast = el("div", { id: "toast", class: "toast", hidden: "hidden", role: "status" });

  const toggle = (event: Event) => {
    const btn = event.currentTarget as HTMLElement;
    const open = sidebar.classList.toggle("sidebar--open");
    btn.setAttribute("aria-expanded", String(open));
  };
  navToggle.addEventListener("click", toggle);

  const shell = el("div", { class: "shell" }, [sidebar, contentEl]);

  root.append(header, progress, shell, toTop, toast);
  tocEl.append(buildToc(guide, byId));

  return {
    guide,
    byId,
    sidebar,
    tocEl,
    contentEl,
    searchInput,
    resultsEl,
    progressBar,
    toast,
  };
}
