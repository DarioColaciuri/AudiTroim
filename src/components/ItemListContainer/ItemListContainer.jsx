import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import pedirProductos from "../extras/pedirProductos";
import { useParams } from "react-router-dom";


const ItemListContainer = () => {

  const [productos, setProductos] = useState([]);
  const [title, setTitle] = useState("Productos");
  const category = useParams().category;

  useEffect (() => {
    pedirProductos()
      .then((res) => {
        if (category) {
          setProductos(res.filter((prod) => prod.category === category));
          setTitle(category);
        } else {
          setProductos(res);
          setTitle("Productos")
        }

      })
  }, [category])

  return (
    <div>
      <ItemList productos={productos} title={title} />
    </div>
  )
}

export default ItemListContainer