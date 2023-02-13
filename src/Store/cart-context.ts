import React from "react";

type ProductInfoType = {
  id: string;
  name: string;
  price: number;
  amount: number;
};

type ContextType = {
  items: ProductInfoType[];
  totalAmount: number;
  addItemFunction: (item: ProductInfoType) => void;
  removeItemFunction: (id: string) => void;
  removeAllItemFunction: (name: string) => void;
};

const CartContext = React.createContext<ContextType>({
  items: [{ name: "", id: "", price: 0, amount: 0 }],
  totalAmount: 0,
  addItemFunction: (item: ProductInfoType) => {},
  removeItemFunction: (id: string) => {},
  removeAllItemFunction: (name: string) => {},
});

export default CartContext;
