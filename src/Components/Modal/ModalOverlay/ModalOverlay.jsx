import React from "react";

import classes from "./ModalOverlay.module.css";

const ModalOverlay = ({ onClose }) => {
  /* 
    -function for closing eport modal on click X button
    -onClose function is passed as props from single Candidate Report and Report  and triggered here but state is changing in single Candidate Report and Report components
  */
  const onCloseModal = () => {
    onClose(false);
    return false;
  };

  return (
      <div className={classes.modal}>
        <div className={classes["modal-heading"]}>
          <h2>Registration Complete!</h2>
          <p><i className={`fas fa-times-circle ${classes.timesCircle}`} onClick={onCloseModal}></i></p>
        </div>

        <div className={classes["modal-body"]}>
          <p>You have successfully registered. Each registered user has all the privileges to use this application. In production, of course, things would be different, but for the purposes of this exercise, privileges are granted to each user. After you close this modal window, you will be redirected to the home page. Now, you can log in and to feel free to play around with this app. Have fun.</p>
        </div>
      </div>
  );
};

export default ModalOverlay;