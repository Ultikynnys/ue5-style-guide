import "./styles/main.css";
import "./styles/print.css";
import readmeRaw from "../../README.md?raw";
import { parseStyleGuide } from "./styleguide/parse";
import { byId } from "./ui/dom";
import { renderApp } from "./ui/render";
import { initRouter } from "./ui/router";
import { initSearch } from "./ui/search";
import { initTheme } from "./ui/theme";
import { SITE_TITLE } from "./config";

const root = byId("app");

if (root) {
  try {
    // The rules are parsed from the raw README text at runtime, so the site
    // always reflects whatever markdown ships with the repo.
    const guide = parseStyleGuide(readmeRaw);
    guide.title = SITE_TITLE;
    document.title = `${SITE_TITLE} - Rules`;
    const refs = renderApp(root, guide);
    initTheme(byId("theme-toggle"));
    initSearch(refs);
    initRouter(refs);
  } catch (error) {
    root.textContent = `Could not parse the style guide README: ${(error as Error).message}`;
    console.error(error);
  }
}
