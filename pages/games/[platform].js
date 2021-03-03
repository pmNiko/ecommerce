import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../../layouts/BasicLayout";
import { getGamesPlatformApi, getTotalGamesPlatformApi } from "../../api/game";
import ListGames from "../../components/ListGames";
import Pagination from "../../components/Pagination";

// limite por pagina
const limitPerPage = 3;

export default function Platform() {
  const { query } = useRouter(); //de router resupero query

  const [games, setGames] = useState(null); //state de juegos
  const [totalGames, setTotalGames] = useState(null); //cantidad de juegos

  // fn para la paginación
  const getStartItems = () => {
    const currentPages = parseInt(query.page);
    // si query.page no existe o currentPages es 1 inicia por el item 0
    if (!query.page || currentPages === 1) return 0;
    // calculo de la pagina actual por el limit menos el limit
    else return currentPages * limitPerPage - limitPerPage;
  };

  // se encarga de actualizar el state de juegos
  useEffect(() => {
    (async () => {
      if (query.platform) {
        const response = await getGamesPlatformApi(
          query.platform,
          limitPerPage,
          getStartItems()
        );
        setGames(response);
      }
    })();
  }, [query]);

  // recupera la cantidad de juegos por plataforma
  useEffect(() => {
    (async () => {
      const response = await getTotalGamesPlatformApi(query.platform);
      setTotalGames(response);
    })();
  }, [query]);

  return (
    <BasicLayout className="platform">
      {!games && <Loader active>Cargando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos.</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}

      {totalGames ? (
        <Pagination
          totalGames={totalGames}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
