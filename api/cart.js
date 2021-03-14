import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constants";

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
