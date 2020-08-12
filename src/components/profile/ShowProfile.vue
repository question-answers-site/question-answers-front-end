<template>
  <v-card flat>
    <app-profile-description/>
    <app-profile-credentials/>
    <app-profile-dashboard/>
  </v-card>
</template>

<script>/* eslint-disable */
import Description from "./Description";
import Credentials from "./Credentials";
import Dashboard from "./tabs/Dashboard";

export default {
  name: "ShowProfile",
  components: {
    appProfileDescription: Description,
    appProfileCredentials: Credentials,
    appProfileDashboard: Dashboard,
  },
}
</script>

<style scoped>

</style>
