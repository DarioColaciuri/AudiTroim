import './CSS_ItemDetailContainer/ItemDetail.css';
import { aMayuscula } from "../extras/aMayuscula";
import { useState } from 'react';

const ItemDetail = ( {item, contador, setContador} ) => {

    

    const mostrarMensaje = () => {
        alert(`Agregaste ${contador} unidades al carrito`)
    }

const sumar = () => {
    if (contador < 5) {
        setContador(contador + 1)
    }
}

const restar = () => {
    if (contador > 1) {
        setContador(contador - 1)
    }
}

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
        <div className="comprar">
            <button className='menos-btn' onClick={restar}>-</button>
            <button className='añadir-btn' onClick={mostrarMensaje}>Comprar {contador}</button>
            <button className='mas-btn' onClick={sumar}>+</button>
        </div>
        <p className="producto-detail-descripcion">{item.description}</p>
    </div>
)
}

export default ItemDetail