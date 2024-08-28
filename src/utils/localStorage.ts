import { IAuthState } from "@/types/auth";
import Cookies from "js-cookie";

const COOKIE_KEY = "authState";

export const loadAuthStateFromCookies = (): IAuthState => {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, user: { username: null, password: null } };
  }

  const authState = Cookies.get(COOKIE_KEY);

  if (authState) {
    try {
      return JSON.parse(authState);
    } catch (error) {
      console.error("Failed to parse auth state from cookies", error);
    }
  }

  return { isAuthenticated: false, user: { username: null, password: null } };
};

export const saveAuthStateToCookies = (authState: IAuthState) => {
  if (typeof window !== "undefined") {
    Cookies.set(COOKIE_KEY, JSON.stringify(authState), { expires: 7 });
  }
};
