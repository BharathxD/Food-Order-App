import React, { Fragment, ReactNode } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

//? TYPE DECLARATION ?//

type ModalProp = {
  children: ReactNode;
  onCloseCart(): void;
};

const Backdrop: React.FC<{ onCloseCart(): void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseCart} />;
};

//?--?//

const ModalOverlay: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export const Modal: React.FC<ModalProp> = (props) => {
  const portalElement: HTMLElement | null = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCloseCart={props.onCloseCart} />,
        portalElement!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement!
      )}
    </Fragment>
  );
};
