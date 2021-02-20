import { createContext } from "react";

const AuthContext = createContext({
  auth: undefined, //datos del usuario
  login: () => null, //token en el localStorage
  logout: () => null, //desloguear desde cualquier instancia
  setReloadUser: () => null, //para cuando recargamos la app
});

export default AuthContext;
