import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Icon } from "semantic-ui-react";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import BasicLayout from "../layouts/BasicLayout";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AddressForm";
import ListAddress from "../components/Account/ListAddress";

// Pagina de perfil de user
export default function Account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth(); //recuperamos las fn del context
  const router = useRouter();

  // pondra en null el state user si el token expira
  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout); //recuperamos los datos del user
      setUser(response || null);
    })();
  }, [auth]);

  /*  Comprobación para devolver null mientras la app
      aun esta obteniendo los datos */
  if (user === undefined) return null;

  // redireccionamiento a la home si auth no existe y user no existe
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Addresses />
    </BasicLayout>
  );
}

// Componente del formulario de datos del user
function Configuration({ user, logout, setReloadUser }) {
  return (
    <div className="account__configuration">
      <div className="title">Configuración</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordForm user={user} logout={logout} />
      </div>
    </div>
  );
}

// componente de direcciones
function Addresses() {
  const [showModal, setShowModal] = useState(false); //activa el modal
  const [titleModal, setTitleModal] = useState(""); //setea el titulo del modal
  const [formModal, setFormModal] = useState(null); //contiene los datos del form
  const [reloadAddress, setReloadAddress] = useState(false); //actualiza las direcciones en el dom

  // fn para abrir el modal
  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddress={setReloadAddress}
        newAddress={address ? false : true} //Si el param address existe
        address={address || null} //envio de la direccion si existe
      />
    );
    setShowModal(true);
  };

  return (
    <div className="account__addresses">
      {/* titulo de la sección */}
      <div className="title">
        Direcciones
        {/* boton para cargar nuevas direcciones */}
        <Icon name="plus" link onClick={() => openModal("Nueva Dirección")} />
      </div>
      {/* render de las direcciones ya cargadas */}
      <div className="data">
        <ListAddress
          setReloadAddress={setReloadAddress}
          reloadAddress={reloadAddress}
          openModal={openModal}
        />
      </div>

      {/* modal precargado */}
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
