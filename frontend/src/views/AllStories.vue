<template>
  <v-container>
    <div :style="`display:flex;`" v-if="!disableTitle">
        <h1>Manage Categories</h1>
        <v-btn color="primary" @click="gotoCreate" :style="`margin-left:20px; margin-top:10px;`">Create Story</v-btn>
    </div>
    <v-container>
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
import { ref, onMounted, defineProps, toRef } from 'vue';
import StoryServices from '../services/StoryServices.js';
import { useRouter } from "vue-router";

const router = useRouter();
const stories = ref([]);
const loading = ref(true);

const props = defineProps({
  disableTitle: Boolean,
});
const snackbar = toRef(props, 'disableTitle');

onMounted(async () => {
  try {
    const response = await StoryServices.getAllStories();
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
