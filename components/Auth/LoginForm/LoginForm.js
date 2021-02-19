import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toats } from "react-toastify";

export default function LoginForm({ showRegisterForm }) {
  return (
    <Form className="login-form">
      <Form.Input name="identifier" type="text" placeholder="Email" />
      <Form.Input name="password" type="password" placeholder="password" />
      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Registrarse
        </Button>
        <div>
          <Button className="submit" type="submit">
            Ingresar
          </Button>
          <Button type="button"> Has olvidado la contraseña? </Button>
        </div>
      </div>
    </Form>
  );
}
