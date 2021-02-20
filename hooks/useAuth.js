import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// exportamos a traves del hook la definición del contexto creado
export default () => useContext(AuthContext);
