const THEME_KEY = "sg-theme";

function currentTheme(): "dark" | "light" {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

/** Wire the dark/light toggle button and keep it in sync with the applied theme. */
export function initTheme(button: HTMLElement | null): void {
  if (!button) return;

  const sync = (): void => {
    const theme = currentTheme();
    button.textContent = theme === "dark" ? "Light" : "Dark";
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.setAttribute(
      "title",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );
  };

  button.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage may be unavailable; the toggle still works for this session */
    }
    sync();
  });

  sync();
}
