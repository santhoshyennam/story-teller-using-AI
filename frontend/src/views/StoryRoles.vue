<template>
  <v-container>
    <div :style="`display:flex;`">
    <h1>Story Roles</h1>
     <v-btn color="primary" @click="openCreateDialog" :style="`margin-left:20px; margin-top:10px;`">Create</v-btn>
     </div>
    <v-dialog v-model="dialogVisible" max-width="500">
      <v-card>
        <v-card-title>Create Story Role</v-card-title>
        <v-card-text>
          <v-text-field v-model="newStoryRoleName" label="StoryRole Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createStoryRole">Create</v-btn>
          <v-btn @click="closeCreateDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row :style="`margin-top:30px;`">
      <v-col v-for="storyRole in storyRoles" :key="storyRole.id" cols="12" md="4">
        <v-card class="mb-3">
          <v-card-title class="font-weight-medium">{{ storyRole.name }}</v-card-title>
          <v-card-actions>
            <v-btn text @click="editStoryRole(storyRole)">Edit</v-btn>
            <v-btn text @click="confirmDelete(storyRole)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title>Edit Story Role</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedStoryRoleName" label="StoryRole Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelEdit">Cancel</v-btn>
          <v-btn color="primary" @click="updateStoryRole">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteConfirmation" max-width="500">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete {{ selectedStoryRole?.name }}?</v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="primary" @click="deleteStoryRole">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Snackbar :snackbar="snackbar"/>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import StoryRoleServices from "../services/StoryRoleServices.js";
import { updateSnackBar } from "../utils/utils"

const storyRoles = ref([]);
const editDialog = ref(false);
const editedStoryRoleName = ref("");
const deleteConfirmation = ref(false);
let selectedStoryRole = null;
const dialogVisible = ref(false);
const newStoryRoleName = ref("");
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

onMounted(async () => {
  try {
    const response = await StoryRoleServices.getAllStoryRoles();
    storyRoles.value = response.data;
  } catch (error) {
    console.error("Error fetching storyRoles:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to fetch! try again later", "error");
  }
});

const openCreateDialog = () => {
  dialogVisible.value = true;
};

const closeCreateDialog = () => {
  dialogVisible.value = false;
};

const createStoryRole = async () => {
  try {
    const response = await StoryRoleServices.createStoryRole({ name: newStoryRoleName.value });
    storyRoles.value.push(response.data);
    closeCreateDialog();
  } catch (error) {
    console.error("Error creating storyRole:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to create! try again later", "error");
  }
};

const editStoryRole = (storyRole) => {
  selectedStoryRole = storyRole;
  editedStoryRoleName.value = storyRole.name;
  editDialog.value = true;
};

const cancelEdit = () => {
  selectedStoryRole = null;
  editedStoryRoleName.value = "";
  editDialog.value = false;
};

const updateStoryRole = async () => {
  try {
    const updatedStoryRole = { ...selectedStoryRole, name: editedStoryRoleName.value };
    await StoryRoleServices.updateStoryRole(updatedStoryRole);
    // Refresh storyRole list after update
    const response = await StoryRoleServices.getAllStoryRoles();
    storyRoles.value = response.data;
    editDialog.value = false;
    selectedStoryRole = null;
    editedStoryRoleName.value = "";
  } catch (error) {
    console.error("Error updating storyRole:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to updae! try again later", "error");
  }
};

const confirmDelete = (storyRole) => {
  selectedStoryRole = storyRole;
  deleteConfirmation.value = true;
};

const cancelDelete = () => {
  selectedStoryRole = null;
  deleteConfirmation.value = false;
};

const deleteStoryRole = async () => {
  try {
    await StoryRoleServices.deleteStoryRole(selectedStoryRole.id);
    // Refresh storyRole list after deletion
    const response = await StoryRoleServices.getAllStoryRoles();
    storyRoles.value = response.data;
    deleteConfirmation.value = false;
    selectedStoryRole = null;
  } catch (error) {
    console.error("Error deleting storyRole:", error);
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
