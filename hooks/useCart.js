/*
  Este hook es para poder acceder a cualquier dato 
  del contexto desde cualquier punto de  nuestra app 
*/
import { useContext } from "react";
import CartContext from "../context/CartContext";

export default () => useContext(CartContext);
