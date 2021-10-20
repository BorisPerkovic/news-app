import { AUTHORS_NEWS_URL } from "../../Constants/endpoints";

class AuthorsNewsCommunicator {

  async getauhtorsNews() {
    const response = await fetch(AUTHORS_NEWS_URL, {
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
      return data;
    }
    
  }

};

export const authorsNewsCommunicator = new AuthorsNewsCommunicator();