import { rest } from "lodash";
import { BASE_PATH } from "../utils/constants";

// fn para recuperar el listado de juegos
export async function getLastGamesApi(limit) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItem = "_sort=createdAt:desc";
    const url = `${BASE_PATH}/games?${limitItems}&${sortItem}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// fn para recibir los juegos segun la plataforma
/*  Los parametros que recibira seran: la plataforma 
    el limit(cantidad de juegos por pagina)
    start(a partir de que indice, para paginar los juegos)*/
export async function getGamesPlatformApi(platform, limit, start) {
  try {
    const limitItems = `_limit=${limit}`; //cantidad de juegos
    const sortItems = `_sort=createdAt:desc`; //orden descendente por creación
    const startItems = `_start=${start}`; //indice de paginación
    const url = `${BASE_PATH}/games?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// fn para recuperar el numero total de juegos por plataforma
export async function getTotalGamesPlatformApi(platform) {
  try {
    const url = `${BASE_PATH}/games/count?platform.url=${platform}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// fn para recibir los datos de un game
export async function getGameByUrlApi(path) {
  try {
    const url = `${BASE_PATH}/games?url=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// fn para la busqueda de juegos por titulo
export async function searchGamesApi(title) {
  try {
    const url = `${BASE_PATH}/games?_q=${title}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
