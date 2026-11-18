import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { Root } from "./Root";

const container = document.getElementById("root");
if (!container) throw new Error("Root element #root not found");

// The production build prerenders the page (see scripts/prerender.ts); the
// dev server serves an empty root.
if (container.hasChildNodes()) {
  hydrateRoot(container, <Root />);
} else {
  createRoot(container).render(<Root />);
}
