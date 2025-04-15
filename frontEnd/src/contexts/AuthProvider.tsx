import { useReducer } from "react";

import { useNavigate } from "react-router";
import { authLogin } from "../services/authClient";
import { homepageRoute } from "../utils/routes";
import { AuthContext, authInitialState, reducer } from "./AuthContext";

interface AuthProviderProps {
  children: React.JSX.Element;
}

export default function AuthenticationProvider({
  children,
}: AuthProviderProps) {
  const [{ user, isAuthenticated, error, fetchingToken, isLoading }, dispatch] =
    useReducer(reducer, authInitialState);
  const navigate = useNavigate();

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
      }
    }
  }
  async function register() {}
  function logout() {}
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
