import { getToken, hasExpiredToken } from "../api/token";

// fn para peticiones protegidas al servidor
export async function authFetch(url, params, logout) {
  const token = getToken();

  if (!token) {
    // user no logueado
    logout();
  } else {
    if (hasExpiredToken(token)) {
      //token caducado
      logout();
    } else {
      // construccion de los params temporales
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`, //Bearer formato que permite la autorizacion en conjunto con la auth
        },
      };

      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        return error;
      }
    }
  }
}
