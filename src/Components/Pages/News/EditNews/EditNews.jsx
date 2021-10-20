import React, { useState, useEffect} from 'react';
import Spinner from "../../../Spinner/Spinner";
import { CATEGORIES } from "../../../../Constants/endpoints";
import { editNewsCommunicator } from "../../../../Communicators/EditNewsCommunicator/EditNewsCommunicator";
import { authorsNewsCommunicator } from '../../../../Communicators/AuthorsNewsCommunicator/AuthorsNewsCommunicator';

import classes from "../AddNews/AddNews.module.css";

const EditNews = () => {

  /* setting states */
  const [authorsNews, setAuthorsNews] = useState([]);
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    text: "",
    category: "",
  });

  const titleHandler = (event) => {
    setInputs({...inputs, title: event.target.value});
  };

  const textHandler = (event) => {
    setInputs({...inputs, text: event.target.value});
  };

  const categoryHandler = (event) => {
    setInputs({...inputs, category: event.target.value});
  };

  const imageHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const fetchAuthorsNews = async () => {
    const response = await authorsNewsCommunicator.getauhtorsNews();
    setAuthorsNews(response);
  };

  const newsHandler = (event) => {
    const id = event.target.value;
    const singleNews = authorsNews.filter(item => item.id === id);
    if(id !== "0") {
        setInputs({
        id: singleNews[0].id,
        title: singleNews[0].news_title,
        text: singleNews[0].news_text,
        category: singleNews[0].news_category
      });
    } else {
      setInputs({
        id: "",
        title: "",
        text: "",
        category: "0"
      });
    }
  };

  useEffect(() => {
    fetchAuthorsNews();
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setErrorMessage("");

    /* check if form is valid - if it is not, display messages and stop script */
    if (inputs.title === "") {
      setErrorMessage("Select news frist!");
      return;
    }

    if (image === "") {
      setErrorMessage("Please, select image for news!");
      return;
    }

    const formData = new FormData()
    formData.append("id", inputs.id);
    formData.append("title", inputs.title);
    formData.append("text", inputs.text);
    formData.append("category", inputs.category);
    formData.append("image", image);
    formData.append("token", localStorage.getItem("token"));

    if(!window.confirm("You are about to edit this news. Are you sure?")) {
      return false;
    } else {
      editNewsCommunicator.requestEditNews(setIsLoading, setErrorMessage, formData);
    }
    
    setInputs({
      title: "",
      text: "",
      category: ""
    });
    setImage("");
  }

  return (
    <article className={classes["add-news__form"]}>
      <h2>Edit News Section</h2>
      <p><strong>Notice:</strong> You can edit news where you are author</p>
      {authorsNews !== "There are no news!" && <select onChange={newsHandler}>
        <option value="0">Select News By Title</option>
        {authorsNews.map(item=> <option key={item.id} value={item.id}>{item.news_title}</option>)}
      </select>}
      {authorsNews === "There are no news!" && <p>You have no added news by yourself</p>}
      <form encType="multipart/form-data">
        <div>
            <label htmlFor="title">News Title</label>
            <input type="text" id="title" value={inputs.title} disabled={inputs.title !== "" ? false : true} onChange={titleHandler} />
        </div>
        <div>
            <label htmlFor="newstext">News Text</label>
            <textarea type="text" id="newstext" value={inputs.text} disabled={inputs.title !== "" ? false : true} onChange={textHandler} ></textarea>
        </div>
        <div>
            <label htmlFor="category">News Category</label>
            <select id="inputGroupSelect02" value={inputs.category} disabled={inputs.title !== "" ? false : true} onChange={categoryHandler} >
              <option value="0">Select Category</option>
              {CATEGORIES.map((item, index )=> <option key={index + 1} value={index + 1}>{item}</option>)}
            </select>
        </div>
        <div>
            <label htmlFor="image">News Image</label>
            <input type="file" id="img" name="image" onChange={(event) => imageHandler(event)} />
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

export default EditNews;
