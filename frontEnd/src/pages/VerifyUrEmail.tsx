import LogoSvg from "@/components/Nav/LogoSvg";
import { useTheme } from "@/contexts/ThemeProvider";

function VerifyUrEmail() {
  const { theme } = useTheme();
  return (
    <div className={`${theme} bg-[var(--background)] h-screen`}>
      <div
        className={`flex justify-center items-center text-2xl font-semibold h-[70vh]`}
      >
        <div className="flex flex-col justify-center items-center gap-10 rounded-xl bg-[var(--outer-boxes-bg)] w-fit p-12 md:p-16">
          <LogoSvg key={"homeLogoSVG"} className={"w-40 md:w-64 lg:w-80"} />
          <p className="text-center w-64 md:w-fit text-[var(--foreground)]">
            An email has been sent your mailbox <br />
            <br />
            Please verify Your Email <br />
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyUrEmail;
