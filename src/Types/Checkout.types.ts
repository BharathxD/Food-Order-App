import { ProductCartType } from "./ProductCart.types";

export type CheckoutType = {
  name: string;
  city: string;
  street: string;
  postalCode: number;
  meals: ProductCartType[];
};
