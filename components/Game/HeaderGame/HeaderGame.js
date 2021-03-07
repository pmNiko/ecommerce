import React, { useState, useEffect } from "react";
import { size } from "lodash";
import classNames from "classnames";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../../api/favorite";
import useAuth from "../../../hooks/useAuth";

// render del componente header del game
export default function HeaderGame({ game }) {
  const { poster, title } = game;

  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </Grid.Column>
    </Grid>
  );
}

// render de la info del juego
function Info({ game }) {
  const { title, summary, price, discount } = game;
  const [isFavorite, setIsFavorite] = useState(false); //validación de juego favorito
  const [reloadFavorite, setReloadFavorite] = useState(false); //lanza la recarga mediante useEffect
  const [loadingFavorite, setloadingFavorite] = useState(false); //spiner de añadiendo a favorito
  const { auth, logout } = useAuth();

  // fn agrega un juego a favoritos del usuario
  const addFavorite = async () => {
    if (auth) {
      setloadingFavorite(true);
      await addFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(true);
    }
  };

  // fn quita un juego de favoritos del usuario
  const deleteFavorite = async () => {
    if (auth) {
      setloadingFavorite(true);
      await deleteFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(true);
    }
  };

  // hook se encarga de refrescar la opción de favoritos
  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth.idUser, game.id, logout);
      if (size(response) > 0) setIsFavorite(true);
      else setIsFavorite(false);
    })();
    setReloadFavorite(false); //vuelve al estado inicial
    setloadingFavorite(false);
  }, [game, reloadFavorite]); //cada vez que el juego cambie

  return (
    <>
      <div className="header-game__title">
        {title}
        <Icon
          name={isFavorite ? "heart" : "heart outline"} //relleno o vacio según condición
          className={classNames({ like: isFavorite })} //lo colorea si esta como favorito
          link
          onClick={isFavorite ? deleteFavorite : addFavorite}
          loading={loadingFavorite}
        />
      </div>
      <div className="header-game__delivery">Entrega en 24/48 hs</div>
      <div
        className="header-game__summary"
        // con esta fn tranformamos de html a texto
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>Precio de venta al publico ${price}</p>
          <div className="header-game__buy-price-actions">
            <p>-{discount}%</p>
            <p>${price - Math.floor(price * discount) / 100}</p>
          </div>
        </div>
        <Button className="header-game__buy-btn">Comprar</Button>
      </div>
    </>
  );
}
