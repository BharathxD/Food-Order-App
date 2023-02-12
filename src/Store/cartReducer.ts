export type itemType = {
  price: number;
  amount: number;
  id: string;
  name: string;
};

export const defaultCartState = {
  items: [],
  totalAmount: 0,
};

type stateType = {
  totalAmount: number;
  items: itemType[];
};

type actionType = {
  type: string;
  item?: itemType;
  id?: string;
};

export const cartReducer = (state: stateType, action: actionType) => {
  if (action.type === "ADD") {
    if (!action.item) return state;

    const updatedTotalAmount: number =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item: { id: string }) => item.id === action.item?.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

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
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
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

  return defaultCartState;
};
