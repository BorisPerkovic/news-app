import React, { useState } from 'react';
import Spinner from "../../../Spinner/Spinner";
import { CATEGORIES } from "../../../../Constants/endpoints";
import AddNewsFormValidation from './AddNewsFormValidation/AddNewsFormValidation';

import classes from "./AddNews.module.css";
import { addNewsService } from '../../../../Services/addNews.service';

const AddNews = () => {

  /* setting states */
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("0");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: true,
    text: true,
    category: true,
    image: true
  });

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const textHandler = (event) => {
    setText(event.target.value);
  };

  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const imageHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setErrorMessage("");

    const formValid = new AddNewsFormValidation(title, text, category, image); 

    /* setting new states for input fields */
    setInputs({
      title: formValid.titleIsValid(),
      text: formValid.textIsValid(),
      category: formValid.categoryIsValid(),
      image: formValid.imageIsValid()
    });

    /* check if form is valid - if it is not, display messages and stop script */
    if (!formValid.formIsValid()) {
      return;
    }

    const formData = new FormData()
    formData.append("title", title);
    formData.append("text", text);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("token", localStorage.getItem("token"));

    addNewsService.requestAddNews(setIsLoading, setErrorMessage, formData);

    setTitle("");
    setText("");
    setCategory("0");
    setImage("");
  }


  return (
    <article className={classes["add-news__form"]}>
      <h2>Add News Section</h2>
      <form encType="multipart/form-data">
        <div className={!inputs.title ? classes.invalid : ""}>
            <label htmlFor="title">News Title</label>
            <input type="text" id="title" value={title} onChange={titleHandler} />
            {!inputs.title && (<div className={classes["input-message"]}>Please, provide valid news title</div>)}
        </div>
        <div className={!inputs.text ? classes.invalid : ""}>
            <label htmlFor="newstext">News Text</label>
            <textarea type="text" id="newstext" value={text} onChange={textHandler} ></textarea>
            {!inputs.text && (<div className={classes["input-message"]}>Please, provide valid news text</div>)}
        </div>
        <div className={!inputs.category ? classes.invalid : ""}>
            <label htmlFor="category">News Category</label>
            <select id="inputGroupSelect02"  onChange={categoryHandler}>
              <option value="0">Select Category</option>
              {CATEGORIES.map((item, index )=> <option key={index + 1} value={index + 1}>{item}</option>)}
            </select>
            {!inputs.category && (<div className={classes["input-message"]}>Please, select category</div>)}
        </div>
        <div className={!inputs.image ? classes.invalid : ""}>
            <label htmlFor="image">News Image</label>
            <input type="file" id="img" name="image" onChange={(event) => imageHandler(event)} />
            {!inputs.image && (<div className={classes["input-message"]}>Please, provide valid image for news</div>)}
        </div>

        <div className={isLoading ? "" : classes["msg-error"]}>
            {isLoading && <Spinner />}
            <p>{errorMessage}</p>
        </div>
        <button onClick={onSubmitHandler}>SUBMIT</button>
      </form>
    </article>
  );
};

export default AddNews;
