import React, { createContext, useState } from 'react';

export const myCartContext = createContext({
  cart: [],
  quantity: 1,
  setQuantity: () => {},
  add: () => {},
  deleteOne: () => {},
  deleteAll: () => {},
});

function CartContext({ children }) {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const addToCart = (newItem, quantity) => {
    const itemsToAddToCart = [];
    for (let i = 0; i < quantity; i++) {
      itemsToAddToCart.push(newItem);
    }
    setCart((prev) => [...prev, ...itemsToAddToCart]);
  };

  const deleteOneItem = (itemToDelete) => {
    const index = cart.findIndex((item) => {
      return item._id === itemToDelete._id;
    });

    const cartCopy = [...cart];
    cartCopy.splice(index, 1);
    setCart(cartCopy);
  };

  return (
    <myCartContext.Provider
      value={{
        cart: cart,
        quantity: quantity,
        setQuantity: (number) => setQuantity(number),
        add: (item, number) => addToCart(item, number),
        deleteOne: (item) => deleteOneItem(item),
        deleteAll: () => setCart([]),
      }}
    >
      {children}
    </myCartContext.Provider>
  );
}

export default CartContext;
