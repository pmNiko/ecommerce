import React from "react";
import { Button, Form } from "semantic-ui-react";

export default function AddressForm() {
  return (
    <Form>
      <Form.Input
        name="title"
        type="text"
        label="Titulo de la dorección"
        placeholder="Titulo de la direción"
      />

      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Nombre y apellido"
          placeholder="Nombre y apellido"
        />
        <Form.Input
          name="address"
          type="text"
          label="Dirección"
          placeholder="Dirección"
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          label="Ciudad"
          placeholder="Ciudad"
        />
        <Form.Input
          name="state"
          type="text"
          label="Provincia"
          placeholder="Provincia"
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          type="text"
          label="Codigo Postal"
          placeholder="Codigo Postal"
        />
        <Form.Input
          name="phone"
          type="text"
          label="Número de telefono"
          placeholder="Número de telefono"
        />
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit">
          Crear dirección
        </Button>
      </div>
    </Form>
  );
}
