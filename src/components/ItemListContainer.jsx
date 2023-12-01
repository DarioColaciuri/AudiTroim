import React from 'react'

const ItemListContainer = ( {greeting} ) => {
  return (
    <div className="greeting-container">
      <h1 className="greeting-titulo">{greeting}</h1>
    </div>
  )
}

export default ItemListContainer