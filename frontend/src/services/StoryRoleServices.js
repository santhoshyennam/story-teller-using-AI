import apiClient from "./services";

export default {
  async getAllStoryRoles() {
    try {
      const response = await apiClient.get("storyRoles");
      const allRoles = response.data;
      const inUseRoles = allRoles.filter(role => role.isInUse);
      return { data: inUseRoles};
    } catch (error) {
      console.error("Error fetching story roles:", error);
      throw error;
    }
  },
  getStoryRole(id) {
    return apiClient.get(`storyRoles/${id}`);
  },
  createStoryRole(storyRole) {
    return apiClient.post("storyRoles", storyRole);
  },
  updateStoryRole(storyRole) {
    return apiClient.put(`storyRoles/${storyRole.id}`, storyRole);
  },
  deleteStoryRole(id) {
    return apiClient.delete(`storyRoles/${id}`);
  }
};
