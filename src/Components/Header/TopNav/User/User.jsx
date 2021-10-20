import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import classes from "./User.module.css";

const User = ({ user, removeLoginParams }) => {

  const [dropdown, setDropdown] = useState(false);

  const dropdownHandler = () => {
    setDropdown(!dropdown);
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    removeLoginParams(false);
  }

  return (
    <Fragment>
      <div className={classes["user-button__wrapper"]}>
        <button className={`${classes["user-button"]} ${dropdown ? classes["active"] : ""} `} onClick={dropdownHandler}>Welcome, {user.name}  {dropdown ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}</button>
        {dropdown && (
          <ul className={classes["dropdown-list"]}>
            <li onClick={dropdownHandler}><Link to="/news-app/add-news" >Add News</Link></li>
            <li onClick={dropdownHandler}><Link to="/news-app/edit-news" >Edit news</Link></li>
            <li onClick={dropdownHandler}><Link to="/news-app/remove-news" >Remove News</Link></li>
            <li onClick={dropdownHandler}><Link to="/news-app/comments" >Comments</Link></li>
            <li onClick={dropdownHandler}><Link to="/news-app/logs" >Logs</Link></li>
            <li><Link to="/news-app/headlines" onClick={logoutHandler}>Log Out</Link></li>
          </ul>
        )}
      </div>
    </Fragment>
    
  );
};

export default User;
