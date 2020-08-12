<template>

    <v-card outlined shaped color="cyan lighten-4">

      <v-card width="70%"  class="lighten-3 teal mt-n12 mb-6 mx-auto" elevation="15" >
        <v-card-title class="justify-center" v-if="reportsType==='questionsReports' ">
          recently reported Questions
        </v-card-title>
        <v-card-title class="justify-center" v-if="reportsType==='answersReports' ">
          recently reported answers
        </v-card-title>
        <v-card-text class="d-flex justify-center">
          <v-radio-group  row v-model="selected" color="error" text label="Order By">
            <v-radio value="radio-1" label="reported Date"/>
            <v-radio value="radio-2" label="reports count"/>
          </v-radio-group>
        </v-card-text>
      </v-card>

      <v-card color="cyan lighten-4" class="mt-10" flat  max-height="65vh"
              style="overflow-y: scroll">
        <template v-for="(question,index) in questions">
          <app-report-content :report="question" :key="index" :reportType="reportsType"/>
        </template>

      </v-card>
    </v-card>

</template>

<script>/* eslint-disable */
import ReportContent from '../ReportContent'

export default {
  name: 'ReportsContent',
  components: {
    appReportContent: ReportContent
  },
  props: {
    reportsType: {
      type: String,
      required: true
    },
    questions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selected: 'radio-1'
    }
  },
  // created () {
  //   console.log(isThreeLines('daniel'))
  // }
}
</script>

<style scoped>

</style>
