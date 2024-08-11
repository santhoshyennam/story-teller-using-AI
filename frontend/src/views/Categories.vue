<template>
  <v-container>
    <div :style="`display:flex;`">
    <h1>Story Categories</h1>
     <v-btn color="primary" @click="openCreateDialog" :style="`margin-left:20px; margin-top:10px;`">Create</v-btn>
     </div>
    <v-dialog v-model="dialogVisible" max-width="500">
      <v-card>
        <v-card-title>Create Category</v-card-title>
        <v-card-text>
          <v-text-field v-model="newCategoryName" label="Category Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createCategory">Create</v-btn>
          <v-btn @click="closeCreateDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row :style="`margin-top:30px;`">
      <v-col v-for="category in categories" :key="category.id" cols="12" md="4">
        <v-card class="mb-3">
          <v-card-title class="font-weight-medium">{{ category.name }}</v-card-title>
          <v-card-actions>
            <v-btn text @click="editCategory(category)">Edit</v-btn>
            <v-btn text @click="confirmDelete(category)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title>Edit Category</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedCategoryName" label="Category Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelEdit">Cancel</v-btn>
          <v-btn color="primary" @click="updateCategory">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteConfirmation" max-width="500">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete {{ selectedCategory?.name }}?</v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="primary" @click="deleteCategory">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Snackbar :snackbar="snackbar"/>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CategoryServices from "../services/CategoryServices.js";
import { updateSnackBar } from "../utils/utils"

const categories = ref([]);
const editDialog = ref(false);
const editedCategoryName = ref("");
const deleteConfirmation = ref(false);
let selectedCategory = null;
const dialogVisible = ref(false);
const newCategoryName = ref("");
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

onMounted(async () => {
  try {
    const response = await CategoryServices.getAllCategories();
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to fetch! try again later", "error");
  }
});

const openCreateDialog = () => {
  dialogVisible.value = true;
};

const closeCreateDialog = () => {
  dialogVisible.value = false;
};

const createCategory = async () => {
  try {
    const response = await CategoryServices.createCategory({ name: newCategoryName.value });
    categories.value.push(response.data);
    console.log("categories",categories.value);
    closeCreateDialog();
  } catch (error) {
    console.error("Error creating category:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to create! try again later", "error");
  }
};

const editCategory = (category) => {
  selectedCategory = category;
  editedCategoryName.value = category.name;
  editDialog.value = true;
};

const cancelEdit = () => {
  selectedCategory = null;
  editedCategoryName.value = "";
  editDialog.value = false;
};

const updateCategory = async () => {
  try {
    const updatedCategory = { ...selectedCategory, name: editedCategoryName.value };
    await CategoryServices.updateCategory(updatedCategory);
    // Refresh category list after update
    const response = await CategoryServices.getAllCategories();
    categories.value = response.data;
    editDialog.value = false;
    selectedCategory = null;
    editedCategoryName.value = "";
  } catch (error) {
    console.error("Error updating category:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to updae! try again later", "error");
  }
};

const confirmDelete = (category) => {
  selectedCategory = category;
  deleteConfirmation.value = true;
};

const cancelDelete = () => {
  selectedCategory = null;
  deleteConfirmation.value = false;
};

const deleteCategory = async () => {
  try {
    await CategoryServices.deleteCategory(selectedCategory.id);
    // Refresh category list after deletion
    const response = await CategoryServices.getAllCategories();
    categories.value = response.data;
    deleteConfirmation.value = false;
    selectedCategory = null;
  } catch (error) {
    console.error("Error deleting category:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to delete! try again later", "error");
  }
};
</script>

<style scoped>
.v-card {
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
