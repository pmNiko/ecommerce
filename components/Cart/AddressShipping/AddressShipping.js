import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import classNames from "classnames";
import { getAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function AddressShipping() {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth(); //context

  useEffect(() => {
    (async () => {
      // recuperamos las direcciones del user
      const response = await getAddressApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);
  return (
    <div className="address-shipping">
      <div className="title">Dirección de envio</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            No hay ninguna dirección de envio{" "}
            <Link href="/account">
              <a> añadir tu primera dirección.</a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Address address={address} />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

function Address({ address }) {
  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.city} , {address.postalCode}{" "}
      </p>
      <p>{address.phone} </p>
    </div>
  );
}
