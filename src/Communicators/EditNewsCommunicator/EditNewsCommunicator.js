
import { EDIT_NEWS_URL } from "../../Constants/endpoints";
import { tokenService } from "../../Services/token.service";

class EditNewsCommunicator {
  async requestEditNews(
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
    xhr.open("POST", EDIT_NEWS_URL, true);
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

export const editNewsCommunicator = new EditNewsCommunicator();