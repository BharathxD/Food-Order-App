import React from "react";

type contextType = {
  items: any[];
  totalAmount: number;
  addItemFunction: (item: {
    id: string;
    name: string;
    price: number;
    amount: number;
  }) => void;
  removeItemFunction: (id: string) => void;
};

const CartContext = React.createContext<contextType>({
  items: [],
  totalAmount: 0,
  addItemFunction: (item: {
    id: string;
    name: string;
    price: number;
    amount: number;
  }) => {},
  removeItemFunction: (id: string) => {},
});

export default CartContext;
