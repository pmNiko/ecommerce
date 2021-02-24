import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";

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
      </div>
    </div>
  );
}
