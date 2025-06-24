import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Moon, Sun, XIcon } from "lucide-react";
import { ReactNode } from "react";
import { Themes } from "./Popup";

const tabs = {
  translate: "translate" as TabS,
  definition: "definition" as TabS,
  synonyms: "examples" as TabS,
};
export type TabS = "translate" | "definition" | "examples";

interface PopupTopBarProps {
  children: ReactNode;
}

function PopupTopBar({ children }: PopupTopBarProps) {
  return (
    <div className="p-[6px] gap-2 flex justify-between bg-[var(--primary)]">
      {children}
    </div>
  );
}

interface ControlsProps {
  theme: Themes;
  setTheme: React.Dispatch<React.SetStateAction<Themes>>;
  closePopup: () => void;
}

export function Controls({ closePopup, theme, setTheme }: ControlsProps) {
  return (
    <div className="flex gap-[2px] justify-center items-center">
      <button
        className="theme-selector hover:bg-[var(--icon-hover)] bg-[var(--background)] border-none rounded-full p-[5px] transition-all duration-200"
        onClick={() => {
          if (theme === "theme-dark") {
            setTheme("theme-light");
            chrome.storage.sync.set({ theme: "theme-light" });
          } else {
            setTheme("theme-dark");
            chrome.storage.sync.set({ theme: "theme-dark" });
          }
        }}
      >
        {theme === "theme-light" ? (
          <Moon className="cursor-pointer" color="var(--foreground)" />
        ) : (
          <Sun className="cursor-pointer" color="var(--foreground)" />
        )}
      </button>
      <button className="close bg-[var(--background)] border-none hover:bg-[var(--icon-hover)] rounded-full p-[4px] transition-all duration-200">
        <XIcon
          onClick={closePopup}
          className="cursor-pointer"
          color="var(--foreground)"
        />
      </button>
    </div>
  );
}

interface TabsProps {
  activeTab: TabS;
  setActiveTab: React.Dispatch<React.SetStateAction<TabS>>;
  children: ReactNode;
}

export function Tabs({ setActiveTab, activeTab, children }: TabsProps) {
  return (
    <div className="flex gap-2 bg-[var(--secondary)] text-[var(--foreground)] border-[var(--border)] border rounded-md p-1">
      {Object.values(tabs).map((t) =>
        t === "translate" ? (
          <HoverCard>
            <HoverCardTrigger>
              <Tab
                title={t}
                isActive={activeTab === t}
                setActiveTab={setActiveTab}
                key={t}
              />
            </HoverCardTrigger>
            <HoverCardContent className="w-52 p-1 bg-[var(--primary)]">
              <div className="">{children}</div>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <Tab
            title={t}
            isActive={activeTab === t}
            setActiveTab={setActiveTab}
            key={t}
          />
        )
      )}
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
