import React, { useMemo, useState } from "react";
import AuthContext from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { setToken } from "../api/token";
import { ToastContainer } from "react-toastify";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  console.log(auth);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const authData = useMemo(
    () => ({
      auth: { name: "Nicolas", email: "nikolas@gmail.com" },
      login,
      logout: () => null,
      setReloadUser: () => null,
    }),
    []
  );

  return (
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
