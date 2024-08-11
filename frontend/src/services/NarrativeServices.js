import apiClient from "./services";

export default {
  async getAllNarratives() {
    try {
      const response = await apiClient.get("narratives");
      const allNarratives = response.data;
      const inUseNarratives = allNarratives.filter(narrative => narrative.isInUse);
      return { data: inUseNarratives};
    } catch (error) {
      console.error("Error fetching narratives:", error);
      throw error;
    }
  },
  getNarrative(id) {
    return apiClient.get(`narratives/${id}`);
  },
  createNarrative(narrative) {
    return apiClient.post("narratives", narrative);
  },
  updateNarrative(narrative) {
    return apiClient.put(`narratives/${narrative.id}`, narrative);
  },
  deleteNarrative(id) {
    return apiClient.delete(`narratives/${id}`);
  }
};
