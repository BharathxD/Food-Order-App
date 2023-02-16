import React, { useContext } from "react";
import CartContext from "../../../Context/cartContext";
import classes from "./MealItem.module.css";
import { MealItemForm } from "./MealItemForm";
import { ProductType } from "../../../Types/Product.types";

export const MealItem: React.FC<ProductType> = (props) => {
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
