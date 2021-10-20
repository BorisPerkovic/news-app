import { SINGLE_NEWS_URL} from "../../Constants/endpoints";

class SingleNewsCommunicator {
  async getSingleNews(id) {
    const response = await fetch(SINGLE_NEWS_URL + "?news=" + id);
    const data = await response.json();
    return data;
  }

  async likeDislikeNews(param, id) {
    const response = await fetch(`${SINGLE_NEWS_URL}?news=${param}&id=${id}`);
    const data = await response.json();
    return data;
  }
}

export const singleNewsCommunicator = new SingleNewsCommunicator();