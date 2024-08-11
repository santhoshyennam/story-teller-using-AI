import apiClient from "./services";

export default {
  signup(user) {
    return apiClient.post("users", user);
  },
  update(user) {
    return apiClient.put(`users/${user.id}`, user);
  },
  signin(user) {
    return apiClient.post("signin", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        crossDomain: true,
        Authorization:
          "Basic " + btoa(user.email + ":" + user.password),
      },
    });
  },
  logout() {
    return apiClient.post("signout");
  },
  getAllUsers() {
    return apiClient.get("users")
  },
  getUserById(id) {
    return apiClient.get(`users/${id}`)
  },
  deleteUser(id) {
    return apiClient.delete(`users/${id}`)
  },
  addUser(user) {
    return apiClient.post("users", user);
  },
  updateUser(user) {
    return apiClient.put(`users/${user.id}`,user)
  }
};
