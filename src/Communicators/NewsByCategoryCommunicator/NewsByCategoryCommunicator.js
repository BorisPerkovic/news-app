import { NEWS_BY_CATEGORY_URL } from "../../Constants/endpoints";

class NewsByCategoryCommunicator {
  async getNewsList(category) {
    const response = await fetch(NEWS_BY_CATEGORY_URL + "?category=" + category);
    const data = await response.json();
    return data;
  }
}

export const newsByCategoryCommunicator = new NewsByCategoryCommunicator();