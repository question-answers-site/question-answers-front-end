<template>
    <v-card flat>
      <v-snackbar
        class="mt-12"
        style="opacity: 0.7"
        v-model="snackbar"
        top
        :color="notification.type"
        :timeout="3000"
      >
        {{ notification.message }}
        <v-btn
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-card>
</template>

<script>/* eslint-disable */
    export default {
        name: "Notification",
      data() {
        return {
          snackbar: false,
        }
      },
      computed:{
          notification() {
            return this.$store.getters.getNotification;
          }
      },
      watch:{
          notification(newVal,oldVal){
            this.snackbar=true;
          }
      }
    }
</script>

<style scoped>

</style>
