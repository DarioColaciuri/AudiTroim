import React from 'react'

const CartWidget = ( { hacerClick, activarBoton } ) => {
  let numerito = 1;

  return (
    <div>
      <button className={`boton-menu boton-carrito ${activarBoton === 'cart' ? 'active' : ''}`} href="" onClick={() => {hacerClick('cart')}}><img className="cart" src="./src/assets/cart.png" alt="cart icon" />Cart <span id="numerito" className="numerito">{numerito}</span></button>
      </div>
  )
}

export default CartWidget