import { Toaster } from "@/components/ui/toaster";
import AuthView from "../components/Auth/AuthView";
import HomeLogo from "../components/HomeLogo";
import { useTheme } from "@/contexts/ThemeProvider";

function LoginPage() {
  const { theme } = useTheme();
  return (
    <>
      <div className="p-4 lg:px-4 lg:py-0 hidden lg:inline-block md:absolute md:left-2">
        <HomeLogo />
      </div>
      <div
        className={`flex flex-col gap-2 h-screen bg-[var(--background)] ${theme}`}
      >
        <div className="flex items-center justify-center flex-1 pt-14">
          <AuthView isLogin={true} />
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default LoginPage;
