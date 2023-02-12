import React from "react";
import classes from "Cart.module.css";
import { CartItem } from "./CartItem";

export const Cart: React.FC<{}> = (props) => {
  return (
    <div>
      {CartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button-alt"]}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </div>
  );
};
