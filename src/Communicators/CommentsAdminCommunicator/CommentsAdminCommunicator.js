import { COMMENTS_ADMIN_URL} from "../../Constants/endpoints";
import { tokenService } from "../../Services/token.service"

class CommentsAdminCommunicator {
  async getComments() {
    const token = tokenService.getToken();
    if(!token) {
      alert("Something is wrong with your authorization. Please, log in again!");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.location.assign("https://borisperkovic.github.io/news-app/login");
      return;
    }
    const response = await fetch(COMMENTS_ADMIN_URL + "?comment=get");
    const data = await response.json();
    return data;
  }

  async allowDissallowComments(param, id) {
    const token = tokenService.getToken();
    if(!token) {
      alert("Something is wrong with your authorization. Please, log in again!");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.location.assign("https://borisperkovic.github.io/news-app/login");
      return;
    }
    const response = await fetch(COMMENTS_ADMIN_URL + "?comment=" + param + "&id=" + id, {
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
    }
    return "Comment allowed";
  }

};

export const commentsAdminCommunicator = new CommentsAdminCommunicator();