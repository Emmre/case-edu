import React, { createContext, useState, ReactNode, useEffect } from "react";
import { IAuthState, AuthContextType } from "../types/auth";
import {
  loadAuthStateFromCookies,
  saveAuthStateToCookies,
} from "@/utils/localStorage";

const defaultAuthState: IAuthState = {
  isAuthenticated: false,
  user: { username: null, password: null },
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<IAuthState>(
    loadAuthStateFromCookies()
  );

  useEffect(() => {
    setAuthState(loadAuthStateFromCookies());
  }, []);

  useEffect(() => {
    saveAuthStateToCookies(authState);
  }, [authState]);

  const setUserCredentials = (userCredentials?: IAuthState | null) => {
    if (userCredentials === null) {
      setAuthState(defaultAuthState);
    } else if (userCredentials) {
      setAuthState(userCredentials);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        setUserCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
