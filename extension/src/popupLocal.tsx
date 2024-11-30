import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./chrome-extension/global.css";
import Popup from "./chrome-extension/popup/Popup";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-white w-full">
      <Popup onClose={() => {}} word="eat" />
    </div>
  </StrictMode>
);
