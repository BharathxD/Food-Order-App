import React, { useCallback } from "react";
import classes from "./Cart.module.css";
import { Modal } from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../Store/cart-context";
import { CartItem } from "./CartItem";
import { ProductInfoType } from "../../Store/cartReducer"; // I've declared the type here, incase of any confusion
import { Checkout } from "../Meals/Checkout";

export const Cart: React.FC<{ onCloseCart: () => void }> = (props) => {
  const context = useContext(CartContext);
  const totalAmount =
    context.totalAmount < 1 ? `$0` : `$${context.totalAmount.toFixed(2)}`;
  const hasItems = context.items.length > 0;
  const cartItemAddHandler = useCallback((item: ProductInfoType) => {
    context.addItemFunction({ ...item, amount: 1 });
  }, []);
  const cartItemRemoveHandler = useCallback((id: string) => {
    context.removeItemFunction(id);
  }, []);
  const cartItemRemoveAllHandler = useCallback((name: string) => {
    context.removeAllItemFunction(name);
  }, []);
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {context.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onRemoveAll={cartItemRemoveAllHandler.bind(null, item.name)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!hasItems && (
        <h1 className={classes.emptyMessage}>Your cart is empty.</h1>
      )}
      {hasItems && (
        <React.Fragment>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          
          <Checkout
            onCancel={props.onCloseCart}
          />
        </React.Fragment>
      )}
    </Modal>
  );
};
