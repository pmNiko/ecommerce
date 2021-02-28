import React, { useState, useEffect } from "react";
import { map, size } from "lodash";
import { getAddressApi, deleteAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";
import { Button, Grid } from "semantic-ui-react";
import { toast } from "react-toastify";

export default function ListAddress({
  setReloadAddress,
  reloadAddress,
  openModal,
}) {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  // se encarga de refrescar las direcciones del user
  useEffect(() => {
    (async () => {
      const response = await getAddressApi(auth.idUser, logout);
      setAddresses(response || []); //si response esta vacio agrega un array vacio
      setReloadAddress(false);
    })();
  }, [reloadAddress]);

  if (!addresses) return null; //retorna null hasta que la api haya dado respuesta

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No hay ninguna dirección cargada</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setReloadAddress={setReloadAddress}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

// componente de listado de direcciones
function Address({ address, logout, setReloadAddress, openModal }) {
  const [loadingDelete, setLoadingDelete] = useState(false);

  // fn para eliminar una dirección
  const deleteAddress = async () => {
    setLoadingDelete(true);
    const response = await deleteAddressApi(address._id, logout);
    if (response) {
      setReloadAddress(true);
      toast.success("Dirección eliminada correctamente");
    } else {
      toast.error("No se pudo eliminar la dirección.");
    }
    setLoadingDelete(false);
  };

  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city} {address.postalCode}{" "}
      </p>
      <p>{address.phone}</p>

      <div className="actions">
        <Button
          primary
          onClick={() => openModal(`Editar: ${address.title}`, address)}
        >
          Editar
        </Button>
        <Button onClick={deleteAddress} loading={loadingDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
