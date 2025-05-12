import { createContext } from "react";
import { User } from "../types/User";

export const AuthContext = createContext<Auth | null>(null);

interface Auth {
  user: User | null;
  isAuthenticated: boolean;
  error: string;
  fetchingToken: boolean;
  isLoading: boolean;
  facebookLogin: undefined | (() => void);
  googleLogin: undefined | (() => void);
  login: undefined | ((email: string, password: string) => void);
  register:
    | undefined
    | ((
        name: string,
        email: string,
        password: string,
        passwordConfirm: string
      ) => void);
  logout: undefined | (() => void);
  loadUser: undefined | ((user: User) => void);
  setFetchingToken: undefined | ((arg: boolean) => void);
}

export const authInitialState: Auth = {
  user: null,
  isAuthenticated: false,
  error: "",
  fetchingToken: false,
  isLoading: false,
  login: undefined,
  logout: undefined,
  register: undefined,
  loadUser: undefined,
  facebookLogin: undefined,
  googleLogin: undefined,
  setFetchingToken: undefined,
};

// #region reducer types
type ERROR = { type: "ERROR"; payload: string };
type UPDATE_USER = {
  type: "UPDATE_USER";
  payload: { user: User };
};
type LOAD_USER = { type: "LOAD_USER"; payload: User };
type REGISTER = { type: "REGISTER" };
type LOGIN = { type: "LOGIN"; payload: { user: User } };
type LOGOUT = { type: "LOGOUT" };
type FETCHING_TOKEN = { type: "FETCHING_TOKEN"; payload: boolean };
type LOADING = { type: "LOADING"; payload: boolean };

type ReducerAction =
  | ERROR
  | LOAD_USER
  | UPDATE_USER
  | REGISTER
  | LOADING
  | LOGIN
  | LOGOUT
  | FETCHING_TOKEN;
// #endregion reducer types

export function reducer(state: Auth, action: ReducerAction): Auth {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload.user } };
    case "LOAD_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        fetchingToken: false,
      };
    case "REGISTER":
      return {
        ...state,
        isLoading: false,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload.user },
        isLoading: false,
        error: "",
        fetchingToken: false,
      };
    case "LOGOUT":
      return { ...authInitialState, fetchingToken: false, isLoading: false };
    case "FETCHING_TOKEN":
      return { ...state, fetchingToken: action.payload };
    case "LOADING":
      return { ...state, isLoading: action.payload };
    default:
      break;
  }
  return state;
}
