/* comment form validation class */
class CommentFormValidation {
  constructor(user, text){
    this.user = user;
    this.text = text;
  }

  /*============= 
    METHODS
  =============*/

  /* check if entered user input field is valid */
  userIsValid () {
    const userValid = this.user.trim() !== "";
    return userValid;
  };

  /* check if entered text input field is valid */
  textIsValid () {
    const textValid = this.text.trim() !== "";
    return textValid;
  };

  /* check if form is valid - email and password are required */
  formIsValid () {
    const validForm = this.userIsValid() && this.textIsValid();
    return validForm;
  }

};

export default CommentFormValidation;