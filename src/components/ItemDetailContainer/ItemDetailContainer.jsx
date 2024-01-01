import React, { useState, useEffect } from 'react'
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';

const ItemDetailContainer = () => {

    const [item, setItem] = useState(null);
    const id = useParams().id;
    const [contador, setContador] = useState(1);

    useEffect(() => {

      const docRef = doc(db, "productos", id);
      getDoc(docRef)
        .then((resp) => {
          setItem(
            { ...resp.data(), id: resp.id}
          )

        })

    }, [id])
    

  return (
    <div>
        {item && <ItemDetail item={item} contador={contador} setContador={setContador} />}
    </div>
  )
}

export default ItemDetailContainer