<script setup>
import ocLogo from "/oc_logo.png";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices";
import Snackbar from "./Snack.vue";

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const user = ref(null);
const title = ref("Story Teller");
const routes = [
  { name: "Create Story", path: "/create-story" },
  { name: "My Stories", path: "/my-stories" },
  { name: "About", path:"/about"}
];
const adminRoutes = [
  { name: "Manage Users", path: "/manage-users" },
  { name: "Manage Stories", path: "/manage-stories" },
  { name: "Manage Categories", path: "/manage-categories" },
  { name: "Manage Configurations", path: "/manage-configurations" },
  { name: "Manage Languages", path: "/manage-languages" },
  { name: "Manage Narratives", path: "/manage-narratives" },
  { name: "Manage Countries", path: "/manage-countries" },
  { name: "Manage Story Roles", path: "/manage-story-roles" },
];

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("user"));
});

function closeSnackBar() {
  snackbar.value.value = false;
}

function logout() {
  UserServices.logout()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  localStorage.removeItem("user");
  user.value = null;
  router.push({ name: "signin" });
}

function goToEditProfile() {
  router.push({ name: "edit-profile" });
}
</script>

<template>
  <div>
    <v-app-bar color='primary' app dark>
      <v-toolbar-title class="title" :style="{color:'#FFFFFF', cursor:'pointer'}">
        <a href="/" style="text-decoration:none;">{{ title }}</a>
      </v-toolbar-title>
      <v-list v-if="user !== null" dense class="d-flex flex-row" style="background-color: #196CA2;" >
        <v-list-item
          v-for="(item, index) in routes"
          :key="index"
          :to="item.path"
          class="mx-2"
          link
          style="background-color: #196CA2; "
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <v-btn v-if="user === null" class="mx-2" :to="{ name: 'signin' }">
        Login
      </v-btn>
      <v-menu v-if="user !== null" min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar class="mx-auto text-center" color="secondary" size="large">
              <span class="white--text font-weight-bold">{{
                `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
              }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="secondary">
                <span class="white--text text-h5">{{
                  `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
                }}</span>
              </v-avatar>
              <h3>{{ `${user.first_name} ${user.last_name}` }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="goToEditProfile()">Edit profile</v-btn>
              <v-btn rounded variant="text" @click="logout()">Logout</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
      <v-menu v-if="user !== null && user.is_admin" min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item 
            v-for="(item, index) in adminRoutes"
            :key="index"
            :to="item.path"
            @click="() => router.push({ name: item.path })">
              <v-list-item-title :style="{ color: '#000000' }">{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <Snackbar :snackbar="snackbar"/>
  </div>
</template>

<style scoped>
a {
  color: #FFFFFF;
}
a:hover {
  color: #FFFFFF;
}
</style>
