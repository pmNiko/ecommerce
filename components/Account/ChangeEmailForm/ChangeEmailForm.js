import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateEmailApi } from "../../../api/user";

export default function ChangeEmailForm({ user, logout, setReloadUser }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateEmailApi(user.id, formData.email, logout);

      //error 400 sera si el email ya existe
      if (!response || response?.statusCode === 400) {
        toast.error("Error al actualizar el email!");
      } else {
        setReloadUser(true);
        formik.handleReset();
        toast.success("Su email ha sido actualizado.");
      }

      setLoading(false);
    },
  });

  return (
    <div className="change-email-form">
      <h4>
        Cambia tu email <span>(Tu email actual: {user.email})</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Tu nuevo email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirma tu nuevo email"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
          />
        </Form.Group>
        <Button className="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

// función para inicializar el campo de email
function initialValues() {
  return {
    email: "",
    repeatEmail: "",
  };
}

// función de validación de schema
function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    repeatEmail: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("email")], "Los correos no coinciden"),
  };
}
