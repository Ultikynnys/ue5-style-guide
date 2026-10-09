import type { StyleGuide, StyleRule } from "../types";
import { SITE_GAME_URL, SITE_REPO, SITE_REPO_UPSTREAM } from "../config";
import { el } from "./dom";
import { buildToc } from "./toc";
import { applyLogoEffect, trimLogo } from "./logoEffect";
import logoUrl from "../assets/haeretica-logo.png";
import hLogoUrl from "../assets/Haeretica_H.png";

export interface AppRefs {
  guide: StyleGuide;
  byId: Map<string, StyleRule>;
  sidebar: HTMLElement;
  tocEl: HTMLElement;
  contentEl: HTMLElement;
  searchInput: HTMLInputElement;
  resultsEl: HTMLElement;
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

  const brandMark = el("img", { class: "brand-mark", src: hLogoUrl, alt: "" });
  applyLogoEffect(brandMark);

  const header = el("header", { class: "topbar" }, [
    navToggle,
    el("div", { class: "brand" }, [
      brandMark,
      el("span", { class: "brand-text" }, [
        el("span", {
          class: "brand-sub",
          text: `${guide.stats.rules} rules - ${guide.stats.sections} sections - parsed live from README.md`,
        }),
      ]),
      el("span", {
        class: "version",
        text: `v${__APP_VERSION__}`,
        title: `${__APP_COMMITS__} commits`,
      }),
      el("a", {
        class: "repo-link",
        href: SITE_REPO,
        target: "_blank",
        rel: "noopener",
        title: "View the repository on GitHub",
        "aria-label": "View the repository on GitHub",
        html: '<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
      }),
    ]),
    el("div", { class: "search" }, [searchInput, resultsEl]),
    themeToggle,
  ]);

  const tocEl = el("nav", { id: "toc", class: "toc", "aria-label": "Rule navigation" });
  const sidebar = el("aside", { id: "sidebar", class: "sidebar" }, [
    el("div", { class: "sidebar-head" }, [
      el("span", { class: "sidebar-title", text: "Contents" }),
      el("span", { class: "count", text: String(guide.stats.total) }),
    ]),
    tocEl,
  ]);

  const contentEl = el("main", { id: "content", class: "content" });

  const renderRule = (rule: StyleRule): HTMLElement => {
    const section = el("section", {
      id: rule.id,
      class: `rule rule--${rule.kind}`,
      "data-kind": rule.kind,
      "data-id": rule.id,
      "data-number": rule.number ?? "",
    });

    const head = el("div", { class: "rule-head" }, [
      rule.number
        ? el("span", {
            class: "rule-number rule-link",
            title: `Right-click to copy a link to ${rule.title}`,
            "data-target": rule.number ?? rule.id,
            text: rule.number,
          })
        : null,
      el(headingTag(rule.level), { class: "rule-title", text: rule.title }),
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

  const heroLogo = el("img", { class: "hero-logo", src: logoUrl, alt: guide.title });
  applyLogoEffect(heroLogo);
  trimLogo(heroLogo);
  contentEl.append(el("div", { class: "hero" }, [heroLogo]));
  contentEl.append(
    el("div", { class: "hero-intro" }, [
      el("p", {}, [
        el("span", { text: "A modified fork of the " }),
        el("a", {
          href: SITE_REPO_UPSTREAM,
          target: "_blank",
          rel: "noopener",
          text: "Allar/ue5-style-guide",
        }),
        el("span", { text: " repository, adapted for Haeretica, a " }),
        el("a", {
          href: SITE_GAME_URL,
          target: "_blank",
          rel: "noopener",
          text: "GMTK 2026 game jam",
        }),
        el("span", { text: " game." }),
      ]),
      el("p", {
        text: "This is the post-jam comprehensive guide. It is updated as needed to keep development standards consistent across everyone working on the project.",
      }),
    ]),
  );

  const rulesWrap = el("div", { class: "rules" });
  for (const id of guide.roots) {
    const rule = byId.get(id);
    if (rule) rulesWrap.append(renderRule(rule));
  }
  contentEl.append(rulesWrap);

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

  root.append(header, shell, toTop, toast);
  tocEl.append(buildToc(guide, byId));

  return {
    guide,
    byId,
    sidebar,
    tocEl,
    contentEl,
    searchInput,
    resultsEl,
    toast,
  };
}
