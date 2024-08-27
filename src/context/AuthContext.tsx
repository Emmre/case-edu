import React, { createContext, useState, ReactNode, useEffect } from "react";
import {
  loadAuthStateFromLocalStorage,
  saveAuthStateToLocalStorage,
} from "../utils/localStorage";
import { IAuthState, AuthContextType } from "../types/auth";

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
    loadAuthStateFromLocalStorage()
  );

  useEffect(() => {
    setAuthState(loadAuthStateFromLocalStorage());
  }, []);

  useEffect(() => {
    saveAuthStateToLocalStorage(authState);
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
