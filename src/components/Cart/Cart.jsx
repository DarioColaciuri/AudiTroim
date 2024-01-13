import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import "./CSS_Cart/Cart.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cart, setCart, precioTotal, vaciar } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  const vaciarBtn = () => {
    vaciar();
  };

  const borrar = (productId) => {
    const nuevoCarrito = cart.filter((prod) => prod.id !== productId);
    setCart(nuevoCarrito);
  };

  const comprarBtnClick = () => {
    if (user) {
      navigate("/checkout");
    } else {
      toast.error("Para realizar una compra, inicia sesion.");
    }
  };

  return (
    <div className="producto-detail-container">
      <h2 className="producto-detail-titulo">Cart</h2>
      {cart.map((prod) => (
        <div
          className="producto-container producto-container-cart"
          key={prod.id}
        >
          <img
            className="producto-imagen-cart"
            src={prod.image}
            alt={prod.title}
          />
          <h2>{prod.title}</h2>
          <p>${prod.price * prod.contador}</p>
          <p>Cantidad: {prod.contador}</p>
          <button className="eliminar-btn" onClick={() => borrar(prod.id)}>
            <img
              className="hand"
              src="cross.png"
              alt="hand icon"
            />
          </button>
        </div>
      ))}
      {cart.length > 0 ? (
        <>
          <h2 className="precio-total">Precio total: ${precioTotal()}</h2>
          <div className="container-btn-cart">
            <button className="vaciar-btn" onClick={vaciarBtn}>
              Vaciar
            </button>
            <button className="comprar-btn" onClick={comprarBtnClick}>
              Comprar
            </button>
          </div>
        </>
      ) : (
        <h2>No hay productos agregados.</h2>
      )}
    </div>
  );
};

export default Cart;
