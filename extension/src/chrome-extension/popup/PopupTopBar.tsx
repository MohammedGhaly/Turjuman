import { Cog, XIcon } from "lucide-react";
import logo from "../public/logo.png";

let logosrc = logo;
if (import.meta.env.MODE === "production") {
  logosrc = chrome.runtime.getURL("assets/logo.png");
}

const tabs = {
  translate: "translate" as TabS,
  definition: "definition" as TabS,
  synonyms: "examples" as TabS,
};
export type TabS = "translate" | "definition" | "examples";

interface PopupTopBarProps {
  activeTab: TabS;
  setActiveTab: React.Dispatch<React.SetStateAction<TabS>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  closePopup: () => void;
}

function PopupTopBar({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  closePopup,
}: PopupTopBarProps) {
  return (
    <div
      className="p-[6px] flex justify-between bg-[var(--primary)]"
      onClick={() => {
        if (theme === "theme-dark") {
          setTheme("theme-light");
        } else {
          setTheme("theme-dark");
        }
      }}
    >
      <div
        className="flex items-center gap-3 ml-1"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Logo />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Controls closePopup={closePopup} />
    </div>
  );
}

interface ControlsProps {
  closePopup: () => void;
}

function Controls({ closePopup }: ControlsProps) {
  return (
    <div className="flex gap-2 justify-center items-center">
      <div className="settings">
        <Cog className="cursor-pointer" />
      </div>
      <div className="close">
        <XIcon onClick={closePopup} className="cursor-pointer" />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="p-">
      <img src={logosrc} className="w-6 h-6" />
    </div>
  );
}

interface TabsProps {
  activeTab: TabS;
  setActiveTab: React.Dispatch<React.SetStateAction<TabS>>;
}

function Tabs({ setActiveTab, activeTab }: TabsProps) {
  return (
    <div className="flex gap-2 bg-[var(--secondary)] text-[var(--foreground)] border-[var(--border)] border rounded-md p-1">
      {Object.values(tabs).map((t) => (
        <Tab
          title={t}
          isActive={activeTab === t}
          setActiveTab={setActiveTab}
          key={t}
        />
      ))}
    </div>
  );
}

interface TabProps {
  title: TabS;
  isActive: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<TabS>>;
}

function Tab({ title, isActive, setActiveTab }: TabProps) {
  return (
    <div
      className={`px-2 py-1 flex justify-center font-semibold rounded-md cursor-pointer transition-colors duration-200 ${
        isActive
          ? "bg-[var(--tab-fill)] text-[var(--active-tab-title)]"
          : "text-[var(--foreground)]"
      } ${!isActive ? "hover:bg-[var(--tab-hover)] " : ""}`}
      onClick={() => setActiveTab(title)}
    >
      <span className="font-semibold">{title}</span>
    </div>
  );
}

export default PopupTopBar;
