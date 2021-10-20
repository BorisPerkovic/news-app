import React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../../../Constants/endpoints';

import classes from "./BottomNav.module.css";

const BottomNav = () => {
  return (
    <nav className={classes.nav}>
      <div className={`container ${classes["nav__menu"]}`}>
        <ul>
          <li><NavLink activeClassName={classes["active-route"]} exact to="/news-app">HEADLINES</NavLink ></li>
          {CATEGORIES.map((item, index) => <li key={index}><NavLink activeClassName={classes["active-route"]} to={`/news-app/category/${item}`}>{item}</NavLink ></li>)}
        </ul>
      </div>
    </nav>
  );
};

export default BottomNav;
