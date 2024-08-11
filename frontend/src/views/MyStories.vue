<template>
  <v-container>
    <div :style="`display:flex;`">
        <h1>My Stories</h1>
        <v-btn color="primary" @click="gotoCreate" :style="`margin-left:20px; margin-top:10px;`">Create Story</v-btn>
    </div>
    <h3 v-if="stories.length == 0" class="d-flex align-center justify-center" style="min-height: 70vh;"> No Stories to Display, Please create one!</h3>
    <v-container v-else>
      <v-row>
        <v-col v-for="story in stories" :key="story.id" cols="12" md="4">
          <v-card class="story-card">
            <v-card-title>{{ story.title }}</v-card-title>
            <v-card-text>{{ truncateText(story.content) }}</v-card-text>
            <v-card-actions>
              <router-link :to="`/view-story/${story.id}`">Read More</router-link>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import StoryServices from '../services/StoryServices.js';
import { useRouter } from "vue-router";

const router = useRouter();
const stories = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/signin');
    }
    const id = JSON.parse(user).id
    const response = await StoryServices.getStoryByUserId(id);
    stories.value = response.data;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching stories:', error);
    loading.value = false;
  }
});

const gotoCreate = () => {
    router.push({ name: "create-story" });
}

const truncateText = (text) => {
  if (text.length <= 40) return text;
  return `${text.substring(0, 40)}...`;
};
</script>

<style scoped>
.story-card {
  margin-bottom: 20px;
}
</style>
