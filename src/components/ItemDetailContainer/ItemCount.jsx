import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemCount = ({ contador, setContador, item }) => {
  const { agregar } = useContext(CartContext);

  const sumar = () => {
    contador < 5 && setContador(contador + 1);
  };

  const restar = () => {
    contador > 1 && setContador(contador - 1);
  };

  const handleComprar = () => {
    toast.success(`Añadiste ${contador} ${item.title} al carrito`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    agregar(item, contador);
    setContador(1);
  };

  return (
    <div className="comprar-component">
      <button className="menos-btn" onClick={restar}>
        -
      </button>
      <button className="añadir-btn" onClick={handleComprar}>
        Comprar {contador}
      </button>
      <button className="mas-btn" onClick={sumar}>
        +
      </button>
    </div>
  );
};

export default ItemCount;
