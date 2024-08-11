<template>
  <v-container>
    <div :style="`display:flex;`">
    <h1>Languages</h1>
     <v-btn color="primary" @click="openCreateDialog" :style="`margin-left:20px; margin-top:10px;`">Create</v-btn>
     </div>
    <v-dialog v-model="dialogVisible" max-width="500">
      <v-card>
        <v-card-title>Create Language</v-card-title>
        <v-card-text>
          <v-text-field v-model="newLanguageName" label="Language Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createLanguage">Create</v-btn>
          <v-btn @click="closeCreateDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row :style="`margin-top:30px;`">
      <v-col v-for="language in languages" :key="language.id" cols="12" md="4">
        <v-card class="mb-3">
          <v-card-title class="font-weight-medium">{{ language.name }}</v-card-title>
          <v-card-actions>
            <v-btn text @click="editLanguage(language)">Edit</v-btn>
            <v-btn text @click="confirmDelete(language)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title>Edit Language</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedLanguageName" label="Language Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelEdit">Cancel</v-btn>
          <v-btn color="primary" @click="updateLanguage">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteConfirmation" max-width="500">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete {{ selectedLanguage?.name }}?</v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="primary" @click="deleteLanguage">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Snackbar :snackbar="snackbar"/>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LanguageServices from "../services/LanguageServices.js";
import { updateSnackBar } from "../utils/utils"

const languages = ref([]);
const editDialog = ref(false);
const editedLanguageName = ref("");
const deleteConfirmation = ref(false);
let selectedLanguage = null;
const dialogVisible = ref(false);
const newLanguageName = ref("");
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

onMounted(async () => {
  try {
    const response = await LanguageServices.getAllLanguages();
    languages.value = response.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to fetch! try again later", "error");
  }
});

const openCreateDialog = () => {
  dialogVisible.value = true;
};

const closeCreateDialog = () => {
  dialogVisible.value = false;
};

const createLanguage = async () => {
  try {
    const response = await LanguageServices.createLanguage({ name: newLanguageName.value });
    languages.value.push(response.data);
    closeCreateDialog();
  } catch (error) {
    console.error("Error creating language:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to create! try again later", "error");
  }
};

const editLanguage = (language) => {
  selectedLanguage = language;
  editedLanguageName.value = language.name;
  editDialog.value = true;
};

const cancelEdit = () => {
  selectedLanguage = null;
  editedLanguageName.value = "";
  editDialog.value = false;
};

const updateLanguage = async () => {
  try {
    const updatedLanguage = { ...selectedLanguage, name: editedLanguageName.value };
    await LanguageServices.updateLanguage(updatedLanguage);
    // Refresh language list after update
    const response = await LanguageServices.getAllLanguages();
    languages.value = response.data;
    editDialog.value = false;
    selectedLanguage = null;
    editedLanguageName.value = "";
  } catch (error) {
    console.error("Error updating language:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to updae! try again later", "error");
  }
};

const confirmDelete = (language) => {
  selectedLanguage = language;
  deleteConfirmation.value = true;
};

const cancelDelete = () => {
  selectedLanguage = null;
  deleteConfirmation.value = false;
};

const deleteLanguage = async () => {
  try {
    await LanguageServices.deleteLanguage(selectedLanguage.id);
    // Refresh language list after deletion
    const response = await LanguageServices.getAllLanguages();
    languages.value = response.data;
    deleteConfirmation.value = false;
    selectedLanguage = null;
  } catch (error) {
    console.error("Error deleting language:", error);
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
