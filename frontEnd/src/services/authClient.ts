import { User } from "../types/User";
import api_client from "./api_client";

const loginEndpoint = "api/v1/users/login";
const signupEndpoint = "api/v1/users/signup";
const logoutEndpoint = "api/v1/users/logout";

export async function authLogin(email: string, password: string) {
  const body = { email, password };
  const response = await api_client.post(loginEndpoint, body, {
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

export async function authRegister(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const body = { name, email, password, confirmPassword };
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
  await api_client.post(logoutEndpoint, {
    withCredentials: true,
    validateStatus: () => true, // prevent axios from throwing on 3xx
  });
  return true;
}
export async function authFetchUser() {}
export async function authUpdateUser() {}
