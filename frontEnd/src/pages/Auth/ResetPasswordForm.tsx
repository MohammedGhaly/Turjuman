import Spinner from "@/components/Spinner";
import { useState } from "react";

const inputClassname =
  "bg-[var(--input-background)] rounded-md w-full p-[6px] px-3 border border-[var(--input-border)]";
const labelClassname = "font-semibold text-sm flex flex-col gap-1 w-full";

interface Props {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    password: string,
    passwordConfirm: string
  ) => void;
  isLoading: boolean;
}

function ResetPasswordForm({ handleSubmit, isLoading }: Props) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <div>
      <form
        className="flex flex-col gap-3 items-center"
        onSubmit={(e) => handleSubmit(e, password, passwordConfirm)}
      >
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
        <button className="bg-[var(--login-button-background)] rounded-2xl text-[var(--login-button-foreground)] min-w-36 py-2 flex justify-center text-xl mt-4 mb-4 lg:mb-2 lg:mt-2 hover:bg-[var(--login-button-background-hover)] duration-200 transition-all shadow-md font-semibold">
          {isLoading ? (
            <Spinner
              cn="w-7 h-7 border-4 rounded-full animate-spin"
              color="var(--auth-spinner)"
            />
          ) : (
            "Reset"
          )}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
