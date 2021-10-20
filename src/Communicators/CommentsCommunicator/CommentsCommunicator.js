import { COMMENTS_URL} from "../../Constants/endpoints";

class CommentsCommunicator {
  async comments(param) {
    const response = await fetch(COMMENTS_URL + "?comments=" + param);
    const data = await response.json();
    return data;
  }

  async addComments (message, payload) {
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify({
        payload
      })
    };
    const response = await fetch(COMMENTS_URL + "?comments=add", requestOptions);
    const data = await response.json();
    return message(data);
  }

  async likeDislikeComment (param, id) {
    const response = await fetch(`${COMMENTS_URL}?comments=${param}&id=${id}`);
    const data = await response.json();
    return data;
  }

};

export const commentsCommunicator = new CommentsCommunicator();