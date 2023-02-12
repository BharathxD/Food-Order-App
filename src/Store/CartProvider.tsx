import React, { useReducer } from "react";
import CartContext from "./cart-context";
import { cartReducer, itemType, defaultCartState } from "./cartReducer";

export const CartProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: itemType) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  console.log(cartState.items);

  const cartContext = {
    id: Math.random().toString(),
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItemFunction: addItemToCartHandler,
    removeItemFunction: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
