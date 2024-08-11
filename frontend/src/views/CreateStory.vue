<template>
  <v-container>
    <Loading v-if="isLoading"/>
    <v-card v-else>
      <v-card-title>Create New Story</v-card-title>
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

        <v-btn color="primary" @click="createStory">Create Story</v-btn>
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
import Snackbar from "../components/Snack.vue"
import Loading from "../components/Loading.vue"

const router = useRouter();
const title = ref('');
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
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    categories.value = (await CategoryService.getAllCategories()).data;
    countries.value = (await CountryService.getAllCountries()).data;
    roles.value = (await RoleService.getAllStoryRoles()).data;
    narratives.value = (await NarrativeService.getAllNarratives()).data;
    configurations.value = (await ConfigurationService.getAllConfigurations()).data;
    languages.value = (await LanguageService.getAllLanguages()).data;
    isLoading.value = false
  } catch (error) {
    snackbar.value = updateSnackBar('Error fetching dropdown data', 'error');
    isLoading.value = false
  }
});

const createStory = async () => {
  try {
    isLoading.value = true
    const userId = JSON.parse(localStorage.getItem('user')).id; // Assuming user is stored in localStorage
    const storyData = {
      title: title.value,
      categoryId: selectedCategory.value,
      storyCountryId: selectedCountry.value,
      storyRoleId: selectedRole.value,
      narrativeId: selectedNarrative.value,
      configurationId: selectedConfiguration.value,
      languageId: selectedLanguage.value,
      userId: userId
    };

    const response = await StoryService.createStory(storyData);
    snackbar.value = updateSnackBar('Story created successfully', 'green');
    isLoading.value = false
    router.push({ name: 'view-story', params: { id: response.data.id } });
  } catch (error) {
    snackbar.value = updateSnackBar( error?.response?.data?.message || 'Error creating story', 'error');
    isLoading.value = false
  }
};
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
