import { useNavigate } from "react-router";
import AppName from "../AppName";
import Logo from "../Logo";
import AuthForm from "./AuthForm";
import AuthOptions from "./AuthOptions";

interface Props {
  isLogin: boolean;
}

function AuthView({ isLogin }: Props) {
  const navigate = useNavigate();
  return (
    <div className="w-full mx-8 md:max-w-[50%] lg:max-w-[33%] bg-white py-12 flex flex-col justify-center items-center px-10 gap-3 rounded-[53px] lg:pt-10 lg:pb-6 lg:mb-6 auth-view-shadow">
      <div className="mb-6 flex flex-col items-center gap-4 lg:mb-3">
        <Logo />
        <div className="md:hidden">
          <AppName fontSize="text-xl md: text-2xl" />
        </div>
      </div>
      <div className="w-full ">
        <AuthForm isLogin={isLogin} />
      </div>
      <AuthOptions />
      {/* has account */}
      <div className="mt-2">
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
