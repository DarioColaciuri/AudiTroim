import React, { useContext, useState } from 'react'
import { CartContext } from '../Context/CartContext';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './CSS_Cart/Checkout.css';
import { Link } from 'react-router-dom';


const CheckOut = () => {

  const { register, handleSubmit } = useForm();
  const [pedidoId, setPedidoId] = useState("");
  const { cart, precioTotal, vaciar } = useContext(CartContext);

  const comprar = (data) => {
    const pedido = {
      cliente: data,
      productos: cart,
      total: precioTotal(),
    }
    const pedidosRef = collection(db, "pedidos");

    addDoc(pedidosRef, pedido)
      .then((doc) => {
        setPedidoId(doc.id)
        vaciar()
      })   
  }

  if(pedidoId) {
    return (
      <div className="producto-detail-container">
        <h2 className="producto-detail-titulo">Muchas gracias por tu compra!</h2>
        <p>Tu numero de pedido es: {pedidoId}</p>
    </div>
    )
  }



  return (
    <div className="producto-detail-container">
        <h2 className="producto-detail-titulo">CheckOut</h2>

        <div className='resumen'>
        {
            cart.map((prod) => (
                <div className='producto-resumen' key={prod.id}>
                    <h2>{prod.title}</h2>
                    <p>${prod.price * prod.contador}</p>
                    <p>Cantidad: {prod.contador}</p>
                </div>
            ))
        }
          <Link to="/cart"><button className='cambios-btn'>Realizar cambios</button></Link>
        </div>
        <form className="formulario" onSubmit={handleSubmit(comprar)}>
          <input type="text" placeholder='Nombre' {...register("nombre")} />
          <input type="email" placeholder='Email' {...register("email")} />
          <input type="phone" placeholder='Telefono' {...register("telefono")} />
          <button className='enviar' type='submit'>Finalizar compra</button>

        </form>
    

    </div>
  )
}

export default CheckOut