import { useEffect, useReducer } from "react";

import { useNavigate } from "react-router";
import {
  authFacebookLogin,
  authGoogleLogin,
  authLogin,
  authLogout,
  authRegister,
  getMe,
} from "../services/authClient";
import { homepageRoute, verifyYourEmailRoute } from "../utils/routes";
import { AuthContext, authInitialState, reducer } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import isTokenExpired from "@/utils/isTokenExpired";

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
  localStorage.setItem(
    "jwt",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTNjMDkzMDFjYmI3YzBjODhkYzNmNyIsImlhdCI6MTc0NzAwMjE4NCwiZXhwIjoxNzQ3MDI3Mzg0fQ.QEr6OBgLi48tjUbURhwoIfbEGNvoYpwpuupCygy-DYI"
  );

  useEffect(function () {
    async function tokenLogin() {
      dispatch({ type: "START_FETCHING_TOKEN" });
      const token = localStorage.getItem("jwt");
      // const jwtDecoded = jwtDecode(token || "") as JwtPayload;
      // console.log(jwtDecoded);
      if (token && !isTokenExpired(token)) {
        const user = await getMe();
        dispatch({
          type: "LOAD_USER",
          payload: { user, token },
        });
      } else {
        console.log("expired");
        localStorage.removeItem("jwt");
        navigate("/login");
        toast({
          title: "Session expired, please login again",
          variant: "destructive",
        });
      }
    }

    tokenLogin();
  }, []);

  async function login(email: string, password: string) {
    dispatch({ type: "LOADING", payload: true });
    try {
      if (!email || !password) {
        toast({
          title: "please fill all fields in",
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
        dispatch({ type: "LOADING", payload: false });
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
        dispatch({ type: "LOADING", payload: false });
        if (err.message === "Network Error") {
          // localStorage.setItem(
          //   "jwt",
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTNjMDkzMDFjYmI3YzBjODhkYzNmNyIsImlhdCI6MTc0Njk3MDY5NiwiZXhwIjoxNzQ2OTk1ODk2fQ.s4FgpvjOCFb8ioQz2Mgrtk9AHpNm1IoZgo_7GX1HhHw"
          // );
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
  async function register(
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) {
    dispatch({ type: "LOADING", payload: true });
    if (!password || !passwordConfirm || !name || !email) {
      toast({
        title: "Please fill all fields in",
        variant: "destructive",
      });
      dispatch({ type: "LOADING", payload: false });
      return;
    }
    if (password !== passwordConfirm) {
      toast({
        title: "Passwords don't match",
        variant: "destructive",
      });
      dispatch({ type: "LOADING", payload: false });
      return;
    }
    try {
      await authRegister(name, email, password, passwordConfirm);
      dispatch({
        type: "REGISTER",
      });
      navigate(verifyYourEmailRoute);
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
            title: "This username is already used, choose another",
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
            title: "This email has already signed up before",
            variant: "destructive",
          });
          dispatch({ type: "LOADING", payload: false });
          return;
        }
      }
      if (err instanceof Error) {
        console.log(err.message);
        toast({
          title: "An unexpected error has occurred",
          variant: "destructive",
        });
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
        // document.cookie = "jwt=; Max-Age=0; path=/;";
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
