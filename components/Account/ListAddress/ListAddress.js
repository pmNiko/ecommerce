import React, { useState, useEffect } from "react";
import { getAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function ListAddress() {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  console.log(addresses);

  useEffect(() => {
    (async () => {
      const response = await getAddressApi(auth.idUser, logout);
      setAddresses(response || []); //si response esta vacio agrega un array vacio
    })();
  }, []);

  return <div>listado de direcciones</div>;
}
