import React, { Fragment, useState, useEffect } from 'react';
import { headlinesService } from '../../../Services/headlines.service';
import Spinner from '../../Spinner/Spinner';
import NewsHeadlines from './NewsHeadlines/NewsHeadlines';

const News = () => {

  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHeadlines = async () => {
    const response = await headlinesService.requestHeadlines();
    setHeadlines(response);
    setLoading(false);
  }

  useEffect(() => {
    getHeadlines();
  }, []);

  return (
    <Fragment>
      {loading && <Spinner />}
      {!loading && 
      (headlines.map(item => <NewsHeadlines key={item.id} news={item}  />) )}

    </Fragment>
  );
};

export default News;
