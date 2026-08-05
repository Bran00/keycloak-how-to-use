import { createContext, useCallback, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import * as utils from "./utils";
import type { JWTPayload } from "jose";

type AuthContextProps = {
  auth: JWTPayload | null;
  makeLoginUrl: () => string;
  makeLogoutUrl: () => string;
  login: (
    accessToken: string,
    idToken: string,
    code: string,
    state: string
  ) => JWTPayload;
};

const initContextData: AuthContextProps = {
  auth: null,
  makeLoginUrl: utils.makeLoginUrl,
  makeLogoutUrl: utils.makeLogoutUrl,
  // placeholders para evitar chamadas fora do provider
  login: () => {
    throw new Error("login chamado fora do AuthProvider");
  },
};

// cria o contexto
export const AuthContext = createContext(initContextData);

// cria o provider
export const AuthProvider = (props: PropsWithChildren) => {
  const [data, setData] = useState<AuthContextProps>({
    auth: utils.getAuth(),
    makeLoginUrl: utils.makeLoginUrl,
    makeLogoutUrl: utils.makeLogoutUrl,
    login: () => {
      throw new Error("login chamado fora do AuthProvider");
    },
  });

  const makeLogin = useCallback(
    (accessToken: string, idToken: string, code: string, state: string) => {
      // login inicial
      const authData = utils.login(accessToken, idToken, null, state);
      setData((oldData) => ({
        ...oldData,
        auth: authData,
      }));

      // troca de código por token
      utils.exchangeCodeForToken(code).then((authData) => {
        setData((oldData) => ({
          ...oldData,
          auth: authData,
        }));
      });

      return authData;
    },
    []
  );

  // injeta a função de login no state depois que ela é criada
  useEffect(() => {
    setData((oldData) => ({ ...oldData, login: makeLogin }));
  }, [makeLogin]);

  return (
    <AuthContext.Provider value={data}>
      {props.children}
    </AuthContext.Provider>
  );
};

