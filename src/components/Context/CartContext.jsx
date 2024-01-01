import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const cartLS = JSON.parse(localStorage.getItem("cart")) || [];

export const CartProvider = ( {children} ) => {
    const [cart, setCart] = useState(cartLS);

    const agregar = (item, contador) => {
    const agregado = { ...item, contador };

    const newCart = [...cart];
    const productoRepetido = newCart.find(
    (producto) => producto.id === agregado.id
    );

    if (productoRepetido) {
    productoRepetido.contador += contador;
    } else {
    newCart.push(agregado);
    }
    setCart(newCart);
};

const cartNumber = () => {
    return cart.reduce((acc, prod) => acc + prod.contador, 0);
};

const precioTotal = () => {
    return cart.reduce((acc, prod) => acc + prod.price * prod.contador, 0);
};

const vaciar = () => {
    setCart([]);
};

useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
}, [cart])


return (
    <CartContext.Provider value={ {cart, agregar, cartNumber, precioTotal, vaciar} } >
        {children}
    </CartContext.Provider>
)
};
