import { User } from "../types/User";
import api_client from "./api_client";

const loginEndpoint = "api/v1/users/login";

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

export async function authRegister() {}
export function authLogout() {}
export async function authFetchUser() {}
export async function authUpdateUser() {}
