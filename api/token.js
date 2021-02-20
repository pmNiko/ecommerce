import { TOKEN } from "../utils/constants";

// función para setear el token en el localStorage
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}
