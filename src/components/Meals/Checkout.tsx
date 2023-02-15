import classes from "./Checkout.module.css";

interface ICheckoutProps {
  onCancel: () => void;
}

export const Checkout: React.FC<ICheckoutProps> = (props) => {
  const confirmHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div>
        <div className={classes.control}>
          <input type="text" placeholder="Your Name" id="name" />
        </div>
        <div className={classes.control}>
          <input type="text" placeholder="Street" id="street" />
        </div>
        <div className={classes.control}>
          <input type="text" placeholder="Postal Code" id="postal" />
        </div>
        <div className={classes.control}>
          <input type="text" placeholder="City" id="city" />
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
