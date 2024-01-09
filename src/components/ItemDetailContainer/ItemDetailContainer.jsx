import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../Loader/Loader";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = useParams().id;
  const [contador, setContador] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const docRef = doc(db, "productos", id);
      try {
        const resp = await getDoc(docRef);
        setItem({
          ...resp.data(),
          id: resp.id,
        });
      } catch (error) {
        console.error("Error al cargar el detalle del producto: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {loading ? (<Loader />) : (item && (<ItemDetail item={item} contador={contador} setContador={setContador}/>))}
    </div>
  );
};

export default ItemDetailContainer;
