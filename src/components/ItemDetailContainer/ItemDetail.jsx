import React, { useState } from "react";
import "./CSS_ItemDetailContainer/ItemDetail.css";
import { aMayuscula } from "../extras/aMayuscula";
import ItemCount from "./ItemCount";

const ItemDetail = ({ item, contador, setContador }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  return (
    <div className="producto-detail-container">
      <h2 className="producto-detail-titulo">{item.title}</h2>
      <div className="detalle-container">
        <div className="slider">
          <button className="slider-btn" onClick={prevImage}>◀</button>
          <img className="producto-detail-imagen" src={item[`img${currentImageIndex + 1}`]} alt={item.title}/>
          <button className="slider-btn" onClick={nextImage}>▶</button>
        </div>
        <div className="aside">
          <div className="precio-container">
            <span className="aclaracion">Precio:</span>
            <p className="producto-detail-precio">${item.price}</p>
          </div>
          <div className="categoria-container">
            <span className="aclaracion">Categoria:</span>
            <p className="producto-detail-categoria">{aMayuscula(item.category)}</p>
          </div>
          <ItemCount contador={contador} setContador={setContador} item={item}/>
        </div>
      </div>
      <p className="producto-detail-descripcion">{item.description}</p>
    </div>
  );
};

export default ItemDetail;
