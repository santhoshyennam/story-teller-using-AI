import apiClient from "./services";

export default {
  async getAllLanguages() {
    try {
      const response = await apiClient.get("languages");
      const allLanguages = response.data;
      const inUseLanguages = allLanguages.filter(language => language.isInUse);
      return { data: inUseLanguages};
    } catch (error) {
      console.error("Error fetching languages:", error);
      throw error;
    }
  },
  getLanguage(id) {
    return apiClient.get(`languages/${id}`);
  },
  createLanguage(language) {
    return apiClient.post("languages", language);
  },
  updateLanguage(language) {
    return apiClient.put(`languages/${language.id}`, language);
  },
  deleteLanguage(id) {
    return apiClient.delete(`languages/${id}`);
  }
};
