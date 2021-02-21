import React, { useMemo, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { setToken, getToken } from "../api/token";
import { ToastContainer } from "react-toastify";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  // state para guardar los datos del user
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);

  // se recargaran los datos del usuario mediante el state
  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token, //token del user
        idUser: jwtDecode(token).id, //decodificación del jwt
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  // fn login para setear el localStorage y el state auth
  const login = (token) => {
    setToken(token); // guarda el token en el localStorage
    setAuth({
      token, //token del user
      idUser: jwtDecode(token).id, //decodificación del jwt
    });
  };

  // constante para guardar mediante el hook las fn de authenticación
  const authData = useMemo(
    () => ({
      auth, //datos del state auth
      login, //fn login
      logout: () => null,
      setReloadUser,
    }),
    [auth] //se actualizara cuando cambie el state
  );

  // comprobación de datos
  if (auth === undefined) return null;

  return (
    // Pasa al Provider los datos en memoria authData
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
