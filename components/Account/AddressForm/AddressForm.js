import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { createAddressApi, updateAddressApi } from "../../../api/address";
import { toast } from "react-toastify";

export default function AddressForm({
  setShowModal,
  setReloadAddress,
  newAddress,
  address,
}) {
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth(); //fn context

  // formik para creación y edición de direcciones
  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      newAddress ? createAddress(formData) : updateAddress(formData);
    },
  });

  // fn para crear una dirección
  const createAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      users_permissions_user: auth.idUser,
    };
    const response = await createAddressApi(formDataTemp, logout);
    if (!response) {
      toast.warning("Se produjo un error al cargar su nueva dirección.");
      setLoading(false);
    } else {
      formik.resetForm(); //limpia el formulario
      setReloadAddress(true);
      setShowModal(false);
      toast.success("La dirección fue cargada!");
      setLoading(false);
    }
  };

  // fn para editar la dirección de un usuario
  const updateAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData, //spread para recuperar el array de valores
      users_permissions_user: auth.idUser, //necesitamos pasarle la ref al user
    };
    const response = await updateAddressApi(address._id, formDataTemp, logout);
    if (!response) {
      toast.warning("Se produjo un error al actualizar la dirección.");
      setLoading(false);
    } else {
      formik.resetForm(); //limpia el formulario
      setReloadAddress(true);
      setShowModal(false);
      toast.success("La dirección fue actualizada!");
    }
    setLoading(false);
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
          {newAddress ? "Cargar" : "Actualizar"}
        </Button>
      </div>
    </Form>
  );
}

// inicialización de values. Al editar una dirección "address" asignara el valor
function initialValues(address) {
  return {
    title: address?.title || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || "",
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
