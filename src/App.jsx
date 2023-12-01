import React from 'react';
import './App.css';
import ItemListContainer from './components/ItemListContainer';
import Navbar from './components/navbar';

function App() {

  let greeting = "Inserte productos aqui"

  return (
    <div>
      <Navbar />
      <ItemListContainer greeting={greeting}/>
    </div>
  )
}

export default App
