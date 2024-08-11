<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import Snackbar from "../components/Snack.vue";
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
  is_admin: false,
});
const visible = ref(false);

onMounted(() => {
  if (localStorage.getItem("user") !== null) {
    router.push({ name: "home" });
  }
});

async function signup() {
  try {
    if (
      user.value.first_name.length === 0 ||
      user.value.last_name.length === 0 ||
      user.value.email.length === 0 ||
      user.value.password.length === 0
    ) {
      snackbar.value = updateSnackBar("Please fill in all fields", "error");
      return;
    }
    const { data } = await UserServices.signup(user.value);
    window.localStorage.setItem("user", JSON.stringify(data));
    snackbar.value = updateSnackBar("Signup successful!", "green");
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
    snackbar.value = updateSnackBar( error?.response?.data?.message|| "Signup failed!", "error");
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
      <div class="text-subtitle-1 text-medium-emphasis">First Name</div>
      <v-text-field
        v-model="user.first_name"
        density="compact"
        placeholder="First Name"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Last Name</div>
      <v-text-field
        v-model="user.last_name"
        density="compact"
        placeholder="Last Name"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Email</div>
      <v-text-field
        v-model="user.email"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Password</div>
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

      <v-checkbox
        v-model="user.is_admin"
        label="Register as admin"
      ></v-checkbox>

      <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="signup">
        Sign Up
      </v-btn>

      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" href="/signin" rel="noopener noreferrer">
          Already have account? <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
    <Snackbar :snackbar="snackbar" />
  </div>
</template>
