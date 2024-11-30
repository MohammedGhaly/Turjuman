import { Cog, XIcon } from "lucide-react";
import "../global.css";
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
}

function PopupTopBar({ activeTab, setActiveTab }: PopupTopBarProps) {
  return (
    <div className="p-[6px] flex justify-between bg-[var(--primary)]">
      <div className="flex items-center gap-3 ml-1">
        <Logo />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Controls />
    </div>
  );
}

function Controls() {
  return (
    <div className="flex gap-2 justify-center items-center">
      <div className="settings">
        <Cog />
      </div>
      <div className="close">
        <XIcon />
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
    <div className="flex bg-[var(--secondary)] rounded-md p-1">
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
      className={`px-2 py-1 flex justify-center gap-1 rounded-md transition-colors duration-200 ${
        isActive ? "bg-[var(--primary)]" : ""
      } `}
      onClick={() => setActiveTab(title)}
    >
      <span className="font-semibold">{title}</span>
    </div>
  );
}

export default PopupTopBar;
