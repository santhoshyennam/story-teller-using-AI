<template>
  <v-container>
    <div :style="`display:flex;`">
    <h1>Story Countries</h1>
     <v-btn color="primary" @click="openCreateDialog" :style="`margin-left:20px; margin-top:10px;`">Create</v-btn>
     </div>
    <v-dialog v-model="dialogVisible" max-width="500">
      <v-card>
        <v-card-title>Create Country</v-card-title>
        <v-card-text>
          <v-text-field v-model="newCountryName" label="Country Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createCountry">Create</v-btn>
          <v-btn @click="closeCreateDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row :style="`margin-top:30px;`">
      <v-col v-for="country in countries" :key="country.id" cols="12" md="4">
        <v-card class="mb-3">
          <v-card-title class="font-weight-medium">{{ country.name }}</v-card-title>
          <v-card-actions>
            <v-btn text @click="editCountry(country)">Edit</v-btn>
            <v-btn text @click="confirmDelete(country)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title>Edit Country</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedCountryName" label="Country Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelEdit">Cancel</v-btn>
          <v-btn color="primary" @click="updateCountry">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteConfirmation" max-width="500">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete {{ selectedCountry?.name }}?</v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="primary" @click="deleteCountry">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Snackbar :snackbar="snackbar"/>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CountryServices from "../services/StoryCountryServices.js";
import { updateSnackBar } from "../utils/utils"

const countries = ref([]);
const editDialog = ref(false);
const editedCountryName = ref("");
const deleteConfirmation = ref(false);
let selectedCountry = null;
const dialogVisible = ref(false);
const newCountryName = ref("");
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

onMounted(async () => {
  try {
    const response = await CountryServices.getAllCountries();
    countries.value = response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to fetch! try again later", "error");
  }
});

const openCreateDialog = () => {
  dialogVisible.value = true;
};

const closeCreateDialog = () => {
  dialogVisible.value = false;
};

const createCountry = async () => {
  try {
    const response = await CountryServices.createCountry({ name: newCountryName.value });
    countries.value.push(response.data);
    closeCreateDialog();
  } catch (error) {
    console.error("Error creating country:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to create! try again later", "error");
  }
};

const editCountry = (country) => {
  selectedCountry = country;
  editedCountryName.value = country.name;
  editDialog.value = true;
};

const cancelEdit = () => {
  selectedCountry = null;
  editedCountryName.value = "";
  editDialog.value = false;
};

const updateCountry = async () => {
  try {
    const updatedCountry = { ...selectedCountry, name: editedCountryName.value };
    await CountryServices.updateCountry(updatedCountry);
    // Refresh country list after update
    const response = await CountryServices.getAllCountries();
    countries.value = response.data;
    editDialog.value = false;
    selectedCountry = null;
    editedCountryName.value = "";
  } catch (error) {
    console.error("Error updating country:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to updae! try again later", "error");
  }
};

const confirmDelete = (country) => {
  selectedCountry = country;
  deleteConfirmation.value = true;
};

const cancelDelete = () => {
  selectedCountry = null;
  deleteConfirmation.value = false;
};

const deleteCountry = async () => {
  try {
    await CountryServices.deleteCountry(selectedCountry.id);
    // Refresh country list after deletion
    const response = await CountryServices.getAllCountries();
    countries.value = response.data;
    deleteConfirmation.value = false;
    selectedCountry = null;
  } catch (error) {
    console.error("Error deleting country:", error);
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
