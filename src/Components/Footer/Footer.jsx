import React from 'react';
import { Link } from "react-router-dom";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className="container">
        <div className={classes["footer-info"]}>
          <p>Copyright &copy; Boris Perkovic</p>
          <p>
            <span className={classes.github}><Link to={{  pathname: "https://github.com/BorisPerkovic" }} target="_blank"><i className="fab fa-github me-3"></i></Link></span>
            <span className={classes.linkedin}><Link to={{  pathname: "https://www.linkedin.com/in/perkovicboris/" }} target="_blank" ><i className="fab fa-linkedin me-3"></i></Link></span>
            <span className={classes.website}><Link to={{  pathname: "https://www.borisperkovic.rs/" }} target="_blank"><i className="fas fa-link"></i></Link> </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
