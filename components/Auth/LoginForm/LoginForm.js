import React from "react";

export default function LoginForm({ showRegisterForm }) {
  return (
    <div>
      <h1>Estamos en el Login</h1>
      <button onClick={showRegisterForm}>Ir al registro</button>
    </div>
  );
}
