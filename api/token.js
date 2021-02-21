import { TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

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

// fn para comprobación de token expirado
export function hasExpiredToken(token) {
  const tokenDecode = jwtDecode(token); //recuperacion del token
  const expireDate = tokenDecode.exp * 1000; //se multiplica para pasarlo a segundos
  const currentDate = new Date().getTime(); //recuperamos la hora actual en formato segundos
  // if (currentDate > expireDate) {
  //   return true;
  // }
  // return false;
  return currentDate >= expireDate;
}
