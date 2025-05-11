import LogoSvg from "@/components/Nav/LogoSvg";
import { useTheme } from "@/contexts/ThemeProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function EmailVerified() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(
    function () {
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    },
    [navigate]
  );

  return (
    <div className={`${theme} bg-[var(--background)] h-[100dvh]`}>
      <div
        className={`flex justify-center items-center text-2xl font-semibold h-[70vh]`}
      >
        <div className="flex flex-col justify-center items-center gap-10 rounded-xl bg-[var(--outer-boxes-bg)] w-fit p-12 md:p-16">
          <LogoSvg key={"homeLogoSVG"} />
          <p className="text-center w-64 md:w-fit text-[var(--foreground)]">
            your email has been verified <br />
            <br />
            You'll be redirected shortly to the login page <br />
          </p>
          <span className="text-5xl">✅</span>
        </div>
      </div>
    </div>
  );
}

export default EmailVerified;
