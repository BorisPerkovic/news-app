import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import CommentFormValidation from './CommentValidator/CommentValidator';
import { commentsCommunicator } from '../../../../Communicators/CommentsCommunicator/CommentsCommunicator';
import { singleNewsCommunicator } from '../../../../Communicators/SingleNewsCommunicator/SingleNewsCommunicator';
import Spinner from '../../../Spinner/Spinner';

import classes from "../../MainPage.module.css";
import CommentsList from './CommentsList/CommentsList';
import styles from "./SingleNews.module.css";
import { formateDate } from '../../../../Utils/date-time';

const SingleNews = (props) => {

  const [singleNews, setSingleNews] = useState({});
  const [comments, setComments] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [message, setMessage] = useState("");
  const [newsLikes, setLikes] = useState("");
  const [newsDislikes, setDisLikes] = useState("");
  const [loading, setLoading] = useState(true);
  const [vissible, setVissible] = useState(false);


  const vissibleHandler = () => {
    setVissible(!vissible);
  }

  const getNews = async () => {
    const response = await singleNewsCommunicator.getSingleNews(props.match.params.id);
    setSingleNews(response);
    setLikes(response[0].likes);
    setDisLikes(response[0].dislikes);
    setLoading(false);
  };

  const getComments = async () => {
    const response = await commentsCommunicator.comments(props.match.params.id)
    setComments(response);
  }

  useEffect(() => {
    getNews();
    getComments();
  }, [props.match.params.id]);

  const likeDislike = (param) => {
    if(param === "like") {
      setLikes(parseInt(newsLikes) + 1);
    } else {
      setDisLikes(parseInt(newsDislikes) + 1);
    }
    singleNewsCommunicator.likeDislikeNews(param, props.match.params.id);
  }
  
  const userInputHanlder = (event) => {
    setUserInput(event.target.value);
  }

  const textInpuHanlder = (event) => {
    setTextInput(event.target.value);
  }

  const commentFormSubmit = (event) => {
    event.preventDefault();
    setMessage("");
    const formValid = new CommentFormValidation(userInput, textInput);

    /* check if form is valid - if it is not, display messages and stop script */
    if (!formValid.formIsValid()) {
      setMessage("All fields are required");
      return;
    }

    const payload = {
      user: userInput,
      text: textInput,
      news_id: props.match.params.id
    };
    commentsCommunicator.addComments(setMessage, payload);
    setUserInput("");
    setTextInput("");
  
  };

  return (
    <main className={classes.main}>
      <section className={classes["main-section"]}>
        {loading && <Spinner />}
        {!loading && (
          <article className={styles["single-news__article"]}>
            <div className={styles["single-news__image"]}>
              <img src={singleNews[0].news_image} alt="SingleNews" />
            </div>
            <div className={styles["single-news__title"]}>
              <h2>{singleNews[0].news_title.replace("|", "'")}</h2>
              <div className={styles["single-news__info"]}>
                <p>Author: <strong>{singleNews[0].author}</strong></p>
                <p><i className="far fa-clock"></i> {formateDate(singleNews[0].news_created)}</p>
              </div>
            </div>
            <div className={styles["single-news__text"]}>
              <p>{singleNews[0].news_text.split("|").join("'")}</p>
            </div>
            <div className={styles["single-news__likes"]}>
              <p><i className={`fas fa-thumbs-up ${styles["like"]}` } onClick={() => likeDislike("like")}></i> {newsLikes} &nbsp;&nbsp;<i className={`fas fa-thumbs-down ${styles["dislike"]}`} onClick={() => likeDislike("dislike")}></i> {newsDislikes}</p>
            </div>

            <div className={styles["single-news__comments"]}>
              <p>Comments ({comments === 0 ? "0" : comments.length})</p>
              <p onClick={vissibleHandler}>{vissible ? <i className="fas fa-chevron-up"></i>: <i className="fas fa-chevron-down"></i>}</p>
            </div>
            {vissible && (
              <>
              <div className={styles["add-comment"]}>
                <h3>Add Comment</h3>
                <span><strong>Notice:</strong> comment will be posted after Admin approves it.</span>
                <input type="text" placeholder="Username" value={userInput} onChange={userInputHanlder} />
                <textarea name="" id="" cols="20" rows="5" placeholder="Comment" value={textInput} onChange={textInpuHanlder}></textarea>
                <p className={styles.message}>{message}</p>
                <button onClick={commentFormSubmit}>Submit</button>
              </div>
              {comments !== 0 && comments.map(item => <CommentsList key={item.id} comments={item} />)}
              </>
              )}
          </article>
        )}
      </section>
    </main>
  );
};

export default SingleNews;
