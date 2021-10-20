import React, { useState, useRef, Fragment } from 'react';
import LoginFormValidation from "./LoginFormValidation/LoginFormValidaiton";
import { loginService } from '../../../Services/login.service';
import Spinner from "../../Spinner/Spinner";

import classes from "./LoginForm.module.css";

const LoginForm = () => {

  /* setting states */
  const [inputs, setInputs] = useState({
    email: true,
    password: true
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /* getting data from input fields using useRef hook */
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  /* function that is activate on register button */
  const onSubmitHanlder = (event) => {
    event.preventDefault();
    setErrorMessage("");

    /* getting data values from refs and creating instance for form valdiation */
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const formValid = new LoginFormValidation(enteredEmail, enteredPassword);

    /* setting new states for input fields */
    setInputs({
      email: formValid.emailIsValid(),
      password: formValid.passwordIsValid()
    });

    /* check if form is valid - if it is not, display messages and stop script */
    if (!formValid.formIsValid()) {
      return;
    }

    /* authentication service for login: 
       -check if users datas from input are match with database,
       -geting message response if inputs are not valid or wrong,
   */
    loginService.requestLogin(setIsLoading, setErrorMessage, enteredEmail, enteredPassword);

  };

  return (
    <Fragment>
    <article className={classes["login-form"]}>
      <h2>Log In</h2>
      <form onSubmit={onSubmitHanlder} >
        <div className={!inputs.email ? classes.invalid : ""}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" ref={emailInputRef} />
            {!inputs.email && (<div className={classes["input-message"]}>Please, provide valid email address</div>)}
        </div>
        <div className={!inputs.password ? classes.invalid : ""}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={passwordInputRef} />
            {!inputs.password && (<div className={classes["input-message"]}>Please, provide valid password</div>)}
        </div>

        <div className={isLoading ? "" : classes["msg-error"]}>
            {isLoading && <Spinner />}
            <p>{errorMessage}</p>
        </div>
        <button>SUBMIT</button>
      </form>
    </article>
    </Fragment>
  );
};

export default LoginForm;
