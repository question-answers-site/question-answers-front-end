<template>
  <v-card class="mb-2 mx-auto"  min-height="30vh" width="90%">
    <v-card-actions>

      <v-menu offset-y min-width="30vw">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-auto" v-bind="attrs" v-on="on" text>
            options
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn color="error" text @click="deleteUser">
              <v-icon>mdi-pencil-box-outline</v-icon>
              Delete the user who ask this question
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn color="error" text @click="deleteQuestion">
              <v-icon>mdi-pencil-box-outline</v-icon>
              Delete this question
            </v-btn>
          </v-list-item>
          <v-list-item v-if="reportType==='answersReports'">
            <v-btn color="error" text @click="deleteAnswer">
              <v-icon>mdi-pencil-box-outline</v-icon>
              Delete this answer
            </v-btn>
          </v-list-item>
          <v-list-item >
            <v-btn color="error" text @click="ignoreReport">
              <v-icon>mdi-pencil-box-outline</v-icon>
              Ignore
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>

    <v-card-text>
      <v-card flat>
        <v-card flat height="30px">
          <span>{{ report.body | firstThreeLines }}</span>
<!--          {{report}}-->
                            <span>{{ report.body | restLines }}</span>
          <!--                                      {{question.body}}?-->
        </v-card>

        <v-card class="mt-5" flat v-if="reportType==='answersReports'">
          <app-truncated-text :text="report.answer.body"/>
        </v-card>
      </v-card>
    </v-card-text>

  </v-card>
</template>

<script>/* eslint-disable */
  import TruncatedText from './TruncatedText'

  export default {
    name: 'ReportContent',
    components:{
      appTruncatedText:TruncatedText,
    },
    props: {
      reportType:{
        type:String,
        required: true
      },
      report: {
        type: Object,
        required:true
      },
    },
    methods:{
      deleteQuestion(){
        this.$store.dispatch('deleteQuestionByAdmin',{reportId:this.report.report_id,questionId:this.report.id})
      },
      deleteUser() {
        this.$store.dispatch('deleteUserByAdmin', { reportId:this.report.report_id,userId: this.report.user_id })
      },
      deleteAnswer(){
        if(this.report.answer)
          this.$store.dispatch('deleteAnswerByAdmin',{reportId:this.report.report_id,questionId:this.report.id,answerId:this.report.answer.id})
      },
      ignoreReport(){
        this.$store.dispatch('ignoreReport', {
          reportId:this.report.report_id,
          reportType:this.reportType,
          id:this.report.id
        })
      }
    }
  }
</script>

<style scoped>

</style>
