import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth({ onCloseModal, setTitleModal }) {
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setTitleModal("Iniciar sesion");
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setTitleModal("Registrarse");
    setShowLogin(false);
  };

  return showLogin ? (
    <LoginForm showRegisterForm={showRegisterForm} />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}
