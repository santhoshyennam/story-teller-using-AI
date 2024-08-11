<template>
  <v-container class="container">
    <h1>Edit Profile</h1>
    <v-form @submit.prevent="updateProfile">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="user.first_name" label="First Name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="user.last_name" label="Last Name" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="user.email" label="Email" disabled></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1">
          <v-btn type="submit" color="primary">Update</v-btn>
        </v-col>
        <v-col>
          <v-btn color="error" @click="deactivateUser">Deactivate Account</v-btn>
        </v-col>
      </v-row>
    </v-form>
        <v-dialog v-model="dialog.deactivate" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Deactivate</span>
        </v-card-title>
        <v-card-text>
          Please confirm to deactivate your account?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="closeDeactivateModal"
            >Cancel</v-btn
          >
          <v-btn color="error darken-1" text @click="confirmDeactivate"
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import userService from '../services/UserServices'; // Import the user service with API calls
import { useRouter } from 'vue-router';

const router = useRouter();

const user = ref({
  firstName: '',
  lastName: '',
  email: '', // Email will be fetched from API
  password: '',
  id: ''
});

const dialog = ref({
  deactivate: false,
});

onMounted(async () => {
  // Fetch user details from API
  try {
    const userSession = JSON.parse(localStorage.getItem('user'));
    if (!userSession) {
      router.push('/signin');
    }
    fetchUserInfo();
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
});

const updateProfile = async () => {
  try {
    await userService.updateUser(user.value); // API call to update user profile
    alert('Profile updated successfully!');
    fetchUserInfo();
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile. Please try again.');
  }
};

const deactivateUser = () => {
  dialog.value.deactivate = true;
}

const fetchUserInfo = async() => {
    const userSession = JSON.parse(localStorage.getItem('user'));
    const response = await userService.getUserById(userSession.id);
    user.value = response.data;
}

const confirmDeactivate = async () => {
  try {
    const userSession = JSON.parse(localStorage.getItem('user'));
    await userService.deleteUser(userSession.id);
    closeDeactivateModal();
    localStorage.removeItem("user");
    router.push({ name: 'home'});
    snackbar.value.value = true;
    snackbar.value.text = "Deactivated!";
    snackbar.value.color = "green";
  } catch (error) {
    snackbar.value.value = true;
    snackbar.value.text = "Failed to deactivate!";
    snackbar.value.color = "red";
  }
};

const closeDeactivateModal = () => {
  dialog.value.deactivate = false;
};
</script>

<style scoped>

.container {
    background-color: white;
    margin-top: 20px;
    border-radius: 5px;

}

</style>
