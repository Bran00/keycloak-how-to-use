import { createContext, useState } from "react";
import type { PropsWithChildren } from "react";
import * as utils from "./utils";
import type { JWTPayload } from "jose";

type AuthContextProps = {
  auth: JWTPayload | null;
  makeLoginUrl: () => string;
  makeLogoutUrl: () => string | false;
  login: (accessToken: string, idToken: string, state: string) => JWTPayload;
  logout: () => void;
};

// Funções padrão seguras (evitam chamadas fora do provider)
const defaultContext: AuthContextProps = {
  auth: null,
  makeLoginUrl: () => {
    throw new Error("makeLoginUrl chamado fora do AuthProvider");
  },
  makeLogoutUrl: () => {
    throw new Error("makeLogoutUrl chamado fora do AuthProvider");
  },
  login: () => {
    throw new Error("login chamado fora do AuthProvider");
  },
  logout: () => {
    throw new Error("logout chamado fora do AuthProvider");
  },
};

export const AuthContext = createContext<AuthContextProps>(defaultContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<AuthContextProps>({
    auth: utils.getAuth(),
    makeLoginUrl: utils.makeLoginUrl,
    makeLogoutUrl: utils.makeLogoutUrl,
    login: (accessToken, idToken, state) => {
      const authData = utils.login(accessToken, idToken, state);
      setData((oldData) => ({
        ...oldData,
        auth: authData,
      }));
      return authData;
    },
    logout: () => {
      setData((oldData) => ({
        ...oldData,
        auth: null,
      }));
    },
  });

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};

