import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constants";
import { authFetch } from "../utils/fetch";

// fn para obtener los productos del carrito
export function getProductsCart() {
  const cart = localStorage.getItem(CART);

  if (!cart) {
    console.log("null");
    return null;
  } else {
    // convertimos el string en un array de productos
    const products = cart.split(",");
    return products;
  }
}

// fn para agregar productos al carrito
export function addProductCart(product) {
  const cart = getProductsCart(); //Obtenemos los productos

  if (!cart) {
    //si el carrito esta vacio
    localStorage.setItem(CART, product);
    toast.success("Producto añadido al carrito");
  } else {
    //si el carrito tiene productos
    const productFound = includes(cart, product); //dentro de cart existe product?
    if (productFound) {
      toast.warning("Este productos ya esta añadido.");
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success("Producto añadido correctamente");
    }
  }
}

// fn para devolver la cantidad de productos en el carrito
export function countProductsCart() {
  const cart = getProductsCart();

  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}

// fn quitar productos del carrito
export function removeProductCart(product) {
  const cart = getProductsCart(); //recupero los items

  remove(cart, (item) => {
    return item === product; //quito el product del array
  });

  if (size(cart) > 0) {
    localStorage.setItem(CART, cart); //seteo el carrito
  } else {
    localStorage.removeItem(CART); //limpiamos el localStorage
  }
}

// fn para realizar enviar el acuerdo de pago a strapi
export async function paymentCartApi(token, products, idUser, address, logout) {
  try {
    const addressShipping = address;
    delete addressShipping.users_permissions_user; //eliminamos la propiedad que no nos interesa
    delete addressShipping.createdAt;

    const url = `${BASE_PATH}/orders`;
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        products,
        idUser,
        addressShipping,
      }),
    };

    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// fn para limpiar el carrito
export function removeAllProductsCart() {
  localStorage.removeItem(CART);
}
