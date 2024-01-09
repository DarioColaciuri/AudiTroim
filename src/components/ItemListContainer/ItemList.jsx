import Item from "./Item";
import "./CSS_ItemListContainer/ItemList.css";

const ItemList = ({ productos, title, addToFavorites }) => {
  return (
    <div className="productos-frame">
      <h1 className="titulo-productos">{title}</h1>
      <div className="productos-container">
        {productos.length > 0 &&
          productos.map((producto) => {
            return (
              <Item producto={producto} key={producto.id} addToFavorites={addToFavorites}/>
            );
          })}
      </div>
    </div>
  );
};

export default ItemList;
