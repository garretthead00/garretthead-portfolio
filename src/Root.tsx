import { StrictMode } from "react";
import App from "./App";
import { MotionProvider } from "./components/motion";

/** The full tree, shared by the browser entry and the build-time prerender. */
export const Root = () => (
  <StrictMode>
    <MotionProvider>
      <App />
    </MotionProvider>
  </StrictMode>
);
