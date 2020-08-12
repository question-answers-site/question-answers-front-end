<template>
  <v-card class="mb-4">
    <v-card flat color="red">
    <v-img
      src=""
      height="200px"
    ></v-img>
    </v-card>
    <v-card-title>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline font-weight-bold">{{topic.title}}</v-list-item-title>
            <v-list-item-subtitle>this is subtitle</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-title>

    <v-card-subtitle>
      {{description}}
    </v-card-subtitle>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text>Share</v-btn>

      <v-btn
        color="purple"
        text
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

    </v-card-actions>

  </v-card>
</template>

<script>/* eslint-disable */
export default {
  name: 'TopicDescription',
  props: {
    topic: {
      type: Object,
      required:true
    },
  },
  data () {
    return {
      description: 'This is description for the topic'
    }
  },
}
</script>

<style scoped>

</style>
