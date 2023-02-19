import React from "react";
import classes from "./CartItem.module.css";

type CartItemProps = {
  name: string;
  amount: number;
  onRemove(): void;
  onAdd(): void;
  onRemoveAll(): void;
  price: number;
};

export const CartItem: React.FC<CartItemProps> = (props) => {
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>${props.price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
        <button onClick={props.onRemoveAll}>x</button>
      </div>
    </li>
  );
};
