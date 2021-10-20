import React from 'react';

import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={classes["spin-wrapper"]}>
      <div className={classes.spin}></div>
    </div>
    
  );
};

export default Spinner;
