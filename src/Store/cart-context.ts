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
  removeAllItemFunction: (name: string) => void;
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
  removeAllItemFunction: (name: string) => {},
});

export default CartContext;
