<template>
    <v-card>
      <v-card-title>
        Title
      </v-card-title>
      <v-card-text>
        {{detail}}
      </v-card-text>
    </v-card>
</template>

<script>/* eslint-disable */
    export default {
        name: "TopicDetails",
      data() {
        return {
          detail:'this topic talks about SEO,Marketing and another things'
        }
      },
    }
</script>

<style scoped>

</style>
