import { User } from "../types/User";
import api_client from "./api_client";
import { BASE_URL } from "./api_client";
const loginEndpoint = "api/v1/users/login";
const signupEndpoint = "api/v1/users/signup";
const logoutEndpoint = "api/v1/users/logout";
const googleLoginEndpoint = "auth/google";
const facebookLoginEndpoint = "auth/facebook";

export async function authLogin(email: string, password: string) {
  const body = { email, password };
  const response = await api_client.post(loginEndpoint, body, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.data.status !== "success") {
    if (response.data.err.statusCode === 401) throw new Error("Unauthorized");
    else throw new Error(response.data.message);
  }
  return response.data.data.user as User;
}

export async function authRegister(
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
) {
  const body = { name, email, password, passwordConfirm, role: "user" };
  const response = await api_client.post(signupEndpoint, body, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.data.status !== "success") {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.data.data.user as User;
}

export async function authLogout() {
  await api_client.get(logoutEndpoint, {
    withCredentials: true,
    validateStatus: () => true, // prevent axios from throwing on 3xx
  });
  return true;
}
export async function authGoogleLogin() {
  window.location.href = BASE_URL + googleLoginEndpoint;
}
export async function authFacebookLogin() {
  window.location.href = BASE_URL + facebookLoginEndpoint;
}
export async function authFetchUser() {}
export async function authUpdateUser() {}
