import { useReducer } from "react";

import { useNavigate } from "react-router";
import {
  authFacebookLogin,
  authGoogleLogin,
  authLogin,
  authLogout,
  authRegister,
} from "../services/authClient";
import { homepageRoute } from "../utils/routes";
import { AuthContext, authInitialState, reducer } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";

interface AuthProviderProps {
  children: React.JSX.Element;
}

export default function AuthenticationProvider({
  children,
}: AuthProviderProps) {
  const [{ user, isAuthenticated, error, fetchingToken, isLoading }, dispatch] =
    useReducer(reducer, authInitialState);
  const navigate = useNavigate();
  const { toast } = useToast();

  // useEffect(function () {
  //   async function handleTokenLogin() {
  //     dispatch({ type: "START_FETCHING_TOKEN" });
  //     const token =
  //       localStorage.getItem("token") ||
  //       document.cookie
  //         .split("; ")
  //         .find((row) => row.startsWith("token="))
  //         ?.split("=")[1];

  //     if (token && !isTokenExpired(token)) {
  //       const { id } = jwtDecode(token) as JwtPayload;
  //       const fetchedUser: User = await fetchUser(id);
  //       dispatch({
  //         type: "LOAD_USER",
  //         payload: { user: fetchedUser, token },
  //       });
  //     } else {
  //       localStorage.removeItem("token");
  //     }

  //     dispatch({ type: "DONE_FETCHING_TOKEN" });
  //   }
  //   handleTokenLogin();
  // }, []);

  async function login(email: string, password: string) {
    dispatch({ type: "LOADING", payload: true });
    try {
      if (!email || !password) {
        toast({
          title: "Error",
          description: "please fill in all fields",
          variant: "destructive",
        });
        dispatch({ type: "LOADING", payload: false });
        return;
      }
      const fetchedUser = await authLogin(email, password);
      console.log("fetchedUser: ", fetchedUser);
      dispatch({
        type: "LOGIN",
        payload: {
          user: fetchedUser,
        },
      });
      navigate(homepageRoute);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        dispatch({ type: "LOADING", payload: false });
        toast({
          title: "Error",
          description: "An error has occurred while logging in",
        });
      }
    }
  }
  async function register(
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) {
    dispatch({ type: "LOADING", payload: true });
    try {
      const fetchedUser = await authRegister(
        name,
        email,
        password,
        passwordConfirm
      );
      console.log("fetchedUser: ", fetchedUser);
      dispatch({
        type: "REGISTER",
        payload: {
          user: fetchedUser,
        },
      });
      navigate(homepageRoute);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        dispatch({ type: "LOADING", payload: false });
      }
    }
  }
  async function logout() {
    dispatch({ type: "LOADING", payload: true });
    try {
      const res = await authLogout();
      if (res) {
        dispatch({ type: "LOGOUT" });
        // clear cookie
        document.cookie = "jwt=; Max-Age=0; path=/;";
        navigate("login");
        toast({
          title: "Scheduled: Catch up",
          description: "Logged out successfully",
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("Error ocurred while logging out : ", err);
      }
    }
  }
  async function googleLogin() {
    dispatch({ type: "LOADING", payload: true });
    try {
      await authGoogleLogin();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        dispatch({ type: "LOADING", payload: false });
      }
    }
  }
  async function facebookLogin() {
    dispatch({ type: "LOADING", payload: true });
    try {
      await authFacebookLogin();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        dispatch({ type: "LOADING", payload: false });
      }
    }
  }

  // async function fetchUser(id: string) {}
  async function updateUser() {}

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        error,
        fetchingToken,
        isLoading,
        register,
        login,
        logout,
        updateUser,
        facebookLogin,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
