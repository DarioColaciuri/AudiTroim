import React, { useState, useEffect } from 'react'
import { pedirItemPorId } from '../extras/pedirProductos';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {

    const [item, setItem] = useState(null);
    const id = useParams().id;
    const [contador, setContador] = useState(1);

    useEffect(() => {
        pedirItemPorId(Number(id))
        .then((res) => {
            setItem(res);
        })
    }, [id])
    

  return (
    <div>
        {item && <ItemDetail item={item} contador={contador} setContador={setContador} />}
    </div>
  )
}

export default ItemDetailContainer