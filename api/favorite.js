import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { size } from "lodash";

// fn para comprobar si un juego esta como favorito de un usuario
export async function isFavoriteApi(idUser, idGame, logout) {
  try {
    const url = `${BASE_PATH}/favorites?users_permissions_user=${idUser}&game=${idGame}`;
    // devuelve un array, donde la posición 0 contiene el juego encontrado
    return await authFetch(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
}

// fn para agregar a favoritos de un usuario
export async function addFavoriteApi(idUser, idGame, logout) {
  try {
    // mediante una petición a la API validamos que el juego este añadido
    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    // si el array existe o es distinto de null
    if (size(dataFound) > 0 || !dataFound) {
      return "Este juego ya lo tienes añadido.";
    } else {
      //de lo contrario lo añadimos
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

// fn para eliminar un juego de favoritos del usuario
export async function deleteFavoriteApi(idUser, idGame, logout) {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    if (size(dataFound) > 0) {
      const favoriteId = dataFound[0]._id;
      // en la url paso el id del registro de favorito para eliminarlo
      const url = `${BASE_PATH}/favorites/${favoriteId}`;
      const params = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const result = await authFetch(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
