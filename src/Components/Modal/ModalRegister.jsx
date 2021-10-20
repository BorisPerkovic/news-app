import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import ModalBackdrop from "./ModalBackdrop/ModalBackdrop";


const ModalRegister = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalBackdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose} />,
        document.getElementById("modal-overlay")
      )}
    </Fragment>
  );
};

export default ModalRegister;