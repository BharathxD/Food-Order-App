import React from "react";
import classes from "./Cart.module.css";
import { Modal } from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../Store/cart-context";

export const Cart: React.FC<{ onCloseCart: () => void }> = (props) => {
  const context = useContext(CartContext);
  const totalAmount = `$${context.totalAmount.toFixed(2)}`;
  const hasItems = context.items.length > 0;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {context.items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};
