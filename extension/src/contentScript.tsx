// import { StrictMode, useState } from "react";
import ReactDOM from "react-dom/client";
import PopupApp from "./chrome-extension/popup/PopupApp";

function injectReactApp() {
  // Creating a container element to render the shadowRoot inside
  const container = document.createElement("div");
  document.body.appendChild(container);
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

  // Injecting external styles (Tailwind CSS)
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = chrome.runtime.getURL("tailwind.css"); // Adjust path as needed
  shadowRoot.appendChild(styleLink);

  // Rendering the popup React app inside the Shadow Root
  const reactRoot = document.createElement("div");
  shadowRoot.appendChild(reactRoot);
  ReactDOM.createRoot(reactRoot).render(<PopupApp />);

  return { container, shadowRoot, reactRoot };
}

export const { container, reactRoot } = injectReactApp();

// document.addEventListener("mouseup", () => {
//   const selectedText = window.getSelection()?.toString().trim();
//   // console.log(window.innerHeight);
//   if (selectedText) {
//     // display and move the small iconDiv
//     const iconDiv =
//       document.getElementById("turjuman-translate-icon") ||
//       createTranslateIcon();
//     const { left, top, right } = window
//       .getSelection()
//       ?.getRangeAt(0)
//       .getBoundingClientRect() || { left: 0, top: 0, right: 50, bottom: 50 };

//     if (top + 60 >= window.innerHeight)
//       iconDiv.style.top = `${window.scrollY + top - 34}px`;
//     else iconDiv.style.top = `${window.scrollY + top + 24}px`;

//     if (right + 60 >= window.innerWidth)
//       iconDiv.style.left = `${window.innerWidth - 75}px`;
//     else iconDiv.style.left = `${window.scrollX + left + 10}px`;
//     iconDiv.style.display = "flex";

//     iconDiv.onclick = () => {
//       console.log("iconDiv clicked");
//       chrome.runtime.sendMessage({
//         type: "TURJUMAN_TRANSLATE_WORD",
//         word: selectedText,
//       });
//       iconDiv.style.display = "none";
//     };
//   } else {
//     const icon = document.getElementById("turjuman-translate-icon");
//     if (icon) icon.style.display = "none"; // Hide icon if no text is selected
//   }
// });

// function createTranslateIcon() {
//   const iconDiv = document.createElement("div");
//   iconDiv.innerHTML =
//     '<img class="TurjumanLogoImg" /> <img class="pointerImg" />';
//   const logoImg = iconDiv.getElementsByTagName("img")[0];
//   const dropdown = iconDiv.getElementsByTagName("img")[1];

//   logoImg.src = chrome.runtime.getURL("assets/logo.png");
//   dropdown.src = chrome.runtime.getURL("assets/dropdown.svg");

//   logoImg.style.height = dropdown.style.height = "20px";
//   logoImg.style.width = logoImg.style.width = "20px";

//   iconDiv.id = "turjuman-translate-icon";
//   iconDiv.style.display = "flex";
//   iconDiv.style.position = "absolute";
//   iconDiv.style.cursor = "pointer";
//   iconDiv.style.backgroundColor = "#343434";
//   iconDiv.style.borderRadius = "5px";
//   iconDiv.style.justifyContent = "center";
//   iconDiv.style.alignItems = "center";
//   iconDiv.style.gap = "5px";
//   iconDiv.style.padding = "5px";
//   iconDiv.style.zIndex = "100";

//   iconDiv.onclick = () => {
//     // iconDiv.style.display = "none";
//     // ReactDOM.createRoot(reactRoot).render(<PopupApp />);
//   };

//   document.body.appendChild(iconDiv);
//   return iconDiv;
// }
