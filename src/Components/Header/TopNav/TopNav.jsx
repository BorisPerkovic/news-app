import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { tokenService } from "../../../Services/token.service";
import User from "./User/User";

import classes from "./TopNav.module.css";

const TopNav = () => {

  const [loginParams, setLoginparams] = useState(true);
  const history = useHistory();

  const token = tokenService.getToken();
  if (!token) {
    history.push("/news-app");
  }
  const user = JSON.parse(localStorage.getItem("user"));

  const removeLoginParams = (param) => {
    setLoginparams(param);
  } 

  return (
    <header className={classes.header}>
      <div className={`container ${classes["header__wrapper"]}`}>
        <div>
          <h1>No LIES</h1>
        </div>
        <div>
          {token && loginParams && <User user={user} removeLoginParams={removeLoginParams} />}
          {!token && (
            <>
            <NavLink activeClassName={classes["active-route"]} exact to="/news-app/login">Log In</NavLink>
            <NavLink activeClassName={classes["active-route"]} to="/news-app/registration">Register</NavLink>
            </>
          )}
        </div>
      </div>

    </header>
  );
};

export default TopNav;
