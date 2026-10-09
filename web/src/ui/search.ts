import type { StyleRule } from "../types";
import { el } from "./dom";
import type { AppRefs } from "./render";

const MAX_RESULTS = 15;

/** Wire the header search box: filters the sidebar and shows a jump list. */
export function initSearch(refs: AppRefs): void {
  const { guide, byId, tocEl, searchInput, resultsEl } = refs;
  const items = Array.from(tocEl.querySelectorAll<HTMLElement>(".toc-item"));
  const index = guide.rules.map((rule) => ({
    rule,
    haystack: `${rule.number ?? ""} ${rule.title} ${rule.text}`.toLowerCase(),
  }));

  let hits: StyleRule[] = [];

  const hideResults = (): void => {
    resultsEl.hidden = true;
    resultsEl.textContent = "";
  };

  const run = (): void => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      for (const item of items) item.classList.remove("is-hidden", "is-match");
      hideResults();
      return;
    }

    const matched = new Set<string>();
    hits = [];
    for (const entry of index) {
      if (entry.haystack.includes(query)) {
        matched.add(entry.rule.id);
        hits.push(entry.rule);
      }
    }

    // A sidebar node stays visible if it or any descendant matches.
    const memo = new Map<string, boolean>();
    const subtreeHasMatch = (id: string): boolean => {
      const cached = memo.get(id);
      if (cached !== undefined) return cached;
      let result = matched.has(id);
      const rule = byId.get(id);
      if (rule) {
        for (const childId of rule.childIds) {
          if (subtreeHasMatch(childId)) result = true;
        }
      }
      memo.set(id, result);
      return result;
    };

    for (const item of items) {
      const id = item.dataset.id ?? "";
      item.classList.toggle("is-hidden", !subtreeHasMatch(id));
      item.classList.toggle("is-match", matched.has(id));
    }

    resultsEl.textContent = "";
    if (!hits.length) {
      resultsEl.append(el("div", { class: "result result--empty", text: "No matching rules." }));
    } else {
      for (const rule of hits.slice(0, MAX_RESULTS)) {
        resultsEl.append(
          el("a", { class: "result", href: `#${rule.id}`, "data-id": rule.id }, [
            el("span", { class: "result-num", text: rule.number ?? "" }),
            el("span", { class: "result-title", text: rule.title }),
            el("span", { class: `result-kind result-kind--${rule.kind}`, text: rule.kind }),
          ]),
        );
      }
      if (hits.length > MAX_RESULTS) {
        resultsEl.append(
          el("div", {
            class: "result-more",
            text: `+${hits.length - MAX_RESULTS} more matching rules`,
          }),
        );
      }
    }
    resultsEl.hidden = false;
  };

  searchInput.addEventListener("input", run);

  searchInput.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      searchInput.value = "";
      run();
      searchInput.blur();
    } else if (event.key === "Enter" && hits.length) {
      location.hash = `#${hits[0].id}`;
      hideResults();
    }
  });

  resultsEl.addEventListener("click", (event: Event) => {
    const target = (event.target as HTMLElement).closest(".result");
    if (target) hideResults();
  });

  document.addEventListener("click", (event: Event) => {
    const target = event.target as Node;
    if (!resultsEl.hidden && !resultsEl.contains(target) && target !== searchInput) {
      hideResults();
    }
  });
}
