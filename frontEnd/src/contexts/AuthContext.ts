import { createContext } from "react";
import { User } from "../types/User";

export const AuthContext = createContext<Auth | null>(null);

interface Auth {
  user: User | null;
  isAuthenticated: boolean;
  error: string;
  fetchingToken: boolean;
  isLoading: boolean;
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
  updateUser: undefined | (() => void);
}

export const authInitialState: Auth = {
  user: null,
  isAuthenticated: false,
  error: "",
  fetchingToken: true,
  isLoading: false,
  login: undefined,
  logout: undefined,
  register: undefined,
  updateUser: undefined,
};

// #region reducer types
type ERROR = { type: "ERROR"; payload: string };
type UPDATE_USER = {
  type: "UPDATE_USER";
  payload: { user: User };
};
type LOAD_USER = { type: "LOAD_USER"; payload: { user: User } };
type REGISTER = { type: "REGISTER"; payload: { user: User } };
type LOGIN = { type: "LOGIN"; payload: { user: User } };
type LOGOUT = { type: "LOGOUT" };
type START_FETCHING_TOKEN = { type: "START_FETCHING_TOKEN" };
type DONE_FETCHING_TOKEN = { type: "DONE_FETCHING_TOKEN" };
type LOADING = { type: "LOADING"; payload: boolean };

type ReducerAction =
  | ERROR
  | LOAD_USER
  | UPDATE_USER
  | REGISTER
  | LOADING
  | LOGIN
  | LOGOUT
  | START_FETCHING_TOKEN
  | DONE_FETCHING_TOKEN;
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
        user: { ...action.payload.user },
      };
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload.user },
        error: "",
        isLoading: false,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload.user },
        isLoading: false,
        error: "",
      };
    case "LOGOUT":
      return { ...authInitialState, fetchingToken: false, isLoading: false };
    case "START_FETCHING_TOKEN":
      return { ...state, fetchingToken: true };
    case "DONE_FETCHING_TOKEN":
      return { ...state, fetchingToken: false };
    case "LOADING":
      return { ...state, isLoading: action.payload };
    default:
      break;
  }
  return state;
}
