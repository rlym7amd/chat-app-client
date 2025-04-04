import { createContext } from "react";
import { User } from "../utils/definitions";
import { LoginFormInput } from "../pages/Login";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  register: (data: RegisterData) => Promise<void>;
  login: (credentials: LoginFormInput) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (_data: RegisterData) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (_credentials: LoginFormInput) => {},
  logout: async () => {},
  loading: true,
});
