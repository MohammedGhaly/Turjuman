/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import PopupTopBar, { TabS } from "./PopupTopBar";
import WordBar from "../extension/WordBar";
import TranslationTab from "../extension/TranslationTab";
import DefinitionTab from "../extension/DefinitionTab";
import ExamplesTab from "../extension/ExamplesTab";
// import Translation from "../types/Translation";
// import Language from "../types/Language";
// import getTranslation from "../services/getTranslation";

const themes = ["theme-dark", "theme-light", "theme-green"];

interface PopupProps {
  word: string;
  onClose: () => void;
}

function Popup({ word, onClose }: PopupProps) {
  const [activeTab, setActiveTab] = useState<TabS>("translate");
  const [theme, setTheme] = useState(themes[1]);
  // const [translation, setTranslation] = useState<Translation | null>(null);
  // const [srcLang] = useState<Language>("English");
  // const [targetLang] = useState<Language>("Arabic");

  // useEffect(
  //   function () {
  //     async function translationEffect() {
  //       const response = await getTranslation({
  //         word,
  //         srcLang,
  //         targetLang,
  //         paragraph: word,
  //       });

  //       console.log(response);
  //       setTranslation(response);
  //     }
  //     translationEffect();
  //   },
  //   [word, srcLang, targetLang]
  // );

  // if (translation === null) {
  // return null;
  // }

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
