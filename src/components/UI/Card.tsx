import classes from "./Card.module.css";

export const Card: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};
