import { useState } from "react";
import PopupTopBar, { TabS } from "./PopupTopBar";
import WordBar from "../extension/WordBar";
import TranslationTab from "../extension/TranslationTab";
import DefinitionTab from "../extension/DefinitionTab";
import ExamplesTab from "../extension/ExamplesTab";

const themes = ["theme-dark", "theme-light", "theme-green"];

interface PopupProps {
  word: string;
  onClose: () => void;
}

function Popup({ word, onClose }: PopupProps) {
  const [activeTab, setActiveTab] = useState<TabS>("translate");
  const [theme, setTheme] = useState(themes[1]);
  return (
    <div
      className={`bg-[var(--primary)] turjuman-popup-div w-[400px] text-[var(--foreground)] rounded-lg overflow-hidden ${theme}`}
      id="turjuman-popup-div"
      onClick={(e) => e.stopPropagation()}
    >
      <PopupTopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        closePopup={onClose}
      />
      <div className="px-3 pt-1 pb-3 flex flex-col gap-2">
        <WordBar word={word} aiTranslation="يأكل" />
        {activeTab === "translate" && <TranslationTab />}
        {activeTab === "definition" && <DefinitionTab />}
        {activeTab === "examples" && <ExamplesTab />}
      </div>
    </div>
  );
}

export default Popup;
