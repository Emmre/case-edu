import { IAuthState } from "../types/auth";

const LOCAL_STORAGE_KEY = "authState";

export const loadAuthStateFromLocalStorage = (): IAuthState => {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, user: { username: null, password: null } };
  }

  const authState = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (authState) {
    try {
      return JSON.parse(authState);
    } catch (error) {
      console.error("Failed to parse auth state from localStorage", error);
    }
  }

  return { isAuthenticated: false, user: { username: null, password: null } };
};

export const saveAuthStateToLocalStorage = (authState: IAuthState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authState));
  }
};
