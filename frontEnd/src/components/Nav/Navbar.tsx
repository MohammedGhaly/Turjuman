// import { ArrowRightLeft, Bookmark, Gamepad2, Home, User } from "lucide-react";
import AppName from "../AppName";
import React from "react";
import LogoSvg from "./LogoSvg";
// import translationIcon from "../assets/TranslationIcon.svg";

interface Props {
  title: string;
  children: React.ReactNode;
}
function Navbar({ children }: Props) {
  // const { theme } = useTheme();
  return (
    <nav className="border border-[var(--box-border)] navbar bg-[var(--nav-bg)] lg:w-1/4">
      <div className="px-12 py-[0.3rem] lg:flex gap-2 items-center hidden border-b border-[var(--box-border)]">
        {/* <img
          className="w-[60px] md:w-24 lg:w-[40px]"
          src={theme === "light" ? logo : logoWhite}
          alt="turjuman logo"
        /> */}
        <LogoSvg />
        <AppName fontSize="sm" />
      </div>
      {/* nav items div*/}
      <div className=" flex justify-around py-5 rounded-t-3xl lg:flex-col lg:justify-start lg:items-start lg:px-8 lg:gap-8">
        {/* <img className="h-7 w-7" src={translationIcon} alt="translation" /> */}
        {children}
      </div>
    </nav>
  );
}

export default Navbar;
