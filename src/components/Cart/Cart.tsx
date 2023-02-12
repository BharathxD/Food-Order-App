import React from "react";
import classes from "./Cart.module.css";
import { Modal } from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../Store/cart-context";
import { CartItem } from "./CartItem";
import { itemType } from "../../Store/cartReducer"; // I've declared the type here, incase of any confusion

export const Cart: React.FC<{ onCloseCart: () => void }> = (props) => {
  const context = useContext(CartContext);
  const totalAmount = context.totalAmount < 1 ? `$0` : `$${context.totalAmount.toFixed(2)}`;
  const hasItems = context.items.length > 0;
  const cartItemAddHandler = (item: itemType) => {
    context.addItemFunction({...item, amount: 1});
  };
  const cartItemRemoveHandler = (id: string) => {
    context.removeItemFunction(id)
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
        />
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
