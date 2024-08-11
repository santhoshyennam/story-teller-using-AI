<script setup>
import { onMounted } from "vue";
import { ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import Loading from "./Loading.vue";
import SnackBar from "./Snack.vue";
import { updateSnackBar } from "../utils/utils";

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const user = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  is_admin: false
});
const loggedInUser = ref(null);
const isLoading = ref(false);
onMounted(async () => {
    loggedInUser.value = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = JSON.parse(localStorage.getItem("user"));
        if(!isLoggedIn) {
        router.push({ name: "login" });
    }
});

async function addUser() {
  if(user.value.first_name === "") {
      snackbar.value = updateSnackBar("First Name is Empty")
  }
  else if(user.value.last_name === "") {
    snackbar.value = updateSnackBar("Last Name is empty")
  }
  else if(user.value.email === "") {
    snackbar.value = updateSnackBar("Email is empty")
  }
    else if(user.value.password === "") {
    snackbar.value = updateSnackBar("Password is empty")
  }
  else {
    isLoading.value = true
    await UserServices.addUser(user.value)
        .then((response) => {
            snackbar.value = updateSnackBar("User is created successfully!","green")
            isLoading.value = false
            router.push({ name: 'manage-users'})
        })
        .catch((error) => {
            console.log(error);
            snackbar.value = updateSnackBar(error?.response?.data?.message || "Create User is failed!","error")
            isLoading.value = false
        });
  }
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-card class="rounded-lg elevation-5">
        <div style="display:flex;" class="heading">
          <v-card-title class="headline mb-2">Create User </v-card-title>
        </div>
        <Loader v-if="isLoading" />
        <v-card-text v-else>
          <v-text-field v-model="user.first_name" label="First Name" class="md-3" id="name"></v-text-field>
          <v-text-field v-model="user.last_name" label="Last Name" class="md-3" id="contact"></v-text-field>
          <v-text-field v-model="user.email" label="Email" class="md-3" id="email"></v-text-field>
          <v-text-field v-model="user.password" label="Password" class="md-3" id="password"></v-text-field>
          <v-checkbox v-model="user.is_admin" label="Register as admin"></v-checkbox>
          <div style="margin-top:10px"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="addUser()">Create</v-btn>
        </v-card-actions>
      </v-card>
      <SnackBar :snackbar="snackbar"/>
    </div>
  </v-container>
</template>

<style scoped>
.add {
  margin-right: 20px;
  height: 40px;
  margin-top: 5px;
}
.heading {
    margin-top: 10px;
    justify-content: space-between;
}
</style>