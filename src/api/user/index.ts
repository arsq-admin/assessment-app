import { QueryFunctionContext } from "@tanstack/react-query";
import { USER_SERVICE_URL } from "../index";

const { VITE_COGNITO_CALLBACK_DOMAIN } = import.meta.env;

export const login = async ({ queryKey }: QueryFunctionContext) => {
  const [code] = queryKey;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(
    `${USER_SERVICE_URL}/login?code=${code}&redirect=${VITE_COGNITO_CALLBACK_DOMAIN}/oauth/callback&client=assessment`,
    {
      method: "POST",
      headers: headers,
      credentials: "include",
    }
  );

  if (res.status !== 200) throw new Error("Unable to fetch tokens.");

  return res;
};

export const logout = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return await fetch(`${USER_SERVICE_URL}/logout`, {
    method: "POST",
    headers: headers,
    credentials: "include",
  });
};

export const getMyUserInfo = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(`${USER_SERVICE_URL}/me`, {
    headers: headers,
    credentials: "include",
  });

  return res.json();
};
