import React, { useReducer, useCallback } from "react";
import CartContext from "./cartContext";
import { cartReducer, defaultCartState } from "./cartReducer";
import { ProductCartType } from "../Types/ProductCart.types";

export const CartProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = useCallback((item: ProductCartType) => {
    dispatchCartAction({ type: "ADD", item: item });
  }, []);

  const removeItemFromCartHandler = useCallback((id: string) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  }, []);

  const removeAllItemFromCartHandler = useCallback((name: string) => {
    dispatchCartAction({ type: "REMOVE_ALL", name: name });
  }, []);

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
