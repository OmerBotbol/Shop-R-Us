import React, { createContext, useState } from 'react';

export const myContext = createContext({ cart: [], add: () => {} });

function CartContext({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (newItem) => {
    const index = cart.findIndex((item) => {
      return item.name === newItem.name;
    });
    if (index === -1) {
      return setCart([
        ...cart,
        { name: newItem.name, quantity: 1, price: newItem.price },
      ]);
    }
    const cartCopy = [...cart];
    cartCopy[index].quantity += 1;
    cartCopy[index].price += newItem.price;
    return setCart(cartCopy);
  };

  return (
    <myContext.Provider value={{ cart: cart, add: (item) => addToCart(item) }}>
      {children}
    </myContext.Provider>
  );
}

export default CartContext;
