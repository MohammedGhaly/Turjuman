import { Camera, Cog, Gamepad2, Languages, Scan } from "lucide-react";

interface Props {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

function TopBar({ setTheme, theme }: Props) {
  return (
    <div
      className="flex justify-between h-[57px] border-b-[1px] border-[var(--foreground)] px-[22px]"
      onClick={() => {
        if (theme === "theme-dark") {
          setTheme("theme-light");
        } else {
          setTheme("theme-dark");
        }
      }}
    >
      <div className="logo text-white flex items-center gap-3 cursor-pointer">
        <Languages color="var(--foreground)" />
        <span className="text-[var(--foreground)]">Turjuman</span>
      </div>
      <div className="flex w-auto gap-4 items-center">
        <div className=" cursor-pointer hover:bg-[var(--icon-hover)] rounded-full h-10 w-10 flex justify-center items-center transition-colors duration-300">
          <Gamepad2 color="var(--foreground)" />
        </div>
        <div className="cursor-pointer hover:bg-[var(--icon-hover)] rounded-full h-10 w-10 flex justify-center items-center transition-colors duration-300">
          <div className="reltive">
            <Scan color="var(--foreground)" />
            <Camera
              className="absolute translate-y-[-20px] translate-x-[5px]"
              color="var(--foreground)"
              size={14}
            />
          </div>
        </div>
        <div className="cursor-pointer hover:bg-[var(--icon-hover)] rounded-full h-10 w-10 flex justify-center items-center transition-colors duration-300">
          <Cog color="var(--foreground)" />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
