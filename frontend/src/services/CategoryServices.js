import apiClient from "./services";

export default {
  async getAllCategories() {
    try {
      const response = await apiClient.get("categories");
      const allCategories = response.data;
      const inUseCategories = allCategories.filter(category => category.isInUse);
      return { data: inUseCategories};
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
  getCategory(id) {
    return apiClient.get(`categories/${id}`);
  },
  createCategory(category) {
    return apiClient.post("categories", category);
  },
  updateCategory(category) {
    return apiClient.put(`categories/${category.id}`, category);
  },
  deleteCategory(id) {
    return apiClient.delete(`categories/${id}`);
  }
};
