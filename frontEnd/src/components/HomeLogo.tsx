import AppName from "./AppName";
// import logo from "../assets/logo.svg";
import LogoSvg from "./Nav/LogoSvg";

function HomeLogo() {
  return (
    <div className="flex gap-2 items-center cursor-pointer">
      <LogoSvg key={"homeLogoSVG"} />
      <AppName cn={"text-xl text-[var(--foreground)]"} key={1} />
    </div>
  );
}

export default HomeLogo;
