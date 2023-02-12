import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop: React.FC = () => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export const Modal: React.FC<{ children: React.ReactNode }> = (props) => {
  const portalElement: HTMLElement | null = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement!)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement!
      )}
    </Fragment>
  );
};
