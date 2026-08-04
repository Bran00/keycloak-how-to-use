import Cookies from "js-cookie";
import { decodeJwt } from "jose";

export function makeLoginUrl() {
  const nonce = Math.random().toString(36);
  const state = Math.random().toString(36);

  Cookies.set("nonce", nonce);
  Cookies.set("state", state);

  const loginUrlParams = new URLSearchParams({
    client_id: "fullcycle-client",
    redirect_uri: "http://localhost:3000/callback",
    response_type: "token id_token",
    //scope: "openid",
    nonce: nonce,
    state: state,
  });

  return `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/auth?${loginUrlParams.toString()}`;
}

export function login(accessToken: string, idToken: string, state: string) {
  const stateCookie = Cookies.get("state");
  if (stateCookie !== state) {
    throw new Error("Invalid state");
  }

  // eslint-disable-next-line
  let decodedAccessToken = null;
  // eslint-disable-next-line
  let decodedIdToken = null;
  try {
    decodedAccessToken = decodeJwt(accessToken);
    decodedIdToken = decodeJwt(idToken);
    // eslint-disable-next-line
  } catch (e) {
    // eslint-disable-next-line
    throw new Error("Invalid token");
  }

  if (decodedIdToken.nonce !== Cookies.get("nonce")) {
    throw new Error("Invalid nonce");
  }

  Cookies.set("access_token", accessToken);
  Cookies.set("id_token", idToken);

  return decodedAccessToken;
}
