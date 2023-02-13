import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

//? TYPE DECLARATION ?//

type BackdropProp = () => void;

type ModelOverlayProp = React.ReactNode;

type ModalProp = {
  children: ModelOverlayProp;
  onCloseCart: BackdropProp;
};

const Backdrop: React.FC<{ onCloseCart: BackdropProp }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseCart} />;
};

//?--?//

const ModalOverlay: React.FC<{ children: ModelOverlayProp }> = (props) => {
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
