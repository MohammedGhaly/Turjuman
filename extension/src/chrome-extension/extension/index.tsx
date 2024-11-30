import { useState } from "react";
import "../global.css";
import InputBar from "./InputBar";
import Tabs from "./Tabs";
import TopBar from "./TopBar";
import TranslationTab from "./TranslationTab";
import DefinitionTab from "./DefinitionTab";
import ExamplesTab from "./ExamplesTab";
import { Youtube } from "lucide-react";
import { Switch } from "./Switch";
import WordBar from "./WordBar";

const themes = ["theme-dark", "theme-light", "theme-green"];

export const Extension = () => {
  const [activeTab, setActiveTab] = useState<
    "translation" | "definition" | "examples"
  >("translation");
  const [theme, setTheme] = useState(themes[0]);
  return (
    <div
      className={`bg-[var(--primary)] h-[420px] w-[360px] text-[16px] flex flex-col ${theme}`}
    >
      <TopBar theme={theme} setTheme={setTheme} />

      <div className="flex-grow p-4">
        <div className="flex flex-col justify-between h-full gap-3">
          <div className="flex flex-col gap-3">
            <InputBar />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <WordBar word="Eat" aiTranslation="يأكل" />
          </div>
          <div className=" flex-grow text-[var(--foreground)] mt-1">
            {activeTab === "translation" && <TranslationTab />}
            {activeTab === "definition" && <DefinitionTab />}
            {activeTab === "examples" && <ExamplesTab />}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-white bg-[var(--secondary)] h-6 w-10 rounded-full border border-[var(--border)]">
              <Youtube
                className="mx-auto"
                color="var(--foreground)"
                size={22}
              />
            </div>
            <span className="text-white">
              <Switch />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
