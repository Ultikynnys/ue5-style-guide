import type { AppRefs } from "./render";

function flash(target: HTMLElement): void {
  target.classList.remove("is-target");
  void target.offsetWidth; // restart the transition
  target.classList.add("is-target");
  window.setTimeout(() => target.classList.remove("is-target"), 1400);
}

/** Deep-link routing, active-section tracking and permalinks. */
export function initRouter(refs: AppRefs): void {
  const { guide, contentEl, tocEl, sidebar, toast } = refs;
  const toTop = document.getElementById("to-top");

  const resolve = (rawHash: string): { id: string; top: boolean } => {
    const hash = decodeURIComponent(rawHash.replace(/^#/, ""));
    if (!hash || hash === "table-of-contents" || hash === "top") {
      return { id: "", top: true };
    }
    const id = guide.aliases[hash] ?? (refs.byId.has(hash) ? hash : "");
    return { id, top: false };
  };

  const setActive = (id: string): void => {
    const previous = tocEl.querySelector(".toc-link.is-active");
    if (previous) previous.classList.remove("is-active");
    if (!id) return;

    const link = tocEl.querySelector<HTMLElement>(
      `.toc-link[data-id="${CSS.escape(id)}"]`,
    );
    if (!link) return;
    link.classList.add("is-active");

    let parentLi = link.closest("li.toc-item")?.parentElement?.closest("li.toc-item") ?? null;
    while (parentLi) {
      parentLi.classList.remove("is-collapsed");
      parentLi
        .querySelector(':scope > .toc-row > .toc-toggle')
        ?.setAttribute("aria-expanded", "true");
      parentLi = parentLi.parentElement?.closest("li.toc-item") ?? null;
    }
    sidebar.scrollTop = Math.max(
      0,
      link.offsetTop - sidebar.clientHeight / 2 + link.offsetHeight / 2,
    );
  };

  const go = (hash: string, smooth = true): void => {
    const { id, top } = resolve(hash);
    if (top) {
      window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
      setActive("");
      return;
    }
    if (!id) return;
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    flash(section);
    setActive(id);
  };

  // Jump straight to the deep link on load; animate only for in-page navigation.
  if (location.hash) window.setTimeout(() => go(location.hash, false), 0);
  window.addEventListener("hashchange", () => go(location.hash));

  const closeDrawer = (): void => {
    sidebar.classList.remove("sidebar--open");
    document.querySelector(".nav-toggle")?.setAttribute("aria-expanded", "false");
  };

  // In-app anchor clicks (README internal links, sidebar, search results).
  document.addEventListener("click", (event: Event) => {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute("href") ?? "";
    event.preventDefault();
    go(href);
    history.replaceState(null, "", href);
    if (window.matchMedia("(max-width: 900px)").matches) closeDrawer();
  });

  const showToast = (message: string): void => {
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(Number(toast.dataset.timer ?? "0"));
    const timer = window.setTimeout(() => {
      toast.hidden = true;
    }, 1800);
    toast.dataset.timer = String(timer);
  };

  contentEl.addEventListener("click", (event: Event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>(".permalink");
    if (!button) return;
    event.preventDefault();
    const id = button.dataset.target ?? "";
    const url = `${location.origin}${location.pathname}${location.search}#${id}`;
    history.replaceState(null, "", `#${id}`);
    void navigator.clipboard?.writeText(url).catch(() => undefined);
    showToast(`Copied link to #${id}`);
  });

  toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "auto" }));

  let ticking = false;
  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 500);

      const sections = contentEl.querySelectorAll<HTMLElement>(".rule");
      let active = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 120) active = section.id;
        else break;
      }
      setActive(active);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}
