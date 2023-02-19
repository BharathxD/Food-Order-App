import React, { useCallback, useState, useContext } from "react";
import classes from "./Cart.module.css";

import CartContext from "../../Context/cartContext";
import { Modal } from "../UI/Modal";
import { CartItem } from "./CartItem";
import { ProductCartType } from "../../Types/ProductCart.types";
import { Checkout } from "./Checkout";

export const Cart: React.FC<{ onCloseCart(): void }> = (props) => {
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const context = useContext(CartContext);
  const totalAmount =
    context.totalAmount < 1 ? `$0` : `$${context.totalAmount.toFixed(2)}`;
  const hasItems = context.items.length > 0;
  const cartItemAddHandler = useCallback((item: ProductCartType) => {
    context.addItemFunction({ ...item, amount: 1 });
  }, []);
  const cartItemRemoveHandler = useCallback((id: string) => {
    context.removeItemFunction(id);
  }, []);
  const cartItemRemoveAllHandler = useCallback((name: string) => {
    context.removeAllItemFunction(name);
  }, []);
  const orderHandler = () => {
    setIsCheckout(true);
  };
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

  const modalAction = (
    <div className={classes.actions}>
      <button type="button" onClick={props.onCloseCart}>
        Cancel
      </button>
      <button className={classes.submit} onClick={orderHandler}>
        Confirm
      </button>
    </div>
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
          {!isCheckout && modalAction}
          {isCheckout && <Checkout onCancel={props.onCloseCart} />}
        </React.Fragment>
      )}
    </Modal>
  );
};
