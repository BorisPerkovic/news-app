import React, { useState, useRef, Fragment } from 'react';
import { useHistory } from "react-router-dom";
import RegisterFormValidation from './RegisterFormValdiation/RegisterFormValidation';
import { registrationService } from '../../../Services/registration.service';
import Spinner from "../../Spinner/Spinner";
import ModalRegister from '../../Modal/ModalRegister';

import classes from "./RegisterForm.module.css";

const RegisterForm = () => {

  /* setting states */
  const [inputs, setInputs] = useState({
    name: true,
    lastname: true,
    email: true,
    password: true,
    repeatPassword: true,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [displayModal, setDisplayModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  /* getting data from input fields using useRef hook */
  const nameInputRef = useRef();
  const lastnameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const repeatPasswordInputRef = useRef();

  const modalClose = () => {
    history.push("/news-app");
  };

  /* function that is activate on register button */
  const onSubmitHanlder = (event) => {
    event.preventDefault();
    setErrorMessage("");

    /* getting data values from refs and creating instance for form valdiation */
    const enteredName = nameInputRef.current.value;
    const enteredLastname = lastnameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredRepeatPassword = repeatPasswordInputRef.current.value;
    const formValid = new RegisterFormValidation(enteredName, enteredLastname, enteredEmail, enteredPassword, enteredRepeatPassword);

    /* setting new states for input fields */
    setInputs({
      name: formValid.nameIsValid(),
      lastname: formValid.lastnameIsValid(),
      email: formValid.emailIsValid(),
      password: formValid.passwordIsValid(),
      repeatPassword: formValid.repeatPasswordIsValid()
    });

    /* check if form is valid - if it is not, display messages and stop script */
    if (!formValid.formIsValid()) {
      return;
    }

    /* authentication service for register: 
       -check if users datas from input are match with database,
       -geting message response if inputs are not valid or wrong,
   */
    registrationService.requestRegister(setDisplayModal, setIsLoading, setErrorMessage, enteredName, enteredLastname, enteredEmail , enteredPassword, enteredRepeatPassword);

  };

  return (
    <Fragment>
    {displayModal && ( <ModalRegister onClose={modalClose} />)}
    <article className={classes["register-form"]}>
      <h2>Registration</h2>
      <form onSubmit={onSubmitHanlder} >
        <div className={!inputs.name ? classes.invalid : ""}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={nameInputRef} />
            {!inputs.name && (<div className={classes["input-message"]}>Please, provide valid name</div>)}
        </div>
        <div className={!inputs.lastname ? classes.invalid : ""}>
            <label htmlFor="lastname">Lastname</label>
            <input type="text" id="lastname" ref={lastnameInputRef} />
            {!inputs.lastname && (<div className={classes["input-message"]}>Please, provide valid lastname</div>)}
        </div>
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
        <div className={!inputs.repeatPassword ? classes.invalid : ""}>
            <label htmlFor="re-password">Repeat password</label>
            <input type="password" id="re-password" ref={repeatPasswordInputRef} />
            {!inputs.repeatPassword && (<div className={classes["input-message"]}>Please, password and repeat password are not match</div>)}
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

export default RegisterForm;
