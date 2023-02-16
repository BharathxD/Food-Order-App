import React from "react";
import { ProductInfoType } from "./cartReducer";

interface IContextType {
  items: ProductInfoType[];
  totalAmount: number;
  addItemFunction(item: ProductInfoType): void;
  removeItemFunction(id: string): void;
  removeAllItemFunction(name: string): void;
}

const CartContext = React.createContext<IContextType>({
  items: [{ name: "", id: "", price: 0, amount: 0 }],
  totalAmount: 0,
  addItemFunction: (item: ProductInfoType) => {},
  removeItemFunction: (id: string) => {},
  removeAllItemFunction: (name: string) => {},
});

export default CartContext;
