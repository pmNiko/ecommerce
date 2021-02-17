import React from "react";

export default function RegisterForm({ showLoginForm }) {
  return (
    <div>
      <h1>Estamos en el Registro</h1>
      <button onClick={showLoginForm}>Ir al Login</button>
    </div>
  );
}
