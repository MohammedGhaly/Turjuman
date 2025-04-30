import { useTheme } from "@/contexts/ThemeProvider";
import AuthView from "../components/Auth/AuthView";
import HomeLogo from "../components/HomeLogo";

function SignupPage() {
  const { theme } = useTheme();
  return (
    <div
      className={`flex flex-col gap-2 h-screen overflow-hidden bg-[var(--background)]  ${theme}`}
    >
      <div className="px-4 py-0 lg:pb-0 hidden lg:inline-block lg:absolute lg:left-2">
        <HomeLogo />
      </div>
      <div className="flex items-center justify-center flex-1">
        <AuthView isLogin={false} />
      </div>
    </div>
  );
}

export default SignupPage;
