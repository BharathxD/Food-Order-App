import classes from "./AvailableMeals.module.css";
import { Card } from "../UI/Card";
import { MealItem } from "./MealItem/MealItem";
import { DUMMY_MEALS } from "../../Store/DUMMY_MEALS";

export const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul className={classes.meals}>{mealsList}</ul>
      </Card>
    </section>
  );
};
