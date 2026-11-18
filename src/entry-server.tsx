import { renderToString } from "react-dom/server";
import { Root } from "./Root";

/** Renders the page to HTML at build time. */
export const render = (): string => renderToString(<Root />);
