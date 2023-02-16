import { ProductInfoType } from "../Context/cartReducer";

export type CheckoutType = {
  name: string;
  city: string;
  street: string;
  postalCode: number;
  meals: ProductInfoType[];
};
