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
import { AxiosError } from "axios";

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
      dispatch({
        type: "LOGIN",
        payload: {
          user: fetchedUser,
        },
      });
      navigate(homepageRoute);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log("err.response=>  ", err.response);

        dispatch({ type: "LOADING", payload: false });
        if (err.response?.data.message === "Invalid email or password") {
          toast({
            title: "Error",
            description: "Invalid email or password",
            variant: "destructive",
          });
        }
        return;
      } else if (err instanceof Error) {
        console.log("err.message=>  ", err.message);
        dispatch({ type: "LOADING", payload: false });
        if (err.message === "Network Error") {
          toast({
            title: "Error",
            description:
              "An error has occurred while logging in, check your network connection",
            variant: "destructive",
          });
        } else if (err.message === "Request failed with status code 401") {
          toast({
            title: "Error",
            description: "Invalid email or password",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "An unexpected error has occurred",
            variant: "destructive",
          });
        }
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
    if (password !== passwordConfirm) {
      toast({
        title: "Error",
        description: "passwords don't match",
        variant: "destructive",
      });
      dispatch({ type: "LOADING", payload: false });
      return;
    }
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
      if (err instanceof AxiosError) {
        dispatch({ type: "LOADING", payload: false });
        console.log("err=>  ", err);
        if (
          err.response?.data.message.startsWith(
            "E11000 duplicate key error collection: Turjuman.users index: name"
          )
        ) {
          toast({
            title: "Error",
            description: "this username is already used",
            variant: "destructive",
          });
          dispatch({ type: "LOADING", payload: false });
          return;
        } else if (
          err.response?.data.message.startsWith(
            "E11000 duplicate key error collection: Turjuman.users index: email"
          )
        ) {
          toast({
            title: "Error",
            description: "this email is already used",
            variant: "destructive",
          });
          dispatch({ type: "LOADING", payload: false });
          return;
        }
      }
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
          title: "Logged out successfully",
          variant: "success",
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
