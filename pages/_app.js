import React, { useMemo, useState } from "react";
import AuthContext from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { setToken } from "../api/token";
import { ToastContainer } from "react-toastify";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  // state para guardar los datos del user
  const [auth, setAuth] = useState(undefined);

  // función login para tener de manera transversal a la app
  // los datos y token del user
  const login = (token) => {
    // guarda el token en el localStorage
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id, //decodificación del jwt
    });
  };

  // constante para guardar mediante el hook las fn de authenticación
  const authData = useMemo(
    () => ({
      auth, //datos del state auth
      login, //fn login
      logout: () => null,
      setReloadUser: () => null,
    }),
    []
  );

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
