import React from "react";

type contextType = {
  items: any[];
  totalAmount: number;
  addItemFunction: (item: {
    price: number;
    amount: number;
    id: string;
  }) => void;
  removeItemFunction: (id: string) => void;
};

const CartContext = React.createContext<contextType>({
  items: [],
  totalAmount: 0,
  addItemFunction: (item: { price: number; amount: number; id: string }) => {},
  removeItemFunction: (id: string) => {},
});

export default CartContext;
