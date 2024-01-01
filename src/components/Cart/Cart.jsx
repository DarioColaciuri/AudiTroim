import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import { Link } from 'react-router-dom';
import './CSS_Cart/Cart.css';

const Cart = () => {

    const { cart, setCart, precioTotal, vaciar } = useContext(CartContext);
    const vaciarBtn = () => {
        vaciar();
    }

    const borrar = (productId) => {
        const nuevoCarrito = cart.filter(prod => prod.id !== productId);
        setCart(nuevoCarrito); 
    }

return (
    <div className="producto-detail-container">
        <h2 className="producto-detail-titulo">Cart</h2>

        {
            cart.map((prod) => (
                <div className='producto-container producto-container-cart' key={prod.id}>
                    <img className="producto-imagen-cart" src={prod.image} alt={prod.title}/>
                    <h2>{prod.title}</h2>
                    <p>${prod.price * prod.contador}</p>
                    <p>Cantidad: {prod.contador}</p>
                    <button className='eliminar-btn' onClick={() => borrar(prod.id)}><img className="hand" src="./src/assets/cross.png" alt="hand icon" /></button>
                </div>
            ))
        }

        { 
        cart.length > 0 ?
        <>
        <h2 className='precio-total'>Precio total: ${precioTotal()}</h2>
        <div className='container-btn-cart'>
            <button className='vaciar-btn' onClick={vaciarBtn}>Vaciar</button>
            <Link to="/checkout"><button className='comprar-btn'>Comprar</button></Link>
        </div>
        </> :
        <h2>No hay productos agregados.</h2>
        }


        
    </div>
)
}

export default Cart