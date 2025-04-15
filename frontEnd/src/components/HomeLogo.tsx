import AppName from "./AppName";
import logo from "../assets/logo.svg";

function HomeLogo() {
  return (
    <div className="flex gap-2 items-center cursor-pointer">
      <img
        className="w-[60px] md:w-[40px] lg:w-[40px]"
        src={logo}
        alt="turjuman logo"
      />
      <AppName fontSize={"text-xl"} />
    </div>
  );
}

export default HomeLogo;
