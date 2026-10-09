// The logo art is white-on-transparent, so on a light surface it disappears.
// Rather than bake a copy per theme, build one SVG filter at runtime (dilate the
// alpha for a black outline, then a soft offset shadow) and reference it from CSS.

const FILTER_ID = "logo-outline-shadow";
const NS = "http://www.w3.org/2000/svg";
let themeObserver: MutationObserver | undefined;

function syncLogoGlow(): void {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  const shadow = document.querySelector(`#${FILTER_ID} feDropShadow`);
  shadow?.setAttribute("flood-color", dark ? "#ffffff" : "#000000");
}

function ensureFilter(): string {
  let filter = document.getElementById(FILTER_ID) as SVGFilterElement | null;
  if (!filter) {
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.setAttribute("aria-hidden", "true");
    svg.style.position = "absolute";

    const filter = document.createElementNS(NS, "filter");
    filter.setAttribute("id", FILTER_ID);
    // Leave generous room around the artwork for the wider soft shadow.
    filter.setAttribute("x", "-40%");
    filter.setAttribute("y", "-40%");
    filter.setAttribute("width", "180%");
    filter.setAttribute("height", "180%");
    filter.setAttribute("color-interpolation-filters", "sRGB");

    const morph = document.createElementNS(NS, "feMorphology");
    morph.setAttribute("in", "SourceAlpha");
    morph.setAttribute("operator", "dilate");
    morph.setAttribute("radius", "1.1");
    morph.setAttribute("result", "dilated");

    const flood = document.createElementNS(NS, "feFlood");
    flood.setAttribute("flood-color", "#000000");
    flood.setAttribute("result", "black");

    const outline = document.createElementNS(NS, "feComposite");
    outline.setAttribute("in", "black");
    outline.setAttribute("in2", "dilated");
    outline.setAttribute("operator", "in");
    outline.setAttribute("result", "outline");

    const shadow = document.createElementNS(NS, "feDropShadow");
    shadow.setAttribute("in", "SourceGraphic");
    shadow.setAttribute("dx", "0");
    shadow.setAttribute("dy", "5");
    shadow.setAttribute("stdDeviation", "4");
    shadow.setAttribute("flood-color", "#000000");
    shadow.setAttribute("flood-opacity", "0.7");
    shadow.setAttribute("result", "shadow");

    const merge = document.createElementNS(NS, "feMerge");
    for (const source of ["shadow", "outline", "SourceGraphic"]) {
      const node = document.createElementNS(NS, "feMergeNode");
      node.setAttribute("in", source);
      merge.append(node);
    }

    filter.append(shadow, morph, flood, outline, merge);
    svg.append(filter);
    document.body.append(svg);
  }
  return `url(#${FILTER_ID})`;
}

/** Give a white logo mark a crisp black outline and a soft drop shadow. */
export function applyLogoEffect(img: HTMLElement): void {
  img.style.filter = ensureFilter();
  syncLogoGlow();
  if (!themeObserver) {
    themeObserver = new MutationObserver(syncLogoGlow);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }
}

/**
 * Trim the transparent margin off a logo so the mark fills its box. The source
 * art carries dead space around the glyph, which otherwise shows up as phantom
 * padding and makes the mark look small. Runs once at runtime; it crops, so the
 * aspect ratio of the artwork itself is preserved.
 */
export function trimLogo(img: HTMLImageElement): void {
  const run = () => {
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (!w || !h) return;

    const full = document.createElement("canvas");
    full.width = w;
    full.height = h;
    const fctx = full.getContext("2d");
    if (!fctx) return;
    fctx.drawImage(img, 0, 0);

    let pixels: Uint8ClampedArray;
    try {
      pixels = fctx.getImageData(0, 0, w, h).data;
    } catch {
      return;
    }

    let minX = w;
    let minY = h;
    let maxX = -1;
    let maxY = -1;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (pixels[(y * w + x) * 4 + 3] > 8) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < 0) return;

    const cw = maxX - minX + 1;
    const ch = maxY - minY + 1;
    const cropped = document.createElement("canvas");
    cropped.width = cw;
    cropped.height = ch;
    const cctx = cropped.getContext("2d");
    if (!cctx) return;
    cctx.drawImage(full, minX, minY, cw, ch, 0, 0, cw, ch);
    img.src = cropped.toDataURL("image/png");
  };

  if (img.complete && img.naturalWidth > 0) run();
  else img.addEventListener("load", run, { once: true });
}
