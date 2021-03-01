import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../../layouts/BasicLayout";
import { getGamesPlatformApi } from "../../api/game";

// limite por pagina
const limitPerPage = 10;

export default function Platform() {
  const { query } = useRouter(); //de router resupero query

  const [games, setGames] = useState(null); //state de juegos

  // se encarga de actualizar el state de juegos
  useEffect(() => {
    (async () => {
      const response = await getGamesPlatformApi(
        query.platform,
        limitPerPage,
        0
      );
      setGames(response);
    })();
  }, [query]);

  return (
    <BasicLayout className="platform">
      <h1>Estamos en la plataformas {query.platform}</h1>
    </BasicLayout>
  );
}
