import { Dispatch, SetStateAction, useState } from "react";
import LogoSvg from "../../popup/LogoSvg";
import Spinner from "../Auth/Spinner";
import AppName from "../Components/AppName";
import { AxiosError } from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/chrome-extension/types/User";
import { authLogin } from "@/services/authClient";

interface Props {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const theme = "theme-light";
const inputClassname =
  "font-inter bg-[var(--input-background)] text-[var(--foreground)] rounded-md text-base w-full p-[6px] px-3 border border-[var(--input-border)] border-solid";
const labelClassname =
  "font-inter font-semibold text-sm flex flex-col gap-1 w-full";

function LoginView({ setIsLoggedIn }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLoggedUser] = useState<User | null>(null);

  const { toast } = useToast();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login();
  }

  async function login() {
    setIsLoading(true);
    try {
      if (!email || !password) {
        toast({
          title: "please fill all fields in",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      const fetchedUser = await authLogin(email, password);
      setIsLoading(false);
      setLoggedUser(fetchedUser);
      setIsLoggedIn(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        setIsLoading(false);
        if (err.response?.data.message === "Invalid email or password") {
          toast({
            title: "Invalid email or password",
            variant: "destructive",
          });
        } else {
          toast({
            title:
              "An error has occurred while logging in, check your network connection",
            variant: "destructive",
          });
        }
        return;
      } else if (err instanceof Error) {
        console.log("err.message=>  ", err.message);
        setIsLoading(false);
        if (err.message === "Network Error") {
          toast({
            title:
              "An error has occurred while logging in, check your network connection",
            variant: "destructive",
          });
        } else if (err.message === "Request failed with status code 401") {
          toast({
            title: "Invalid email or password",
            variant: "destructive",
          });
        } else {
          toast({
            title: "An unexpected error has occurred",
            variant: "destructive",
          });
        }
      }
    }
  }

  return (
    <div
      className={`bg-[var(--primary)] h-[420px] w-[360px] text-[16px] flex justify-center items-center py-10 bg-white ${theme}`}
    >
      <Toaster />
      <div className="w-full h-full flex flex-col items-center gap justify-between bg-[var(--login-box-bg)]">
        <div className="flex flex-col items-center justify-center gap-3">
          <LogoSvg size="90" theme={theme} />
          <AppName cn="text-xl" />
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-3 px-16 items-center w-full"
        >
          <label className={labelClassname}>
            Email
            <input
              type="email"
              name="email"
              className={inputClassname}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={labelClassname}>
            Password
            <input
              type="password"
              name="password"
              className={`${inputClassname}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="bg-[var(--login-button-background)] rounded-xl text-[var(--primary)] min-w-24 py-2 flex justify-center text-base mt-2 mb-2 hover:opacity-90 duration-200 transition-all shadow-md font-semibold">
            {isLoading ? (
              <Spinner
                cn="w-5 h-5 border-4 rounded-full animate-spin m-[2px]"
                color="var(--auth-spinner)"
              />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <a
          onClick={() => window.open("https://www.turjuman.online/signup")}
          className="hover:underline my-2 text-[var(--foreground)]"
          href="https://www.turjuman.online/signup"
        >
          don't have an account?'
        </a>
      </div>
    </div>
  );
}

export default LoginView;
