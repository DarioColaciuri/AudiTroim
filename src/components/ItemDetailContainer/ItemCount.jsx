import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContext';

const ItemCount = ( {contador, setContador, item} ) => {

    const { cart, agregar } = useContext(CartContext);

const sumar = () => {
    contador < 5 && setContador(contador + 1)
}

const restar = () => {
    contador > 1 && setContador(contador - 1)
}

return (
    <div className='comprar-component'>
            <button className='menos-btn' onClick={restar}>-</button>
            <button className='añadir-btn' onClick={() => { agregar(item, contador) }}>Comprar {contador}</button>
            <button className='mas-btn' onClick={sumar}>+</button>
    </div>
)
}

export default ItemCount