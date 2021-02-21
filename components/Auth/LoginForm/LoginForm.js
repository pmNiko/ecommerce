import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { loginApi } from "../../../api/user";

export default function LoginForm({ showRegisterForm, onCloseModal }) {
  const [loading, setLoading] = useState(false);
  const { login, auth } = useAuth();
  console.log(auth);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        login(response.jwt);
        onCloseModal();
        toast.success("Bienvenido...");
      } else {
        toast.error("Error al ingresar los datos.");
      }
      setLoading(false);
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Email"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="password"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Registrarse
        </Button>
        <div>
          <Button className="submit" type="submit" loading={loading}>
            Ingresar
          </Button>
          <Button type="button"> Has olvidado la contraseña? </Button>
        </div>
      </div>
    </Form>
  );
}

// Función para inicializar valores
function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

// Función para validar el schema de datos
function validationSchema() {
  return {
    identifier: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
