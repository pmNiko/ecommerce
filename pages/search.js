import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { searchGamesApi } from "../api/game";
import ListGames from "../components/ListGames";
import Seo from "../components/Seo";

export default function search() {
  const [games, setGames] = useState(null);
  const { query } = useRouter();

  // al cargar el componente hara foco en el input de busqueda
  useEffect(() => {
    document.getElementById("search-game").focus();
  }, []);

  // hara la petición cada vez que query cambie
  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        //si la busqueda es distinta de vacio
        const response = await searchGamesApi(query.query);
        // si la busqueda tiene resultados
        if (size(response) > 0) setGames(response);
        else setGames([]);
      } else {
        setGames([]);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
      <Seo title={`Buscando: ${query.query}`} />
      {!games && <Loader active>Buscando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No se han encontrado juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
