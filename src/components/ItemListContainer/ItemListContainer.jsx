import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, addDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import { aMayuscula } from "../extras/aMayuscula";
import Loader from "../Loader/Loader";
import "./CSS_ItemListContainer/ItemList.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [title, setTitle] = useState("Productos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const category = useParams().category;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const productosRef = collection(db, "productos");
      const q = category ? query(productosRef, where("category", "==", category)) : productosRef;
      try {
        const resp = await getDocs(q);
        setProductos(
          resp.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
        setTitle(category ? aMayuscula(category) : "Productos");
        setError(null);
      } catch (error) {
        setError("Error al cargar los productos. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  const addToFavorites = async (productId) => {
    try {
      setLoading(true);
      const user = auth.currentUser;

      if (!user) {
        toast.error("Por favor, inicie sesión para añadir a favoritos.");
        return;
      }

      const productosRef = doc(db, "productos", productId);
      const productosSnapshot = await getDoc(productosRef);

      if (!productosSnapshot.exists()) {
        toast.error("Error al añadir a favoritos. Producto no válido.");
        return;
      }

      const productData = productosSnapshot.data();
      const favoritosRef = collection(db, "favoritos");
      const querySnapshot = await getDocs(
        query(favoritosRef, where("productId", "==", productId), where("userEmail", "==", user.email))
      );

      if (!querySnapshot.empty) {
        toast.error("Este producto ya está en tu lista.");
        return;
      }

      const nuevoFavorito = {
        productId: productId,
        title: productData.title,
        price: productData.price,
        image: productData.image,
        userEmail: user.email,
      };

      const docRef = await addDoc(favoritosRef, nuevoFavorito);
      toast.success(`Añadiste "${productData.title}" a favoritos`);
    } catch (error) {
      toast.error("Error al añadir a favoritos, por favor inicie sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && !error ? (
        <Loader />
      ) : error ? (
        <h1 className="error">{error}</h1>
      ) : (
        <ItemList
          productos={productos}
          title={title}
          addToFavorites={addToFavorites}
        />
      )}
    </div>
  );
};

export default ItemListContainer;
