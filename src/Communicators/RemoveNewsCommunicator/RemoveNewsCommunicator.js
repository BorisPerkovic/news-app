
import { REMOVE_NEWS_URL } from "../../Constants/endpoints";
import { tokenService } from "../../Services/token.service";

class RemoveNewsCommunicator {
  async requestRemoveNews(
    setIsLoading,
    setErrorMessage,
    id
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
    const response = await fetch(REMOVE_NEWS_URL + "?id=" + id, {
      method: "POST",
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify({
        token: localStorage.getItem("token")
      }), 
    });
    const data = await response.json();
    if(data === "Unauthorized") {
      alert("Something is wrong with your authorization. Please, log in again!");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.location.assign("https://borisperkovic.github.io/news-app/login");
      return;
    } else {
      setIsLoading(false);
      setErrorMessage(data);
    }
      
  }
}

export const removeNewsCommunicator = new RemoveNewsCommunicator();