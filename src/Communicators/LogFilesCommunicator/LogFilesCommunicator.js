import { LOG_FILES_URL } from "../../Constants/endpoints";
import { tokenService } from "../../Services/token.service";


class LogFilesCommunicator {
  async getNewsList(file) {

    const token = tokenService.getToken();
    if(!token) {
      alert("Something is wrong with your authorization. Please, log in again!");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.location.assign("https://borisperkovic.github.io/news-app/login");
      return;
    }

    const response = await fetch(LOG_FILES_URL + "?file=" + file);
    const data = await response.json();
    return data;
  }
}

export const logFilesCommunicator = new LogFilesCommunicator();