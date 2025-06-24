import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ExtensionApp from "./chrome-extension/extension/ExtensionApp";
import "./chrome-extension/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExtensionApp />
  </StrictMode>
);
