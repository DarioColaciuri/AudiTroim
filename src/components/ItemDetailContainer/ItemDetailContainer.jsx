import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../Loader/Loader";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = useParams().id;
  const [contador, setContador] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const docRef = doc(db, "productos", id);
      try {
        const resp = await getDoc(docRef);
        if (resp.exists()) {
          setItem({
            ...resp.data(),
            id: resp.id,
          });
        } else {
          setError("El producto no existe.");
        }
      } catch (error) {
        setError("Error al cargar el detalle del producto");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error-container">
          <h1 className="titulo-error">Error</h1>
          <p>{error}</p>
        </div>
      ) : (
        item && <ItemDetail item={item} contador={contador} setContador={setContador} />
      )}
    </div>
  );
};

export default ItemDetailContainer;
