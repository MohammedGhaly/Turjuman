import { Toaster } from "@/components/ui/toaster";
import AuthView from "./AuthView";
import HomeLogo from "../../components/HomeLogo";
import { useTheme } from "@/contexts/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

function LoginPage() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/app");
    return <></>;
  }

  return (
    <>
      <div
        className={`p-4 lg:px-4 lg:py-4 hidden lg:inline-block md:absolute md:left-2 ${theme}`}
      >
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
