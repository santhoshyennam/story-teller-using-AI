import apiClient from "./services";

export default {
  async getAllConfigurations() {
    try {
      const response = await apiClient.get("configurations");
      const allConfigurations = response.data;
      const inUseConfigurations = allConfigurations.filter(config => config.isInUse);
      return { data: inUseConfigurations};
    } catch (error) {
      console.error("Error fetching configurations:", error);
      throw error;
    }
  },
  getConfiguration(id) {
    return apiClient.get(`configurations/${id}`);
  },
  createConfiguration(configuration) {
    return apiClient.post("configurations", configuration);
  },
  updateConfiguration(configuration) {
    return apiClient.put(`configurations/${configuration.id}`, configuration);
  },
  deleteConfiguration(id) {
    return apiClient.delete(`configurations/${id}`);
  }
};
