// import { StrictMode, useState } from "react";
import ReactDOM from "react-dom/client";
import PopupApp from "./chrome-extension/popup/PopupApp";

function injectReactApp() {
  // Creating a container element to render the shadowRoot inside
  const container = document.createElement("div");
  document.body.appendChild(container);
  container.id = "Turjuman-Popup-container";
  container.style.zIndex = "100";
  container.style.position = "absolute";
  container.style.top = "0px";
  container.style.left = "0px";
  container.style.display = "none";
  // container.style.bottom = "0px";
  // container.style.right = "0px";

  // Attaching a Shadow Root to the container
  const shadowRoot = container.attachShadow({ mode: "open" });
  const styles = `
    :host {
      all: initial; /* Reset all styles */
    }
  `;
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  shadowRoot.appendChild(styleElement);

  // Injecting external styles (global.CSS)
  const globalStyleLink = document.createElement("link");
  globalStyleLink.rel = "stylesheet";
  const globalStyleLinkHref = chrome.runtime.getURL("global.css");
  globalStyleLink.href = globalStyleLinkHref; // Adjust path as needed
  shadowRoot.appendChild(globalStyleLink);

  // Injecting external styles (Tailwind CSS)
  const twStyleLink = document.createElement("link");
  twStyleLink.rel = "stylesheet";
  twStyleLink.href = chrome.runtime.getURL("tailwind.css"); // Adjust path as needed
  shadowRoot.appendChild(twStyleLink);

  // Rendering the popup React app inside the Shadow Root
  const reactRoot = document.createElement("div");
  shadowRoot.appendChild(reactRoot);
  ReactDOM.createRoot(reactRoot).render(<PopupApp />);

  return { container, shadowRoot, reactRoot };
}

export const { container, reactRoot } = injectReactApp();
