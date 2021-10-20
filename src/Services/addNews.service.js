
import { ADDNEWS_URL } from "../Constants/endpoints";
import { tokenService } from "./token.service";

class AddNewsService {
  async requestAddNews(
    setIsLoading,
    setErrorMessage,
    formData
  ) {
    const token = tokenService.getToken();
    if(!token) {
      alert("Something is wrong with your authorization. Please, log in again!");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.location.assign("https://borisperkovic.github.io/news-app/login");
      return;
    }

    setIsLoading(true);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", ADDNEWS_URL, true);
    xhr.onload = function() {
      if(JSON.parse(this.responseText) === "Unauthorized") {
        alert("Something went wrong with your authorization. Please, log in again!");
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.assign("https://borisperkovic.github.io/news-app/login");
      }
      setIsLoading(false);
      setErrorMessage(JSON.parse(this.responseText));
    }

    xhr.send(formData);
  }
}

export const addNewsService = new AddNewsService();