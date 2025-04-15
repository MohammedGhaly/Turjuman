import { CirclePlus, Cog, User } from "lucide-react";
import { Switch } from "../components/Switch";
import { useTheme } from "../contexts/ThemeProvider";

function ProfilePage() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-col gap-4 items-center w-full px-3 overflow-y-auto border-t border-t-[var(--box-border)] pt-6">
      <div className="relative w-fit">
        <div className="p-6 w-fit flex rounded-full overflow-hidden bg-[var(--user-img-bg)] items-center justify-center">
          <User size={140} strokeWidth="0.5px" />
          {/* <img src="" alt="" /> */}
        </div>
        <div className="absolute bottom-0 z-[1] right-4">
          <CirclePlus size={36} strokeWidth="1.5px" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full mt-12 md:gap-6">
        {/* inputs */}
        <div className="w-full">
          <label
            htmlFor="username"
            className="font-semibold text-lg flex flex-col gap-2 mb-4"
          >
            Username
            <input
              type="text"
              name="username"
              className="border border-[var(--input-border)] bg-[var(--input-background)] block mb-2 p-2 rounded-md"
              placeholder="username"
              disabled
            />
          </label>
          <label
            htmlFor="email"
            className="font-semibold text-lg flex flex-col gap-2 mb-4"
          >
            Email
            <input
              disabled
              type="text"
              name="email"
              className="border border-[var(--input-border)] bg-[var(--input-background)] block mb-2 p-2 rounded-md"
              placeholder="email"
            />
          </label>
          <label
            htmlFor="password"
            className="font-semibold text-lg flex flex-col gap-2 mb-4"
          >
            <div className="flex justify-between">
              Password{" "}
              <a
                href=""
                className="underline text-[var(--forgot-pw)] font-normal"
              >
                change password
              </a>
            </div>
            <input
              disabled
              type="text"
              name="password"
              className="border border-[var(--input-border)] bg-[var(--input-background)] block mb-2 p-2 rounded-md"
              placeholder="password"
            />
          </label>
        </div>
        {/* settings */}
        <div className="w-full">
          <div className="flex gap-2">
            <Cog /> <span className="font-semibold text-lg">Settings</span>
          </div>
          <div className="mt-2 bg-[var(--input-background)] border border-[var(--box-border)] p-3 rounded-md">
            <div className="flex justify-between font-semibold text-xl my-2">
              Dark mode{" "}
              <Switch
                checked={theme === "dark"}
                onCheckedChange={() => {
                  if (theme === "dark") setTheme("light");
                  else setTheme("dark");
                }}
              />
            </div>
            <hr className="border-[var(--box-border)]" />
            <div className="flex justify-between font-semibold text-xl mb-1 mt-4">
              Auto save <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
