<template>
  <v-container>
    <div :style="`display:flex;`">
    <h1>Narratives</h1>
     <v-btn color="primary" @click="openCreateDialog" :style="`margin-left:20px; margin-top:10px;`">Create</v-btn>
     </div>
    <v-dialog v-model="dialogVisible" max-width="500">
      <v-card>
        <v-card-title>Create Narrative</v-card-title>
        <v-card-text>
          <v-text-field v-model="newNarrativeName" label="Narrative Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createNarrative">Create</v-btn>
          <v-btn @click="closeCreateDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row :style="`margin-top:30px;`">
      <v-col v-for="narrative in narratives" :key="narrative.id" cols="12" md="4">
        <v-card class="mb-3">
          <v-card-title class="font-weight-medium">{{ narrative.name }}</v-card-title>
          <v-card-actions>
            <v-btn text @click="editNarrative(narrative)">Edit</v-btn>
            <v-btn text @click="confirmDelete(narrative)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title>Edit Narrative</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedNarrativeName" label="Narrative Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelEdit">Cancel</v-btn>
          <v-btn color="primary" @click="updateNarrative">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteConfirmation" max-width="500">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete {{ selectedNarrative?.name }}?</v-card-text>
        <v-card-actions>
          <v-btn text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="primary" @click="deleteNarrative">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Snackbar :snackbar="snackbar"/>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NarrativeServices from "../services/NarrativeServices.js";
import { updateSnackBar } from "../utils/utils"

const narratives = ref([]);
const editDialog = ref(false);
const editedNarrativeName = ref("");
const deleteConfirmation = ref(false);
let selectedNarrative = null;
const dialogVisible = ref(false);
const newNarrativeName = ref("");
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

onMounted(async () => {
  try {
    const response = await NarrativeServices.getAllNarratives();
    narratives.value = response.data;
  } catch (error) {
    console.error("Error fetching narratives:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to fetch! try again later", "error");
  }
});

const openCreateDialog = () => {
  dialogVisible.value = true;
};

const closeCreateDialog = () => {
  dialogVisible.value = false;
};

const createNarrative = async () => {
  try {
    const response = await NarrativeServices.createNarrative({ name: newNarrativeName.value });
    narratives.value.push(response.data);
    closeCreateDialog();
  } catch (error) {
    console.error("Error creating narrative:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to create! try again later", "error");
  }
};

const editNarrative = (narrative) => {
  selectedNarrative = narrative;
  editedNarrativeName.value = narrative.name;
  editDialog.value = true;
};

const cancelEdit = () => {
  selectedNarrative = null;
  editedNarrativeName.value = "";
  editDialog.value = false;
};

const updateNarrative = async () => {
  try {
    const updatedNarrative = { ...selectedNarrative, name: editedNarrativeName.value };
    await NarrativeServices.updateNarrative(updatedNarrative);
    // Refresh narrative list after update
    const response = await NarrativeServices.getAllNarratives();
    narratives.value = response.data;
    editDialog.value = false;
    selectedNarrative = null;
    editedNarrativeName.value = "";
  } catch (error) {
    console.error("Error updating narrative:", error);
    snackbar.value = updateSnackBar(error?.response?.data?.message || "failer to updae! try again later", "error");
  }
};

const confirmDelete = (narrative) => {
  selectedNarrative = narrative;
  deleteConfirmation.value = true;
};

const cancelDelete = () => {
  selectedNarrative = null;
  deleteConfirmation.value = false;
};

const deleteNarrative = async () => {
  try {
    await NarrativeServices.deleteNarrative(selectedNarrative.id);
    // Refresh narrative list after deletion
    const response = await NarrativeServices.getAllNarratives();
    narratives.value = response.data;
    deleteConfirmation.value = false;
    selectedNarrative = null;
  } catch (error) {
    console.error("Error deleting narrative:", error);
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
