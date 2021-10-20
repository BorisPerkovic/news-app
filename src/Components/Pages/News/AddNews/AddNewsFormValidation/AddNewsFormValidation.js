/* register form validation class */
class AddNewsFormValidation {
  constructor(title, text, category, image){
    this.title = title;
    this.text = text;
    this.category = category;
    this.image = image;
  }

  /*============= 
    METHODS
  =============*/
  
  /* check if entered email input field is valid */
  titleIsValid () {
    const titleValid = this.title.trim() !== "";
    return titleValid;
  };
  
  /* check if entered email input field is valid */
  textIsValid () {
    const textValid = this.text.trim() !== "";
    return textValid;
  };

  /* check if entered email input field is valid */
  categoryIsValid () {
    const categoryValid = this.category !== "0"; 
    return categoryValid;
  };

  /* check if entered password input field is valid */
  imageIsValid () {
    const imageValid = this.image !== "";
    return imageValid;
  };

  /* check if form is valid - email and password are required */
  formIsValid () {
    const validForm = this.titleIsValid() && this.textIsValid() && this.categoryIsValid() && this.imageIsValid();
    return validForm;
  }

};

export default AddNewsFormValidation;