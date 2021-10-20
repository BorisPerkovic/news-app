
class WeatherMapper {

  createWeather (obj) {
    let weatherObj = {
      name: obj.name,
      country: obj.sys.country,
      description: obj.weather[0].description,
      icon: obj.weather[0].icon,
      temperature: obj.main.temp,
      feels_like: parseInt(obj.main.feels_like),
      wind: obj.wind.speed,
      humidity: obj.main.humidity,
      pressure: obj.main.pressure
    };
    return weatherObj;
  }
}

export const weatherMapper = new WeatherMapper();