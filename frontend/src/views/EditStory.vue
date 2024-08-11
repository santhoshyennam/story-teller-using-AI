<template>
  <v-container>
    <Loading v-if="isLoading"/>
    <v-card v-else>
      <v-card-title>Edit Story</v-card-title>
      <v-card-text>
        <v-text-field v-model="title" label="Story Title" required></v-text-field>

        <v-select
          v-model="selectedCategory"
          :items="categories"
          item-title="name"
          item-value="id"
          label="Select Category"
          required
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-select>

        <v-select
          v-model="selectedCountry"
          :items="countries"
          item-title="name"
          item-value="id"
          label="Select Country"
          required
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-select>

        <v-select
          v-model="selectedRole"
          :items="roles"
          item-title="name"
          item-value="id"
          label="Select Role"
          required
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-select>

        <v-select
          v-model="selectedNarrative"
          :items="narratives"
          item-title="name"
          item-value="id"
          label="Select Narrative"
          required
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-select>

        <v-select
          v-model="selectedConfiguration"
          :items="configurations"
          item-title="name"
          item-value="id"
          label="Select Configuration"
          required
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-select>

        <v-select
          v-model="selectedLanguage"
          :items="languages"
          item-title="name"
          item-value="id"
          label="Select Language"
          required
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-select>

        <v-btn color="primary" @click="updateStory">Update Story</v-btn>
        <v-btn color="secondary" @click="viewStory" style="margin-left:20px;">View Story</v-btn>
      </v-card-text>
    </v-card>
    <Snackbar :snackbar="snackbar"/>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import StoryService from '../services/StoryServices';
import CategoryService from '../services/CategoryServices';
import CountryService from '../services/StoryCountryServices';
import RoleService from '../services/StoryRoleServices';
import NarrativeService from '../services/NarrativeServices';
import ConfigurationService from '../services/ConfigurationServices';
import LanguageService from '../services/LanguageServices';
import { updateSnackBar } from '../utils/utils';
import Snackbar from "../components/Snack.vue";
import Loading from "../components/Loading.vue";

const router = useRouter();
const storyId = ref(router.currentRoute.value.params.id);
const title = ref('');
const content = ref('');
const categories = ref([]);
const countries = ref([]);
const roles = ref([]);
const narratives = ref([]);
const configurations = ref([]);
const languages = ref([]);
const selectedCategory = ref(null);
const selectedCountry = ref(null);
const selectedRole = ref(null);
const selectedNarrative = ref(null);
const selectedConfiguration = ref(null);
const selectedLanguage = ref(null);
const snackbar = ref({
  value: false,
  color: '',
  text: ''
});
const isLoading = ref(false);
const initialData = ref({});

onMounted(async () => {
  try {
    isLoading.value = true;
    // Fetch dropdown data
    categories.value = (await CategoryService.getAllCategories()).data;
    countries.value = (await CountryService.getAllCountries()).data;
    roles.value = (await RoleService.getAllStoryRoles()).data;
    narratives.value = (await NarrativeService.getAllNarratives()).data;
    configurations.value = (await ConfigurationService.getAllConfigurations()).data;
    languages.value = (await LanguageService.getAllLanguages()).data;

    // Fetch story details
    const { data } = await StoryService.getStory(storyId.value);
    title.value = data.title;
    content.value = data.content;
    selectedCategory.value = data.categoryId;
    selectedCountry.value = data.storyCountryId;
    selectedRole.value = data.storyRoleId;
    selectedNarrative.value = data.narrativeId;
    selectedConfiguration.value = data.configurationId;
    selectedLanguage.value = data.languageId;

    // Store initial data for comparison
    initialData.value = {
      title: data.title,
      content: data.content,
      categoryId: data.categoryId,
      storyCountryId: data.storyCountryId,
      storyRoleId: data.storyRoleId,
      narrativeId: data.narrativeId,
      configurationId: data.configurationId,
      languageId: data.languageId
    };

    isLoading.value = false;
  } catch (error) {
    snackbar.value = updateSnackBar('Error fetching data', 'error');
    isLoading.value = false;
  }
});

const updateStory = async () => {
  try {
    // Compare the current state with the initial state
    const updatedFields = {};
    if (title.value !== initialData.value.title) updatedFields.title = title.value;
    if (content.value !== initialData.value.content) updatedFields.content = content.value;
    if (selectedCategory.value !== initialData.value.categoryId) updatedFields.categoryId = selectedCategory.value;
    if (selectedCountry.value !== initialData.value.storyCountryId) updatedFields.storyCountryId = selectedCountry.value;
    if (selectedRole.value !== initialData.value.storyRoleId) updatedFields.storyRoleId = selectedRole.value;
    if (selectedNarrative.value !== initialData.value.narrativeId) updatedFields.narrativeId = selectedNarrative.value;
    if (selectedConfiguration.value !== initialData.value.configurationId) updatedFields.configurationId = selectedConfiguration.value;
    if (selectedLanguage.value !== initialData.value.languageId) updatedFields.languageId = selectedLanguage.value;

    // If no fields have been updated, show an error snackbar
    if (Object.keys(updatedFields).length === 0) {
      snackbar.value = updateSnackBar('No changes made to update', 'error');
      return;
    }

    isLoading.value = true;
    const userId = JSON.parse(localStorage.getItem('user')).id; // Assuming user is stored in localStorage
    const storyData = {
      ...updatedFields,
      id: storyId.value
    };
    const response = await StoryService.updateStory(storyData);
    snackbar.value = updateSnackBar('Story updated successfully', 'green');
    isLoading.value = false;
    router.push({ name: 'view-story', params: { id: storyId.value }});
  } catch (error) {
    console.log("error",error)
    snackbar.value = updateSnackBar(error?.response?.data?.message || 'Error updating story', 'error');
    isLoading.value = false;
  }
};

const viewStory = () => {
    router.push({ name: 'view-story', params: { id: storyId.value }});
}
</script>

<style scoped>
.v-card {
  margin-top: 20px;
}
.v-select {
  margin-bottom: 20px;
}
.v-text-field {
  margin-bottom: 20px;
}
.v-select .v-list-item {
  background-color: #ffffff;
  color: #000000;
}
.v-list-item {
  background-color: #ffffff;
  color: #000000;
}
</style>
