import { useTheme } from "@/contexts/ThemeProvider";
import { Switch } from "../../components/Switch";
import { Cog } from "lucide-react";
import { useState } from "react";

function SettingsOptions() {
  const { theme, setTheme } = useTheme();
  const [autoSave, setAutoSave] = useState(
    localStorage.getItem("turjuman-auto-save")
  );
  return (
    <>
      <div className="flex gap-2">
        <Cog /> <span className="font-semibold text-lg">Settings</span>
      </div>
      <div className="mt-2 bg-[var(--input-background)] border border-[var(--box-border)] p-3 rounded-md">
        <div className="flex justify-between font-semibold text-xl my-2">
          Dark mode{" "}
          <Switch
            checked={theme === "dark"}
            onCheckedChange={() => {
              if (theme === "dark") {
                localStorage.setItem("turjuman-theme", "light");
                setTheme("light");
              } else {
                localStorage.setItem("turjuman-theme", "dark");
                setTheme("dark");
              }
            }}
          />
        </div>
        <hr className="border-[var(--box-border)]" />
        <div className="flex justify-between font-semibold text-xl mb-1 mt-4">
          Auto save{" "}
          <Switch
            checked={autoSave === "true"}
            onCheckedChange={() => {
              if (autoSave === "true") {
                localStorage.setItem("turjuman-auto-save", "false");
                setAutoSave("false");
              } else {
                localStorage.setItem("turjuman-auto-save", "true");
                setAutoSave("true");
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

export default SettingsOptions;
