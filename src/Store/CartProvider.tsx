import React from "react";
import CartContext from "./cart-context";

export const CartProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const addItemFromCartHandler = (item: string) => {};
  const removeItemFromCartHandler = (id: string) => {};
  const cartContext = {
    items: [],
    totalAmount: 0,
    addItemFunction: addItemFromCartHandler,
    removeItemFunction: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
