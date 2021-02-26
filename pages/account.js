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
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);

  const openModal = (title) => {
    setTitleModal(title);
    setFormModal(<AddressForm setShowModal={setShowModal} />);
    setShowModal(true);
  };

  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones
        <Icon name="plus" link onClick={() => openModal("Nueva Dirección")} />
      </div>
      <div className="data">
        <ListAddress />
      </div>

      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
