import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import { Link } from 'react-router-dom';

const Cart = () => {

    const { cart, precioTotal, vaciar } = useContext(CartContext);
    const vaciarBtn = () => {
        vaciar();
    }

  return (
    <div className="producto-detail-container">
        <h2 className="producto-detail-titulo">Cart</h2>

        {
            cart.map((prod) => (
                <div key={prod.id}>
                    <h2>{prod.title}</h2>
                    <p>${prod.price * prod.contador}</p>
                    <p>Cantidad: {prod.contador}</p>
                </div>
                
                
            ))
        }

        { 
        cart.length > 0 ?
        <>
        <h2>Precio total: ${precioTotal()}</h2>
        <button onClick={vaciarBtn}>Vaciar</button>
        <Link to="/checkout">Comprar</Link>
        </> :
        <h2>No hay productos agregados.</h2>
        }


        
    </div>
  )
}

export default Cart