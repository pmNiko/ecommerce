import React, { useState, useEffect } from "react";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getLastGamesApi } from "../api/game";

export default function Home() {
  const [games, setGames] = useState(null); //state de juegos

  console.log(games);
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
    <BasicLayout>
      <h1>Estamos en Next Js</h1>
    </BasicLayout>
  );
}
