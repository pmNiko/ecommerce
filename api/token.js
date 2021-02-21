import { TOKEN } from "../utils/constants";

// función para setear el token en el localStorage
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

// fn para recuperar el token del localStorage
export function getToken() {
  return localStorage.getItem(TOKEN);
}

// fn para borrar el token del localStorage
export function removeToken() {
  return localStorage.removeItem(TOKEN);
}
