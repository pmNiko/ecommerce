import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { size } from "lodash";

// fn para comprobar si un juego esta como favorito de un usuario
export async function isFavoriteApi(idUser, idGame, logout) {
  try {
    const url = `${BASE_PATH}/favorites?users_permissions_user=${idUser}&game=${idGame}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
}

// fn para agregar a favoritos de un usuario
export async function addFavoriteApi(idUser, idGame, logout) {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    if (size(dataFound > 0 || !dataFound)) {
      return "Este juego ya lo tienes añadido.";
    } else {
      const url = `${BASE_PATH}/favorites`;
      const params = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ users_permissions_user: idUser, game: idGame }),
      };
      const result = await authFetch(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
