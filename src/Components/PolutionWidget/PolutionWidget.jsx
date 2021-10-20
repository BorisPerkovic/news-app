import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { polutionMapper } from '../../Communicators/PolutionCommunicator/PolutionMapper';
import { polutionCommunicator } from "../../Communicators/PolutionCommunicator/PolutionCommunicator";

import classes from "../Pages/SideBar/SideBar.module.css";

const PolutionWidget = () => {

  const [gelocation, setGeoLocation] = useState({
    lat: 44.787197,
    lng: 20.457273
  });
  const [polution, setPolution] = useState({});
  const [loading, setIsLoading] = useState(true);
  
  const time = new Date();
  const timestamp = time.toLocaleTimeString("sr-SR", {minutes: "2-digit"});

  const onSuccess = (position) => {
    setGeoLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  const getPolution = () => {
    const fetchPolution = async () => {
      const response = await polutionCommunicator.getPolution(gelocation.lat, gelocation.lng);
      const polutionObj = polutionMapper.createPolution(response);
      setPolution(polutionObj);
      setIsLoading(false);
    };
    fetchPolution();
  };

  useEffect(getPolution, [gelocation.lat, gelocation.lng]);

  return (
    <Fragment>
      {loading && <Spinner />}
      {!loading && 
        (<article className={classes["polution-article"]}>
        <div className={classes["polution-article__heading"]}>
          <h2> Air Quality Index</h2>
        </div>
        <div className={classes["polution-article__detailsInfo"]}>
          <p><strong>DETAILS</strong></p>
          <hr />
          <div className={classes["polution-article__airindex"]}>
            <div>
              <p>Carbon monoxide</p>
              <p>Nitrogen dioxide</p>
              <p>Ozone</p>
              <p>Sulphur dioxide</p>
              <p>Fine particles matter</p>
              <p>Ammonia</p>
            </div>
            <div className={classes["polution-article__components"]}>
              <p><strong>{polution.co} μg/m3</strong></p>
              <p><strong>{polution.no2} μg/m3</strong></p>
              <p><strong>{polution.o3} μg/m3</strong></p>
              <p><strong>{polution.so2} μg/m3</strong></p>
              <p><strong>{polution.pm2_5} μg/m3</strong></p>
              <p><strong>{polution.nh3} μg/m3</strong></p>
            </div>
          </div>
        </div>
        <div className={classes["polution-article__source"]}>
          <p>Source: <Link to={{  pathname: "https://openweathermap.org/" }} target="_blank">OpenWeatherMap</Link></p>
          <p>{`${timestamp}h`}</p>
        </div>
      </article>)}
    </Fragment>
  );
};

export default PolutionWidget;