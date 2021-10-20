import React, { useState, useEffect} from 'react';
import { authorsNewsCommunicator } from '../../../../Communicators/AuthorsNewsCommunicator/AuthorsNewsCommunicator';
import { removeNewsCommunicator } from '../../../../Communicators/RemoveNewsCommunicator/RemoveNewsCommunicator';
import Spinner from '../../../Spinner/Spinner';

import classes from "../AddNews/AddNews.module.css";

const RemoveNews = () => {

  const [authorsNews, setAuthorsNews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAuthorsNews = async () => {
    const response = await authorsNewsCommunicator.getauhtorsNews();
    setAuthorsNews(response);
  };

  const newsHandler = (event) => {
    setErrorMessage("");
    const id = event.target.value;
    const singleNews = authorsNews.filter(item => item.id === id);
    if(id !== "0") {
      setImage(singleNews[0].image);
      setTitle(singleNews[0].news_title);
      setId(id);
    } else {
      setImage("");
      setTitle("");
      setTitle("");
    }
  };

  useEffect(() => {
    fetchAuthorsNews();
  }, [authorsNews]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (title === "") {
      setErrorMessage("Select news frist!");
      return;
    }

    if(!window.confirm("You are about to remove this news. Are you sure?")) {
      return false;
    } else {
      removeNewsCommunicator.requestRemoveNews(setIsLoading, setErrorMessage, id);
    }
    

    setTitle("");
    setImage("");
    setAuthorsNews([]);
  }

  console.log(authorsNews);

  return (
    <article className={classes["add-news__form"]}>
      <h2>Remove News Section</h2>
      <p><strong>Notice:</strong> You can remove news where you are author</p>
      {authorsNews !== "There are no news!" && <select onChange={newsHandler}>
        <option value="0">Select News By Title</option>
        {authorsNews.map(item=> <option key={item.id} value={item.id}>{item.news_title}</option>)}
      </select>}
      {authorsNews === "There are no news!" && <p>You have no added news by yourself</p>}
      <form encType="multipart/form-data">

        <div>
          {image !== "" ? <img src={image} alt="NoLies" /> : ""}
        </div>
        <div>
          {title !== "" ? <p><strong>{title}</strong></p> : ""}
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

export default RemoveNews;
