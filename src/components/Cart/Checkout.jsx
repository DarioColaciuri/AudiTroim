import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./CSS_Cart/Checkout.css";

const CheckOut = () => {
  const [pedidoId, setPedidoId] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { cart, precioTotal, vaciar } = useContext(CartContext);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  const comprar = () => {
    setLoading(true);

    const pedido = {
      cliente: {
        email: user.email,
      },
      productos: cart,
      total: precioTotal(),
    };

    const pedidosRef = collection(db, "pedidos");

    addDoc(pedidosRef, pedido)
      .then((doc) => {
        setPedidoId(doc.id);
        vaciar();
      })
      .catch((error) => {
        console.error("Error al procesar la compra: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!user) {
    return (
      <div className="producto-detail-container">
        <h2 className="producto-detail-titulo">
          Esto no deberia pasar. Intenta iniciar sesion nuevamente.
        </h2>
        <iframe
          src="https://giphy.com/embed/NTur7XlVDUdqM"
          width="480"
          height="270"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
        <a href="https://giphy.com/gifs/trump-consequences-NTur7XlVDUdqM"></a>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (pedidoId) {
    return (
      <div className="producto-detail-container">
        <h2 className="producto-detail-titulo">
          Muchas gracias por tu compra!
        </h2>
        <div className="pedido-container">
          <p className="pedido-texto">Tu numero de pedido es:</p>
          <strong className="numero-pedido">{pedidoId}</strong>
        </div>
      </div>
    );
  }

  return (
    <div className="producto-detail-container">
      <h2 className="producto-detail-titulo">CheckOut</h2>

      <div className="resumen">
        {cart.map((prod) => (
          <div className="producto-resumen" key={prod.id}>
            <h2>{prod.title}</h2>
            <p>${prod.price * prod.contador}</p>
            <p>Cantidad: {prod.contador}</p>
          </div>
        ))}
        <Link to="/cart">
          <button className="cambios-btn">Realizar cambios</button>
        </Link>
      </div>

      <button className="enviar" onClick={comprar}>
        Finalizar compra
      </button>
    </div>
  );
};

export default CheckOut;
