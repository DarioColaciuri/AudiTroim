import { Link } from "react-router-dom"
import './CSS_ItemListContainer/Item.css';

const Item = ({producto}) => {
  return (
    <div className="producto-container">
        <h2 className="producto-titulo">{producto.title}</h2>
        <img className="producto-imagen" src={producto.image} alt={producto.title}/>
        <p className="producto-precio">${producto.price}</p>
        <Link className="ver-mas" to={`/item/${producto.id}`}>Ver mas</Link>
    </div>
  )
}

export default Item