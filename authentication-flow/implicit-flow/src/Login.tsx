import { useEffect } from "react";
import { makeLoginUrl } from "./utils";
import { Navigate } from "react-router-dom";

export function Login() {
  const authContext = {
    auth: false
  };

  useEffect(() => {
    if (!authContext.auth) {
      window.location.href = makeLoginUrl();
    }
  }, [authContext]);

  return authContext.auth ? <Navigate to="/admin" /> : <div>Loading...</div>;
}
