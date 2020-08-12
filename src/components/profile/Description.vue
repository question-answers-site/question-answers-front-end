<template>
  <v-card class="pa-4 mb-4">
    <v-card-title>

      <v-avatar size="100" class="mx-4" color="red">
        <v-img v-if="user.image!==null" :src="user.image.url"></v-img>
        <span v-else class="white--text" style="font-size: 200%">
          {{user.first_name.charAt(0).toUpperCase()}}
          {{user.last_name.charAt(0).toUpperCase()}}
        </span>
      </v-avatar>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{user.first_name}} {{user.last_name}}
            </v-list-item-title>
            <v-list-item-subtitle>
                <span v-if="user.description === '' && !editDescription">
                  <v-btn text @click="editDescription = true"> add description to your profile</v-btn>
                </span>
              <span v-if="user.description !== '' && !editDescription">
                  {{user.description}}
                  <v-btn icon @click="editDescription = true">
                    edit
                  </v-btn>
                </span>

              <v-text-field v-if="editDescription" @keydown.enter="editDescription = false"
                            label="Add Description"
                            v-model="user.description"
              >

              </v-text-field>

            </v-list-item-subtitle>

          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-title>
    <v-card-actions>
      <v-spacer/>
      <v-btn outlined :to="{name:'accountSettings'}">
        <v-icon left></v-icon>
        Account Setting
      </v-btn>
      <v-btn outlined>
        <v-icon left></v-icon>
        Edit Profile
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>/* eslint-disable */
  export default {
    name: "Description",
    data() {
      return {
        editDescription:false,
      }
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
  }
</script>

<style scoped>

</style>
