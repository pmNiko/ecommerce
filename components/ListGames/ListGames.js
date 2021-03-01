import { map } from "lodash";
import React from "react";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
import {
  breackpointUpSm,
  breackpointUpMd,
  breackpointUpLg,
} from "../../utils/brackpoint";

export default function ListGames({ games }) {
  //custom hook para capturar el tamaño de la pantalla
  const { width } = useWindowSize();

  // fn para devolver la cantidad de columns segun el tamaño
  const getColumnsRender = () => {
    switch (true) {
      case width > breackpointUpLg: //desktop
        return 5;
      case width > breackpointUpMd: //tablet
        return 3;
      case width > breackpointUpSm: //mobil
        return 2;
      default:
        //mobil
        return 1;
    }
  };

  return (
    <div className="list-games">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(games, (game) => (
            <Game game={game} key={game._id} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

// componente de juego
function Game({ game }) {
  return (
    <Grid.Column className="list-games__game">
      <Link href={`/${game.url}`}>
        <a>
          <div className="list-games__game-poster">
            <Image src={game.poster.url} alt={game.title} />
            <div className="list-games__game-poster-info">
              {game.discount ? (
                <span className="discount">-{game.discount}%</span>
              ) : (
                <span></span>
              )}

              <span className="price">${game.price}</span>
            </div>
          </div>
          <h2>{game.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
}
