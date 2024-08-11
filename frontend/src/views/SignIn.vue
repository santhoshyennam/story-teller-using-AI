<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import Snackbar from "../components/Snack.vue"
import { updateSnackBar } from "../utils/utils"

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const user = ref({
  email: "",
  password: "",
});
const visible = ref(false);

onMounted(() => {
  if (localStorage.getItem("user") !== null) {
    router.push({ name: "home" });
  }
});

async function login() {
  try {
    if (user.value.email.length === 0 || user.value.password.length === 0) {
      snackbar.value = updateSnackBar("Please enter email and password","error")
      return;
    }
    const { data } = await UserServices.signin(user.value);
    window.localStorage.setItem("user", JSON.stringify(data));
    snackbar.value = updateSnackBar("Login successful!","green")
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
    snackbar.value = updateSnackBar( error?.response?.data?.message|| "Login failed!","error")
  }
}
</script>

<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h2 class="my-6" style="color:#196CA2;">Story Teller</h2>
      </v-col>
    </v-row>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Email</div>
      <v-text-field
        v-model="user.email"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>
      <v-text-field
        v-model="user.password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="login">
        Sign In
      </v-btn>

      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" href="/signup" rel="noopener noreferrer">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
    <Snackbar :snackbar="snackbar"/>
  </div>
</template>
