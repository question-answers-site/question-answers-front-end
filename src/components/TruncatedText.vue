<template>
  <v-content>
    <span v-html="text|firstThreeLines"></span>
    <v-btn v-if="!showMore" @click="showMore=!showMore" outlined x-small>show more</v-btn>
    <span v-if="showMore" v-html="text|restLines"></span>
    <v-btn v-if="showMore" @click="showMore=!showMore" outlined x-small>show less</v-btn>
  </v-content>
</template>

<script>/* eslint-disable */
  export default {
    name: 'TruncatedText',
    props: {
      text: {
        type: String,
        required:true
      },
    },
    data () {
      return {
        showMore: false
      }
    },
  }
</script>

<style scoped>

</style>
