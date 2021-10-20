import  { HEADLINES_URL } from "../Constants/endpoints";

class HeadlinesService {
  async requestHeadlines() {
    const response = await fetch(HEADLINES_URL);
    const data = await response.json();
    return data;
  };
};

export const headlinesService = new HeadlinesService();