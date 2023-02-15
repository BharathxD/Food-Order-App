import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import { Card } from "../UI/Card";
import { MealItem } from "./MealItem/MealItem";
import { useHTTP } from "../../hooks/useHTTP";
import { ProductType } from "../../Store/ProductType.types";
import { DUMMY_MEALS } from "../../Store/DUMMY_MEALS";

export const AvailableMeals = () => {
  const MealData = useHTTP({
    url: "https://star-wars-f4c01-default-rtdb.firebaseio.com/Meals.json",
    method: "GET",
  });
  useEffect(() => {
    MealData.useHttpHandler();
  }, []);
  const mealsList = (MealData.data as ProductType[]).map(
    (meal: ProductType) => {
      return (
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      );
    }
  );

  let content;
  if (!MealData.loading)
    content = <ul className={classes.meals}>{mealsList}</ul>;
  if (MealData.loading)
    content = <p className={classes["loading-message"]}>Loading...</p>;
  if (!MealData.loading && (MealData.data as ProductType[]).length === 0)
    content = <p className={classes["loading-message"]}>Found no movies...</p>;
  if (MealData.error) content = <p>{MealData.error}</p>;

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};
