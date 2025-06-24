import { User } from "../chrome-extension/types/User";
import api_client from "./api_client";
import apiClient, { BASE_URL } from "./api_client";
const loginEndpoint = "api/v1/users/login";
const logoutEndpoint = "api/v1/users/logout";
const googleLoginEndpoint = "auth/google";
const facebookLoginEndpoint = "auth/facebook";
const getMeEndpoint = "api/v1/users/me";

export async function authLogin(email: string, password: string) {
  const body = { email, password };
  const response = await api_client.post(loginEndpoint, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.data.status !== "success") {
    if (response.data.err.statusCode === 401) throw new Error("Unauthorized");
    else throw new Error(response.data.message);
  }
  const token: string = response.data.token;
  await chrome.storage.local.set({ jwt: token });
  localStorage.setItem("jwt", token);
  return response.data.data.user as User;
}

export async function authLogout() {
  await api_client.get(logoutEndpoint, {
    validateStatus: () => true, // prevent axios from throwing on 3xx
  });
  // clear jwt
  localStorage.removeItem("jwt");
  return true;
}
export async function authGoogleLogin() {
  window.location.href = BASE_URL + googleLoginEndpoint;
}
export async function authFacebookLogin() {
  window.location.href = BASE_URL + facebookLoginEndpoint;
}
export async function getMe() {
  const response = await apiClient.get(getMeEndpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.data as User;
}
export async function authUpdateUser() {}
