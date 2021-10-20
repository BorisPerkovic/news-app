

class PolutionCommunicator {
  async getPolution(lat, lng) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=9f73d0b517dd5faaf6212b9147e6f875`);
    const data = await response.json();
    return data;
  }
}

export const polutionCommunicator = new PolutionCommunicator();