import Item from "./Item";
import { aMayuscula } from "../extras/aMayuscula";
import './CSS_ItemListContainer/ItemList.css';

const ItemList = ( {productos, title} ) => {
  return (
    <div className="productos-frame">
      <h1 className="titulo-productos">{aMayuscula(title)}</h1>
        <div className="productos-container">
        {
          productos.length > 0 &&
          productos.map((producto) => {
            return (
              <Item producto={producto} key={producto.id}/>
            )
          })
        }
        </div>
    </div>
  )
}

export default ItemList;