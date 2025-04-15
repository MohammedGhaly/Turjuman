import AuthView from "../components/Auth/AuthView";
import HomeLogo from "../components/HomeLogo";

function SignupPage() {
  return (
    <div className="flex flex-col gap-2 h-screen">
      <div className="p-4 hidden md:block">
        <HomeLogo />
      </div>
      <div className="flex items-center justify-center flex-1">
        <AuthView isLogin={false} />
      </div>
    </div>
  );
}

export default SignupPage;
