import Pages from "@/chrome-extension/types/Pages";
import { Cog, Gamepad2, MoonIcon, SunIcon } from "lucide-react";
import { Themes } from "../ExtensionView";

interface Props {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<Themes>>;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
  children: React.ReactNode;
}

function TopBar({ setTheme, theme, setPage, children }: Props) {
  return (
    <div className="flex justify-between h-[57px] border-b-[1px] border-[var(--foreground)] px-4">
      <div className="logo text-white flex items-center gap-3 cursor-pointer">
        {children}
        <span className="text-[var(--foreground)] font-semibold font-aboreto">
          Turjuman
        </span>
      </div>
      <div className="flex w-auto gap-0 items-center">
        <button
          onClick={() => {
            window.open(`https://www.turjuman.online/app/gamesArea`);
          }}
          className="bg-[var(--background)] p-2 border-none hover:bg-[var(--icon-hover)] rounded-full h-12 w-12 flex justify-center items-center transition-colors duration-300"
        >
          <Gamepad2 color="var(--foreground)" />
        </button>
        <button
          onClick={() => setPage("settingsPage")}
          className="bg-[var(--background)] p-2 border-none hover:bg-[var(--icon-hover)] rounded-full h-12 w-12 flex justify-center items-center transition-colors duration-300"
        >
          <Cog color="var(--foreground)" />
        </button>
        <button
          onClick={() => {
            if (theme === "theme-dark") {
              setTheme("theme-light");
              chrome.storage.sync.set({ theme: "theme-light" });
            } else {
              setTheme("theme-dark");
              chrome.storage.sync.set({ theme: "theme-dark" });
            }
          }}
          className="bg-[var(--background)] p-2 border-none hover:bg-[var(--icon-hover)] rounded-full h-12 w-12 flex justify-center items-center transition-colors duration-300"
        >
          {theme === "theme-light" ? (
            <MoonIcon color="var(--foreground)" />
          ) : (
            <SunIcon color="var(--foreground)" />
          )}
        </button>
      </div>
    </div>
  );
}

export default TopBar;
