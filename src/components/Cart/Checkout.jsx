import React, { useContext, useState } from 'react'
import { CartContext } from '../Context/CartContext';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';


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