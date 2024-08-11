<template>
  <v-container>
    <div :style="`display:flex;`">
    <h1>Configurations</h1>
     <v-btn color="primary" @click="openCreateDialog" :style="`margin-left:20px; margin-top:10px;`">Create</v-btn>
     </div>
    <v-dialog v-model="dialogVisible" max-width="500">
      <v-card>
        <v-card-title>Create Configuration</v-card-title>
        <v-card-text>
          <v-text-field v-model="newConfigurationName" label="Configuration Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createConfiguration">Create</v-btn>
          <v-btn @click="closeCreateDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row :style="`margin-top:30px;`">
      <v-col v-for="configuration in configurations" :key="configuration.id" cols="12" md="4">
        <v-card class="mb-3">
          <v-card-title class="font-weight-medium">{{ configuration.name }}</v-card-title>
          <v-card-actions>
            <v-btn text @click="editConfiguration(configuration)">Edit</v-btn>
            <v-btn text @click="confirmDelete(configuration)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title>Edit Configuration</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedConfigurationName" label="Configuration Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelEdit">Cancel</v-btn>
          <v-btn color="primary" @click="updateConfiguration">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteConfirmation" max-width="500">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete {{ selectedConfiguration?.name }}?</v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="primary" @click="deleteConfiguration">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Snackbar :snackbar="snackbar"/>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ConfigurationServices from "../services/ConfigurationServices.js";
import { updateSnackBar } from "../utils/utils"

const configurations = ref([]);
const editDialog = ref(false);
const editedConfigurationName = ref("");
const deleteConfirmation = ref(false);
let selectedConfiguration = null;
const dialogVisible = ref(false);
const newConfigurationName = ref("");
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

onMounted(async () => {
  try {
    const response = await ConfigurationServices.getAllConfigurations();
    configurations.value = response.data;
  } catch (error) {
    console.error("Error fetching configurations:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to fetch! try again later", "error");
  }
});

const openCreateDialog = () => {
  dialogVisible.value = true;
};

const closeCreateDialog = () => {
  dialogVisible.value = false;
};

const createConfiguration = async () => {
  try {
    const response = await ConfigurationServices.createConfiguration({ name: newConfigurationName.value });
    configurations.value.push(response.data);
    closeCreateDialog();
  } catch (error) {
    console.error("Error creating configuration:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to create! try again later", "error");
  }
};

const editConfiguration = (configuration) => {
  selectedConfiguration = configuration;
  editedConfigurationName.value = configuration.name;
  editDialog.value = true;
};

const cancelEdit = () => {
  selectedConfiguration = null;
  editedConfigurationName.value = "";
  editDialog.value = false;
};

const updateConfiguration = async () => {
  try {
    const updatedConfiguration = { ...selectedConfiguration, name: editedConfigurationName.value };
    await ConfigurationServices.updateConfiguration(updatedConfiguration);
    // Refresh configuration list after update
    const response = await ConfigurationServices.getAllConfigurations();
    configurations.value = response.data;
    editDialog.value = false;
    selectedConfiguration = null;
    editedConfigurationName.value = "";
  } catch (error) {
    console.error("Error updating configuration:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to updae! try again later", "error");
  }
};

const confirmDelete = (configuration) => {
  selectedConfiguration = configuration;
  deleteConfirmation.value = true;
};

const cancelDelete = () => {
  selectedConfiguration = null;
  deleteConfirmation.value = false;
};

const deleteConfiguration = async () => {
  try {
    await ConfigurationServices.deleteConfiguration(selectedConfiguration.id);
    // Refresh configuration list after deletion
    const response = await ConfigurationServices.getAllConfigurations();
    configurations.value = response.data;
    deleteConfirmation.value = false;
    selectedConfiguration = null;
  } catch (error) {
    console.error("Error deleting configuration:", error);
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
