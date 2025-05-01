import { useNavigate } from "react-router";
import AppName from "../AppName";
// import Logo from "../Logo";
import AuthForm from "./AuthForm";
import AuthOptions from "./AuthOptions";
import LogoSvg from "../Nav/LogoSvg";

interface Props {
  isLogin: boolean;
}

function AuthView({ isLogin }: Props) {
  const navigate = useNavigate();
  return (
    <div className="w-full mx-8 md:max-w-[50%] lg:max-w-[33%] bg-[var(--background2)] py-12 flex flex-col justify-center items-center px-10 gap-3 rounded-[53px] lg:pt-6 lg:pb-6 md:mb-0 auth-view-shadow">
      <div className="mb-6 flex flex-col items-center gap-4 lg:mb-0">
        <LogoSvg
          key={"HomeLogoSVG2"}
          className={"w-[60px] md:w-24 lg:w-[60px]"}
        />
        <div className="md:hidden">
          <AppName key={2} cn="text-xl md: text-2xl text-[var(--foreground)]" />
        </div>
      </div>
      <div className="w-full text-[var(--foreground)]">
        <AuthForm isLogin={isLogin} />
      </div>
      <AuthOptions />
      {/* has account */}
      <div className="mt-2 text-[var(--foreground)]">
        {isLogin ? "dont't have an acount? " : "already have an acount? "}
        <a
          onClick={() => {
            if (isLogin) navigate("/signup");
            else navigate("/login");
          }}
          className="underline cursor-pointer"
        >
          {isLogin ? "signup" : "login"}
        </a>
      </div>
    </div>
  );
}

export default AuthView;
