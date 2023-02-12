import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

type componentProps = {
  onCloseCart: () => void
}

const Backdrop: React.FC<componentProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseCart}/>;
};

const ModalOverlay: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export const Modal: React.FC<{ children: React.ReactNode, onCloseCart: () => void }> = (props) => {
  const portalElement: HTMLElement | null = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart}/>, portalElement!)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement!
      )}
    </Fragment>
  );
};
