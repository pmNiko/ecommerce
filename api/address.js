import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

// fn para agregar nuevas direcciones al user
export async function createAddressApi(address, logout) {
  try {
    const url = `${BASE_PATH}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// fn para recuperar todas las direciones del user
export async function getAddressApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/addresses?users_permissions_user=${idUser}`;
    const result = await authFetch(url, null, logout); //se pasa null en los params
    if (result.statusCode === 500) throw "Error del servidor";
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
