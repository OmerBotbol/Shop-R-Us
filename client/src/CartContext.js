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
    const index = cart.findIndex((item) => {
      return item.name === newItem.name;
    });
    if (index === -1) {
      return setCart([
        ...cart,
        {
          name: newItem.name,
          quantity: quantity,
          price: newItem.price * quantity,
        },
      ]);
    }
    const cartCopy = [...cart];
    cartCopy[index].quantity += quantity;
    cartCopy[index].price += newItem.price * quantity;
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
