

class WeatherCommunicator {
  async getWeather(lat, lng) {
    const latitude = lat !== "" ? lat : "44.787197";
    const longitude = lng !== "" ? lng : "20.457273";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=9f73d0b517dd5faaf6212b9147e6f875`);
    const data = await response.json();
    return data;
  }
}

export const weatherCommunicator = new WeatherCommunicator();