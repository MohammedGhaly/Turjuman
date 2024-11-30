import { FC, useState } from "react";
import "./popup.css";
import PopupTopBar, { TabS } from "./PopupTopBar";
import WordBar from "../extension/WordBar";
import TranslationTab from "../extension/TranslationTab";
import DefinitionTab from "../extension/DefinitionTab";
import ExamplesTab from "../extension/ExamplesTab";

interface PopupProps {
  word: string;
  onClose: () => void;
}

const Popup: FC<PopupProps> = ({ word }) => {
  const [activeTab, setActiveTab] = useState<TabS>("translate");

  return (
    <div
      className="bg-[var(--primary)] turjuman-popup-div w-[400px] text-[var(--foreground)] rounded-lg overflow-hidden"
      id="turjuman-popup-div"
      onClick={(e) => e.stopPropagation()}
    >
      <PopupTopBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="px-3 pt-1 pb-3 flex flex-col gap-2">
        <WordBar word={word} aiTranslation="يأكل" />
        {activeTab === "translate" && <TranslationTab />}
        {activeTab === "definition" && <DefinitionTab />}
        {activeTab === "examples" && <ExamplesTab />}
      </div>
    </div>
  );
};

export default Popup;
