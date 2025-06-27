import LogoSvg from "@/components/Nav/LogoSvg";
import { useTheme } from "@/contexts/ThemeProvider";
import ResetPasswordForm from "./ResetPasswordForm";
import AppName from "@/components/AppName";
import { Toaster } from "@/components/ui/toaster";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { resetPassword } from "@/services/authClient";

function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  const { theme } = useTheme();
  const { token } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    password: string,
    passwordConfirm: string
  ) {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (token === undefined) {
        toast({
          title: "invalid token",
          variant: "destructive",
        });
        return;
      }
      if (!password || !passwordConfirm) {
        toast({
          title: "please fill all fields in",
          variant: "destructive",
        });
        return;
      }
      if (password !== passwordConfirm) {
        toast({
          title: "passwords do not match",
          variant: "destructive",
        });
        return;
      }
      await resetPassword({ password, passwordConfirm, token });
      toast({
        title: "password reset successfully",
        variant: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "an error occurred while resetting your password",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div
      className={`${theme} bg-[var(--background)] h-[100dvh] flex justify-center items-center`}
    >
      <Toaster />
      <div className="w-full h-fit md:min-h-[30rem] mx-8 md:max-w-[50%] lg:max-w-[33%] bg-[var(--background2)] py-12 flex flex-col justify-center items-center px-10 gap-3 rounded-[53px] lg:pt-6 lg:pb-6 md:mb-0 auth-view-shadow">
        <div className="mb-6 flex flex-col items-center gap-4 lg:mb-0">
          <LogoSvg key={"HomeLogoSVG2"} />
          <div className="md:hidden">
            <AppName
              key={2}
              cn="text-xl md: text-2xl text-[var(--foreground)]"
            />
          </div>
        </div>
        <div className="w-full text-[var(--foreground)]">
          <ResetPasswordForm
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
