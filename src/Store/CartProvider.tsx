import React, { useReducer } from "react";
import CartContext from "./cart-context";
import { cartReducer, ProductInfoType, defaultCartState } from "./cartReducer";

export const CartProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: ProductInfoType) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const removeAllItemFromCartHandler = (name: string) => {
    dispatchCartAction({ type: "REMOVE_ALL", name: name });
  };

  const cartContext = {
    id: Math.random().toString(),
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItemFunction: addItemToCartHandler,
    removeItemFunction: removeItemFromCartHandler,
    removeAllItemFunction: removeAllItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
