import React, { Fragment, useState, useEffect } from 'react';
import { newsByCategoryCommunicator } from '../../../../Communicators/NewsByCategoryCommunicator/NewsByCategoryCommunicator';
import Spinner from '../../../Spinner/Spinner';
import NewsByCategoryList from './NewsByCategoryList.jsx/NewsByCategoryList';

import classes from "../../MainPage.module.css";

const NewsByCategory = (props) => {

  const [newsList, setNewsList] = useState([]);
  const [category, setCategory] = useState(props.match.params.category);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCategory(props.match.params.category);
  }, [props.match.params.category]);

  const getNewsList = async () => {
    const response = await newsByCategoryCommunicator.getNewsList(category);
    setNewsList(response);
    setLoading(false);
  };

  useEffect(() => {
    getNewsList(newsList);
  }, [category]);

  return (
    <Fragment>
      {loading && <Spinner />}
      <main className={classes.main}>
        <section className={classes["main-section"]}>
        {!loading && (newsList.map(item => <NewsByCategoryList key={item.id} news={item} />))}
        </section>
      </main>
    </Fragment>
  );
};

export default NewsByCategory;
