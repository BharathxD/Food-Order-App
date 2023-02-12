import React, { useContext } from "react";
import CartContext from "../../../Store/cart-context";
import classes from "./MealItem.module.css";
import { MealItemForm } from "./MealItemForm";

export const MealItem: React.FC<{
  id: string;
  name: string;
  description: string;
  price: number;
}> = (props) => {
  const context = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount: number) => {
    context.addItemFunction({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
