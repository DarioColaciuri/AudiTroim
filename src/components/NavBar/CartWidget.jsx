import { Link, useLocation } from "react-router-dom";
import "./CSS_NavBar/CartWidget.css";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartWidget = ({ hacerClick, activarBoton }) => {
  const { cartNumber, cart } = useContext(CartContext);
  const location = useLocation();

  const handleClick = () => {
    if (cart.length === 0) {
      toast.error("El carrito está vacío", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      hacerClick("cart");
    }
  };

  const isCartPage = location.pathname === "/cart";

  return (
    <div>
      <Link to={cart.length > 0 ? "/cart" : "#"}>
        <button className={`boton-menu boton-carrito ${activarBoton === "cart" ? "active" : ""} ${isCartPage ? "disabled" : ""}`} onClick={handleClick} disabled={isCartPage}>
          <img className="cart" src="./src/assets/cart.png" alt="cart icon" />
          Cart
          <span id="numerito" className="numerito">{cartNumber()}</span>
        </button>
      </Link>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default CartWidget;
