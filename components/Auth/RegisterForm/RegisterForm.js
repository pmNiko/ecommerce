import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

export default function RegisterForm({ showLoginForm }) {
  return (
    <Form className="login-form">
      <Form.Input name="name" type="text" placeholder="Nombre" />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Apellido de usuario"
      />
      <Form.Input name="username" type="text" placeholder="Nombre de usuario" />
      <Form.Input name="email" type="text" placeholder="Email de usuario" />
      <Form.Input name="password" type="password" placeholder="Contraseña" />
      <div className="actions">
        <Button type="button" basic>
          Iniciar sesion
        </Button>
        <Button type="submit" className="submit">
          Registrar
        </Button>
      </div>
    </Form>
  );
}
