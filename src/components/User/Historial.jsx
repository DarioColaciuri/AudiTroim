import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import "./CSS_user/Historial.css";
import Loader from "../Loader/Loader";

const Historial = () => {
  const [historialCompras, setHistorialCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const q = query(collection(db, "pedidos"),
            where("cliente.email", "==", user.email)
          );

          const querySnapshot = await getDocs(q);
          const compras = [];

          querySnapshot.forEach((doc) => {
            const compra = {
              id: doc.id,
              ...doc.data(),
            };
            compras.push(compra);
          });
          setHistorialCompras(compras);
        }
      } catch (error) {
        setError("Error al obtener el historial de compras.");
      } finally {
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="historial-container">
      {error ? (
        <div className="error-container">
          <h1 className="titulo-error">Error</h1>
          <p>{error}</p>
          <iframe
          src="https://giphy.com/embed/NTur7XlVDUdqM"
          width="480"
          height="270"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
        </div>
      ) : (
        <>
          <h1 className="titulo-historial">Historial de Compras</h1>
          {historialCompras.length === 0 ? (
            <p>No hay compras realizadas.</p>
          ) : (
            <ul>
              {historialCompras.map((compra) => {
                const precioTotalCompra = compra.productos.reduce((total, producto) => {
                  return total + producto.price * producto.contador;
                }, 0);

                return (
                  <li className="compra-container" key={compra.id}>
                    <div className="producto-container">
                      <h2>ID de Compra: <strong>{compra.id}</strong></h2>
                    </div>
                    <ul className="productos-container">
                      {compra.productos.map((producto) => (
                        <li className="producto-container" key={producto.id}>
                          <h3>Producto: {producto.title}</h3>
                          <img className="imagen-historial" src={producto.image} alt={producto.title} />
                          <p>Cantidad: {producto.contador}</p>
                          <p>Precio unitario: ${producto.price}</p>
                        </li>
                      ))}
                    </ul>
                    <p className="producto-container">Precio Total de la Compra: ${precioTotalCompra}</p>
                    <div className="separador"></div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Historial;
