<script setup>
import { onMounted } from "vue";
import { ref, toRaw, defineProps, toRef,watch } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import Loading from "./Loading.vue";
import SnackBar from "./Snack.vue";
import { updateSnackBar } from "../utils/utils";


const props = defineProps({
  user: Object,
});
const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const user = toRef(props, 'user');
const isLoading = ref(false);
onMounted(async () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("user"));
    if(!isLoggedIn) {
    router.push({ name: "login" });
  }
});


async function updateUser() {
  if(user.value.first_name === "") {
      snackbar.value = updateSnackBar("First Name is Empty")
  }
  else if(user.value.last_name === "") {
    snackbar.value = updateSnackBar("Last name is empty")
  }
  else {
    isLoading.value = true
    await UserServices.updateUser({ first_name: user.value.first_name, last_name: user.value.last_name, is_admin: user.value.is_admin, id: user.value.id})
        .then((response) => {
            snackbar.value = updateSnackBar("User is updated successfully!","green")
            isLoading.value = false
        })
        .catch((error) => {
            console.log(error);
            snackbar.value = updateSnackBar(error?.response?.data?.message || "Update is failed!","error")
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
          <v-card-title class="headline mb-2">Update User </v-card-title>
        </div>
        <Loading v-if="isLoading" />
        <v-card-text v-else>
          <v-text-field v-model="user.first_name" label="First Name" class="md-3" id="name"></v-text-field>
          <v-text-field v-model="user.last_name" label="Last Name" class="md-3" id="contact"></v-text-field>
          <v-checkbox v-model="user.is_admin" label="Register as admin"></v-checkbox>
          <div style="margin-top:10px"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="updateUser()">Update</v-btn>
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