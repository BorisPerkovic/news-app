import { BREAKINGNEWS_URL } from "../../Constants/endpoints";


class BreakingNewsCommunicator {
  async getBreakingNews() {
    const response = await fetch(BREAKINGNEWS_URL);
    const data = await response.json();
    return data;
  }
}

export const breakingNewsCommunicator = new BreakingNewsCommunicator();