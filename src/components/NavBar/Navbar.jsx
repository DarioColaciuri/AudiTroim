import React, { useState } from 'react';
import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';
import './CSS_NavBar/Navbar.css';

export default function Navbar() {
    const [activarBoton, setActivarBoton] = useState(null);

    const hacerClick = (id) => {
    setActivarBoton(id);
    };

return (
    <div>
    <nav>
        <div id="menu-categorias" className="menu-wrapper">
        <ul className="menu">
            <li><Link to="/"><img className="logo" src="./src/assets/logo.png" alt="logo" onClick={() => hacerClick('todos')} /></Link></li>
            <li><Link to="/"><h1 className="logo-text" onClick={() => hacerClick('todos')}>AUDITROIM</h1></Link></li>
            <li><Link to="/"><button id="todos" className={`boton-menu boton-categoria ${activarBoton === 'todos' ? 'active' : ''}`} onClick={() => hacerClick('todos')}><img className="hand" src="./src/assets/hand.png" alt="hand icon" /> Todos</button></Link></li>
            <li><Link to="/productos/guitarras"><button id="guitarras" className={`boton-menu boton-categoria ${activarBoton === 'guitarras' ? 'active' : ''}`} onClick={() => hacerClick('guitarras')}><img className="guitar" src="./src/assets/guitar.png" alt="guitar icon" />Guitarras</button></Link></li>
            <li><Link to="/productos/bajos"><button id="bajos" className={`boton-menu boton-categoria ${activarBoton === 'bajos' ? 'active' : ''}`} onClick={() => hacerClick('bajos')}><img className="bass" src="./src/assets/bass.png" alt="bass icon" />Bajos</button></Link></li>
            <li><Link to="/productos/electronica"><button id="electronica" className={`boton-menu boton-categoria ${activarBoton === 'electronica' ? 'active' : ''}`} onClick={() => hacerClick('electronica')}><img className="electronic" src="./src/assets/electronic.png" alt="electronic icon" />Electronica</button></Link></li>
            <CartWidget hacerClick={hacerClick} activarBoton={activarBoton}/>
        </ul>
        </div>
    </nav>
    </div>
);
}

