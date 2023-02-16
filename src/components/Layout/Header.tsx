import React, { Fragment } from "react";
import { HeaderCartButton } from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

interface HeaderProps {
  onShowCart(): void;
}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <span className={classes.headerContainer}>
          <h1>ReactMeals</h1>
        </span>
        <HeaderCartButton onClickHandler={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};
