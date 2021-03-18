import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getLastGamesApi } from "../api/game";
import ListGames from "../components/ListGames";
import Seo from "../components/Seo";

export default function Home() {
  const [games, setGames] = useState(null); //state de juegos

  // petición a la API para recuperar los juegos
  useEffect(() => {
    (async () => {
      const response = await getLastGamesApi(50);
      if (size(response) > 0) setGames(response);
      //si existen juegos los cargamos al state
      else setGames([]); //de lo contrario cargamos un array vacio
    })();
  }, []);

  return (
    <BasicLayout className="home">
      <Seo />
      {/* spinner activo mientras se realiza la petición */}
      {!games && <Loader active>Cargando juegos</Loader>}
      {/* Si al teminar la petición no existen juegos  */}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {/* Renderización de los juegos existentes */}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
