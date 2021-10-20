import React,{ useState, useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import { breakingNewsCommunicator } from '../../Communicators/BreakingNewsCommunicator/BreakingNewsCommunicator';
import Spinner from "../Spinner/Spinner";
import { formateDate } from '../../Utils/date-time';

import classes from "../Pages/SideBar/SideBar.module.css";

const BreakingNewsWidget = () => {

  const [breakingNews, setBreakingNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNews = async () => {
    const response = await breakingNewsCommunicator.getBreakingNews();
    setBreakingNews(response);
    setLoading(false);
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <Fragment>
      {loading && <Spinner />}
      {!loading && 
        (<article className={classes["breaking-article"]}>
        <div className={classes["breaking-article__heading"]}>
          <p>BREAKING NEWS</p>
        </div>
        <div className={classes["breaking-article__info"]}>
          {breakingNews.map(item => <p key={item.id}><Link to={`/news-app/single-news/${item.id}`}>{formateDate(item.news_created)} {item.news_title.split("|").join("'")}</Link></p>)}
        </div>
      </article>)}
    </Fragment>
  );
};

export default BreakingNewsWidget;
