import React from "react";
import { Pagination as PaginationSU } from "semantic-ui-react";
import { useRouter } from "next/router";
import queryString from "query-string";

// Componente de paginación
export default function Pagination({ totalGames, page, limitPerPage }) {
  // Math.ceil redondea el numero de paginas
  const totalPages = Math.ceil(totalGames / limitPerPage);

  // obtenemos los datos de la url y redireccionamos con push()
  // prop necesaria: asPath: "/games/[platform]"
  const router = useRouter();

  // construcción de la url de la pagina clickeada
  const urlParse = queryString.parseUrl(router.asPath);

  const goToPage = (newPage) => {
    // agrego al asPath la prop page: asPath: "/games/[platform]/page=[newPage]"
    urlParse.query.page = newPage;
    // parseamos la url para obtener la url como string
    const url = queryString.stringifyUrl(urlParse);
    router.push(url); //redireccionamos
  };

  return (
    <div className="pagination">
      <PaginationSU
        defaultActivePage={page}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
        onPageChange={(_, data) => goToPage(data.activePage)} //devuelve la pagina seleccionada
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={1}
      />
    </div>
  );
}
