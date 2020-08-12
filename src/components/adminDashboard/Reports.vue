<template>
  <v-card flat class="cyan lighten-5" height="100%">
    <v-tabs background-color="grey darken-4" dark v-model="tab">
      <v-tab v-for="item in items" :key="item.component" >
        {{item.title}}
      </v-tab>
    </v-tabs>
    <v-tabs-items  v-model="tab">
      <v-tab-item v-for="(item,index) in reportsComponentsList" :key="index"  >
        <v-row class="d-flex pt-12 cyan lighten-5 justify-center">
          <v-col cols="10">
            <component  :is="reportComponent" :reportsType="item.type" :questions="item.data"/>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>/* eslint-disable */
import ReportsContent from './ReportsContent'

export default {
    computed: {
        reportedQuestions() {
            return this.$store.getters.getQuestionsReports
        },
        reportedAnswers() {
            return this.$store.getters.getAnswersReports
        },
        reportsComponentsList() {
            return [
                {
                    type: 'questionsReports',
                    data: this.reportedQuestions
                },
                {
                    type: 'answersReports',
                    data: this.reportedAnswers
                },
            ]
        }
    },
    data() {
        return {
            tab: null,
            reportComponent: ReportsContent,
            items: [
                {
                    title: 'Reported Questions',
                    icon: 'mdi-view-dashboard'
                },
                {
                    title: 'Reported Answers',
                    icon: 'mdi-help-box'
                },
            ],

        }
    },
    created() {
        this.$store.dispatch('retrieveReports')
    }
}
</script>

<style scoped>

</style>
