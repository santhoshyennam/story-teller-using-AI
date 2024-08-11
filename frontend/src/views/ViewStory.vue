<template>
  <v-container v-if='story.id'>
    <v-btn @click="downloadPDF" color="primary" class="mb-4">Download as PDF</v-btn>
    <v-btn @click="editStory" v-if='user.is_admin || user.id == story.userId' color="secondary" class="mb-4" style="margin-left:10px;">Edit</v-btn>
    <v-btn @click="deleteStory" v-if='user.is_admin || user.id == story.userId' color="error" class="mb-4" style="margin-left:10px;">Delete</v-btn>
    <v-card v-if="story.id" ref="storyContent">
      <v-card-title>{{ story.title }}</v-card-title>
      <v-card-subtitle>{{ formattedDate }}</v-card-subtitle>
      <v-card-text>
        <div v-html="story.content"></div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-subtitle>Details:</v-card-subtitle>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Category:</v-list-item-title>
              <v-list-item-subtitle>{{ story.category.name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Story Country:</v-list-item-title>
              <v-list-item-subtitle>{{ story.storyCountry.name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Story Role:</v-list-item-title>
              <v-list-item-subtitle>{{ story.storyRole.name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Narrative:</v-list-item-title>
              <v-list-item-subtitle>{{ story.narrative.name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Configuration:</v-list-item-title>
              <v-list-item-subtitle>{{ story.configuration.name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Language:</v-list-item-title>
              <v-list-item-subtitle>{{ story.language.name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
        <!-- Delete Story Dialog -->
    <v-dialog v-model="dialog.delete" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Delete Story</span>
        </v-card-title>
        <v-card-text>
          Please confirm to delete this story?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="closeDeleteModal"
            >Cancel</v-btn
          >
          <v-btn color="error darken-1" text @click="confirmDelete"
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <SnackBar :snackbar="snackbar" />
  </v-container>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import StoryService from '../services/StoryServices';
import html2pdf from 'html2pdf.js';
import SnackBar from '../components/Snack.vue'

const router = useRouter();
const dialog = ref({
  edit: false,
  delete: false,
});
const storyId = ref(router.currentRoute.value.params.id);
const story = ref({});
const formattedDate = computed(() => {
  const date = new Date(story.value.publication_date);
  return date.toLocaleString();
});
const isLoading = ref(false);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const user = ref(null);

onMounted(async () => {
  try {
    const userFromLocal = JSON.parse(localStorage.getItem('user'));
    if (!userFromLocal) {
      router.push('/login');
    } else {
      user.value = userFromLocal;
    }
    const { data } = await StoryService.getStory(storyId.value);
    story.value = data;
  } catch (error) {
    console.error('Error fetching story:', error);
    router.push({ name: 'home'});
    snackbar.value.value = true;
    snackbar.value.text = error?.response?.data?.message || "Failed to retrieve story";
    snackbar.value.color = "red";
  }
});

const editStory = () => {
  router.push({ name: 'edit-story', params: { id: storyId.value }})
}

const deleteStory = () => {
  dialog.value.delete = true;
}
const downloadPDF = () => {
  const element = document.querySelector(".v-card");
  const opt = {
    margin:       0.5,
    filename:     `${story.value.title}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(element).set(opt).save();
};
const confirmDelete = async () => {
  try {
    await StoryService.deleteStory(storyId.value);
    closeDeleteModal();
    router.push({ name: 'home'});
    snackbar.value.value = true;
    snackbar.value.text = "Story deleted successfully";
    snackbar.value.color = "green";
  } catch (error) {
    snackbar.value.value = true;
    snackbar.value.text = "Failed to delete story";
    snackbar.value.color = "red";
  }
};

const closeDeleteModal = () => {
  dialog.value.delete = false;
};
</script>

<style scoped>
/* Add custom styles here */
</style>
