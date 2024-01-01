import { Link } from 'react-router-dom';
import './CSS_NavBar/CartWidget.css';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

const CartWidget = ( { hacerClick, activarBoton } ) => {

  const { cartNumber } = useContext(CartContext);

  return (
    <div>
      <Link to="/cart">
      <button className={`boton-menu boton-carrito ${activarBoton === 'cart' ? 'active' : ''}`}
      href="" onClick={() => {hacerClick('cart')}}>
      <img className="cart" src="./src/assets/cart.png" alt="cart icon" />Cart 
      <span id="numerito" className="numerito">{cartNumber()}</span></button>
      </Link>
    </div>
  )
}

export default CartWidget


