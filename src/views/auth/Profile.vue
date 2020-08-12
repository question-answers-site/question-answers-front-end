<template>
  <v-card flat>
    <v-card-title style="background-color:grey;">Profile Page</v-card-title>
    <router-view></router-view>
  </v-card>
</template>

<script>/* eslint-disable */
import Dashboard from "../../components/profile/tabs/Dashboard";
import Description from "../../components/profile/Description";
import Credentials from "../../components/profile/Credentials";
import AccountSettings from "../../components/profile/AccountSettings";

export default {
  name: "Profile",
}
</script>

<style scoped>
</style>
