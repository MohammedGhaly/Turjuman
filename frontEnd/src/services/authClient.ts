import { User } from "../types/User";
import api_client from "./api_client";
import apiClient, { BASE_URL } from "./api_client";
const loginEndpoint = "api/v1/users/login";
const signupEndpoint = "api/v1/users/signup";
const logoutEndpoint = "api/v1/users/logout";
const googleLoginEndpoint = "auth/google";
const facebookLoginEndpoint = "auth/facebook";
const getMeEndpoint = "api/v1/users/me";
const resetPasswordEndpoint = "api/v1/users/resetPassword";
const forgotPasswordEndpoint = "api/v1/users/forgetPassword";

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
  localStorage.setItem("jwt", token);
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
  return;
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
export async function forgotPassword(email: string) {
  const response = await apiClient.post(
    forgotPasswordEndpoint,
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.data.status !== "success") {
    throw new Error(`an error has occurred, try again later `);
  } else return "a token has been sent to your email, please check your inbox";
}
export async function resetPassword(body: {
  password: string;
  passwordConfirm: string;
  token: string;
}) {
  const response = await apiClient.patch(resetPasswordEndpoint, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.data.status !== "success") {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.data.data.user as User;
}
