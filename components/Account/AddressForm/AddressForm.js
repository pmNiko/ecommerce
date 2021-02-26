import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { createAddressApi } from "../../../api/address";
import { toast } from "react-toastify";

export default function AddressForm({ setShowModal }) {
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      createAddress(formData);
    },
  });

  const createAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      users_permissions_user: auth.idUser,
    };
    const response = await createAddressApi(formDataTemp, logout);
    if (!response) {
      toast.error("Se produjo un error al cargar su nueva dirección.");
      setLoading(false);
    } else {
      formik.resetForm(); //limpia el formulario
      setShowModal(false);
      toast.success("La dirección fue cargada!");
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      {/* Designación */}
      <Form.Input
        name="title"
        type="text"
        label="Titulo de la dorección"
        placeholder="Titulo de la direción"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />

      {/* Nombre y direción  */}
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Nombre y apellido"
          placeholder="Nombre y apellido"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="address"
          type="text"
          label="Dirección"
          placeholder="Dirección"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
      </Form.Group>

      {/* Ciudad y provincia */}
      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          label="Ciudad"
          placeholder="Ciudad"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <Form.Input
          name="state"
          type="text"
          label="Provincia"
          placeholder="Provincia"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        />
      </Form.Group>

      {/* Codigo postal y telefono */}
      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          type="text"
          label="Codigo Postal"
          placeholder="Codigo Postal"
          onChange={formik.handleChange}
          value={formik.values.postalCode}
          error={formik.errors.postalCode}
        />
        <Form.Input
          name="phone"
          type="text"
          label="Número de telefono"
          placeholder="Número de telefono"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </Form.Group>

      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          Crear dirección
        </Button>
      </div>
    </Form>
  );
}

// inicialización de values
function initialValues() {
  return {
    title: "",
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  };
}

// validación del schema de datos
function validationSchema() {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalCode: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
}
