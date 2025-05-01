import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../Spinner";

const inputClassname =
  "bg-[var(--input-background)] rounded-md w-full p-[6px] px-3 border border-[var(--input-border)]";
const labelClassname = "font-semibold text-sm flex flex-col gap-1 w-full";

interface Props {
  isLogin: boolean;
}

function AuthForm({ isLogin }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { login, register, isLoading } = useAuth();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLogin) login?.(email, password);
    else register?.(name, email, password, passwordConfirm);
  }

  return (
    <div className="">
      <form
        className="flex flex-col gap-3 items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        {!isLogin && (
          <label className={labelClassname}>
            Username
            <input
              type="text"
              name="text"
              className={`${inputClassname}`}
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        )}
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
        {!isLogin && (
          <label className={labelClassname}>
            Confirm password
            <input
              type="password"
              name="password"
              className={`${inputClassname}`}
              placeholder="Confirm your password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </label>
        )}
        {isLogin && (
          <a className="self-end text-[var(--forgot-pw)] underline cursor-pointer">
            forgot password?
          </a>
        )}
        <button className="bg-[var(--login-button-background)] rounded-2xl text-[var(--login-button-foreground)] min-w-36 py-2 flex justify-center text-xl mt-4 mb-4 lg:mb-2 lg:mt-2 hover:bg-[var(--login-button-background-hover)] duration-200 transition-all shadow-md font-semibold">
          {isLoading ? (
            <Spinner
              cn="w-7 h-7 border-4 rounded-full animate-spin"
              color="var(--auth-spinner)"
            />
          ) : isLogin ? (
            "Login"
          ) : (
            "Signup"
          )}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
