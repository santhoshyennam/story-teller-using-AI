import apiClient from "./services";

export default {
  getAllStories() {
    return apiClient.get("stories");
  },
  getStory(id) {
    return apiClient.get(`stories/${id}`);
  },
  createStory(story) {
    return apiClient.post("stories", story);
  },
  updateStory(story) {
    return apiClient.put(`stories/${story.id}`, story);
  },
  deleteStory(id) {
    return apiClient.delete(`stories/${id}`);
  },
  getStoryByUserId(id) {
    return apiClient.get(`stories/user/${id}`);
  }
};
