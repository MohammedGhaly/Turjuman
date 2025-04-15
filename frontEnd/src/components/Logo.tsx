import logo from "../assets/logo.svg";

function Logo() {
  return (
    <img
      className="w-[60px] md:w-24 lg:w-[70px]"
      src={logo}
      alt="turjuman logo"
    />
  );
}

export default Logo;
