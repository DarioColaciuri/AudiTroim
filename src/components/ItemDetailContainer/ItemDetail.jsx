import './CSS_ItemDetailContainer/ItemDetail.css';
import { aMayuscula } from "../extras/aMayuscula";
import ItemCount from './ItemCount';


const ItemDetail = ( {item, contador, setContador} ) => {

return (
    <div className="producto-detail-container">
        <h2 className="producto-detail-titulo">{item.title}</h2>
        <img className="producto-detail-imagen" src={item.image} alt={item.title}/>
        <div className='detalle-container'>
            <div className='precio-container'>
                <span className="aclaracion">Precio:</span>
                <p className="producto-detail-precio">${item.price}</p>
            </div>
            <div className='categoria-container'>
                <span className="aclaracion">Categoria:</span>
                <p className="producto-detail-categoria">{aMayuscula(item.category)}</p>
            </div>
        </div>
        <ItemCount contador={contador} setContador={setContador} item={item} />
        <p className="producto-detail-descripcion">{item.description}</p>
    </div>
)
}

export default ItemDetail