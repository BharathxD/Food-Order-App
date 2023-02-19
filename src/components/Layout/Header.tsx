import React, { Fragment } from "react";
import classes from "./Header.module.css";

import { HeaderCartButton } from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";

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
    </Fragment>
  );
};
