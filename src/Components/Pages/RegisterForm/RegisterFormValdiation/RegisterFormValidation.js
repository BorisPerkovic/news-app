/* register form validation class */
class RegisterFormValidation {
  constructor(name, lastname, email, password, repeatPassword){
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.repeatPassword = repeatPassword;
  }

  /*============= 
    METHODS
  =============*/
  
  /* check if entered email input field is valid */
  nameIsValid () {
    const nameValid = this.name.trim() !== "";
    return nameValid;
  };
  
  /* check if entered email input field is valid */
  lastnameIsValid () {
    const lastnameValid = this.lastname.trim() !== "";
    return lastnameValid;
  };

  /* check if entered email input field is valid */
  emailIsValid () {
    const emailValid = this.email.trim() !== "" && this.email.includes("@");
    return emailValid;
  };

  /* check if entered password input field is valid */
  passwordIsValid () {
    const passwordValid = this.password.trim() !== "";
    return passwordValid;
  };

  /* check if entered email input field is valid */
  repeatPasswordIsValid () {
    const repeatPasswordValid = this.repeatPassword.trim() !== "" && this.repeatPassword === this.password;
    return repeatPasswordValid;
  };

  /* check if form is valid - email and password are required */
  formIsValid () {
    const validForm = this.nameIsValid() && this.lastnameIsValid() && this.emailIsValid() && this.passwordIsValid() && this.repeatPasswordIsValid();
    return validForm;
  }

};

export default RegisterFormValidation;