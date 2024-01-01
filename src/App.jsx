import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { CartProvider } from './components/Context/CartContext';
import Cart from './components/Cart/Cart';

function App() {

  return (
    <div>
      <CartProvider>
        <BrowserRouter>

          <Navbar />

          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/productos" element={<ItemListContainer/>} />
            <Route path="/productos/:category" element={<ItemListContainer/>} />
            <Route path="/cart" element={<Cart/>} />
          </Routes>
          
        </BrowserRouter>
      </CartProvider>
    </div>
  )
}

export default App
