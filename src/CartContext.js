import React, { createContext, useState } from 'react';

export const myContext = createContext({ cart: [], add: () => {} });

function CartContext({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (newItem) => {
    const index = cart.findIndex((item) => {
      return item.name === newItem;
    });
    if (index === -1) {
      return setCart([...cart, { name: newItem, quantity: 1 }]);
    }
    const cartCopy = [...cart];
    cartCopy[index].quantity += 1;
    return setCart(cartCopy);
  };

  return (
    <myContext.Provider value={{ cart: cart, add: (item) => addToCart(item) }}>
      {children}
    </myContext.Provider>
  );
}

export default CartContext;
