import React, { Fragment, useState } from 'react';
import { commentsCommunicator } from '../../../../../Communicators/CommentsCommunicator/CommentsCommunicator';
import { formateDate } from '../../../../../Utils/date-time';

import styles from "../SingleNews.module.css";

const CommentsList = ({ comments }) => {

  const [likes, setLikes] = useState(comments.likes);
  const [dislikes, setDisLikes] = useState(comments.dislikes);


  const likeDislike = (param) => {
    if(param === "like") {
      setLikes(parseInt(likes) + 1);
    } else {
      setDisLikes(parseInt(dislikes) + 1);
    }
    commentsCommunicator.likeDislikeComment(param, comments.id);
  }

  return (
    <Fragment>
      {comments === JSON.parse(0) && (
        <div className={styles["single-news__allComents"]}>
          <p>This News Have No Comments. Be First And Comment It.</p>
        </div>
      )}
      {comments !== JSON.parse(0) &&
        (
          <>
            <div key={comments.id} className={styles["single-news__allComents"]}>
              <p>{comments.comment_author} {formateDate(comments.comment_created)}</p>
              <p>{comments.comment_text}</p>
              <p><i className={`fas fa-thumbs-up ${styles["like"]}`} onClick={() => likeDislike("like")}></i> {likes} &nbsp;&nbsp;<i className={`fas fa-thumbs-down ${styles["dislike"]}`} onClick={() => likeDislike("dislike")}></i> {dislikes}</p>
            </div>
          </>
        )}
    </Fragment>
  );
};

export default CommentsList;
