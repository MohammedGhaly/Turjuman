import AppName from "./AppName";
// import logo from "../assets/logo.svg";
import LogoSvg from "./Nav/LogoSvg";

function HomeLogo() {
  return (
    <div className="flex gap-2 items-center cursor-pointer">
      <LogoSvg key={"homeLogoSVG"} className={"w-[60px] md:w-24 lg:w-[40px]"} />
      <AppName fontSize={"text-xl text-[var(--foreground)]"} key={1} />
    </div>
  );
}

export default HomeLogo;
