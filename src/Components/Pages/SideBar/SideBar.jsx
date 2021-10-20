import React, {  Fragment } from 'react';
import { useLocation} from "react-router-dom";
import BreakingNewsWidget from '../../BreakingNewsWidget/BreakingNewsWidget';
import PolutionWidget from '../../PolutionWidget/PolutionWidget';
import WeatherWidget from "../../WeatherWidget/WeatherWidget";

const SideBar = () => {

  const location = useLocation();
  const path = location.pathname === "/news-app/headlines";

  return (
    <Fragment>
      {path && <WeatherWidget />}
      {path && <PolutionWidget />}
      {!path && <BreakingNewsWidget />}
    </Fragment>
  );
};

export default SideBar;
