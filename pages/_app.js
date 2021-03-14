import React, { useMemo, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { setToken, getToken, removeToken } from "../api/token";
import { getProductsCart, addProductCart } from "../api/cart";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MyApp({ Component, pageProps }) {
  // state para guardar los datos del user
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const router = useRouter();

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

  // fn para desloguear un usuario
  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };

  // constante para guardar mediante el hook las fn de authenticación
  const authData = useMemo(
    () => ({
      auth, //datos del state auth
      login, //fn login
      logout, //fn logout
      setReloadUser,
    }),
    [auth] //se actualizara cuando cambie el state
  );

  // fn para cartData
  const addProduct = (product) => {
    const token = getToken();
    if (token) {
      addProductCart(product);
    } else {
      toast.warning("Para comprar debes iniciar session.");
    }
  };

  // value del provider CartContext
  const cartData = useMemo(
    () => ({
      productsCart: 0,
      addProductCart: (product) => addProduct(product),
      getProductsCart: getProductsCart,
      removeProductCart: () => null,
      removeAllProductsCart: () => null,
    }),
    []
  );

  // comprobación de datos
  if (auth === undefined) return null;

  return (
    // Pasa al Provider los datos en memoria authData
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
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
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
