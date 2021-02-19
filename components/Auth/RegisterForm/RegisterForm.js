import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { registerApi } from "../../../api/user";

export default function RegisterForm({ showLoginForm }) {
  const [loading, setLoading] = useState(false);

  // hook de validación de formulario
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await registerApi(formData);
      if (response?.jwt) {
        toast.success("Se ha registrado correctamente, inicie sesion...");
        showLoginForm();
      } else {
        toast.error("Error al registrar usuario!");
      }
      setLoading(false);
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Nombre"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Apellido de usuario"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name="username"
        type="text"
        placeholder="Nombre de usuario"
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Email de usuario"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={showLoginForm}>
          Iniciar sesion
        </Button>
        <Button type="submit" className="submit" loading={loading}>
          Registrar
        </Button>
      </div>
    </Form>
  );
}

// FUNCION para inicialización de los campos del hook formik
function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
}

// FUNCION para la estructura de validacion
function validationSchema() {
  return {
    name: Yup.string().required("Ingrese su nombre."),
    lastname: Yup.string().required("El apellido es obligatorio."),
    username: Yup.string().required("Debe elegir un nombre de usuario."),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
