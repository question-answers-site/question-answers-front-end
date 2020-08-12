<template>
    <v-card outlined>
      <v-list three-line class="pa-0">
        <v-list-item>
          <v-list-item-title>
            UnAnswered Questions
          </v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name:'questionAnswers',params:{id:item.id}}" class="addBorder" v-for="item in UnAnsweredQuestions" :key="item.id">
          <v-list-item-subtitle class="font-weight-bold primary--text">
              {{item.body}}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
</template>

<script>/* eslint-disable */
    import { mapGetters } from 'vuex'

export default {
        name: "UnAnsweredQuestion",
      computed: {
        ...mapGetters([
          'UnAnsweredQuestions'
        ]),
      },
  created () {
    this.$store.dispatch('retrieveUnAnsweredQuestions')
  }
}
</script>

<style scoped>
  .addBorder{
    border-top-style: solid;
    border-width: 1px;
    border-color: rgba(0,0,0,0.2)!important;
  }
</style>
