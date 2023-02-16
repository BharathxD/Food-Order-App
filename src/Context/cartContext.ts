import React from "react";
import { ProductCartType } from "../Types/ProductCart.types";

interface IContextType {
  items: ProductCartType[];
  totalAmount: number;
  addItemFunction(item: ProductCartType): void;
  removeItemFunction(id: string): void;
  removeAllItemFunction(name: string): void;
}

const CartContext = React.createContext<IContextType>({
  items: [{ name: "", id: "", price: 0, amount: 0 }],
  totalAmount: 0,
  addItemFunction: (item: ProductCartType) => {},
  removeItemFunction: (id: string) => {},
  removeAllItemFunction: (name: string) => {},
});

export default CartContext;
