import { ProductCartType } from "../Types/ProductCart.types";

export const defaultCartState: CartState = {
  items: [],
  totalAmount: 0,
};

type CartState = {
  items: ProductCartType[];
  totalAmount: number;
};

type CartAction = {
  type: string;
  item?: ProductCartType;
  id?: string;
  name?: string;
};

export const cartReducer = (state: CartState, action: CartAction) => {
  if (action.type === "ADD") {
    if (!action.item) return state;

    const updatedTotalAmount: number =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item: { id: string }) => item.id === action.item?.id
    );
    const existingCartItem: ProductCartType =
      state.items[existingCartItemIndex];
    let updatedItems: ProductCartType[];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item: { id: string }) => item.id === action.id
    );
    const existingItem: ProductCartType = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems: ProductCartType[];
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(
        (item: { id: string }) => item.id !== action.id
      );
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ALL") {
    const existingCartItemIndex = state.items.findIndex(
      (item: { name: string }) => item.name === action.name
    );

    const existingItem: ProductCartType = state.items[existingCartItemIndex];

    const updatedTotalAmount =
      state.totalAmount - existingItem.price * existingItem.amount;

    let updatedItems: ProductCartType[] = [...state.items];
    updatedItems = updatedItems.filter((item) => {
      return item.name !== action.name;
    });

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};
