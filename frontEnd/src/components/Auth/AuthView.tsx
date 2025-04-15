import AppName from "../AppName";
import Logo from "../Logo";
import AuthForm from "./AuthForm";
import AuthOptions from "./AuthOptions";

interface Props {
  isLogin: boolean;
}

function AuthView({ isLogin }: Props) {
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
        dont't have an acount?{" "}
        <a className="underline" href={isLogin ? "/signup" : "/login"}>
          {isLogin ? "signup" : "login"}
        </a>
      </div>
    </div>
  );
}

export default AuthView;
