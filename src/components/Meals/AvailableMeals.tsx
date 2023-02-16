import { useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import { Card } from "../UI/Card";
import { MealItem } from "./MealItem/MealItem";
import { useHTTP } from "../../Hooks/useHTTP";
import { ProductType } from "../../Types/Product.types";

export const AvailableMeals = () => {
  const useMealData = useHTTP({
    url: "https://star-wars-f4c01-default-rtdb.firebaseio.com/Meals.json",
    method: "GET",
  });
  useEffect(() => {
    useMealData.useHttpHandler();
  }, []);
  const mealsList = (useMealData.responseData as ProductType[]).map(
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
  if (!useMealData.isLoading)
    content = <ul className={classes.meals}>{mealsList}</ul>;
  if (useMealData.isLoading)
    content = <p className={classes["loading-message"]}>Loading...</p>;
  if (
    !useMealData.isLoading &&
    (useMealData.responseData as ProductType[]).length === 0
  )
    content = <p className={classes["loading-message"]}>Found no movies...</p>;
  if (useMealData.hasError) content = <p>{useMealData.hasError}</p>;

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};
