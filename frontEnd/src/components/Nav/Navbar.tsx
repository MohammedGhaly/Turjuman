import React from "react";
import HomeLogo from "../HomeLogo";

interface Props {
  title: string;
  children: React.ReactNode;
}
function Navbar({ children }: Props) {
  return (
    <nav className="border md:border-0 md:border-r  border-[var(--box-border)] navbar bg-[var(--nav-bg)] lg:w-1/4">
      <div className="px-12 py-[0.3rem] lg:flex gap-2 items-center hidden border-b border-[var(--box-border)]">
        <HomeLogo />
      </div>
      {/* nav items div*/}
      <div className=" flex justify-around py-5 rounded-t-3xl lg:flex-col lg:justify-start lg:items-start lg:px-8 lg:gap-8">
        {children}
      </div>
    </nav>
  );
}

export default Navbar;
