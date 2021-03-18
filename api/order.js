import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

// fn para obtener todos los pedidos de un usuario
export async function getOrdersApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/orders?_sort=createdAt:desc&users_permissions_user=${idUser}`;
    const result = await authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
