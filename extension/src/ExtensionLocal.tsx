import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./chrome-extension/global.css";
import ExtensionView from "./chrome-extension/extension/ExtensionView";
// import LoginView from "./chrome-extension/extension/Auth/LoginView";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <LoginView /> */}
    <ExtensionView />
  </StrictMode>
);
