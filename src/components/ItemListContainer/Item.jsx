import { Link } from "react-router-dom";
import "./CSS_ItemListContainer/Item.css";

const Item = ({ producto, addToFavorites }) => {
  const handleAddToFavorites = () => {
    addToFavorites(producto.id);
  };

  return (
    <div className="producto-container">
      <h2 className="producto-titulo">{producto.title}</h2>
      <button className="favorito-btn" onClick={handleAddToFavorites}>❤</button>
      <img className="producto-imagen" src={producto.image} alt={producto.title}/>
      <p className="producto-precio">${producto.price}</p>
      <Link className="ver-mas" to={`/item/${producto.id}`}>
        Ver mas
      </Link>
    </div>
  );
};

export default Item;
