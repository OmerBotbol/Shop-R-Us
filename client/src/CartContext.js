import React, { createContext, useState } from 'react';

export const myCartContext = createContext({
  cart: [],
  add: () => {},
  deleteOne: () => {},
  deleteAll: () => {},
});

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

  const deleteOneItem = (itemToDelete) => {
    const index = cart.findIndex((item) => {
      return item.name === itemToDelete.name;
    });

    const cartCopy = [...cart];
    const itemOriginalPrice = cartCopy[index].price / cartCopy[index].quantity;
    cartCopy[index].quantity -= 1;
    cartCopy[index].price -= itemOriginalPrice;
    if (cartCopy[index].quantity === 0) {
      cartCopy.splice(index, 1);
    }
    return setCart(cartCopy);
  };

  return (
    <myCartContext.Provider
      value={{
        cart: cart,
        add: (item) => addToCart(item),
        deleteOne: (item) => deleteOneItem(item),
        deleteAll: () => setCart([]),
      }}
    >
      {children}
    </myCartContext.Provider>
  );
}

export default CartContext;
