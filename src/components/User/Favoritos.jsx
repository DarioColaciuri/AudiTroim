import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import Loader from "../Loader/Loader";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        setLoading(true);

        if (user) {
          const favoritosRef = collection(db, "favoritos");
          const q = query(favoritosRef, where("userEmail", "==", user.email));
          const querySnapshot = await getDocs(q);

          const favoritosData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setFavoritos(favoritosData);
        }
      } catch (error) {
        console.error("Error al obtener favoritos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, [user]);

  const eliminarFavorito = async (favoritoId) => {
    try {
      setLoading(true);

      const favoritoRef = doc(db, "favoritos", favoritoId);
      await deleteDoc(favoritoRef);

      const nuevosFavoritos = favoritos.filter((favorito) => favorito.id !== favoritoId);

      setFavoritos(nuevosFavoritos);
    } catch (error) {
      console.error("Error al eliminar favorito: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="historial-container">
      <h1>Tus Favoritos</h1>
      {favoritos.length === 0 ? (
        <p>No tienes productos en favoritos.</p>
      ) : (
        <ul className="favoritos-container">
          {favoritos.map((favorito) => (
            <li className="producto-container" key={favorito.id}>
              <h3>{favorito.title}</h3>
              <img className="imagen-historial" src={favorito.image} alt={favorito.title}/>
              <p>Precio: ${favorito.price}</p>
              <button className="eliminar-btn" onClick={() => eliminarFavorito(favorito.id)}>
                <img className="hand" src="./src/assets/cross.png" alt="hand icon"/>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favoritos;
