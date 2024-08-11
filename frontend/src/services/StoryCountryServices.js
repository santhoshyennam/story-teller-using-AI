import apiClient from "./services";

export default {
  async getAllCountries() {
    try {
      const response = await apiClient.get("storyCountries");
      const allCountries = response.data;
      const inUseCountries = allCountries.filter(country => country.isInUse);
      return { data: inUseCountries};
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw error;
    }
  },
  getCountry(id) {
    return apiClient.get(`storyCountries/${id}`);
  },
  createCountry(country) {
    return apiClient.post("storyCountries", country);
  },
  updateCountry(country) {
    return apiClient.put(`storyCountries/${country.id}`, country);
  },
  deleteCountry(id) {
    return apiClient.delete(`storyCountries/${id}`);
  }
};
