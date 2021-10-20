import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { formateDate } from '../../../../Utils/date-time';

import classes from "../News.module.css";

const NewsHeadlines = ({ news }) => {
  return (
    <Fragment>
        <article className={classes["news-article"]}>
        <div className={classes["img-handler"]}>
          <img src={news.news_image} alt="someImg" />
        </div>
        <div className={classes["news-text"]}>
          <Link to={`/news-app/single-news/${news.id}`}><h2>{news.news_text.replace("|", "'").slice(0, 150)} ...</h2></Link>
          <p className={classes["news-text__info"]}> <Link to={`/news-app/category/${news.news_category}`}>{news.news_category}</Link>  {formateDate(news.news_created)}</p>
        </div>
      </article>
    </Fragment>
  );
}

export default NewsHeadlines;
