import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { weatherCommunicator } from '../../Communicators/WeatherCommunicator/WeatherCommunicator';
import { weatherMapper } from '../../Communicators/WeatherCommunicator/WeatherMapper';

import classes from "../Pages/SideBar/SideBar.module.css";

const WeatherWidget = () => {

  const [gelocation, setGeoLocation] = useState({
    lat: 44.787197,
    lng: 20.457273
  });
  const [weather, setWeather] = useState({});
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

  const getWeather = () => {
    const fetchWeather = async () => {
      const response = await weatherCommunicator.getWeather(gelocation.lat, gelocation.lng);
      const weatherObj = weatherMapper.createWeather(response);
      setWeather(weatherObj);
      setIsLoading(false);
    };
    fetchWeather();
  }

  useEffect(getWeather, [gelocation.lat, gelocation.lng]);

  return (
    <Fragment>
      {loading && <Spinner />}
      {!loading && 
        (<article className={classes["weather-article"]}>
        <div className={classes["weather-article__tempIcon"]}>
          <div>
            <h2>{`${weather.name}, ${weather.country}`}</h2>
            <span>{weather.description}</span>
          </div>
          <div className={classes["weather-article__icon"]}>
            <img src={`https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weather.icon}.png`} alt={weather.name} />
          </div>
        </div>
        <div className={classes["weather-article__details"]}>
          <div>
            <h2>{parseInt(weather.temperature)} &#8451;</h2>
          </div>
          <div>
            <p><strong>DETAILS</strong></p>
            <hr />
            <div className={classes["weather-article__detailsInfo"]}>
              <p>Feels Like <span><strong>{parseInt(weather.feels_like)} &#8451;</strong></span></p>
              <p>Wind &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>{weather.wind} m/s</strong></span></p>
              <p>Humidity <span><strong>{weather.humidity} %</strong></span></p>
              <p>Pressure &nbsp;<span><strong>{weather.pressure} h/Pa</strong></span></p>
            </div>
          </div>
        </div> 
        <div className={classes["weather-article__source"]}>
          <p>Source: <Link to={{  pathname: "https://openweathermap.org/" }} target="_blank">OpenWeatherMap</Link></p>
          <p>{`${timestamp}h`}</p>
        </div>
      </article>)}
    </Fragment>
  );
};

export default WeatherWidget;
