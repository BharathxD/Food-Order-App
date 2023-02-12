import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItemFunction: (item: string) => {},
  removeItemFunction: (id: string) => {},
});

export default CartContext;
