export interface IUserCredentials {
  username: string | null;
  password: string | null;
}

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUserCredentials;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: IUserCredentials;
  setUserCredentials: (userCredentials?: IAuthState | null) => void;
}
