import React, { useState, useEffect } from "react";
import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import "./CSS_NavBar/Navbar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [activarBoton, setActivarBoton] = useState(null);
  const [showContainer, setShowContainer] = useState(false);
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const hacerClick = (id) => {
    setActivarBoton(id);
  };

  const toggleContainer = () => {
    setShowContainer(!showContainer);
  };

  const hideContainer = () => {
    setShowContainer(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      toast.error("Error al cerrar sesion");
    }
  };

  useEffect(() => {
    hacerClick("todos");

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = loginData;
      await signInWithEmailAndPassword(auth, email, password);
      setShowContainer(false);
    } catch (error) {
      toast.error("Error al iniciar sesion. Usuario o contraseña no validos.");
    }
  };

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <nav>
        <div id="menu-categorias" className="menu-wrapper">
          <div className="usuario-container">
            {user ? (
              <>
                <div className="usuario-logueado">
                  <div className="historial-favoritos">
                    <Link to="/historial"><button className="usuario-btn"> Historial de compras</button></Link>
                    <Link to="/favoritos"><button className="usuario-btn">Productos favoritos</button></Link>
                  </div>
                  <div className="usuario-cerrar">
                    <strong>{user.email}</strong>
                    <Link to="/"><button className="usuario-btn" onClick={handleLogout}>Cerrar Sesión</button></Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button className="usuario-btn" onClick={toggleContainer}>Login</button>
                <div className={`login-container ${showContainer ? "show-container" : ""}`}>
                  <form onSubmit={handleLogin}>
                    <h2>Iniciar Sesión</h2>
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="E-mail" value={loginData.email} onChange={handleInputChange}/>
                    <label>Contraseña:</label>
                    <input type="password" name="password" placeholder="Contraseña" value={loginData.password} onChange={handleInputChange}/>
                    <button type="submit" className="iniciar">Iniciar Sesión</button>
                  </form>
                  <p>No estás registrado aún? <br></br>
                    <Link to="/signup" onClick={hideContainer} className="registrate-aqui">Regístrate aquí</Link>
                  </p>
                </div>
              </>
            )}
          </div>
          <ul className="menu">
            <li>
              <Link to="/">
                <img className="logo" src="./src/assets/logo.png" alt="logo" onClick={() => hacerClick("todos")}/>
              </Link>
            </li>
            <li>
              <Link to="/">
                <h1 className="logo-text" onClick={() => hacerClick("todos")}>AUDITROIM</h1>
              </Link>
            </li>
            <li>
              <Link to="/">
                <button id="todos" className={`boton-menu ${activarBoton === "todos" ? "active" : ""}`} onClick={() => hacerClick("todos")}>
                  <img className="hand" src="./src/assets/hand.png" alt="hand icon"/>
                  Todos
                </button>
              </Link>
            </li>
            <li>
              <Link to="/productos/guitarras">
                <button id="guitarras" className={`boton-menu ${activarBoton === "guitarras" ? "active" : ""}`} onClick={() => hacerClick("guitarras")}>
                  <img className="guitar" src="./src/assets/guitar.png" alt="guitar icon"/>
                  Guitarras
                </button>
              </Link>
            </li>
            <li>
              <Link to="/productos/bajos">
                <button id="bajos" className={`boton-menu ${activarBoton === "bajos" ? "active" : ""}`} onClick={() => hacerClick("bajos")}>
                  <img className="bass" src="./src/assets/bass.png" alt="bass icon"/>
                  Bajos
                </button>
              </Link>
            </li>
            <li>
              <Link to="/productos/electronica">
                <button id="electronica" className={`boton-menu ${activarBoton === "electronica" ? "active" : ""}`} onClick={() => hacerClick("electronica")}>
                  <img className="electronic" src="./src/assets/electronic.png" alt="electronic icon"/>
                  Electronica
                </button>
              </Link>
            </li>
            <CartWidget hacerClick={hacerClick} activarBoton={activarBoton} />
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
